import Papa from 'papaparse';
import { Priority } from '@/app/models/priority';
import { Focus } from '@/app/models/focus';
import { Sector } from '@/app/models/sector';
import { City } from '@/app/models/city';
import { AppData } from '@/app/models/appData';
import { Blueprint } from '@/app/models/blueprint';
import { LocalMeasure } from '@/app/models/LocalMeasure';

interface RawLocalMeasure {
  city: string;
  sector: string;
  title: string;
  url?: string;
  linkedBlueprint?: string;
}

interface RawBlueprint {
  code: string;
  title: string;
  priority: number;
  cities: string;
  sector: string;
  focuses: string;
  description: string;
}

export const fetchSheetsData = async () => {
  //Can be autoparsed
  const prioritys = await fetchPageAndParse<Priority>('1339549110');
  const sectors = await fetchPageAndParse<Sector>('1227125832');
  const focuses = await fetchPageAndParse<Focus>('1437521198');
  const cities = await fetchPageAndParse<City>('593066774');

  //Cant be autoparsed
  const rawLocalmeasures = await fetchPage('1028955315');
  const rawBluePrintData = await fetchPage('0');

  const blueprints = await parseBlueprints(
    rawBluePrintData,
    prioritys,
    sectors,
    focuses,
    cities,
  );

  const localMeasures: LocalMeasure[] = await parseLocalMeasures(
    rawLocalmeasures,
    sectors,
    cities,
    blueprints,
  );

  const appData: AppData = {
    priorities: prioritys,
    sectors: sectors,
    focuses: focuses,
    cities: cities,
    blueprints: shuffle(blueprints),
    localMeasures: localMeasures,
  };

  //console.log('blueprints', blueprints);
  //console.log('LocalMeasures', localMeasures);
  console.log('blueprintsSize', blueprints.length);
  console.log('LocalMeasuresSize ', localMeasures.length);
  return appData;
};

const parseLocalMeasures = async (
  data: string,
  sectors: Sector[],
  cities: City[],
  blueprints: Blueprint[],
): Promise<LocalMeasure[]> => {
  return new Promise<LocalMeasure[]>((resolve, reject) => {
    Papa.parse<RawLocalMeasure>(data, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const localMeasureData = results.data;
        const localMeasures = localMeasureData.map((rawLocalMeasure) => {
          // Find the sector by title
          const sector = sectors.find(
            (sector) => sector.title == rawLocalMeasure.sector.trim(),
          );
          if (rawLocalMeasure.sector == undefined || sector == undefined) {
            throw new Error('Sector is undefined for LocalMeasure');
          }
          const city = cities.find(
            (city) => city.title == rawLocalMeasure.city.trim(),
          );
          if (rawLocalMeasure.city == undefined || city == undefined) {
            throw new Error('City is undefined for LocalMeasure');
          }
          let linkedBlueprint = blueprints.find(
            (bluePrint) => bluePrint.title == rawLocalMeasure.linkedBlueprint,
          );
          // Return the parsed LocalMeasure
          const print: LocalMeasure = {
            title: rawLocalMeasure.title,
            city: city,
            sector: sector,
            url: rawLocalMeasure.url,
            linkedBlueprint: linkedBlueprint,
          };
          return print;
        });
        resolve(localMeasures);
      },
      error: () => {
        reject('Error parsing blueprint CSV');
      },
    });
  });
};

const parseBlueprints = async (
  data: string,
  priorities: Priority[],
  sectors: Sector[],
  focuses: Focus[],
  cities: City[],
): Promise<Blueprint[]> => {
  return new Promise<Blueprint[]>((resolve, reject) => {
    Papa.parse<RawBlueprint>(data, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const blueprintData = results.data;
        const blueprints = blueprintData.map((blueprint) => {
          // Find the priority by stars

          const priority = priorities.find(
            (p) => p.stars == blueprint.priority,
          );
          if (blueprint.priority == undefined || priority == undefined) {
            throw new Error(
              'Priority is undefined for blueprint: ' + blueprint.code,
            );
          }
          // Find the sector by title
          const sector = sectors.find((s) => s.title == blueprint.sector.trim());
          if (blueprint.sector == undefined || sector == undefined) {
            throw new Error(
              'Sector is undefined for blueprint: ' + blueprint.code,
            );
          }
          // Map focus titles to Focus objects
          const splitRawFocuses = blueprint.focuses?.trim().split(',');
          const focusList = focuses.filter((focus) =>
            splitRawFocuses.includes(focus.title),
          );
          if (blueprint.focuses == undefined || focusList == undefined) {
            throw new Error(
              'Focuses is undefined for blueprint: ' + blueprint.code,
            );
          }
          // Map city titles to City objects
          const splitRawCities = blueprint.cities?.trim().split(',').map((city) => city.trim());
          const cityList = cities.filter((city) => {
              return splitRawCities.find((cityTitle) => cityTitle.trim() == city.title.trim());
          });

          if (blueprint.cities == undefined || cityList == undefined) {
            throw new Error(
              'Cities is undefined for blueprint: ' + blueprint.code,
            );
          }
          // Return the parsed Blueprint object
          const print: Blueprint = {
            code: blueprint.code,
            title: blueprint.title,
            priority: priority,
            sector: sector,
            focuses: focusList,
            cities: cityList,
            description: blueprint.description,
          };
          return print;
        });
        resolve(blueprints);
      },
      error: () => {
        reject('Error parsing blueprint CSV');
      },
    });
  });
};

const fetchPage = async (pageName: string) => {
  const url = `https://docs.google.com/spreadsheets/d/1zluA1FvCrFrGiLkB828kt54BEQed52jpEJMcX8hRRLk/export?format=csv&gid=${pageName}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch page: ${response.statusText}`);
  }
  return await response.text();
};

// Autoparse priority, sector, focus, city
const autoParse = <T>(data: string): T[] => {
  return Papa.parse<T>(data, {
    header: true,
    skipEmptyLines: true,
  }).data;
};

const fetchPageAndParse = async <T>(pageName: string) => {
  const result = await fetchPage(pageName);
  return autoParse<T>(result);
};

const shuffle = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

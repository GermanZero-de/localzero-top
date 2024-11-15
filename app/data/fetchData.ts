import Papa from "papaparse";
import {Priority} from "@/app/models/priority";
import {Focus} from "@/app/models/focus";
import {Sector} from "@/app/models/sector";
import {City} from "@/app/models/city";
import {AppData} from "@/app/models/appData";
import {Blueprint} from "@/app/models/blueprint";
import {RawBlueprint} from "@/app/models/rawBlueprint";

export const fetchSheetsData = async () => {
    //Can be autoparsed
    const prioritys = await fetchPageAndParse<Priority>("1339549110");
    console.log("parsed: ", prioritys);
    const sectors = await fetchPageAndParse<Sector>("1227125832");
    console.log("parsed: ", sectors);
    const focuses = await fetchPageAndParse<Focus>("1437521198");
    console.log("parsed: ", focuses);
    const cities = await fetchPageAndParse<City>("593066774");
    console.log("parsed: ", cities);
    // Needs to be manually parsed
    const rawBluePrintData = await fetchPage("0");
    const blueprints = await parseBlueprints(rawBluePrintData, prioritys, sectors, focuses, cities);
    const appData: AppData = {
        priorities: prioritys,
        sectors: sectors,
        focuses: focuses,
        cities: cities,
        blueprints: blueprints
    }
    return appData
}

const fetchPage = async (pageName: string) => {
    const url = `https://docs.google.com/spreadsheets/d/1zluA1FvCrFrGiLkB828kt54BEQed52jpEJMcX8hRRLk/export?format=csv&gid=${pageName}`;
    const response = await fetch(url);
    const reader = response.body?.getReader();
    const result = await reader?.read()
    return new TextDecoder("utf-8").decode(result?.value);
}

const fetchPageAndParse = async <T>(pageName: string) => {
    const result = await fetchPage(pageName);
    return autoParse<T>(result)
}

// Autoparse priority, sector, focus, city
const autoParse = <T>(data: string): T[] => {
    return Papa.parse<T>(data, {
        header: true,
        skipEmptyLines: true
    }).data;
}

const parseBlueprints = async (
    data: string,
    priorities: Priority[],
    sectors: Sector[],
    focuses: Focus[],
    cities: City[]
): Promise<Blueprint[]> => {
    return new Promise<Blueprint[]>((resolve, reject) => {
        Papa.parse<RawBlueprint>(data, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const blueprintData = results.data;
                const blueprints = blueprintData.map((blueprint) => {
                    // Find the priority by stars
                    const priority = priorities.find(p => p.stars == blueprint.priority);
                    // Find the sector by title
                    const sector = sectors.find(s => s.title == blueprint.sector.trim());
                    // Map focus titles to Focus objects
                    const focusList = blueprint.focuses.split(",").map(focusTitle => {
                        return focuses.find(f => f.title == focusTitle.trim());
                    }).filter(focus => focus !== undefined) as Focus[];
                    // Map city titles to City objects
                    const cityList = blueprint.cities.split(",").map(cityTitle => {
                        return cities.find(c => c.title == cityTitle.trim());
                    }).filter(city => city !== undefined) as City[];
                    // Return the formatted Blueprint object
                    return {
                        code: blueprint.code,
                        title: blueprint.title,
                        priority: priority!,
                        sector: sector!,
                        focuses: focusList,
                        cities: cityList,
                        description: blueprint.description.replace(/\[NEWLINE\]/g, "<br>")
                    };
                });
                resolve(blueprints);
            },
            error: () => {
                reject("Error parsing blueprint CSV");
            }
        });
    });
}

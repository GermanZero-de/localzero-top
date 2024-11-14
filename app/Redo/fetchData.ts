import Papa from "papaparse";
import { Measure } from "@/app/Redo/Measure";
import { Focus } from "@/app/Redo/Focus";
import { Sector } from "@/app/Redo/Sector";

interface MeasureFromCsv {
    title: string;
    sector: string;
    priority: number;
    focuses: string;
    code: string;
    description: string;
    cities: string;
}

// FetchMeasures method
export const fetchMeasures = async () => {
    const response = await fetch(
        "https://docs.google.com/spreadsheets/d/1zluA1FvCrFrGiLkB828kt54BEQed52jpEJMcX8hRRLk/export?format=csv" // New
    );
    const reader = response.body?.getReader();
    const result = await reader?.read();
    const csvData = new TextDecoder("utf-8").decode(result?.value);

    return new Promise<Measure[]>((resolve, reject) => {
        Papa.parse<MeasureFromCsv>(csvData, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                // Create Maps to store unique Focuses and Sectors
                const focusMap = new Map<string, Focus>();
                const sectorMap = new Map<string, Sector>();

                const formattedData = results.data.map((measure) => {
                    // Process focuses and store them uniquely
                    const focuses: Focus[] = measure.focuses
                        .split(",")
                        .map((focus: string) => {
                            const focusTitle = focus.trim();
                            if (!focusMap.has(focusTitle)) {
                                // Create a new Focus if it doesn't exist
                                focusMap.set(focusTitle, { title: focusTitle, color: "", tooltip: "" });
                            }
                            return focusMap.get(focusTitle)!;
                        });

                    // Process sector and store it uniquely
                    const sectorTitle = measure.sector.trim();
                    if (!sectorMap.has(sectorTitle)) {
                        // Create a new Sector if it doesn't exist
                        sectorMap.set(sectorTitle, { title: sectorTitle, tooltip: "" });
                    }
                    const sector: Sector = sectorMap.get(sectorTitle)!;

                    // Return formatted measure
                    return {
                        code: measure.code,
                        title: measure.title,
                        priority: Number(measure.priority),
                        sector,
                        focuses,
                        description: measure.description.replace(/\[NEWLINE\]/g, "<br>"),
                        cities: measure.cities ? measure.cities.split(",").map((city: string) => city.trim()) : []
                    };
                });

                resolve(formattedData);
            },
            error: () => {
                reject("Error formatting csv");
            }
        });
    });
};

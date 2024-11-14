import {Sector} from "@/app/Redo/Sector";
import {Focus} from "@/app/Redo/Focus";

export interface Measure {
  code: string;
  title: string;
  priority: number; // 1-3
  sector: Sector;
  focuses: Focus[];
  description: string;
  cities: string[];
}
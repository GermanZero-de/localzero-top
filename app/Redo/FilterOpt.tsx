import {Sector} from "@/app/Redo/Sector";
import {Focus} from "@/app/Redo/Focus";

export type FilterOpt = {
  prioritys: number[];
  sectors: Sector[];
  focuses: Focus[];
  cities: string[];
};

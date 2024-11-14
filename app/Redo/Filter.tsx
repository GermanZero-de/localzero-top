import {Sector} from "@/app/Redo/Sector";
import {Focus} from "@/app/Redo/Focus";

export interface Filter {
  prioritys: number[];
  sectors: Sector[];
  focuses: Focus[];
}

import {Sector} from "@/app/models/sector";
import {Focus} from "@/app/models/focus";
import {Priority} from "@/app/models/priority";

export interface Filter {
  prioritys: Priority[];
  sectors: Sector[];
  focuses: Focus[];
}

import {Sector} from "@/app/models/sector";
import {Focus} from "@/app/models/focus";
import {Priority} from "@/app/models/priority";
import {City} from "@/app/models/city";

export interface Filter {
  prioritys: Priority[];
  sectors: Sector[];
  focuses: Focus[];
  cities: City[];
}

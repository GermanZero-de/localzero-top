// Blueprint structure that ties it all together
import {Priority} from "@/app/models/priority";
import {City} from "@/app/models/city";
import {Sector} from "@/app/models/sector";
import {Focus} from "@/app/models/focus";

export interface Blueprint {
    code: string;
    title: string;
    priority: Priority;
    cities: City[];
    sector: Sector;
    focuses: Focus[];
    description: string;
}
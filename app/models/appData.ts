// Main data structure for storing all entities
import {Priority} from "@/app/models/priority";
import {Sector} from "@/app/models/sector";
import {Focus} from "@/app/models/focus";
import {City} from "@/app/models/city";
import {Blueprint} from "@/app/models/blueprint";
import { LocalMeasure } from '@/app/models/LocalMeasure';

export interface AppData {
    priorities: Priority[];
    sectors: Sector[];
    focuses: Focus[];
    cities: City[];
    blueprints: Blueprint[];
    localMeasures: LocalMeasure[];
}

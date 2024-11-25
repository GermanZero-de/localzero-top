// Blueprint structure that ties it all together
import { City } from '@/app/models/city';
import { Sector } from '@/app/models/sector';
import { Blueprint } from '@/app/models/blueprint';

export interface LocalMeasure {
  city: City;
  sector: Sector;
  title: string;
  url?: string;
  linkedBlueprint?: Blueprint;
}

import { WellboreInfo } from '../productionmonitoring/Wellbore/WellboreInfo';

export class WellboreSearchResponse {
  result: WellboreInfo[];

  currentPageIndex: number;

  totalPages: number;
}

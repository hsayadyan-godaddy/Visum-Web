export interface WellboreSearchCommand {
  SearchString: string;
  NearbyWellsOnly: boolean;
  RecentWells: boolean;
  CurrentProjectId: string;
  ResultsPerPage: number;
  PageIndex: number;
}

import { Periodicity } from "../../enums/periodicity";
export interface TimeRange {
    periodicity: Periodicity;
    fromDate: number,
    toDate: number
}
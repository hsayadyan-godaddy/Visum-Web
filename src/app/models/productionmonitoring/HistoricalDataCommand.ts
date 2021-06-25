import { Period } from "src/app/enums/period";
import { ProjectIdWellNameCommand } from "../Request/ProjectIdWellNameCommand";

export interface HistoricalDataCommand extends ProjectIdWellNameCommand {
    periodicity : Period;
    snapshotSize : bigint;
    fromDate?: bigint;
    toDate?: bigint;
}
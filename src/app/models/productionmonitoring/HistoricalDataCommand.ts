import { Period } from "src/app/enums/period";
import { ProjectIdWellNameCommand } from "../Request/ProjectIdWellNameCommand";

export interface HistoricalDataCommand extends ProjectIdWellNameCommand {
    Periodicity : Period;
    SnapshotSize : bigint;
    FromDate?: bigint;
    ToDate?: bigint;
}
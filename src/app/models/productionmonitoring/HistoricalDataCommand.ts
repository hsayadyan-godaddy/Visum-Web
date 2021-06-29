import { Periodicity } from "src/app/enums/periodicity";
import { ProjectIdWellNameCommand } from "../Request/ProjectIdWellNameCommand";

export interface HistoricalDataCommand extends ProjectIdWellNameCommand {
    periodicity : Periodicity;
    snapshotSize : number;
    fromDate?: bigint;
    toDate?: bigint;
}

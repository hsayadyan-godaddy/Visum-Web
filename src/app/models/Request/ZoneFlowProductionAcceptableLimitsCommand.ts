import { MinMax } from "../productionmonitoring/minmax";
import { ProjectIdWellNameCommand } from "./ProjectIdWellNameCommand";

export interface ZoneFlowProductionAcceptableLimitsCommand extends ProjectIdWellNameCommand {
    Oil? : MinMax<number>;
    Water? : MinMax<number>;
    Gas? : MinMax<number>;
}
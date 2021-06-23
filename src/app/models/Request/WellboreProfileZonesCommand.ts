import { DepthType } from "src/app/enums/depth-type";
import { ProjectIdWellNameCommand } from "./ProjectIdWellNameCommand";

export interface WellboreProfileZonesCommand extends ProjectIdWellNameCommand {
    depthType : DepthType;
}
import { MinMax } from '../productionmonitoring/minmax';
import { ProjectIdWellNameCommand } from './ProjectIdWellNameCommand';

export interface ZoneFlowProductionAcceptableLimitsCommand extends ProjectIdWellNameCommand {
  oil? : MinMax<number>;
  water? : MinMax<number>;
  gas? : MinMax<number>;
}

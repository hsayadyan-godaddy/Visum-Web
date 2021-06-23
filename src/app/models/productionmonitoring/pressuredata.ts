import { TimeValue } from "./timevalue";

export interface PressureData {
    sensorId : string;
    data : TimeValue[];
}
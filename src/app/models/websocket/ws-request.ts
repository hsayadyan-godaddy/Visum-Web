import { WSRequestType } from '../enums/ws-request-type';
import { WSRequestParameter } from './ws-request-parameter';
import { WSRequestSource } from './ws-request-source';
import { v4 as uuidv4 } from 'uuid';

export class WSRequest extends WSRequestSource {

    public sequenceId: string;
    public requestType: WSRequestType;
    public parameters?: WSRequestParameter[];

    constructor(operationSource: WSRequestSource,
        parameters?: Object,
        requestType: WSRequestType = WSRequestType.Subscribe) {

        super(operationSource);

        this.sequenceId = uuidv4().substring(0, 6);
        this.requestType = requestType;

        if (parameters) {
            this.parameters = this.createParameters(parameters);
        }
    }

    private createParameters(source: Object): WSRequestParameter[] {
        let target: WSRequestParameter[] = [];

        Object.keys(source).forEach((key: string) => {
            const value: string | number | boolean | Date = source[key];
            if ((typeof value !== 'undefined') && (value !== null)) {
                const parameter: WSRequestParameter = {
                    name: key,
                    value: value
                };
            }
        });

        return target;
    }
}

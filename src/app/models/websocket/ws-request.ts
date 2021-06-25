import { WSRequestType } from '../enums/ws-request-type';
import { WSRequestParameter } from './ws-request-parameter';
import { WSRequestSource } from './ws-request-source';
import { v4 as uuidv4 } from 'uuid';
import { ParamBuilder } from '../../shared/pipes/parambuilder';

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
            this.parameters = ParamBuilder.toWSRequestParameters(parameters);
        }
    }
}

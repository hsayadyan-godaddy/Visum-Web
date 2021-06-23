import { WSRequestSource } from '../../../models/websocket/ws-request-source';
import { WSResponse } from '../../../models/websocket/ws-response';


export class WSResponseCheck {
    static Allowed<T>(response: WSResponse<T>, operationInfo: WSRequestSource): boolean {
       
    const valid = response.statusCode == 200
                  && response.operationSource == operationInfo.operationSource 
                  && response.methodName == operationInfo.methodName

        return valid;
    }
}

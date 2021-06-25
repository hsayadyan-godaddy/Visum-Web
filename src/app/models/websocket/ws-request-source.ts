export class WSRequestSource {
    public operationSource: string;
    public methodName: string;

    constructor(value?: WSRequestSource) {
        if(value){
            this.operationSource = value.operationSource;
            this.methodName = value.methodName;
        }
    }
}

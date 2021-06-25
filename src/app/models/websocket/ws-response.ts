import { WSRequestSource } from "./ws-request-source";

export class WSResponse<T> extends WSRequestSource {
    public sequenceId: string;
    public statusCode: number;
    public statusMessage: string;
    public response: T;
}

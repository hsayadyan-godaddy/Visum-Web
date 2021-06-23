import { HttpParams } from "@angular/common/http";

export class ParamBuilder {
    
    static toQueries(source: Object): HttpParams {
        let target: HttpParams = new HttpParams();
        Object.keys(source).forEach((key: string) => {
            const value: string | number | boolean | Date | bigint = source[key];
            if ((typeof value !== 'undefined') && (value !== null)) {
                target = target.append(key, value.toString());
            }
        });
        return target;
    }
}
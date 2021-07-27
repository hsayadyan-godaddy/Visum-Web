import { HttpParams } from '@angular/common/http';
import { WSRequestParameter } from '../../models/websocket/ws-request-parameter';

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

  static toWSRequestParameters(source: Object): WSRequestParameter[] {
    const target: WSRequestParameter[] = [];

    Object.keys(source).forEach((key: string) => {
      const value: string | number | boolean | Date = source[key];
      if ((typeof value !== 'undefined') && (value !== null)) {
        const parameter: WSRequestParameter = {
          name: key,
          value,
        };
        target.push(parameter);
      }
    });

    return target;
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import * as Rx from 'rxjs';
import { Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { environment } from '../../../environments/environment';
import { ConnectionState } from '../../models/enums/connection-state';
import { WSRequest } from '../../models/websocket/ws-request';
import { WSResponse } from '../../models/websocket/ws-response';
import { AuthService } from '../auth.service';

@Injectable()
export class WebSocketService {
    // #region Properties (5)

    private _connection: Subject<MessageEvent>;
    private _state: ConnectionState = ConnectionState.Disconnected;
    private _ws: WebSocket;

    public onConnected = new EventEmitter<boolean>(true);
    public onNewMessage = new EventEmitter<WSResponse<any>>();

    // #endregion Properties (5)

    // #region Constructors (1)

    constructor(private _authService: AuthService) {
        this._initialize();
    }

    // #endregion Constructors (1)

    // #region Public Accessors (1)

    public get connected(): boolean {
        return this._state === ConnectionState.Connected;
    }

    // #endregion Public Accessors (1)

    // #region Public Methods (1)

    public send(message: WSRequest) {
        if (this._state === ConnectionState.Connected) {
            this._ws.send(JSON.stringify(message));
        }
    }

    // #endregion Public Methods (1)

    // #region Private Methods (4)

    private _close() {
        if (!this._connection) {
            return;
        }

        this._connection.unsubscribe();
        this._ws.close();
    }

    private _connect(url, token: string): Rx.Subject<MessageEvent> {
        let ret: Rx.Subject<MessageEvent> = null;
        if (!this._ws || this._ws.readyState !== WebSocket.OPEN || this._ws.readyState !== WebSocket.CONNECTING) {
            const wsUrl = url + token;
            ret = this._create(wsUrl);
        }

        return ret;
    }

    private _create(url): Rx.Subject<MessageEvent> {
        this._ws = new WebSocket(url);

        const observable = Rx.Observable.create(
            (obs: Rx.Observer<MessageEvent>) => {
                this._ws.onmessage = obs.next.bind(obs);
                this._ws.onerror = obs.error.bind(obs);

                return this._ws.close.bind(this._ws);
            });

        const observer: any = {
            next: (data: Object) => {
                if (this._ws.readyState === WebSocket.OPEN) {
                    this._ws.send(JSON.stringify(data));
                }
            }
        };

        this._ws.onopen = (ev) => {
            this._state = ConnectionState.Connected;
            this.onConnected.emit(true);
        };

        this._ws.onclose = () => {
            if (this._state === ConnectionState.Connected) {
                this.onConnected.emit(false);
            }

            this._state = ConnectionState.Disconnected;

            setTimeout(() => {
                this._initialize();
            }, 200);
        };

        return new AnonymousSubject(observer, observable);
    }

    private _initialize() {
        const allowed = this._state === ConnectionState.Disconnected;

        if (allowed) {
            this._state = ConnectionState.Connecting;
            this._close();
            this._connection = this._connect(environment.WSApiEndpoint, this._authService.getToken());

            this._connection.subscribe((response: MessageEvent) => {
                if (response?.data) {
                    const message = JSON.parse(response?.data);
                    this.onNewMessage.emit(message);
                }
            });
        }
    }

    // #endregion Private Methods (4)
}

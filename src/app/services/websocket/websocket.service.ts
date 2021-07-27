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

  private connection: Subject<MessageEvent>;

  private state: ConnectionState = ConnectionState.Disconnected;

  private ws: WebSocket;

  public onConnected = new EventEmitter<boolean>(true);

  public onNewMessage = new EventEmitter<WSResponse<any>>();

  // #endregion Properties (5)

  // #region Constructors (1)

  constructor(private authService: AuthService) {
    this.initialize();
  }

  // #endregion Constructors (1)

  // #region Public Accessors (1)

  public get connected(): boolean {
    return this.state === ConnectionState.Connected;
  }

  // #endregion Public Accessors (1)

  // #region Public Methods (1)

  public send(message: WSRequest) {
    if (this.state === ConnectionState.Connected) {
      this.ws.send(JSON.stringify(message));
    }
  }

  // #endregion Public Methods (1)

  // #region Private Methods (4)

  private close() {
    if (!this.connection) {
      return;
    }

    this.connection.unsubscribe();
    this.ws.close();
  }

  private connect(url, token: string): Rx.Subject<MessageEvent> {
    let ret: Rx.Subject<MessageEvent> = null;
    if (!this.ws
      || this.ws.readyState !== WebSocket.OPEN
      || this.ws.readyState !== WebSocket.CONNECTING) {
      const wsUrl = url + token;
      ret = this.create(wsUrl);
    }

    return ret;
  }

  private create(url): Rx.Subject<MessageEvent> {
    this.ws = new WebSocket(url);

    const observable = Rx.Observable.create(
      (obs: Rx.Observer<MessageEvent>) => {
        this.ws.onmessage = obs.next.bind(obs);
        this.ws.onerror = obs.error.bind(obs);

        return this.ws.close.bind(this.ws);
      },
    );

    const observer: any = {
      next: (data: Object) => {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(data));
        }
      },
    };

    this.ws.onopen = () => {
      this.state = ConnectionState.Connected;
      this.onConnected.emit(true);
    };

    this.ws.onclose = () => {
      if (this.state === ConnectionState.Connected) {
        this.onConnected.emit(false);
      }

      this.state = ConnectionState.Disconnected;

      setTimeout(() => {
        this.initialize();
      }, 200);
    };

    return new AnonymousSubject(observer, observable);
  }

  private initialize() {
    const allowed = this.state === ConnectionState.Disconnected;

    if (allowed) {
      this.state = ConnectionState.Connecting;
      this.close();
      this.connection = this.connect(environment.WSApiEndpoint, this.authService.getToken());

      this.connection.subscribe((response: MessageEvent) => {
        if (response?.data) {
          const message = JSON.parse(response?.data);
          this.onNewMessage.emit(message);
        }
      });
    }
  }

  // #endregion Private Methods (4)
}

import { RefObject } from "react";

export interface reactWsPropTypes {
    url:string;
    onMessage:Function;
    onConnect?:Function;
    onDisconnect?:Function;
    onError?:Function;
    debug?:Boolean;
    reconnect?:Boolean;
    reconnectInterval?:number;
    reconnectAttempts?:number;
    ref?: RefObject<any>;
}
import { messageType } from "./Enumerators";

export interface Message {
    type: messageType,
    msg: string
}

export interface AlertType {
    msg:string,
    open:boolean
}

export type Nullable<T> = T | null;
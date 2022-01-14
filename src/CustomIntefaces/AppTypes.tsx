import { messageType } from "./Enumerators";

export interface Message {
    type: messageType,
    msg: string
}

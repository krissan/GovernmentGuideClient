export enum messageType {
    error,
    success,
    warning
}

export interface Message {
    type: messageType,
    msg: string
}
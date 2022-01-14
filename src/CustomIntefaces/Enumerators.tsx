import { faLeaf, IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface SymbolType {
    color:string,
    icon:IconDefinition
}

interface SymbolEnumType {
    [element: string] : SymbolType
}

export const SymbolEnum:SymbolEnumType = {
    "environment":{color:"green",icon:faLeaf},
    "industry":{color:"gray",icon:faLeaf},
    "monetary":{color:"DarkGreen",icon:faLeaf}
}

export enum messageType {
    error,
    success,
    warning
}

export enum infoEnum {
    representative = "representative",
    party = "party"
}

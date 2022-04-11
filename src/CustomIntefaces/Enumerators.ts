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

export const whoEnum = [
    "Individual",
    "Non-Profit",
    "Union",
    "Media",
    "Government",
    "Other"
]

export const reasonEnum = [
    "Question",
    "Concern",
    "Dispute Data",
    "Collaboration",
    "Other"
]

export enum platformStatus {
    COMPLETED,
    IN_PROGRESS,
    DROPPED,
    NOT_STARTED
}

export enum GovBodyType{
    MUNICIPAL,
    PROVINCIAL,
    FEDERAL
}
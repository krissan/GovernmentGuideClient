import { ElectionRiding, RepBoundary } from "../AppContext";
import { ElectionCandidateRepPartyItem } from "../components/Pages/ElectionPage";
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

export interface LocationState {
    repRiding:ElectionRiding
  }

export interface RepTabProps {
    repData:RepBoundary|ElectionCandidateRepPartyItem,
    reps:Map<number, RepBoundary|ElectionCandidateRepPartyItem>,
    setReps:(c: Map<number, any>) => void
}
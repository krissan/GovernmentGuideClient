import { ElectionRiding, GeoPoint, RepBoundary } from "../AppContext";
import { ElectionCandidateRepItem } from "../components/Pages/ElectionPage";
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
    repData:RepBoundary|ElectionCandidateRepItem,
    reps:Map<number, RepBoundary|ElectionCandidateRepItem>,
    setReps:(c: Map<number, any>) => void
}

export interface BoundaryCustomImport {
    boundaryName: string,
    outline:Array<Array<google.maps.LatLngLiteral>>

}
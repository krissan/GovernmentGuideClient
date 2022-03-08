import React, { useContext } from "react";
import { AlertType, Nullable } from "./customIntefaces/AppTypes";
import { platformStatus } from "./customIntefaces/Enumerators";

export interface GeoPoint {
    x: number,
    y: number,
    z: number
}


export interface Boundary {
    id: number,
    boundaryName:string,
    startDate:Date | null,
    endDate:Date | null,
    updateDate:Date | null,
    govBodyId:number,
    centerLat:number,
    centerLng:number,
    province:string,
    repTitle:string,
    elng1:number,
    elng2:number,
    elat1:number,
    elat2:number,
    outline?:GeoPoint[]
}
  
export interface RepBoundary{
    rep:Representative,
    boundary:Boundary,
    platforms?:Array<Platform>,
    reportCards?:Array<ReportCard>,
    endorsements?:Array<Endorsement>,
    biography?:Nullable<Biography>,
    eleRiding?:Nullable<ElectionRiding>
}

export interface ElectionRiding {
    id:number,
    electionId:number,
    boundaryId:number,
    totalVotes:number,
    votingPopulation: number,
    status:string,
    createDate: Date | null,
    updateDate: Date |null
}

export interface Biography {
    id:number,
    repId:number|null,
    partyId:number|null,
    bio:string,
    createDate:Date | null,
    updateDate:Date | null,
}

export interface Platform {
    id:number,
    repId:number|null,
    partyId:number|null,
    orgId:number,
    name:string,
    status:platformStatus,
    description:string,
    createDate:Date | null,
    category:string
}

export interface Endorsement {
    id:number,
    repId:number|null,
    partyId:number|null,
    orgId:number,
    description:string,
    createDate:Date | null,
    updateDate:Date | null,
    category:string
}

export interface ReportCard {
    id:number,
    repId:number|null,
    partyId:number|null,
    orgId:number,
    name:string,
    description:string,
    grade:string,
    createDate:Date | null,
    category:string
}

export interface Representative {
    id:number,
    firstName:string,
    lastName:string,
    title:string,
    party?:string,
    partyColor?:string,
    partyImage?:string,
    gender:string,
    email:string,
    call:number,
    constituencyOffice:string,
    photo:string,
    birthDate:Date | null,
    deathDate:Date | null,
    createDate:Date | null,
    updateDate:Date | null,
}

export interface AppContextInterface {
    //List of Searched Representative Boundaries
    repBoundaries: Array<RepBoundary>,
    setRepBoundaries: (c: Array<RepBoundary>) => void,
    //Users Address
    userAddr: google.maps.LatLngLiteral,
    setUserAddr: (c: google.maps.LatLngLiteral) => void,
    alert: AlertType,
    setAlert: (a:AlertType) => void,
    selectedRB:Nullable<RepBoundary>,
    setSelectedRB:(rb:RepBoundary) => void,
    selectedER:Nullable<ElectionRiding>,
    setSelectedER:(er:Nullable<ElectionRiding>) => void
}

export const AppContext = React.createContext<AppContextInterface>({
        repBoundaries: [], // set a default value
        setRepBoundaries: () => {},
        userAddr: {lat:43.74002711761832, lng:-79.23987572757004},
        setUserAddr: () => {},
        alert: {msg:"",open:false},
        setAlert: ()=>{},
        selectedRB:null,
        setSelectedRB:()=>{},
        selectedER:null,
        setSelectedER:()=>{}
    });

export const useAppContext = () => useContext(AppContext);
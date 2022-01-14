import React, { useContext } from "react";

export interface Rep {
    id:number,
    firstName:string,
    lastName:string,
    party:string,
    gender:string,
    email:string,
    call:number,
    constituencyOffice:string,
    photo:string,
    birthDate:Date | null,
    deathDate:Date | null,
    title:string
}
 
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
    rep:Rep,
    boundary:Boundary,
    platforms?:Array<Platform>,
    reportCards?:Array<ReportCard>,
    endorsements?:Array<Endorsement>,
    biography?:Biography
}

export interface RepBiography {
    id:number,
    name:string,
    bio:string
}

export interface RepPlatform {
    id:number,
    name:string,
    platformName:string,
    description:string,
    status:string,
    category:string
}

export interface RepReportCard {
    id:number,
    name:string,
    reportCardName:string,
    grade:string,
    description:string,
    category:string
}

export interface RepEndorsement {
    id:number,
    name:string,
    description:string,
    category:string
}

export interface GovBody {
    id:number,
    currentName:string,
    startDate:Date | null,
    endDate:Date | null,
    updateDate:Date | null,
    type:string,
    boundaryId:number,
    address?:string
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
    status:string,
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

export interface Organization {
    id:number,
    orgId:number,
    name:string,
    subtitle:string,
    content:string,
    status:string
}

export interface AppContextInterface {
    //List of Searched Representative Boundaries
    repBoundaries: Array<RepBoundary>,
    setRepBoundaries: (c: Array<RepBoundary>) => void,
    //Users Address
    userAddr: google.maps.LatLngLiteral,
    setUserAddr: (c: google.maps.LatLngLiteral) => void,
    //Selected Representative Boundary
    selectedListKey: Number | null,
    setSelectedListKey: (n: Number | null) => void,
    hoveredListKey: Number | null,
    setHoveredListKey: (n: Number | null) => void,
}

export const AppContext = React.createContext<AppContextInterface>({
    repBoundaries: [], // set a default value
    setRepBoundaries: () => {},
    userAddr: {lat:43.74002711761832, lng:-79.23987572757004},
    setUserAddr: () => {},
    selectedListKey: null,
    setSelectedListKey: () => {},
    hoveredListKey:null,
    setHoveredListKey:()=>{}
    });

export const useAppContext = () => useContext(AppContext);
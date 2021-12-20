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
    deathDate:Date | null
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
    outline?:Geopoint[]
}

export interface Geopoint {
    x: number,
    y: number,
    z: number
}
  
export interface RepBoundary{
    rep:Rep,
    boundary:Boundary
}

export interface AppContextInterface {
    repBoundaries: Array<RepBoundary>,
    setRepBoundaries: (c: Array<RepBoundary>) => void
}

export const AppContext = React.createContext<AppContextInterface>({
    repBoundaries: [], // set a default value
    setRepBoundaries: () => {},
    });

export const useAppContext = () => useContext(AppContext);
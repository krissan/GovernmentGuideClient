export enum repTabEnum {
    Platform,
    ReportCard,
    History,
    Endorsement
  }
  
export enum eleTabEnum {
    Info,
    Platform,
    ReportCard,
    History,
    Endorsement
}

export interface repTabType {
    type:string,
    name:string,
    id:repTabEnum
}

export interface eleTabType {
    type:string,
    name:string,
    id:eleTabEnum
}

export const repTabs:Array<repTabType> = [
    {type:"platforms", name:"Platform", id: repTabEnum.Platform},
    {type:"reportCards", name:"Report Card", id: repTabEnum.ReportCard},
    {type:"history", name:"History", id: repTabEnum.History},
    {type:"endorsements", name:"Endorsements", id: repTabEnum.Endorsement}
]
  

export const eleTabs:Array<eleTabType> = [
    {type:"info", name:"Info", id: eleTabEnum.Info},
    {type:"platforms", name:"Platform", id: eleTabEnum.Platform},
    {type:"reportCards", name:"Report Card", id: eleTabEnum.ReportCard},
    {type:"history", name:"History", id: eleTabEnum.History},
    {type:"endorsements", name:"Endorsements", id: eleTabEnum.Endorsement}
]
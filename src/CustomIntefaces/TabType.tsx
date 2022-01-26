export enum repTabEnum {
    Platform,
    ReportCard,
    Biography,
    Endorsement
  }
  
export interface repTabType {
    type:string,
    name:string,
    id:repTabEnum
}

export const repTabs:Array<repTabType> = [
    {type:"platforms", name:"Platform", id: repTabEnum.Platform},
    {type:"reportCards", name:"Report Card", id: repTabEnum.ReportCard},
    {type:"biography", name:"Biography", id: repTabEnum.Biography},
    {type:"endorsements", name:"Endorsements", id: repTabEnum.Endorsement}
]
  
import { Representative } from "../AppContext";
import { OrgType, platformStatus } from "./Enumerators";

export interface BoundaryGovBodyName {
    boundaryName:string,
    govBodyName:string
}

export interface Party {
    id:number,
    parentId:number,
    govBodyId:number,
    name:string,
    shortName:string,
    description:string,
    partyColor:string,
    partyImage:string,
    createDate:Date | null,
    updateDate:Date | null,
}

export interface PartyData {
    id:number|null,
    parentId:number|null,
    name:string|null,
    shortName:string|null,
    description:string|null,
    partyColor:string|null,
    partyImage:string|null
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
    status:platformStatus,
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
    address?:string
}

export interface Bill {
    id:number,
    govBodyId:number,
    billNum:number,
    name:string,
    description:string,
    status:string,
    createDate:Date | null,
    updateDate:Date | null,
    date:Date | null
}

export interface BillVote {
    id:number,
    billId:number,
    repId:number,
    status:string,
    createDate:Date | null,
    updateDate:Date | null,
    date:Date | null,
}

export interface Organization {
    id:number,
    name:string,
    description:string,
    orgIcon:string,
    accomplishments:string,
    transparency:string,
    orgType:OrgType,
    createDate:Date | null,
    updateDate:Date | null
}

export interface OrganizationData {
    id:number,
    name:string,
    description:string,
    orgIcon:string,
    accomplishments:string,
    transparency:string,
    orgType:OrgType
}

export interface RepBillVote {
    repId:number,
    repName:string,
    status:string,
    date:Date | null
}

export interface BillData {
    id:number,
    billNum:string,
    name:string,
    description:string,
    billStatusType:string,
    date:Date | null,
}

export interface Election {
    id:number,
    govBodyId:number,
    createDate:Date | null,
    updateDate:Date | null,
    startDate:Date | null,
    endDate:Date | null,
    shapeStartDate:Date | null,
    shapeEndDate:Date | null
}

export interface ElectionData {
    id:number,
    startDate:Date | null,
    endDate:Date | null,
    shapeStartDate:Date | null,
    shapeEndDate:Date | null
}

export interface ElectionRidingData {
    id:number,
    boundaryId:number,
    boundaryName:string,
    totalVotes:number,
    votingPopulation: number,
    status:string,
}

export interface ElectionCandidate {
    id: number,
    electionRidingId: number,
    repId: number,
    partyId: number,
    createDate: Date | null,
    updateDate: Date |null,
    votes: number
}

export interface ElectionCandidateData {
    id: number,
    repId: number,
    repName: string,
    partyId: number,
    votes:number
}

export interface ElectionCandidateRep {
    eleCan: ElectionCandidate,
    rep: Representative,
}


export interface RepresentativeData {
    repId:number,
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
}

export interface ElectionRidingVoteData {
    electionDate:Date,
    ec:Array<ElectionCandidateData>
  }
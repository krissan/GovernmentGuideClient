import axios from 'axios';
import { ExportToCsv } from 'export-to-csv';

import { Election, ElectionCandidateData, ElectionCandidateRepParty, ElectionData, ElectionRidingData, RepresentativeData } from '../customIntefaces/APITypes';
import { BoundaryCustomImport, Message,  } from '../customIntefaces/AppTypes';
import {  messageType } from '../customIntefaces/Enumerators';

//Grab List of Government Bodies by search query
export async function searchElection(govBodyId:number) { 
  var elections:Array<Election> = [];
  try {
    console.log('http://localhost:8080/api/v1/election/govbody?govBodyId='+govBodyId);

    //Grab GovBodies based on search term
    let responseData:any = await axios.get('http://localhost:8080/api/v1/election/govbody?govBodyId='+govBodyId)
      .then(response => {
        return response
      }).catch(error => console.log(error));

      console.log(responseData);
    //Find Government Bodies Province and add at it object
    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      let data:Array<Election> = responseData?.data;

      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        elections.push(data[i]);
      }
    }
  }
  catch(e)
  {
    console.log(e);
  }

  //return Government Bodies
  return elections;
}

//Grab List of Government Bodies by search query
export async function searchElectionRiding(searchTerm:string, electionId:number) { 
  var elections:Array<ElectionRidingData> = [];
  try {
    console.log(electionId);
    console.log(searchTerm);
    //Grab GovBodies based on search term
    let responseData:any = await axios.get('http://localhost:8080/api/v1/electionriding/govbody?electionId='+electionId+'&searchTerm='+searchTerm.toLocaleLowerCase())
      .then(response => {
        return response
      }).catch(error => console.log(error));

      console.log(responseData);

    //Find Government Bodies Province and add at it object
    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      let data:Array<ElectionRidingData> = responseData?.data;

      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        elections.push(data[i]);
      }
    }
  }
  catch(e)
  {
    console.log(e);
  }

  //return Government Bodies
  return elections;
}

//get Elections of Government Body
export async function getElectionData(govBodyId:number):Promise<Message> { 
  let message:Message = {type:messageType.success, msg: "" };

  var govBodyElections:Array<ElectionData> = [];

  try {
    let responseData:any = await axios.get('http://localhost:8080/api/v1/election/govbody/data?govBodyId='+govBodyId)
      .then(response => {
        return response
      }).catch(error => console.log(error));

    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      govBodyElections = responseData?.data;
    }


    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(options);
    if(govBodyElections && govBodyElections.length > 0)
    {
      csvExporter.generateCsv(govBodyElections);
    }
    else
    {
      message = {type:messageType.warning, msg: "No elections found for government body"}
    }
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "No elections found for government body"}
  }

  return message;
}

//process Elections
export async function uploadElections(elections:Array<ElectionData>, govBodyId:number):Promise<Message> { 
  let message:Message= {type:messageType.success, msg: "" };
  
  try{
    const requestParam = {govBodyId: govBodyId, elections:elections.filter((x)=>{return !(x.startDate == null)})};

    console.log(requestParam);

    await axios.request({
        method: 'post',
        url: 'http://localhost:8080/api/v1/election/govbody/data',
        data: requestParam,
        headers: {
          'Content-Type':'application/json'
        },
    });
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "Error Uploading Elections"}
  }

  return message;
}

//get Election Riding of Government Body
export async function getElectionRidingData(electionId:number):Promise<Message> { 
  let message:Message = {type:messageType.success, msg: "" };

  var govBodyElectionRidings:Array<ElectionRidingData> = [];

  try {
    let responseData:any = await axios.get('http://localhost:8080/api/v1/electionriding/govbody/data?eleId='+electionId)
      .then(response => {
        return response
      }).catch(error => console.log(error));

    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      govBodyElectionRidings = responseData?.data;
    }


    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(options);
    if(govBodyElectionRidings && govBodyElectionRidings.length > 0)
    {
      csvExporter.generateCsv(govBodyElectionRidings);
    }
    else
    {
      message = {type:messageType.warning, msg: "No election ridings found for election"}
    }
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "No election ridings found for election"}
  }

  return message;
}

//process Elections Riding
export async function uploadElectionRiding(electionRidings:Array<ElectionRidingData>, electionId:number):Promise<Message> { 
  let message:Message= {type:messageType.success, msg: "" };
  
  try{
    const requestParam = {electionId: electionId, electionRidings:electionRidings.filter((x)=>{return !(x.boundaryId == null)})};

    console.log(requestParam);

    await axios.request({
        method: 'post',
        url: 'http://localhost:8080/api/v1/electionriding/govbody/data',
        data: requestParam,
        headers: {
          'Content-Type':'application/json'
        },
    });
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "Error Uploading Election Ridings"}
  }

  return message;
}

//get Election Candidates of Government Body
export async function getElectionCandidateData(eleRidingId:number):Promise<Message> { 
  let message:Message = {type:messageType.success, msg: "" };

  var govBodyElectionCandidates:Array<ElectionCandidateData> = [];

  try {
    let responseData:any = await axios.get('http://localhost:8080/api/v1/electioncandidate/govbody/data?eleRidingId='+eleRidingId)
      .then(response => {
        return response
      }).catch(error => console.log(error));

    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      govBodyElectionCandidates = responseData?.data;
    }


    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(options);
    if(govBodyElectionCandidates && govBodyElectionCandidates.length > 0)
    {
      csvExporter.generateCsv(govBodyElectionCandidates);
    }
    else
    {
      message = {type:messageType.warning, msg: "No election candidates found for election riding"}
    }
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "No election candidates found for election riding"}
  }

  return message;
}

//process Elections Candidates
export async function uploadElectionCandidates(electionCandidates:Array<ElectionCandidateData>, electionRidingId:number):Promise<Message> { 
  let message:Message= {type:messageType.success, msg: "" };
  
  try{
    const requestParam = {electionRidingId: electionRidingId, electionCandidates:electionCandidates.filter((x)=>{return !(x.repId == null)})};

    console.log(requestParam);

    await axios.request({
        method: 'post',
        url: 'http://localhost:8080/api/v1/electioncandidate/govbody/data',
        data: requestParam,
        headers: {
          'Content-Type':'application/json'
        },
    });
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "Error Uploading Election Candidates"}
  }

  return message;
}

//get Election Representatives of Government Body
export async function getElectionRepresentativesData(electionRidingId:number):Promise<Message> { 
  let message:Message = {type:messageType.success, msg: "" };

  var electionReps:Array<RepresentativeData> = [];

  try {
    let responseData:any = await axios.get('http://localhost:8080/api/v1/representative/electionriding?electionRidingId='+electionRidingId)
      .then(response => {
        return response
      }).catch(error => console.log(error));

    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      electionReps = responseData?.data;
    }


    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(options);
    if(electionReps && electionReps.length > 0)
    {
      csvExporter.generateCsv(electionReps);
    }
    else
    {
      message = {type:messageType.warning, msg: "No representatives found for election riding"}
    }
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "No representatives found for election riding"}
  }

  return message;
}

//get Election Candidates by Election Riding
export async function getECsByER(electionRidingId:number):Promise<Map<number,ElectionCandidateRepParty>> { 
  let message:Message = {type:messageType.success, msg: "" };

  var electionCandidates:Array<ElectionCandidateRepParty> = [];
  var map = new Map<number, ElectionCandidateRepParty>();

  try {
    let responseData:any = await axios.get('http://localhost:8080/api/v1/electionriding/electioncandidate/rep?boundaryId='+electionRidingId)
      .then(response => {
        return response
      }).catch(error => console.log(error));

    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      electionCandidates = responseData?.data;
      console.log(electionCandidates);
    }

    if(!electionCandidates || electionCandidates.length == 0)
    {
      message = {type:messageType.warning, msg: "No candidates found for election riding"}
      alert(message);
    }
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "No candidates found for election riding"}
    alert(message);
  }

  electionCandidates.forEach(x=>{
    map.set(x.rep.id, x);
  })

  return map;
}

//get Election Candidates by Election Riding
export async function uploadCustomElectionData(boundaries:Array<BoundaryCustomImport>, govBodyId:number, electionId:number, startDate:Date, endDate:Date|null):Promise<Message> { 
  let message:Message= {type:messageType.success, msg: "" };
  let requestParam;

  let startDateStr = startDate.toISOString().split('T')[0];
  let endDateStr = endDate ? endDate.toISOString().split('T')[0] : null;

  try{
    boundaries.forEach(async(boundary:BoundaryCustomImport)=>{
      requestParam = {govBodyId: govBodyId, electionId: electionId, boundary:boundary, startDate:startDateStr, endDate:endDateStr};

      console.log(JSON.stringify(requestParam));
  
      await axios.request({
          method: 'post',
          url: 'http://localhost:8080/api/v1/electionriding/populate',
          data: JSON.stringify(requestParam),
          headers: {
            'Content-Type':'application/json'
          },
      });
    })
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "Error Uploading Elections"}
  }

  return message;
}
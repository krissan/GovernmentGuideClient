import axios from 'axios';
import { Biography, Boundary, Endorsement, Platform, Representative, RepBoundary, ReportCard, RepCardsOrgs, EndosOrgs, PlatsOrgs } from '../AppContext';
import { ExportToCsv } from 'export-to-csv';

import { Message, Nullable } from '../customIntefaces/AppTypes';
import { infoEnum, messageType } from '../customIntefaces/Enumerators';
import { GovBody, Organization, PartyData, RepBiography, RepEndorsement, RepPlatform, RepReportCard, RepresentativeData } from '../customIntefaces/APITypes';
import { populateOrg } from '../functions/stdAppFunctions';

const convertTitle = (s:string) => {
  return s.replaceAll("_", " ")/*charAt(0).toUpperCase() + s.slice(1).toLowerCase()*/;
}

//Grab List of Representatives by geopoint
export async function searchRepresentatives(location:google.maps.LatLngLiteral) { 
  var repBoundaries:Array<RepBoundary> = [];
  var map = new Map<number, RepBoundary>();
  try {
    console.log('http://localhost:8080/api/v1/representative/address?lat='+location.lat+'&lng='+location.lng);

    //Get Representatives and Boundaries by latitude longitude
    let responseData:any = await axios.get('http://localhost:8080/api/v1/representative/address?lat='+location.lat+'&lng='+location.lng)
      .then(response => {
        console.log(response);
        return response
      }).catch(error => console.log(error));

    //Format Representative and Boundaries add photo and default boundaryToggle
    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      let data = responseData?.data;
      for (let i = 0; i < data.length; i++) {
        const rep:Representative = data[i].representative;
        rep.title = convertTitle(rep.title);

        const boundary:Boundary = data[i].boundary;
        boundary.repTitle = convertTitle(boundary.repTitle);

        //check and set party if it exists
        let partyData:any = await axios.get('http://localhost:8080/api/v1/party/rep?repId='+rep.id)
        .then(response => {
          return response.data
        }).catch(error => console.log(error));

        if(partyData?.name)
        {
          rep.party = partyData.shortName;
          rep.partyColor = partyData.partyColor;
          rep.partyImage = partyData.partyImage;
        }

        rep.photo = rep.photo.replace("https://contrib.wp.intra.prod-","https://www.");
        let repBoundary:RepBoundary={rep:rep, boundary:boundary, eleRiding: data[i].repEleRiding, outline: data[i].outline, shapes:data[i].shapes};
        repBoundaries.push(repBoundary);

        repBoundaries = repBoundaries.sort((a, b) => {
          if(a.shapes && b.shapes){
            const pointA1 = {lat: a.shapes[0].elat1, lng: a.shapes[0].elng1};
            const pointA2 = {lat: a.shapes[0].elat2, lng: a.shapes[0].elng2};
            const pointB1 = {lat: b.shapes[0].elat1, lng: b.shapes[0].elng1};
            const pointB2 = {lat: b.shapes[0].elat2, lng: b.shapes[0].elng2};
            const areaA = Math.abs(pointA1.lat-pointA2.lat)*(pointA1.lng-pointA2.lng)
            const areaB = Math.abs(pointB1.lat-pointB2.lat)*(pointB1.lng-pointB2.lng)
      
            if(areaA < areaB) {
              return -1;
            }
      
            if(areaA > areaB) {
              return 1;
            }
          }
      
          return 0;
        });

        repBoundaries.forEach(x=>{
          map.set(x.rep.id, x);
        })
      }
    }
    
  }
  catch(e)
  {
    console.log(e);
  }

  

  //Sort Representatives by size of boundary and return
  return map;
}

//Grab List of Government Bodies by search query
export async function searchGovBody(searchTerm:string) { 
  var govBodies:Array<GovBody> = [];
  try {
    //Grab GovBodies based on search term
    let responseData:any = await axios.get('http://localhost:8080/api/v1/govBody/search?searchTerm='+searchTerm.toLocaleLowerCase())
      .then(response => {
        return response
      }).catch(error => console.log(error));

    //Find Government Bodies Province and add at it object
    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      let data:Array<GovBody> = responseData?.data;

      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
          let address:string = await axios.get('http://localhost:8080/api/v1/boundary/address?govBodyId='+data[i].id)
          .then(response => {
            return response.data
           }).catch(error => console.log(error));

          data[i].address = address;
          govBodies.push(data[i]);
      }
    }
  }
  catch(e)
  {
    console.log(e);
  }

  //return Government Bodies
  return govBodies;
}


//Get Biography Data of representatives of Government Body
export async function getBiographyData(govBodyId:number, type:infoEnum):Promise<Message> { 
  let message:Message = {type:messageType.success, msg: "" };

  var repBios:Array<RepBiography> = [];

  try {
    let responseData:any = await axios.get('http://localhost:8080//api/v1/biography/govBody/'+type+'?govBodyId='+govBodyId)
      .then(response => {
        return response
      }).catch(error => console.log(error));

    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      repBios = responseData?.data;
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
    if(repBios && repBios.length > 0)
    {
      csvExporter.generateCsv(repBios);
    }
    else
    {
      message = {type:messageType.warning, msg: "No Biographies found for Government Body"}
    }
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "Error Grabbing Biographies For Government Body"}
  }

  return message;
}

//Process Biographies
export async function uploadBiographies(repBios:Array<RepBiography>, govBodyId:number, type:infoEnum):Promise<Message> { 
  let message:Message = {type:messageType.success, msg: "" };

  try{
    const requestParam = {govBodyId: govBodyId, bios:repBios.filter((x)=>{if(x.id == null){return false} return true})};

    console.log(requestParam);

    await axios.request({
        method: 'post',
        url: 'http://localhost:8080/api/v1/biography/govBody/'+type,
        data: requestParam,
        headers: {
          'Content-Type':'application/json'
        },
    });
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "Error Uploading Biographies"}
  }

  return message;
}

//Get platform data of representatives of Government Body
export async function getPlatformData(govBodyId:number, type:infoEnum):Promise<Message> { 
  let message:Message = {type:messageType.success, msg: "" };


  try {
    var repPlats:Array<RepPlatform> = [];

    let responseData:any = await axios.get('http://localhost:8080/api/v1/platform/govbody/'+type+'?govBodyId='+govBodyId)
      .then(response => {
        return response
      }).catch(error => console.log(error));

    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      repPlats = responseData?.data;
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

    if(repPlats && repPlats.length > 0)
    {
      csvExporter.generateCsv(repPlats);
    }
    else
    {
      message = {type:messageType.warning, msg: "No Platforms found for Government Body"}
    }
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "Error Grabbing Platforms For Government Body"}
  }

  return message;
}

//process platforms
export async function uploadPlatforms(repPlats:Array<RepPlatform>, govBodyId:number, type:infoEnum, orgId:number):Promise<Message> { 
  let message:Message = {type:messageType.success, msg: "" };

  try{
    const requestParam = {govBodyId: govBodyId, orgId:orgId, platforms:repPlats.filter((x)=>{if(x.id.toString() === '' || x.id == null){return false} return true})};
    console.log(requestParam);
    await axios.request({
        method: 'post',
        url: 'http://localhost:8080/api/v1/platform/govbody/'+type,
        data: requestParam,
        headers: {
          'Content-Type':'application/json'
        },
    });
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "Error Uploading Platforms"}
  }

  return message;
}

//get report card Data of representatives of Government Body
export async function getReportCardData(govBodyId:number, type:infoEnum):Promise<Message> { 
  let message:Message = {type:messageType.success, msg: "" };

  try {
    var repReportCards:Array<RepReportCard> = [];

    let responseData:any = await axios.get('http://localhost:8080/api/v1/reportcard/govbody/'+type+'?govBodyId='+govBodyId)
      .then(response => {
        return response
      }).catch(error => console.log(error));

    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      repReportCards = responseData?.data;
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
    if(repReportCards && repReportCards.length > 0)
    {
      csvExporter.generateCsv(repReportCards);
    }
    else
    {
      message = {type:messageType.warning, msg: "No Report Cards found for Government Body"}
    }
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "Error Grabbing Report Cards For Government Body"}
  }

  return message;
}

//process report cards
export async function uploadReportCards(repReportCards:Array<RepReportCard>, govBodyId:number, type:infoEnum, orgId:number):Promise<Message> { 
  let message:Message = {type:messageType.success, msg: "" };

  try{
    const requestParam = {govBodyId: govBodyId, orgId: orgId, reportCards:repReportCards.filter((x)=>{if(x.id.toString() === '' || x.id == null){return false} return true})};
console.log(requestParam);
    await axios.request({
        method: 'post',
        url: 'http://localhost:8080/api/v1/reportcard/govbody/'+type,
        data: requestParam,
        headers: {
          'Content-Type':'application/json'
        },
    });
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "Error Uploading Report Cards"}
  }

  return message;
}

//get endorsement Data of representatives of Government Body
export async function getEndorsementData(govBodyId:number, type:infoEnum):Promise<Message> { 
  let message:Message = {type:messageType.success, msg: "" };

  var repReportCards:Array<RepEndorsement> = [];

  try {
    let responseData:any = await axios.get('http://localhost:8080/api/v1/endorsement/govbody/'+type+'?govBodyId='+govBodyId)
      .then(response => {
        return response
      }).catch(error => console.log(error));

    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      repReportCards = responseData?.data;
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
    if(repReportCards && repReportCards.length > 0)
    {
      csvExporter.generateCsv(repReportCards);
    }
    else
    {
      message = {type:messageType.warning, msg: "No Endorsements found for Government Body"}
    }
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "Error Grabbing Endorsements For Government Body"}
  }

  return message;
}

//process endorsements
export async function uploadEndorsements(repEndorsements:Array<RepEndorsement>, govBodyId:number, type:infoEnum, orgId:number):Promise<Message> { 
  let message:Message= {type:messageType.success, msg: "" };
  
  try{
    const requestParam = {govBodyId: govBodyId, orgId:orgId, endorsements:repEndorsements.filter((x)=>{if(x.id.toString() === '' || x.id == null){return false} return true})};

    console.log(requestParam);

    await axios.request({
        method: 'post',
        url: 'http://localhost:8080/api/v1/endorsement/govbody/'+type,
        data: requestParam,
        headers: {
          'Content-Type':'application/json'
        },
    });
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "Error Uploading Endorsements"}
  }

  return message;
}

//Get Biography Data of representative
export async function getRepBiography(repId:number):Promise<Nullable<Biography>> { 
  var bio:Nullable<Biography> = null;

  try {
    let responseData:any = await axios.get('http://localhost:8080/api/v1/biography?repId='+repId)
      .then(response => {
        return response
      }).catch(error => console.log(error));

    if(responseData?.data !== null)
    {
      bio = responseData?.data;
    }
  }
  catch(e)
  {
    alert({type:messageType.error, msg: "Error Grabbing Biography For Representative"});
  }

  return bio;
}

//Get Platform Data of representative
export async function getRepPlatforms(repId:number, orgMap:Map<number,Organization>, setOrgMap:(x:Map<number,Organization>)=>void):Promise<Array<Platform>> { 
  var plats:Array<Platform> = [];

  try {
    let responseData:any = await axios.get('http://localhost:8080/api/v1/platform?repId='+repId)
      .then(response => {
        return response
      }).catch(error => console.log(error));

    if(responseData?.data !== null && responseData?.data.repDatas.length > 0)
    {
      let platOrgs:PlatsOrgs = responseData?.data;
      plats = platOrgs.repDatas;
      populateOrg(platOrgs.orgs, orgMap, setOrgMap);
    }
  }
  catch(e)
  {
    alert({type:messageType.error, msg: "Error Grabbing Platforms for Representative"});
  }

  return plats;
}

//Get Report Card Data of representative
export async function getRepReportCards(repId:number, orgMap:Map<number,Organization>, setOrgMap:(x:Map<number,Organization>)=>void):Promise<Array<ReportCard>> { 
  var repCards:Array<ReportCard> = [];

  try {
    let responseData:any = await axios.get('http://localhost:8080/api/v1/reportcard?repId='+repId)
      .then(response => {
        return response
      }).catch(error => console.log(error));

    if(responseData?.data !== null && responseData?.data.repDatas.length > 0)
    {
      let repCardOrgs:RepCardsOrgs = responseData?.data;
      repCards = repCardOrgs.repDatas;
      populateOrg(repCardOrgs.orgs, orgMap, setOrgMap);
    }
  }
  catch(e)
  {
    alert({type:messageType.error, msg: "Error Grabbing Report Card for Representative"});
  }

  return repCards;
}

//Get Biography Data of representative
export async function getRepEndorsements(repId:number, orgMap:Map<number,Organization>, setOrgMap:(x:Map<number,Organization>)=>void):Promise<Array<Endorsement>> { 
  var endos:Array<Endorsement> = [];

  try {
    let responseData:any = await axios.get('http://localhost:8080/api/v1/endorsement?repId='+repId)
      .then(response => {
        return response
      }).catch(error => console.log(error));

    if(responseData?.data !== null && responseData?.data.repDatas.length > 0)
    {
      let endoOrgs:EndosOrgs = responseData?.data;
      endos = endoOrgs.repDatas;
      populateOrg(endoOrgs.orgs, orgMap, setOrgMap);
    }
  }
  catch(e)
  {
    alert({type:messageType.error, msg: "Error Grabbing Endorsements for Representative"});
  }

  return endos;
}

//Get Party Data of representatives of Government Body
export async function getPartyData(govBodyId:number):Promise<Message> { 
  let message:Message = {type:messageType.success, msg: "" };

  var parties:Array<PartyData> = [];

  try {
    let responseData:any = await axios.get('http://localhost:8080/api/v1/party/govbody?govBodyId='+govBodyId)
      .then(response => {
        return response
      }).catch(error => console.log(error));

    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      parties = responseData?.data;
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
    if(parties && parties.length > 0)
    {
      csvExporter.generateCsv(parties);
    }
    else
    {
      message = {type:messageType.warning, msg: "No Parties found for Government Body"}
    }
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "Error Grabbing Parties For Government Body"}
  }

  return message;
}

//Get Party Data of representatives of Government Body
export async function getPartyDataBase(govBodyId:number):Promise<Array<PartyData>> { 
  var parties:Array<PartyData> = [];

  try {
    let responseData:any = await axios.get('http://localhost:8080/api/v1/party/govbody?govBodyId='+govBodyId)
      .then(response => {
        return response
      }).catch(error => console.log(error));

    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      parties = responseData?.data;
    }

  }
  catch(e)
  {
    return [];
  }

  return parties;
}

//process parties
export async function uploadParties(parties:Array<PartyData>, govBodyId:number):Promise<Message> { 
  let message:Message= {type:messageType.success, msg: "" };

  try{
    const requestParam = {govBodyId: govBodyId, parties:parties.filter((x)=>{if(x.name == null){return false} return true})};
    console.log(requestParam);

    await axios.request({
        method: 'post',
        url: 'http://localhost:8080/api/v1/party/govbody',
        data: requestParam,
        headers: {
          'Content-Type':'application/json'
        },
    });
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "Error Uploading Party"}
  }

  return message;
}


//Get Representative Data of representatives of Government Body
export async function getRepresentativeData(govBodyId:number):Promise<Message> { 
  let message:Message = {type:messageType.success, msg: "" };

  var reps:Array<RepresentativeData> = [];

  try {
    let responseData:any = await axios.get('http://localhost:8080/api/v1/representative/govbody?govBodyId='+govBodyId)
      .then(response => {
        return response
      }).catch(error => console.log(error));

    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      reps = responseData?.data;
    }

    console.log(reps)

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
    if(reps && reps.length > 0)
    {
      csvExporter.generateCsv(reps);
    }
    else
    {
      message = {type:messageType.warning, msg: "No Parties found for Government Body"}
    }
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "Error Grabbing Parties For Government Body"}
  }

  return message;
}

//process parties
export async function uploadRepresentatives(reps:Array<RepresentativeData>, govBodyId:number):Promise<Message> { 
  let message:Message= {type:messageType.success, msg: "" };

  try{
    const requestParam = {govBodyId: govBodyId, representatives:reps.filter((x)=>{return x.firstName != null;})};
    console.log(requestParam);

    await axios.request({
        method: 'post',
        url: 'http://localhost:8080/api/v1/representative/govbody',
        data: requestParam,
        headers: {
          'Content-Type':'application/json'
        },
    });
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "Error Uploading Representatives"}
  }

  return message;
}

import axios from 'axios';
import { Biography, Boundary, Endorsement, GovBody, Platform, Rep, RepBiography, RepBoundary, RepEndorsement, ReportCard, RepPlatform, RepReportCard } from '../AppContext';
import { ExportToCsv } from 'export-to-csv';
import { Message, Nullable } from '../CustomIntefaces/AppTypes';
import { infoEnum, messageType } from '../CustomIntefaces/Enumerators';

const convertTitle = (s:string) => {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

//Grab List of Representatives by geopoint
export async function searchRepresentatives(location:google.maps.LatLngLiteral) { 
  var repBoundaries:Array<RepBoundary> = [];

  try {
    console.log('http://localhost:8080/api/v1/representative/address?lat='+location.lat+'&lng='+location.lng);

    //Get Representatives and Boundaries by latitude longitude
    let responseData:any = await axios.get('http://localhost:8080/api/v1/representative/address?lat='+location.lat+'&lng='+location.lng)
      .then(response => {
        return response
      }).catch(error => console.log(error));

    //Format Representative and Boundaries add photo and default boundaryToggle
    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      let data = responseData?.data;
      for (let i = 0; i < data.length; i++) {
        const rep:Rep = data[i].representative;
        rep.title = convertTitle(rep.title);

        const boundary:Boundary = data[i].boundary;
        boundary.repTitle = convertTitle(boundary.repTitle);
        boundary.outline = data[i].outline;

        let repBoundary:RepBoundary={rep:rep, boundary:boundary};
        repBoundary.rep.photo = repBoundary.rep.photo.replace("https://contrib.wp.intra.prod-","https://www.");
        repBoundaries.push(repBoundary);
      }
    }
  }
  catch(e)
  {
    console.log(e);
  }

  //Sort Representatives by size of boundary and return
  return repBoundaries.sort((a, b) => {
    const pointA1 = {lat: a.boundary.elat1, lng: a.boundary.elng1};
    const pointA2 = {lat: a.boundary.elat2, lng: a.boundary.elng2};
    const pointB1 = {lat: b.boundary.elat1, lng: b.boundary.elng1};
    const pointB2 = {lat: b.boundary.elat2, lng: b.boundary.elng2};
    const areaA = Math.abs(pointA1.lat-pointA2.lat)*(pointA1.lng-pointA2.lng)
    const areaB = Math.abs(pointB1.lat-pointB2.lat)*(pointB1.lng-pointB2.lng)

    if(areaA < areaB) {
      return -1;
    }

    if(areaA > areaB) {
      return 1;
    }

    return 0;
  });
}

//Grab List of Government Bodies by search query
export async function searchGovBody(searchTerm:string) { 
  var govBodies:Array<GovBody> = [];
  try {
    //Grab GovBodies based on search term
    let responseData:any = await axios.get('http://localhost:8080/api/v1/govBody?searchTerm='+searchTerm.toLocaleLowerCase())
      .then(response => {
        return response
      }).catch(error => console.log(error));

    //Find Government Bodies Province and add at it object
    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      let data:Array<GovBody> = responseData?.data;

      for (let i = 0; i < data.length; i++) {
        if(data[i].boundaryId)
        {
          let address:string = await axios.get('http://localhost:8080/api/v1/boundary/address?boundaryId='+data[i].boundaryId)
          .then(response => {
            return response.data
          }).catch(error => console.log(error));

          data[i].address = address;
          govBodies.push(data[i]);
        }
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
export async function getBiographyData(govBodyId:Number, type:infoEnum):Promise<Message> { 
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

//process biographies
export async function uploadBiographies(repBios:Array<RepBiography>, govBodyId:Number, type:infoEnum):Promise<Message> { 
  let message:Message = {type:messageType.success, msg: "" };

  try{
    const requestParam = {govBodyId: govBodyId, bios:repBios.filter((x)=>{if(x.id == null){return false} return true})};

    console.log(requestParam);

    let x = await axios.request({
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
export async function getPlatformData(govBodyId:Number, type:infoEnum):Promise<Message> { 
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
export async function uploadPlatforms(repPlats:Array<RepPlatform>, govBodyId:Number, type:infoEnum):Promise<Message> { 
  let message:Message = {type:messageType.success, msg: "" };

  try{
    const requestParam = {govBodyId: govBodyId, orgId:null, platforms:repPlats.filter((x)=>{if(x.id == null){return false} return true})};
    console.log(requestParam);
    let x = await axios.request({
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
export async function getReportCardData(govBodyId:Number, type:infoEnum):Promise<Message> { 
  let message:Message = {type:messageType.success, msg: "" };

  try {
    var repReportCards:Array<RepPlatform> = [];

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
export async function uploadReportCards(repReportCards:Array<RepReportCard>, govBodyId:Number, type:infoEnum):Promise<Message> { 
  let message:Message = {type:messageType.success, msg: "" };

  try{
    const requestParam = {govBodyId: govBodyId, orgId: null, reportCards:repReportCards.filter((x)=>{if(x.id == null){return false} return true})};

    let x = await axios.request({
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

//get report card Data of representatives of Government Body
export async function getEndorsementData(govBodyId:Number, type:infoEnum):Promise<Message> { 
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

//process report cards
export async function uploadEndorsements(repEndorsements:Array<RepEndorsement>, govBodyId:Number, type:infoEnum):Promise<Message> { 
  let message:Message= {type:messageType.success, msg: "" };
  
  try{
    const requestParam = {govBodyId: govBodyId, orgId:null, endorsements:repEndorsements.filter((x)=>{if(x.id == null){return false} return true})};

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
export async function getRepBiography(repId:Number):Promise<Nullable<Biography>> { 
  var bio:Nullable<Biography> = null;

  try {
    let responseData:any = await axios.get('http://localhost:8080/api/v1/biography?repId='+repId)
      .then(response => {
        console.log(response);
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

//Get Biography Data of representative
export async function getRepPlatforms(repId:Number):Promise<Array<Platform>> { 
  var plats:Array<Platform> = [];

  try {
    let responseData:any = await axios.get('http://localhost:8080/api/v1/platform?repId='+repId)
      .then(response => {
        return response
      }).catch(error => console.log(error));

    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      plats = responseData?.data;
      console.log(plats);
    }
  }
  catch(e)
  {
    alert({type:messageType.error, msg: "Error Grabbing Platforms for Representative"});
  }

  return plats;
}

//Get Biography Data of representative
export async function getRepReportCards(repId:Number):Promise<Array<ReportCard>> { 
  var repCards:Array<ReportCard> = [];

  try {
    let responseData:any = await axios.get('http://localhost:8080/api/v1/reportcard?repId='+repId)
      .then(response => {
        console.log(response);
        return response
      }).catch(error => console.log(error));

    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      repCards = responseData?.data;
    }
  }
  catch(e)
  {
    alert({type:messageType.error, msg: "Error Grabbing Report Card for Representative"});
  }

  return repCards;
}

//Get Biography Data of representative
export async function getRepEndorsements(repId:Number):Promise<Array<Endorsement>> { 
  var endos:Array<Endorsement> = [];

  try {
    let responseData:any = await axios.get('http://localhost:8080/api/v1/endorsement?repId='+repId)
      .then(response => {
        console.log(response);
        return response
      }).catch(error => console.log(error));

    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      endos = responseData?.data;
    }
  }
  catch(e)
  {
    alert({type:messageType.error, msg: "Error Grabbing Endorsements for Representative"});
  }

  return endos;
}
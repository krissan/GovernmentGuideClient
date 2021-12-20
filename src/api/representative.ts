import axios from 'axios';
import { Boundary, Rep, RepBoundary } from '../AppContext';

const convertTitle = (oldTitle:string) => {
  switch(oldTitle){
    case "COUNCILLOR":
      return "Councillor"
    default:
      return ""
  }
}

export async function searchRepresentatives(query:string = "370 McCowan Rd M1J 1J3") { 
  const params = new URLSearchParams()
  var repBoundaries:Array<RepBoundary> = [];

  params.append('address', '370 McCowan Rd M1J 1J3')
  
  const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  let responseData:any = await axios
    .get('http://localhost:8080/api/v1/representative/address?address=370 McCowan Rd M1J 1J3', config)
    .then(response => {
      return response
    }).catch(error => console.error(error));

  if(responseData?.data !== null)
  {
    let data = responseData?.data;
    for (let i = 0; i < data.length; i++) {
      const rep:Rep = data[i].representative;

      const boundary:Boundary = data[i].boundary;
      boundary.repTitle = convertTitle(boundary.repTitle);
      boundary.outline = data[i].outline;

      let repBoundary:RepBoundary={rep:rep, boundary:boundary};
      repBoundary.rep.photo = repBoundary.rep.photo.replace("https://contrib.wp.intra.prod-","https://www.");
      repBoundaries.push(repBoundary);
    }
  }

  return repBoundaries;

  /*const rep1:Rep = {
    id: 136,
    firstName: "Michael",
    lastName: "Thompson",
    party: "",
    gender: "M",
    email: "councillor_thompson@toronto.ca",
    call: 14163979274,
    constituencyOffice: "Toronto City Hall\n100 Queen Street West, Suite B31\nToronto ON  M5H 2N2",
    photo: "https://contrib.wp.intra.prod-toronto.ca/wp-content/uploads/2017/09/9884-mthompson-e1543505251319.jpg",
    birthDate: null,
    deathDate: null
  };

  const boundary1:Boundary = {
    id: 131,
    boundaryName: "Scarborough Centre",
    startDate: null,
    endDate: null,
    updateDate: null,
    govBodyId: 8,
    centerLat: 43.7527402307212,
    centerLng: -79.27661410575871,
    province: "ON",
    repTitle: "COUNCILLOR",
    elng2: -79.228672825,
    elng1: -79.319794152,
    elat1: 43.724713132999995,
    elat2: 43.781222538
  }

  let repBoundary1:RepBoundary={rep:rep1, boundary:boundary1};

  const rep:Rep = {
    id: 136,
    firstName: "Michael",
    lastName: "Thompson",
    party: "",
    gender: "null",
    email: "councillor_thompson@toronto.ca",
    call: 14163979274,
    constituencyOffice: "Toronto City Hall\n100 Queen Street West, Suite B31\nToronto ON  M5H 2N2",
    photo: "https://contrib.wp.intra.prod-toronto.ca/wp-content/uploads/2017/09/9884-mthompson-e1543505251319.jpg",
    birthDate: null,
    deathDate: null
  };

  const boundary:Boundary = {
    id: 131,
    boundaryName: "Scarborough Centre",
    startDate: null,
    endDate: null,
    updateDate: null,
    govBodyId: 8,
    centerLat: 43.7527402307212,
    centerLng: -79.27661410575871,
    province: "ON",
    repTitle: convertTitle("COUNCILLOR"),
    elng2: -79.228672825,
    elng1: -79.319794152,
    elat1: 43.724713132999995,
    elat2: 43.781222538
  }

  let repBoundary:RepBoundary={rep:rep, boundary:boundary};

  var repBoundaries:RepBoundary[] = [repBoundary,repBoundary1];
console.log(repBoundaries);
  return repBoundaries;*/
}
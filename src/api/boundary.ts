import axios from 'axios';
import { Nullable } from '../customIntefaces/AppTypes';
import { BoundaryGovBodyName } from '../customIntefaces/APITypes';

//Grab boundary name and govbody name
export async function findBoundaryAndGovBodyName(boundaryId:number) { 
  var boundaryGovBodyName:Nullable<BoundaryGovBodyName> = null;

  try {
    console.log('http://localhost:8080/api/v1/boundary/govbody/name?id='+boundaryId);

    //Get boundary name and govbody name of boundary id
    let responseData:any = await axios.get('http://localhost:8080/api/v1/boundary/govbody/name?id='+boundaryId)
      .then(response => {
        console.log(response);
        return response
      }).catch(error => console.log(error));

    //Format Representative and Boundaries add photo and default boundaryToggle
    if(responseData?.data !== null)
    {
        console.log(responseData?.data);
        boundaryGovBodyName = responseData?.data;
    }
  }
  catch(e)
  {
    console.log(e);
  }

  return boundaryGovBodyName;
}

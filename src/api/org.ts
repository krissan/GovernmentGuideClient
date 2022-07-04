import axios from "axios";
import { ExportToCsv } from "export-to-csv";
import { Organization } from "../customIntefaces/APITypes";
import { Message } from "../customIntefaces/AppTypes";
import { messageType } from "../customIntefaces/Enumerators";

//Grab Orgs
export async function getOrgs():Promise<Message> { 
    let message:Message = {type:messageType.success, msg: "" };
    var orgs:Array<Organization> = [];

    try {
      let responseData:any = await axios.get('http://localhost:8080/api/v1/organization/all/')
        .then(response => {
          return response
        }).catch(error => console.log(error));
  
      if(responseData?.data !== null && responseData?.data.length > 0)
      {
        orgs = responseData?.data;
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
      if(orgs && orgs.length > 0)
      {
        csvExporter.generateCsv(orgs);
      }
      else
      {
        message = {type:messageType.warning, msg: "No Orgs found"}
      }
    }
    catch(e)
    {
      message = {type:messageType.error, msg: "Error Grabbing Orgs"}
    }
  
    return message;
  }
  
  
  //process orgs
  export async function uploadOrgs(orgs:Array<Organization>):Promise<Message> { 
    let message:Message= {type:messageType.success, msg: "" };
    
    try{
      const requestParam = {orgs:orgs.filter((x)=>{if(x.name == null){return false} return true})};
  
      console.log(requestParam);
  
      await axios.request({
          method: 'post',
          url: 'http://localhost:8080/api/v1/organization/all/',
          data: requestParam,
          headers: {
            'Content-Type':'application/json'
          },
      });
    }
    catch(e)
    {
      message = {type:messageType.error, msg: "Error Uploading orgs"}
    }
  
    return message;
  }
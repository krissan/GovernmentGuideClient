import axios from 'axios';
import { Bill, BillData, GovBody, RepBillVote, RepEndorsement } from '../AppContext';
import { ExportToCsv } from 'export-to-csv';
import { Message, Nullable } from '../customIntefaces/AppTypes';
import { infoEnum, messageType } from '../customIntefaces/Enumerators';

//Grab List of Government Bodies by search query
export async function searchBill(searchTerm:string) { 
  var bills:Array<Bill> = [];
  try {
    //Grab GovBodies based on search term
    let responseData:any = await axios.get('http://localhost:8080/api/v1/bill/search?searchTerm='+searchTerm.toLocaleLowerCase())
      .then(response => {
        return response
      }).catch(error => console.log(error));

    //Find Government Bodies Province and add at it object
    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      let data:Array<Bill> = responseData?.data;

      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        bills.push(data[i]);
      }
    }
  }
  catch(e)
  {
    console.log(e);
  }

  //return Government Bodies
  return bills;
}

//get Bills of Government Body
export async function getBillData(govBodyId:number):Promise<Message> { 
  let message:Message = {type:messageType.success, msg: "" };

  var govBodyBills:Array<BillData> = [];

  try {
    let responseData:any = await axios.get('http://localhost:8080/api/v1/bill/govbody?govBodyId='+govBodyId)
      .then(response => {
        return response
      }).catch(error => console.log(error));

    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      govBodyBills = responseData?.data;
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
    if(govBodyBills && govBodyBills.length > 0)
    {
      csvExporter.generateCsv(govBodyBills);
    }
    else
    {
      message = {type:messageType.warning, msg: "No bills found for Government Body"}
    }
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "No bills found for Government Body"}
  }

  return message;
}

//process Bills
export async function uploadBills(bills:Array<BillData>, govBodyId:number):Promise<Message> { 
  let message:Message= {type:messageType.success, msg: "" };
  
  try{
    const requestParam = {govBodyId: govBodyId, bills:bills.filter((x)=>{if(x.repId == null){return false} return true})};

    console.log(requestParam);

    await axios.request({
        method: 'post',
        url: 'http://localhost:8080/api/v1/bill/govbody',
        data: requestParam,
        headers: {
          'Content-Type':'application/json'
        },
    });
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "Error Uploading Bills"}
  }

  return message;
}

//get Bill Votes of Bill and Government Body
export async function getBillVoteData(govBodyId:number, billId:number):Promise<Message> { 
  let message:Message = {type:messageType.success, msg: "" };

  var billVotes:Array<RepBillVote> = [];

  try {
    let responseData:any = await axios.get('http://localhost:8080/api/v1/billVote/govbody?govBodyId='+govBodyId+'&billId='+billId)
      .then(response => {
        return response
      }).catch(error => console.log(error));

    if(responseData?.data !== null && responseData?.data.length > 0)
    {
      billVotes = responseData?.data;
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
    if(billVotes && billVotes.length > 0)
    {
      csvExporter.generateCsv(billVotes);
    }
    else
    {
      message = {type:messageType.warning, msg: "No Bill Votes found for Bill"}
    }
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "Error Grabbing Bill Votes for Bill"}
  }

  return message;
}

//process Bill Votes
export async function uploadBillVotes(billVotes:Array<RepBillVote>, govBodyId:number, billId:number):Promise<Message> { 
  let message:Message= {type:messageType.success, msg: "" };
  
  try{
    const requestParam = {govBodyId: govBodyId, billId: billId, votes:billVotes.filter((x)=>{if(x.id == null){return false} return true})};

    console.log(requestParam);

    await axios.request({
        method: 'post',
        url: 'http://localhost:8080/api/v1/billvote/bill/',
        data: requestParam,
        headers: {
          'Content-Type':'application/json'
        },
    });
  }
  catch(e)
  {
    message = {type:messageType.error, msg: "Error Uploading Bill Votes"}
  }

  return message;
}

//Get Representatives Bill Votes
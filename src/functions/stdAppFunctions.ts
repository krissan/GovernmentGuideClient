import { parse } from "papaparse";
import { Endorsement, Platform, ReportCard } from "../AppContext";

//Process CSV file
export const processCsv = async(files:Array<File>) => { 
  let results:Array<any> = [];
  let file:File = files.filter((file:File) => {return file.type === "application/vnd.ms-excel" || file.type === "text/csv"})[0];
    
  const text = await file.text();
  results = parse(text, { header: true }).data as unknown as Array<any>;

  results.forEach(res => {
    Object.keys(res).forEach((key) => {
      if(res[key] === "null")
      {
        res[key]=null;
      }
    })
  });
  console.log(results);

  if(results.length > 0)
  {
    return results;
  }
  else
  {
    return [];
  }
}

//Create And populate email on device
export function mailTo(email:string, subject?:string, body?:string){
  let params = subject || body ? '?' : '';
  if (subject) params += `subject=${encodeURIComponent(subject)}`;
  if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;
  
  window.location.href = `mailto:${email}${params}`;
}

export const structCategoryList = (list:Array<ReportCard|Endorsement|Platform>) =>  {
  var structList:Array<Array<ReportCard|Endorsement|Platform>> = [];
  //loop through report cards and if current item has title already in structEndoList add it to specific group
  if(list && list.length>0)
  {
    list?.forEach((item)=>{
        let exists:Boolean = false;
        //check if report cards title already exists in struct list and break out of loop if it does
        for(let i = 0; i < structList.length; i++)
        {
            console.log(structList[i]);
            if(structList[i][0] && item.category === structList[i][0]?.category){               
              structList[i].push(item);
              exists = true;
              break;
            }
        }

        if(exists === false)
        {
          structList.push([item]);
        }
    });

    return structList;
  }
}

//call number passed
export const call = (number:number) =>{
  navigator.clipboard.writeText(number.toString());
  alert("Copied "+number+" to clip board");
}
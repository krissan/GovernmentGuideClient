import { parse } from "papaparse";

//Process CSV file
export const processCsv = async(files:Array<File>) => { 
  let results:Array<any> = [];
  let file:File = files.filter((file:File) => { console.log(file.type === "application/vnd.ms-excel"); return file.type === "application/vnd.ms-excel" || file.type === "text/csv"})[0];
    
  const text = await file.text();
  results = parse(text, { header: true }).data as unknown as Array<any>;
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
export function MailTo(email:string, subject?:string, body?:string){
  let params = subject || body ? '?' : '';
  if (subject) params += `subject=${encodeURIComponent(subject)}`;
  if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;
  
  console.log(params);

  window.location.href = `mailto:${email}${params}`;
}

export const structCategoryList = () =>  {
  
}
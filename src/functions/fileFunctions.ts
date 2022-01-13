import { Filter } from "@material-ui/icons";
import { parse } from "papaparse";

export async function processCsv(files:Array<File>) { 
  let results:Array<any> = [];
  let file:File = files.filter((file:File) => { console.log(file.type === "application/vnd.ms-excel"); return file.type === "application/vnd.ms-excel" || file.type === "text/csv"})[0];
    
  const text = await file.text();
  results = parse(text, { header: true }).data as unknown as Array<any>;

  if(results.length > 0)
  {
    return results;
  }
  else
  {
    return [];
  }
}
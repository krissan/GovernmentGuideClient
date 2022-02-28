export const convertyyyyMMMddToyyyymmdd = (currDate:string) => { 
  var date:string[] = currDate.split("-");
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  for(var j=0;j<months.length;j++){
      if(date[1] === months[j]){
           date[1]=(months.indexOf(months[j])+1).toString();
       }                      
  } 
  if(date[1] as unknown as number <10){
      date[1] ='0'+date[1];
  }                        
  return date[0]+'-'+date[1]+'-'+date[2];
}

import { Box } from "@material-ui/core";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { ChangeEvent, ReactNode, useState } from "react";

import StandardInput from "../Input/StandardInput";
import StdInputIcon from "../Input/StdInputIcon";
import PageHeader from "../Text/PageHeader";
import StdButton from "../Buttons/StdButton";

import { useNavigate } from "react-router-dom";
import { reasonEnum, whoEnum } from "../../CustomIntefaces/Enumerators";
import StandardSelect from "../Input/StandardSelect";
import StandardInputBox from "../Input/StandardInputBox";
import { MailTo } from "../../functions/stdAppFunctions";


const ContactUsPage = () => {
  let navigate = useNavigate();
  const [who, setWho] = useState<string>(whoEnum[0]);
  const [reason, setReason] = useState<string>(reasonEnum[0]);
  const [body, setBody] = useState<string>("");

  const handleWho = (event: ChangeEvent<any>) => {
    if(event.target.name)
    {
      setWho(event.target.name);
    }
  };

  const handleReason = (event: ChangeEvent<any>) => {
    if(event.target.name)
    {
      setReason(event.target.name);
    }
  };

  return (
    <div style={{display:"flex"}}>
      <div style={{flex:1}}>
        {/*Title*/}
        <PageHeader additionalInfo="*Accurate Information Required for use in Autocompleting Petitions etc">
          Contact Us
        </PageHeader>
        {/*Form*/}
        <Box
          component="form"
          style={{display:"flex",flexDirection:"column"}}
        >
          <StandardInput label="Email" placeholder="email@emailaddress.com" autoFocus InputProps={{
            endAdornment: <StdInputIcon icon={faEnvelope} />
          }} />

          <StandardSelect label="Who Are You?" items={whoEnum} onChange={handleWho} />

          <StandardSelect label="Reason For Contact?" items={reasonEnum} onChange={handleReason} />

          <StandardInputBox
            inputLabel="Message"
            style={{width:"100%"}}
            onChange={(e:ChangeEvent<any>)=>{if(e.target?.value){setBody(e.target.value)}}}
            rows={10}
          />

          <StdButton style={{backgroundColor:"#59ACAF",marginBottom:0}} onClick={()=>{MailTo("email@email.com","who: " +who+" reason: "+reason, body)}}> Send Message</StdButton>
        </Box>
        {/*Submit Button*/}
      </div>
      <div style={{backgroundColor:"blue",flex:1}}>

      </div>
    </div>
  );
}

export default ContactUsPage;
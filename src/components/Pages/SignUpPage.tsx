import { Box } from "@material-ui/core";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faLock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"

import AuthButton from "../Buttons/AuthButton";
import StandardInput from "../Input/StandardInput";
import StdInputIcon from "../Input/StdInputIcon";
import PageHeader from "../Text/PageHeader";

import { useNavigate } from "react-router-dom";


const SignUpPage = () => {
  let navigate = useNavigate();

  return (
    <div style={{display:"flex"}}>
      <div style={{flex:1}}>
        {/*Title*/}
        <PageHeader additionalInfo="*Accurate Information Required for use in Autocompleting Petitions etc">
          SIGN UP
        </PageHeader>
        {/*Form*/}
        <Box
          component="form"
          style={{display:"flex",flexDirection:"column"}}
        >
          <StandardInput label="First Name" placeholder="John" autoFocus />
          <StandardInput label="Last Name" placeholder="Smith" />
          <StandardInput label="Email" placeholder="email@emailaddress.com" InputProps={{
            endAdornment: <StdInputIcon icon={faEnvelope} />
          }} />
          <StandardInput label="Password" placeholder="******"  type="password" InputProps={{
            endAdornment: <StdInputIcon icon={faLock} />
          }} />
          <StandardInput label="Confirm Password" placeholder="******" type="password" InputProps={{
            endAdornment: <StdInputIcon icon={faLock} />
          }} />
          <StandardInput label="Address" style={{paddingBottom:20}} placeholder="123 Sampled St Unit 5" InputProps={{
            endAdornment: <StdInputIcon icon={faMapMarkerAlt} />
          }} />
          <AuthButton style={{backgroundColor:"#59AF73"}}>Sign Up</AuthButton>
        </Box>
        {/*Submit Button*/}
        <AuthButton style={{backgroundColor:"#59ACAF",marginBottom:0}} onClick={()=>{navigate("/login")}}>Login</AuthButton>
      </div>
      <div style={{backgroundColor:"blue",flex:1}}>

      </div>
    </div>
  );
}

export default SignUpPage;
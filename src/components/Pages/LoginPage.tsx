import { Box } from "@material-ui/core";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faLock } from "@fortawesome/free-solid-svg-icons"

import AuthButton from "../Buttons/AuthButton";
import StandardInput from "../Input/StandardInput";
import StdInputIcon from "../Input/StdInputIcon";
import PageHeader from "../Text/PageHeader";

const LoginPage = () => {

  return (
    <div style={{display:"flex"}}>
      <div style={{flex:1}}>
        <PageHeader>
          LOGIN
        </PageHeader>
        <Box
          component="form"
          style={{display:"flex",flexDirection:"column"}}
        >
          <StandardInput label="Email" placeholder="email@emailaddress.com" InputProps={{
            endAdornment: <StdInputIcon icon={faEnvelope} />
          }} />
          <StandardInput style={{paddingBottom:20}} label="Password" placeholder="******" type="password" InputProps={{
            endAdornment: <StdInputIcon icon={faLock} />
          }} />
          <AuthButton style={{backgroundColor:"#59AF73"}}>Login</AuthButton>
        </Box>
        <AuthButton style={{backgroundColor:"#59ACAF",marginBottom:0}}>Sign Up</AuthButton>
      </div>
      <div style={{backgroundColor:"blue",flex:1}}>

      </div>
    </div>
  );
}

export default LoginPage;
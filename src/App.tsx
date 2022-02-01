import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, } from '@material-ui/styles';
import {createTheme} from '@material-ui/core';

import MapPage from './components/Pages/MapPage';
import NavBar from './components/Misc/NavBar';
import LoginPage from './components/Pages/LoginPage';
import SignUpPage from './components/Pages/SignUpPage';
import ManageDataPage from './components/Pages/ManageData/ManageDataPage';
import GovBodyDataPage from './components/Pages/ManageData/GovBodyDataPage';
import ContactUsPage from './components/Pages/ContactUsPage';
import PartyDataPage from './components/Pages/ManageData/PartyDataPage';

import { palette } from './customIntefaces/Palette';
import { AlertType } from './customIntefaces/AppTypes';
import { AppContext, RepBoundary } from './AppContext';
import appValues from './resources/AppValues';
import RepresentativeDataPage from './components/Pages/ManageData/RepresentativeDataPage';

function App() {
  const theme = createTheme({
    palette: palette
  });

  const [repBoundaries, setRepBoundaries] = useState<Array<RepBoundary>>([]);
  const [userAddr, setUserAddr] = useState<google.maps.LatLngLiteral>({lat:43.74002711761832, lng:-79.23987572757004});
  const [alert,setAlert] = useState<AlertType>({msg:"",open:false});

  return (
    <div style={{height:"100vh", width:"100vw",display:"flex", flexDirection:"column"}}>
      <AppContext.Provider value={{repBoundaries,setRepBoundaries,userAddr,setUserAddr, alert, setAlert}}>
          <ThemeProvider theme={theme}>
            <div className="App" style={{flex:1, margin:"0px " + appValues.pageMargin + "px"}}>
              <Router>
                <NavBar/>
                <Routes>
                  <Route path="/login" element={<LoginPage/>}/>
                  <Route path="/signup" element={<SignUpPage/>}/>
                  <Route path="/manageData" element={<ManageDataPage/>}/>                  
                  <Route path="/manageData/govBodyData" element={<GovBodyDataPage/>}/>
                  <Route path="/manageData/partyData" element={<PartyDataPage/>}/>
                  <Route path="/manageData/representativeData" element={<RepresentativeDataPage/>}/>
                  <Route path="/contactUs" element={<ContactUsPage/>}/>
                  <Route path="/" element={<MapPage/>} />
                </Routes>
              </Router>
            </div>
          </ThemeProvider>
        </AppContext.Provider>
    </div>
  );
}

export default App;
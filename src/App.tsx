import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, } from '@material-ui/styles';
import {createTheme, useMediaQuery } from '@material-ui/core';

import MapPage from './components/Pages/MapPage';
import NavBar from './components/Misc/NavBar';
import LoginPage from './components/Pages/LoginPage';
import SignUpPage from './components/Pages/SignUpPage';
import ManageDataPage from './components/Pages/ManageData/ManageDataPage';
import GovBodyDataPage from './components/Pages/ManageData/GovBodyDataPage';
import ContactUsPage from './components/Pages/ContactUsPage';
import PartyDataPage from './components/Pages/ManageData/PartyDataPage';
import RepresentativeDataPage from './components/Pages/ManageData/RepresentativeDataPage';
import BillDataPage from './components/Pages/ManageData/BillDataPage';
import ElectionDataPage from './components/Pages/ManageData/ElectionDataPage';
import ElectionCandidateDataPage from './components/Pages/ManageData/ElectionCandidateDataPage';
import ElectionPage from './components/Pages/ElectionPage';
import ValidVoteCastDataPage from './components/Pages/ManageData/ValidVoteCastDataPage';
import PartyDataCustomPage from './components/Pages/ManageData/PartyDataCustomPage';
import CustomElectionDataPage from './components/Pages/ManageData/CustomElectionDataPage';
import { palette } from './customIntefaces/Palette';
import { AlertType, Nullable } from './customIntefaces/AppTypes';
import { AppContext, ElectionRiding, RepBoundary } from './AppContext';
import appValues from './resources/AppValues';

function App() {
  const theme = createTheme({
    palette: palette
  });

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [repBoundaries, setRepBoundaries] = useState<Map<number, RepBoundary>>(new Map<number, RepBoundary>());
  const [userAddr, setUserAddr] = useState<google.maps.LatLngLiteral>({lat:43.74002711761832, lng:-79.23987572757004});
  const [alert,setAlert] = useState<AlertType>({msg:"",open:false});
  const [selectedRB,setSelectedRB] = useState<Nullable<RepBoundary>>(null);
  const [selectedER,setSelectedER] = useState<Nullable<ElectionRiding>>(null);

  return (
    <div style={{height:"100vh", width:"100%",display:"flex", flexDirection:"column"}}>
      <AppContext.Provider value={{repBoundaries,setRepBoundaries,userAddr,setUserAddr, alert, setAlert, selectedRB, setSelectedRB, selectedER, setSelectedER}}>
          <ThemeProvider theme={theme}>
            <div className="App" style={isMobile ? {flex:1, margin:"0px 0px"} : {flex:1, margin:"0px " + appValues.pageMargin + "px"}}>
              <Router>
                <NavBar/>
                  <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/signup" element={<SignUpPage/>}/>
                    <Route path="/manageData" element={<ManageDataPage/>}/>                  
                    <Route path="/manageData/govBodyData" element={<GovBodyDataPage/>}/>
                    <Route path="/manageData/partyData" element={<PartyDataPage/>}/>
                    <Route path="/manageData/representativeData" element={<RepresentativeDataPage/>}/>
                    <Route path="/manageData/billData" element={<BillDataPage/>}/>
                    <Route path="/manageData/electionData" element={<ElectionDataPage/>}/>
                    <Route path="/manageData/electionCandidateData" element={<ElectionCandidateDataPage/>}/>
                    <Route path="/manageData/voteCastData" element={<ValidVoteCastDataPage/>}/>
                    <Route path="/manageData/partyCustomData" element={<PartyDataCustomPage/>}/>
                    <Route path="/manageData/electionCustomData" element={<CustomElectionDataPage/>}/>
                    <Route path="/election" element={<ElectionPage/>} />
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
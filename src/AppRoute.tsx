import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useMediaQuery, useTheme} from '@material-ui/core';

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

import appValues from './resources/AppValues';

const AppRoute = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="App" style={{flex:1, margin:"0px " + isMobile ? 0 : appValues.pageMargin + "px"}}>
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
  );
}

export default AppRoute;
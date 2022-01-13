import React, { useState } from 'react';
import MapPage from './components/Pages/MapPage';
import { ThemeProvider, } from '@material-ui/styles';
import {createTheme} from '@material-ui/core';
import NavBar from './components/Misc/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Pages/LoginPage';
import SignUpPage from './components/Pages/SignUpPage';
import { AppContext, RepBoundary } from './AppContext';
import { pageMargin } from './AppValues';
import ManageDataPage from './components/Pages/ManageDataPage';
import GovBodyDataPage from './components/Pages/GovBodyDataPage';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main:"#59ACAF",
        dark:"#267174",
        light:"#EAF6F6",
        contrastText:"#ffffff"
      },
      secondary: {
        light:"#B8B8B8",
        main:"#707070",
        dark:"#000000"
      },
      success: {
        main:"#59AF73"
      },
      warning:{
        main:"#F6A343",
        dark:"#DC8D32"
      }
    }
  });

  const [repBoundaries, setRepBoundaries] = useState<Array<RepBoundary>>([]);
  const [userAddr, setUserAddr] = useState<google.maps.LatLngLiteral>({lat:43.74002711761832, lng:-79.23987572757004});
  const [selectedListKey, setSelectedListKey] = useState<Number | null>(null);
  const [hoveredListKey, setHoveredListKey] = useState<Number | null>(null);

  return (
    <div style={{height:"100vh", width:"100vw",display:"flex", flexDirection:"column"}}>
      <AppContext.Provider value={{repBoundaries,setRepBoundaries,userAddr,setUserAddr, selectedListKey, setSelectedListKey, hoveredListKey, setHoveredListKey}}>
          <ThemeProvider theme={theme}>
            <div className="App" style={{flex:1,margin:"0px " + pageMargin + "px"}}>
              <Router>
                <NavBar/>
                <Routes>
                  <Route path="/login" element={<LoginPage/>}/>
                  <Route path="/signup" element={<SignUpPage/>}/>
                  <Route path="/manageData" element={<ManageDataPage/>}/>                  
                  <Route path="/manageData/govBodyData" element={<GovBodyDataPage/>}/>
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
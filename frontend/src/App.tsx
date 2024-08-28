import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/reduxHooks";
import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
// import FrontPage from "./components/FrontPage";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles/css/index.css";
import Header from "./components/Header/Header";
import FrontPage from "./components/FrontPage/FrontPage";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const isDarkMode = localStorage.getItem('darkMode');
    return isDarkMode === 'true';
  })

  const darkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('isDarkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode])
  return (
    <div className="App">
      <Helmet>
        <title>Evergreen Library</title>
        <link href="https://fonts.cdnfonts.com/css/adobe-garamond-pro-2" rel="stylesheet"></link>
        <link href="https://fonts.cdnfonts.com/css/noto-serif-hebrew" rel="stylesheet"></link>
      </Helmet>
      <BrowserRouter>
      <Header setIsDarkMode={() => setIsDarkMode} />
        <div className="app-content top-[85px] z-0">
          <Routes>
            <Route path={"/"} element = {<FrontPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

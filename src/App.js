import "./App.css";
import About from "./components/About";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import React, { useState } from "react";
import Alert from "./components/Alert";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  // States
  const [mode, setMode] = useState("light"); // Whether dark mode is enabled or not

  const [alert, setAlert] = useState(null)

  // Methods
  const showAlert = (message,type)=>{
    setAlert({
      msg: message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark mode has been enabled", "success");
      document.title = 'TextUtils - Dark Mode';

      // To give website's title a catchy look (Eg. Your device has virus - install this browser)
      // setInterval(() => {
      //   document.title = 'Install now';
      // }, 2000);

      // setInterval(() => {
      //   document.title = 'Manipulate your text now';
      // }, 1500);
    } else { 
      setMode("light");
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled", "success");
      document.title = 'TextUtils - Light Mode';
    }
  };

  return (
    <>
    <Router>
        <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
     <Routes>
        {/* <Alert alert = {alert}/> */}

          {/* /users --> Component 1
          /users/home --> Component 2 */} 

          <Route exact path="/about" element={<About/>} />
          <Route exact path="/" element={<TextForm heading="Enter text to analyze"  mode={mode} showAlert={showAlert} />} />
      </Routes>
    </Router> 

    </>
  );
}

export default App;

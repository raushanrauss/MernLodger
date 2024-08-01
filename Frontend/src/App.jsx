
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Routes, Route } from "react-router-dom";
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import SetAvatar from './Pages/Avatar/setAvatar';
import Home from './Pages/Home/Home';
import GenerateReportButton from './pdfGenerator/PdfGenerotor';


function App() {


  return (
    <>
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/generatePdf" element={<GenerateReportButton />} />
       
      </Routes>
    </>
  )
}

export default App

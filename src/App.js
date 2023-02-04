
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './component/Login';
import Signup from './component/Signup';
function App() {
  return (
    <>
    <NoteState>

    
      <Router>
        <Navbar> </Navbar>
        <Routes>
          <Route index element={<Home />} />
          <Route exact path="/home" element={<Home />}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signUp" element={<Signup></Signup>}/>


        </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;

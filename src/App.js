import '../src/css/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './notes-context/NoteState';
import Sidebar from './components/Sidebar';
import Notes from './components/Notes';
import Remainder from './components/Remainder';
import Archived from './components/Archived';
import Signup from './components/Signup';
import Login from './components/Login';
import Alert from './components/Alert';
import AlertState from './notes-context/AlertState';
import Keeper from './components/Keeper';
function App() {

  return (
    <>
      <NoteState>
        <AlertState>
          <Router>
            <Navbar />
            <Alert />
            <Routes>
              <Route exact path="/" element={<Keeper/>}></Route>
              <Route exact path="/signup" element={<Signup />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/about" element={<About />}></Route>
            </Routes>
            <div className="row gridgap">
              <div className="col-sm-2">
                <Routes>
                  {["/home", "/archived","/notes","remainders"].map(path => (
                    <Route
                      path={path}
                      element={<Sidebar />}
                    />
                  ))}
                </Routes>
              </div>
              <div className="col-sm-9 ms-2">
                <Routes>
                  <Route exact path="/home" element={<Home />}></Route>
                  <Route exact path="/notes" element={<Notes />}></Route>
                  <Route exact path="/remainders" element={<Remainder />}></Route>
                  <Route exact path="/archived" element={<Archived />}></Route>
                </Routes>
              </div>
            </div>
          </Router>
        </AlertState>
      </NoteState>

    </>
  );
}

export default App;

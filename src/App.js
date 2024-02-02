
import './App.css';
import React,{useContext} from 'react'
import NavBar from './components/navBar/NavBar';
import Home from './pages/Home/Home';
import { BrowserRouter as Router,Route,Routes,useNavigate } from "react-router-dom";
import PlaceOverview from './pages/PlaceOverview/PlaceOverview';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Logout from './pages/Logout/Logout';
import { AuthContext } from './components/AuthContext/AuthContext';
import CategoriePreview from './components/CategoriePreview/CategoriePreview';
import Setting from './pages/Setting/Setting'
import Favorite from "./pages/Favourite/Favorite"
import Search from './pages/Search/Search';
import Contact from './pages/Contact/Contact';
import Footer from "./components/Footer/Footer"
import About from "./pages/About/About.jsx"
import NotFound from "./pages/NotFound/NotFound"
function App() {
  
  const {user}=useContext(AuthContext);
 
  return (
    <div className="App bg-white">
      <Router>
        
      <NavBar />
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route  path="/register" element={!user?<Register />:<Home />} />
      
      <Route  path="/favorite" element={!user ? <Login/>  : <Favorite />} />
      <Route  path="/setting" element={<Setting />} />
      <Route  path="/logout" element={!user? <Login/> :<Logout />} />
      <Route  path="/login" element={!user?<Login />:<Home />} />
      <Route  path="/p/:id" element={user?<PlaceOverview />:<Login location={window.location} />} />
      <Route  path="/category/:id" element={ <CategoriePreview />} />
      <Route path="/search" element={<Search />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />



      </Routes>
      <Footer />
      </Router>
    </div>
  );
}

export default App;

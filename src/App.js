import { BrowserRouter, Route,Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import EditImage from './EditImage'
import AllImages from './AllImages';
function App() {
 
   

  return (
   
    <BrowserRouter>
    <div className="App">
      <Routes>
          <Route exact path="/" element={<Home></Home>}></Route>
          <Route path="/images/:id" element={<EditImage></EditImage>}></Route>
          <Route path="/allimages" element={<AllImages></AllImages>}></Route>
         
      </Routes>
      </div>
      </BrowserRouter>
   
  );
}

export default App;

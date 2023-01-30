import { Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import './Home.css';


function Home()
{

    const[imageId,setImageId]= useState([]);
    const[error,setError]= useState([]);
 
   
       const fetchIniti = ()=>
       {
           return fetch("http://localhost:8080/images",{method:'POST'})
           .then((response)=>{ 
            if(!response.ok)
            {
                throw Error("Failed");
            }
            return response.json()})
           .then((jsonData)=> setImageId(jsonData))
           .catch((res)=>setError(res.message))
          
          
        }
useEffect(()=>{
    fetchIniti();
},[]);
    return(
        <div className='container'>
            <button className="btn btn-primary"  id="firstButton" >
                  <Link to={`/images/${imageId.id}`} id="firstLink" >
                       Click here to download a random image and start editing
                  </Link>
            </button>
            
            {error && <div>{error}</div>}
            
             <button className="btn btn-outline-primary" id="secondButton">
                  <Link id="secondlink"to={"/allimages"}>See all my images</Link>
             </button>

        </div>
    )
}
export default Home;
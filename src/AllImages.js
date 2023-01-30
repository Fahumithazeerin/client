import { useEffect ,useState} from "react";
import { Link} from 'react-router-dom';
import "./AllImages.css"
function AllImages()
{

   const[allImage,setAllImage] = useState([]);
   const fetchAll = ()=>
   {
     return fetch("http://localhost:8080/allimages",{method:'GET'})
           .then((response)=>{return response.json()})
           .then((jsonData)=>setAllImage(jsonData));
   }
   useEffect(()=>{
      fetchAll();
   },[]);
    return(
        <div className="all-image-container">
             {allImage.map((data)=>
                
                 
                    <Link to={`/images/${data.id}`} id="links" > 
                       <img src={"data:image/svg+xml;base64,"+data.imagedata} width={200} height={300} id="allImage" /> 
                    </Link>
               
            )}
        </div>
    );
}
export default AllImages;
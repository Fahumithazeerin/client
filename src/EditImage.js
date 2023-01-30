import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import './EditImage.css';
function EditImage()
{ 

 
  const params = useParams();
  const[images,setImages] = useState({});
  
  const cssObj = {
                    blur:images.blur,
                    contrast:images.contrast,
                    rotate:images.rotate,
                    width:images.width,
                    height:images.height,
                    edit:images.edit
                  };
  
 const handleChange = (e)=>
  {
     var dimensions = e.target.value;
    
    const splitDimension = dimensions.split(",");
    cssObj.height = splitDimension[0];
    cssObj.width = splitDimension[1];
    
    document.getElementById('image').setAttribute("style",`height : ${cssObj.height}`,`width :${cssObj.width}`);
    fetchImageStyle();
  }
    
    const blurCheck =()=>
     { 
        if(document.getElementById('blur').checked === true){
            cssObj.blur=3;
            cssObj.edit = true;
           
        }
        else{
            cssObj.blur=0;
            cssObj.edit = false;
          
            
        }
    }
     
    const contrastCheck =()=>
     {
        if(document.getElementById('contrast').checked == true){
            cssObj.contrast=200;
            cssObj.edit = true;
           
        }
        else{
            cssObj.contrast=100;
            cssObj.edit = false;
           
        }
     }
     
    const rotateCheck =()=>
     {
         if(document.getElementById('rotate').checked === true){
             cssObj.rotate=90;
             cssObj.edit = true;
          
         }
        else{
             cssObj.rotate=10;
             cssObj.edit = false;
            
         }
     }
     
    const validateBlur = ()=>
    {
      if(cssObj.blur === 3)
      {
        document.getElementById('blur').checked = true;
      }
      else{
        document.getElementById('blur').checked = false;
      }
    }
    const validateContrast = ()=>
    {
      if(cssObj.contrast === 200)
        {
          document.getElementById('contrast').checked = true;
        }
        else{
        document.getElementById('contrast').checked = false;
       }
    }
    const validateRotate = ()=>
    {
      if(cssObj.rotate === 90)
        {
          document.getElementById('rotate').checked = true;
        }
        else{
        document.getElementById('rotate').checked = false;
       }
    }
    const validateActions =()=>
     {
         validateBlur();
         validateContrast();
         validateRotate();
        
       
        
        assignCssPropAfter();
     }
     
   const assignCssPropAfter =()=>
     { 
          document.getElementById('image').style.setProperty
          ('filter','blur('+cssObj.blur+'px) contrast('+cssObj.contrast+'%) hue-rotate('+cssObj.rotate+'deg)');
     }
    
   const assignCssProp =()=>
     { 
           document.getElementById('image').style.setProperty
           ('filter', 'blur('+cssObj.blur+'px) contrast('+cssObj.contrast+'%) hue-rotate('+cssObj.rotate+'deg)');
           
           fetchImageStyle();
     }
     
    const fetchImageStyle = ()=>
     {
            return fetch(`http://localhost:8080/images/${params.id}/styles`,
                    { method: 'PUT',
                      headers:{ 
                                'Accept': 'application/json',
                                 'Content-Type': 'application/json'
                              },
                      body: JSON.stringify(cssObj)
                    })
             .then((response)=> response.json())
             .then ((jasonData)=>console.log(jasonData));
     }
    
  const fetchImageData = ()=>
    { 
        return fetch(`http://localhost:8080/images/${params.id}`)
         .then((response)=>response.json())
         .then((jsonData)=>setImages(jsonData))
    }
    
    useEffect(()=>
    {
   
      fetchImageData();
      
      validateActions();
    },[cssObj])
    
    return(
    
       <div className="image-container">
                
                <div className="image">
                          <img src={"data:image/svg+xml;base64,"+images.imagedata} alt="PlaceHolder" id="image" style={{height:`${cssObj.height}px`,width:`${cssObj.width}px`}} />
                          
                </div>
         
                <div id="image-actions">
                         
                          <div className="image-blur"> 
                              <label>Blur</label>
                              <input type="checkbox" id="blur"  onClick={()=>{blurCheck(); assignCssProp();}}/>
                          </div>
             
                          <div className="image-contrast">
                                 <label>Contrast</label>
                                 <input type="checkbox"  id="contrast" onClick={()=>{contrastCheck(); assignCssProp();}}/>
                          </div>
                    
                          <div className="image-rotate">
                               <label>Rotate</label>
                               <input type="checkbox"  id="rotate" onClick={()=>{rotateCheck(); assignCssProp();}}/>
                          </div>  
                
                            
                
               
              
                          <div className="image-dimension">
                             <label>Image Dimension</label>
                             <input type = "text" 
                                    placeholder={cssObj.height+","+cssObj.width} 
                                    onChange={(e)=>handleChange(e)}>
                             </input>
                             
                            
                          </div>
                 </div>
       </div>
     
    );
}
export default EditImage;
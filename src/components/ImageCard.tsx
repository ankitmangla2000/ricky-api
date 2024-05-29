import React,{useState, useEffect} from 'react';
import { Character } from './apiService';
import'./ImageCard.css';
interface ImageCardProps {
  character: Character;


}

const ImageCard: React.FC<ImageCardProps> = ({ character }) => {
  
  return (
    <div className="image-card">
{/* 
       <div className='row container-fluid'>
        <div className='col-md-3'>

        </div>
        <div ></div>
       </div> */}




      <div className="image-container">
        <img className="image-oncard" src={character.image} alt={character.name} />
        <div className="image-text">
          <h3 style={{fontSize:"15px",backgroundColor:"rgba(0,0,0,0.6)",padding:"5px"}}>{character.name}</h3>
          <h4 style={{fontSize:"13px",backgroundColor:"rgba(0,0,0,0.6)",padding:"5px"}}>id: {character.id} - created 7 years</h4>
        </div>
      </div>
      
        <div className="info">
          <p style={{color:"#ffffff",marginLeft:"5px"}}>Status</p>
          <p style={{color:"#df870f",marginRight:"8px"}}>{character.status}</p>
        </div>

     
        <hr style={{margin:"0 10px 0 10px", color:"#201f1f"}}/>
        <div className="info" >
        
          <p style={{color:"#ffffff",marginLeft:"5px"}}>Species</p>
          <p style={{color:"#df870f",marginRight:"8px"}}>{character.species}</p>
       

      </div>
        <hr style={{margin:"0 10px 0 10px", color:"white"}}/>
        <div className="info" >
       
          <p style={{color:"#ffffff",marginLeft:"5px"}}>Gender</p>
          <p style={{color:"#df870f",marginRight:"8px"}}>{character.gender}</p>
       

      </div>
        <hr style={{margin:"0 10px 0 10px", color:"white"}}/>
        <div className="info" >
        
          <p style={{color:"#ffffff",marginLeft:"5px"}}>Origin</p>
          <p style={{color:"#df870f",marginRight:"8px"}}>{character.origin.name}</p>
      

      </div>
        <hr style={{margin:"0 10px 0 10px", color:"white"}}/>
        <div className="info" >
       
          <p style={{color:"#ffffff",marginLeft:"5px"}}>Last Location</p>
          <p style={{color:"#df870f",marginRight:"8px"}}>{character.location.name}</p>
        

      </div>
        <hr style={{margin:"0 10px 0 10px", color:"white"}}/>
      
      </div>

    
  );
};

export default ImageCard;


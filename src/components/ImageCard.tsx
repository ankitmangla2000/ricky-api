import React,{useState, useEffect} from 'react';
import { Character } from './apiService';
import'./ImageCard.css';
interface ImageCardProps {
  character: Character;


}

const ImageCard: React.FC<ImageCardProps> = ({ character }) => {
  const imageStyle = {
    backgroundImage: `url(${character.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    height: '100%',
  };
  return (
    <div className="image-card">
      <div className="image-container" >
        <img className="image-oncard" src={character.image} alt={character.name} />
        <div className="image-text">
          <h3 >{character.name}</h3>
          <h4 >id: {character.id} - created 7 years</h4>
         
        </div>
      </div>
      
        <div className="info">
          <p className="left-side" >Status</p>
          <p className="right-side">{character.status}</p>
        </div>

     
        <hr className="line-style"/>
        <div className="info" >
        
          <p className="left-side" >Species</p>
          <p className="right-side" >{character.species}</p>
       

      </div>
        <hr className="line-style"/>
        <div className="info" >
       
          <p className="left-side">Gender</p>
          <p className="right-side" >{character.gender}</p>
       

      </div>
        <hr className="line-style"/>
        <div className="info" style={{height:"70px", display:"flex",alignItems:"center"}}>
          <p className="left-side" >Origin</p>
          <div style={{flex:"1", textAlign:"right"}}>
            <p className="right-side" style={{overflowWrap:"break-word",marginLeft:"75px"}}>
              {character.origin.name}
            </p>
          </div>
          </div>
        <hr className="line-style"/>
        <div className="info" style={{height:"70px", display:"flex",alignItems:"center"}}>
          <p className="left-side">Last Location</p>
          <div style={{flex:"1", textAlign:"right"}}>
            <p className="right-side" style={{overflowWrap:"break-word",marginLeft:"63px"}}>
              {character.location.name}
            </p>
          </div>
          </div>
        

    
       
      
      </div>

    
  );
};

export default ImageCard;


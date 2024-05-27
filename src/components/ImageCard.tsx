import React,{useState, useEffect} from 'react';
import { Character } from './apiService';
import'./ImageCard.css';
interface ImageCardProps {
  character: Character;
}

const ImageCard: React.FC<ImageCardProps> = ({ character }) => {
  
  return (
    <div className="image-card">
      <div className="image-conatiner">
        <img src={character.image} alt={character.name} />
        <h3>{character.name}</h3>
        <h4>id: {character.id} - created 7 years</h4>
      </div>
      <div className="character-info">
       <div className="info-left">
          <p>Status</p>
          <p>Species</p>
          <p>Gender</p>
          <p>Origin</p>
          <p>Last Location</p>
        </div>
        <div className="info-right">
          <p>{character.status}</p>
          <p>{character.species}</p>
          <p>{character.gender}</p>
          {/* <p>{origin} </p>
          <p>{location}</p>  */}
        </div>
        </div>
      </div>

    
  );
};

export default ImageCard;


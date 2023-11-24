import React, { useState, useEffect } from 'react';
import './Item.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Item() {
  const itemId  = localStorage.getItem("itemId");

  // Példaadatok
  const [item, setItem] = useState({
    name: "",
    price: null,
    description: "",
    currency: "" ,
    mapUrl: ""
  });


  useEffect(() => {
    
    // Az adatok lekérése az oldal betöltése után
    const fetchGroup = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getItem', {
          params: {
            itemId: Number(itemId),
          },
        });

        const itemsData = response.data;
        setItem(itemsData);
        
        console.log(itemsData.googleMapsURL)
      } catch (error) {
        console.error('Hiba történt a kérés során:', error);
      }
    };

    // Meghívjuk a fetchGroup függvényt az "useEffect" segítségével
    fetchGroup();
  }, [itemId]); // Az "useEffect" akkor fut le, amikor a groupId megváltozik

  return (
    <div className="item-container">
      <h1>{item.name}</h1>
      <p>Price: {item.price}  {item.currency}</p>
      <div>{item.description}</div>
      {item.mapUrl && (
        <a href={item.mapUrl} target='_blank' className="map-link">Watch on map</a>
      )}
    </div>
  );
}

export default Item;

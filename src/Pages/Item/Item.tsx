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
    googleMapsURL: ""
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
      <p>Ár: {item.price}  {item.currency}</p>
      <div>{item.description}</div>
      <div className="map-container">
        <iframe
          title="Google Maps"
          width="400"
          height="500"
          src={item.googleMapsURL}
          frameBorder="0"
          style={{ border: "0" }}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Item;

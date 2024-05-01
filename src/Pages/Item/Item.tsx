import React, { useState, useEffect } from 'react';
import './Item.css';
import { useParams } from 'react-router-dom';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Item() {
  const itemId  = localStorage.getItem("itemId");


  const navigate = useNavigate();

  // Példaadatok
  const [item, setItem] = useState({
    name: "",
    price: null,
    description: "",
    currency: "" ,
    mapUrl: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .delete('http://localhost:8080/deleteItem',{
        params:{
          itemId: Number(itemId),
        }
      })
      .then((response) => {
        console.log('Item delete Successful:', response.data);
        if (response.status === 200) {
          navigate('/Group');
        } else if (response.status === 409) {
          toast.error(response.data, {
            position: 'top-center',
            autoClose: 5000,
          });
        }
      })
      .catch((error) => {
        toast.error(error, {
          position: 'top-center',
          autoClose: 5000,
        });
      });
  };



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
    <div className='item-container'>
    <div className="item-containeer">
      <h1>{item.name}</h1>
      <p>Price: {item.price}  {item.currency}</p>
      <div>{item.description}</div>
      {item.mapUrl && (
        <a href={item.mapUrl} target='_blank' className="map-link">Watch on map</a>
      )}
      <form onSubmit={handleSubmit}>
        <button type='submit'>Delete</button>
      </form>
    </div>
    </div>
  );
}

export default Item;

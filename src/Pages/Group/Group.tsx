import React from 'react';

import { useNavigate } from 'react-router-dom';
import './Group.css';

function Group() {

  const navigate = useNavigate(); // Használjuk a useNavigate hookot

  const handleCircleButtonClick = () => {
    // Átnavigálás a "/newitem" útvonalra
    navigate('/newitem');
  };
  // Az "item"-ek adatait egy tömbben tároljuk
  const itemsData = [
    { title: 'Item 1', value: 50 },
    { title: 'Item 2', value: 75 },
    { title: 'Item 3', value: 30 },    
    { title: 'Item 3', value: 30 },
    // ... további elemek
  ];

  return (
    <div>
       <h1>USA Trip</h1>
      <h2>Total dues: 200 USD</h2>
      <div className='item-container'>
        {itemsData.map((item, index) => (
          <div className='item' key={index}>
            <div className='item-title'>{item.title}</div>
            <div className='item-value'>{item.value} USD</div>
          </div>
        ))}
        <div className="circle-button" onClick={handleCircleButtonClick}>
        <div className="plus">+</div>
    </div>
      </div>
      
    </div>
  );
}

export default Group;

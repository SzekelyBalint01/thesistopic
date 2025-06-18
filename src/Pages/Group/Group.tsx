// Group.js

import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Group.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { featureGroup } from 'leaflet';

function Group() {
  const groupId = localStorage.getItem("groupId");
  const navigate = useNavigate();
  const [userList, setUserList] = useState<{ id: number; username: string, debt: number, owe: number}[]>([]);

  const [email, setEmail] = useState('');
  const [items, setItems] = useState<{ id: number; name: string; price: number; currency: string; mapUrl: string; description: string }[] | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState("HUF"); 


  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

 
const handleCurrencySelect = (currency: { value: string; label: string }) => {
  setSelectedCurrency(currency.value);
  const dropdownButton = document.getElementById('dropdown-button');
  if (dropdownButton) {
    dropdownButton.innerText = currency.label;
  }
};
  

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getAllItem', {
          params: {
            groupId: Number(groupId),
          },
        });

        if (response && Array.isArray(response.data)) {
          const itemsData = response.data;
          setItems(itemsData);
          
        } else {
          console.error('Response is null or invalid:', response);
          setItems(null); 
          
        }
      } catch (error) {
        console.error('Hiba történt a kérés során:', error);
      }
    };

    fetchGroup();
  }, [groupId]);

    useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getAllGroupUser', {
          params: {
            groupId: Number(groupId),
            userId: Number(localStorage.getItem('userId')),
            currency: String(selectedCurrency)
          },
        });

        if (response && Array.isArray(response.data)) {
          const userList = response.data;
          setUserList(userList);
          console.log(userList)
        } else {
          console.error('Response is null or invalid:', response);
          setItems(null); 
          
        }
        
      } catch (error) {
        console.error('Hiba történt a kérés során:', error);
      }
    };

    fetchGroup();
  }, [groupId]);

  const handleGroupButtonClick = (id: number) => {
    localStorage.setItem("itemId", String(id));
    navigate("/Item");
  }

  const handleAddUser = async () => {
    try {
      
      const response = await axios.post('http://localhost:8080/addUserToGroup', {
        email: email,
        groupId: groupId
      });
        
      
      if (response.status === 200) {
        if(response.data.message==="User does not exists or already exists"){
          toast.error(() => (
            <div>
              <div>{response.data.message}</div>
            </div>
          ), {
            position: 'top-center',
            autoClose: 5000, 
          });
        }else{
          toast.success(() => (
            <div>
              <div>{response.data.message}</div>
            </div>
            
          ), {
            position: 'top-center',
            autoClose: 5000, 
          });
          
          setUserList(prevUserList => [...prevUserList, { id: response.data.id, username: response.data.username, debt: response.data.debt , owe: response.data.owe}]);
          
        }
        setEmail(''); 
      } else {
        toast.error(() => (
          <div>
            <div>{response.data.message}</div>
          </div>
        ), {
          position: 'top-center',
          autoClose: 5000, 
        });

        featureGroup();
      }
    } catch (error) {
      console.error('Hiba történt a kérés során:', error);
      toast.error(() => (
        <div>
          <div>A felhasznalo nem letezik</div>
        </div>
      ), {
        position: 'top-center',
        autoClose: 5000, 
      });
    }
  };


  const handleNewItemClick = () => {
    navigate('/newItem', { state: { userList } });
  };


  return (
    <div className="list-container">
       <div className="dropdown">
       <button id="dropdown-button" onClick={toggleDropdown} className="dropbtn">
  {selectedCurrency}
</button>
        {}
        {dropdownVisible && (
          <div className="dropdown-content">
           <a href="#" onClick={() => handleCurrencySelect({value: "HUF", label: "HUF"})}>HUF</a>
          {/* Option 2: USD */}
          <a href="#" onClick={() => handleCurrencySelect({value: "USD", label: "USD"})}>USD</a>
          {/* Option 3: EURO */}
          <a href="#" onClick={() => handleCurrencySelect({value: "EURO", label: "EURO"})}>EURO</a>
         </div>
        )}
      </div>
      <button className='newItem' onClick={handleNewItemClick}>
        New Item
      </button>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleAddUser} style={{ marginLeft: '15px' }}>User felvétele</button>
      </div>
      <div className="dynamic-height-container" style={{ height: Math.min(1000) + 'px', overflowY: 'auto' }}>
      {items !== null && (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <button onClick={() => handleGroupButtonClick(item.id)}>{item.name}</button>
            </li>
          ))}
        </ul>
      )}
      </div>
      <div className='UsersDisplay'>
  <div className="debt-list">
    <h3>Debt List</h3>
    <ul>
      {userList.map((user, index) => {
        if (user.id !== 1) {
          return <li key={index}>{user.username} {user.debt}</li>;
        } else {
          return null;
        }
      })}
    </ul>
  </div>
  <hr /> {}
  <div className="owe-list">
    <h3>Owe List</h3>
    <ul>
      {userList.map((user, index) => {
        if (user.id !== 1) {
          return <li key={index}>{user.username} {user.owe}</li>;
        } else {
          return null;
        }
      })}
    </ul>
  </div>
</div>

      <ToastContainer />
    </div>
    
  );
}

export default Group;

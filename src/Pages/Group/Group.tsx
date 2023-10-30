import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Group.css';

function Group() {
  const groupId = localStorage.getItem("groupId");
  const navigate = useNavigate();

  const [items, setItems] = useState<{ id: number; name: string; price: number; currency: string; mapUrl: string; description: string }[] | null>(null);

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
          setItems(null); // or setItems([]) if an empty array is more appropriate
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


  

  return (
    <div>
        <Link to={'/newItem'}>
        <button className='newItem'>New Item</button>
      </Link>
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
  );
}

export default Group;

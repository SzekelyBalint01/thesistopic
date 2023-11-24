import React, { useEffect, useState } from 'react';
import './NewItem.css';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
  id: number;
  username: string;
}

function NewItem() {
  const [name, setName] = useState('');
  const [value, setValue] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [selectedUser, setSelectedTag] = useState<string>('');
  const [selectedUsers, setSelectedTags] = useState<string[]>([]);
  const [currency, setCurrency] = useState<string>('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState<string>('');
  const location = useLocation();
  const usersList: User[] = location.state ? location.state.userList : [];
  const groupId = localStorage.getItem('groupId');
  const [selectedPayer, setSelectedPayer] = useState<number | ''>('');

  const navigate = useNavigate();

  const addTag = () => {
    if (selectedUser && !selectedUsers.includes(selectedUser)) {
      setSelectedTags([...selectedUsers, selectedUser]);
      setSelectedTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = selectedUsers.filter((tag) => tag !== tagToRemove);
    setSelectedTags(updatedTags);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const extractedUserIds = usersList.map((user) => user.id);

    const newItemData = {
      groupId: groupId,
      name: name,
      price: Number(value),
      description: description,
      users: extractedUserIds,
      currency: currency,
      mapUrl: googleMapsUrl,
      paidBy: selectedPayer !== '' ? selectedPayer : null,
    };

    axios
      .post('http://localhost:8080/createItem', newItemData)
      .then((response) => {
        console.log('New Item Successful:', response.data);
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

    console.log('New item:', newItemData);

    // Reset form fields and selected users
    setName('');
    setValue('');
    setDescription('');
    setSelectedTag('');
    setSelectedTags([]);
    setCurrency('');
    setGoogleMapsUrl('');
    setSelectedPayer('');
  };

  return (
    <div>
      <h1>New Item</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Név:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="value">Price:</label>
          <input
            type="number"
            id="value"
            value={value}
            onChange={(e) => {
              const numericValue = e.target.value ? parseFloat(e.target.value) : '';
              setValue(numericValue);
            }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Users:</label>
          <select
            id="tags"
            value={selectedUser}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="" disabled>
              Select...
            </option>
            {usersList.map((user) => (
              <option key={user.id} value={user.username}>
                {user.username}
              </option>
            ))}
          </select>
          <button type="button" onClick={addTag}>
            Add
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="selectedUsers">Selected Users:</label>
          <ul>
            {selectedUsers.map((user, index) => (
              <li key={index}>
                {user}
                <button type="button" onClick={() => removeTag(user)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="form-group">
          <label htmlFor="currency">Currency:</label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
          >
            <option value="" disabled>
              Select...
            </option>
            <option value="HUF">HUF</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="googleMapsUrl">Google Maps URL:</label>
          <input
            type="text"
            id="googleMapsUrl"
            value={googleMapsUrl}
            onChange={(e) => setGoogleMapsUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="selectedPayer">Who payed:</label>
          <select
            id="selectedPayer"
            value={selectedPayer}
            onChange={(e) => setSelectedPayer(Number(e.target.value))}
            required
          >
            <option value="" disabled>
              Select...
            </option>
            {usersList.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default NewItem;

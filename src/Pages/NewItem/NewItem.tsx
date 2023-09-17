import React, { useState } from 'react';
import './NewItem.css';

function NewItem() {
  // State változók az input mezők állapotának tárolásához
  const [name, setName] = useState('');
  const [value, setValue] = useState<number | ''>(''); // Az érték típusát itt állítjuk be
  const [description, setDescription] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Alapértelmezett tagok
  const defaultTags = ['Tag1', 'Tag2', 'Tag3'];

  // Tag hozzáadása a kiválasztott tagokhoz
  const addTag = () => {
    if (selectedTag && !selectedTags.includes(selectedTag)) {
      setSelectedTags([...selectedTags, selectedTag]);
      setSelectedTag('');
    }
  };

  // Tag törlése a kiválasztott tagok közül
  const removeTag = (tagToRemove: string) => {
    const updatedTags = selectedTags.filter((tag) => tag !== tagToRemove);
    setSelectedTags(updatedTags);
  };

  // Az űrlap beküldése
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Új elem létrehozása a beküldött adatokkal és a kiválasztott tagokkal
    const newItemData = {
      title: name,
      value: Number(value), // Az értéket itt számmá alakítjuk át
      description: description,
      tags: selectedTags,
    };

    // Az új elem feldolgozása (pl. adatbázisba mentés)
    console.log('Új elem:', newItemData);

    // Űrlap mezők visszaállítása
    setName('');
    setValue('');
    setDescription('');
    setSelectedTag('');
    setSelectedTags([]);
  };

  return (
    <div>
      <h1>Új elem hozzáadása</h1>
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
          <label htmlFor="value">Érték:</label>
          <input
            type="number" // Az érték típusát itt állítjuk be
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
          <label htmlFor="description">Leírás:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tagok:</label>
          <select
            id="tags"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="" disabled>
              Válassz egyet...
            </option>
            {defaultTags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <button type="button" onClick={addTag}>
            Hozzáad
          </button>
        </div>
        <div className="form-group">
          <label>Kiválasztott tagok:</label>
          <ul>
            {selectedTags.map((tag, index) => (
              <li key={index}>
                {tag}{' '}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                >
                  Törlés
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Mentés</button>
      </form>
    </div>
  );
}

export default NewItem;

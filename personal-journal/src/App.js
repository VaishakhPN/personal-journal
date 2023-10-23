import React, { useState, useEffect } from 'react';
import JournalEntry from './components/JournalEntry';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ title: '', content: '' });

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    setEntries(storedEntries);
  }, []);

  const addEntry = () => {
    if (newEntry.title && newEntry.content) {
      const updatedEntries = [...entries, newEntry];
      setEntries(updatedEntries);
      localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
      setNewEntry({ title: '', content: '' });
    }
  }

  const deleteEntry = (index) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  }

  return (
    <div className='journal-app'>
      <h1>My Personal Journal</h1>
      <div className='entry-form'>
        <input type="text" placeholder="Title" value={newEntry.title}
        onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}/>

        <textarea placeholder="Write whats in your mind..." value={newEntry.content}
        onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}/>
        <button onClick={addEntry}>Add Entry</button>
      </div>
      <div className='entry-list'>
        {entries.map((entry, index) => (
          <JournalEntry
            key={index}
            entry={entry}
            entries={entries}
            onDelete={() => deleteEntry(index)}/>
        ))}
      </div>
    </div>
  );
}

export default App;

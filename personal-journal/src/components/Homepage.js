import React, { useState, useEffect } from 'react';
import JournalEntry from './JournalEntry';
import './Homepage.css';

 
function App() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ id: '', title: '', content: '' });
 
  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    setEntries(storedEntries);
  }, []);
 
  const addEntry = () => {
    if (newEntry.title && newEntry.content) {
      const id = Date.now().toString();
      console.log(id)
      const updatedEntries = [...entries, { ...newEntry, id }];
      console.log(updatedEntries)
      setEntries(updatedEntries);
      localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
      setNewEntry({ id: '', title: '', content: '' });
    }
  }
 
  const deleteEntry = (id) => {
    console.log(id)
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  }
 
  return (
<div className='journal-app'>
<h1>My Personal Journal</h1>
<div className='entry-form'>
<input type="text" placeholder="Title" value={newEntry.title}
        onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}/>
 
        <textarea placeholder="Write what's on your mind..." value={newEntry.content}
        onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}/>
<button onClick={addEntry}>Add Entry</button>
</div>
<div className='entry-list'>
        {entries.map((entry) => (
<JournalEntry
            key={entry.id}
            entry={entry}
            entries={entries}

            onDelete={() => deleteEntry(entry.id)}/>
        ))}
</div>
</div>
  );
}
 
export default App;
import React, { useState } from 'react';

function JournalEntry({ entry, entries, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(entry.content);

  const saveEdit = () => {
    const updatedEntry = { ...entry, content: editedContent }; 
    entry.content = editedContent
    const updatedEntries = entries.map((e) => (e.id === entry.id ? updatedEntry : e));
    setEditing(false);

    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  }

  return (
    <div>
      <h2>{entry.title}</h2>
      {editing ? (
        <div>
          <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
          <button className='save' onClick={saveEdit}>Save</button>
        </div>
      ) : (
        <p>{entry.content}</p>
      )}
      <button onClick={() => setEditing(!editing)}>
        {editing ? 'Cancel' : 'Edit'}
      </button>
      <button className='delete' onClick={onDelete}>Delete</button>
    </div>
  );
}

export default JournalEntry;

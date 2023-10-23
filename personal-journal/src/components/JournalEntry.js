import React, { useState } from 'react';

function JournalEntry({ entry, entries, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(entry.content);

  const saveEdit = () => {
    entry.content = editedContent;
    setEditing(false);

    const updatedEntries = [...entries];
    const entryIndex = updatedEntries.findIndex((e) => e.title === entry.title);
    updatedEntries[entryIndex] = entry;
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  }

  return (
    <div>
      <h2>{entry.title}</h2>
      {editing ? (
        <div>
          <textarea value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}/>
          <button onClick={saveEdit}>Save</button>
        </div>
      ) : (
        <p>{entry.content}</p>
      )}
      <button onClick={() => setEditing(!editing)}>
        {editing ? 'Cancel' : 'Edit'}
      </button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default JournalEntry;

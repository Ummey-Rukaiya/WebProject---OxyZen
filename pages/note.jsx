import React, { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Notes = () => {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const [notes, setNotes] = useState([]);

  // Fetch existing notes on load
  const fetchNotes = async () => {
    try {
      const response = await fetch('http://localhost:7700/api/notes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are sent
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      console.log(data.notes);  // Handle the fetched notes
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  const handleNoteChange = (e) => setNote(e.target.value);

  const handlePostNote = async () => {
    try {
      const response = await fetch('http://localhost:7700/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Make sure this is set
        },
        body: JSON.stringify({ content: noteContent }), // Sending content as JSON
      });
  
      if (response.ok) {
        console.log('Note posted successfully');
        fetchNotes(); // To refresh notes after posting
      } else {
        console.error('Failed to post note');
      }
    } catch (error) {
      console.error('Error posting note:', error);
    }
  };
  

  const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

  return (
    <div>
      {/* Sticky Header */}
      <header className="bg-green-200 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/plants" className="text-4xl font-bold text-[rgb(205,185,92)] hover:text-green-900 transition">
            🌿 OxyZen
          </Link>
          <Link to="/plants/plant-disease" className="hover:text-green-600">🐛 Plant Disease</Link>
          <Link to="/reminder" className="hover:text-green-600">⏰ Reminders</Link>
          <Link to="/notes" className="hover:text-green-600">📝 Notes</Link>
          <Link to="/" className="hover:text-green-600">Logout</Link>
        </div>
      </header>

      {/* Banner */}
      <div
        className="relative h-48 md:h-64 bg-cover bg-center rounded-b-3xl shadow-lg"
        style={{ backgroundImage: `url('/assets/timer.avif')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-b-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            🌸 Plant Journal
          </h1>
        </div>
      </div>

      {/* Notes Input */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-green-800 mb-2">
            🌿 Share your plant journey
          </h2>
          <p className="text-gray-600">
            Write about your plant's first bloom, care routines, or little green victories.
          </p>
        </div>

        <div className="relative">
          <textarea
            className="w-full h-64 p-5 border-2 border-green-300 rounded-2xl shadow-md resize-none text-gray-800 focus:outline-none focus:ring-4 focus:ring-green-200 transition-all"
            value={note}
            onChange={handleNoteChange}
            placeholder="Describe your plant story here..."
          />
          {saved && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-green-100 text-green-700 text-sm px-2 py-1 rounded-full shadow-sm transition-opacity">
              <CheckCircle2 size={16} />
              <span>Posted</span>
            </div>
          )}
        </div>

        <button
          onClick={handlePostNote}
          className="mt-4 px-5 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
        >
          📌 Post
        </button>

        <p className="text-sm text-gray-500 mt-3 italic">
          ✨ Your notes are securely stored and shown below.
        </p>

        {/* Notes List */}
        {notes.length > 0 && (
          <div className="mt-10 space-y-6">
            {notes.map((n) => (
              <div key={n._id} className="p-4 border border-green-200 rounded-xl shadow-sm bg-white">
                <p className="text-gray-800 whitespace-pre-line">{n.content}</p>
                <p className="text-xs text-gray-500 mt-2">🗓️ {formatDate(n.createdAt)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
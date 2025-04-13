import React, { useState, useEffect } from "react";
import { CheckCircle2, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Notes = () => {
  const [note, setNote] = useState(() => localStorage.getItem("userNote") || "");
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("userPosts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  const [saved, setSaved] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // to track editing post

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handlePost = () => {
    if (note.trim() === "") return;

    if (editIndex !== null) {
      // Editing existing note
      const updatedPosts = [...posts];
      updatedPosts[editIndex].content = note;
      updatedPosts[editIndex].date = new Date().toLocaleString();
      setPosts(updatedPosts);
      localStorage.setItem("userPosts", JSON.stringify(updatedPosts));
      setEditIndex(null);
    } else {
      // New post
      const newPost = {
        content: note,
        date: new Date().toLocaleString(),
      };
      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      localStorage.setItem("userPosts", JSON.stringify(updatedPosts));
    }

    setNote("");
    localStorage.removeItem("userNote");

    setSaved(true);
    const timer = setTimeout(() => setSaved(false), 1500);
    return () => clearTimeout(timer);
  };

  const handleDelete = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
    localStorage.setItem("userPosts", JSON.stringify(updatedPosts));
  };

  const handleEdit = (index) => {
    setNote(posts[index].content);
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll up to textarea
  };

  useEffect(() => {
    if (note) {
      localStorage.setItem("userNote", note);
    }
  }, [note]);

  return (
    <div>
      {/* Header */}
      <header className="bg-green-200 shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/plants" className="text-4xl font-bold text-[rgb(205,185,92)] hover:text-green-900 transition">🌿 OxyZen</Link>
          <Link to="/plants/plant-disease" className="hover:text-green-600">🐛 Plant Disease</Link>
          <Link to="/reminder" className="hover:text-green-600">⏰ Reminders</Link>
          <Link to="/notes" className="hover:text-green-600">📝 Notes</Link>
          <Link to="/" className="hover:text-green-600">Logout</Link>
        </div>
      </header>

      {/* Banner */}
      <div className="relative h-48 md:h-64 bg-cover bg-center rounded-b-3xl shadow-lg" style={{ backgroundImage: `url('/assets/timer.avif')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-b-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">🌸 Plant Journal</h1>
        </div>
      </div>

      {/* Notes input section */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-green-800 mb-2">🌿 Share your plant journey</h2>
          <p className="text-gray-600">Write about your plant's first bloom, care routines, or little green victories.</p>
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
              <span>{editIndex !== null ? "Updated" : "Saved"}</span>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handlePost}
            className="bg-green-600 text-white px-5 py-2 rounded-xl shadow hover:bg-green-700 transition-all"
          >
            {editIndex !== null ? "✏️ Update" : "📌 Post"}
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-3 italic">
          ✨ Your notes are saved automatically in your browser.
        </p>
      </div>

      {/* Display posted notes */}
      <div className="max-w-3xl mx-auto px-4 pb-10">
        <h3 className="text-xl font-bold text-green-800 mb-4">🗒️ Your Posts</h3>
        {posts.length === 0 ? (
          <p className="text-gray-500 italic">No posts yet. Start journaling!</p>
        ) : (
          posts.map((post, index) => (
            <div
              key={index}
              className="bg-white border-l-4 border-green-400 shadow p-4 mb-4 rounded-lg relative"
            >
              <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
              <div className="text-xs text-gray-500 mt-2 text-right">{post.date}</div>
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-green-600 hover:text-green-800"
                  title="Edit"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;

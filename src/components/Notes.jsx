import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;


  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${apiUrl}`);
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Your To-do List</h1>
          <Link
            to="/notes/new"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
          >
            + New To-do
          </Link>
        </div>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-600">Error: {error.message}</p>}

        {!loading && !error && notes.length === 0 && (
          <p className="text-gray-500 text-center">No to-dos found.</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {notes.map((note) => (
              <Link to={`/notes/${note.id}`} key={note.id}>
                <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer hover:bg-blue-50">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {note.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">View Details →</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;

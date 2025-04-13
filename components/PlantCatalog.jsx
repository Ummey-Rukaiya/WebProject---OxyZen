import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PlantCatalog = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
        setFilteredPlants(data);
      });
  }, []);

  useEffect(() => {
    let filtered = plants;

    if (searchTerm) {
      filtered = filtered.filter((plant) =>
        plant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTag) {
      filtered = filtered.filter((plant) =>
        plant.tags.includes(selectedTag)
      );
    }

    setFilteredPlants(filtered);
  }, [searchTerm, selectedTag, plants]);

  const handleTagClick = (tag) => {
    setSelectedTag(tag === selectedTag ? "" : tag);
  };

  const uniqueTags = Array.from(new Set(plants.flatMap((p) => p.tags)));

  return (
    <div className="bg-white p-6 font-sans max-w-7xl mx-auto">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search for a plant"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-6 shadow-sm"
      />

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {uniqueTags.map((tag, index) => (
          <button
            key={index}
            onClick={() => handleTagClick(tag)}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedTag === tag
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-800"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid of plant cards */}
      <h2 className="text-2xl font-bold mb-4">Most popular plants right now</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPlants.length > 0 ? (
          filteredPlants.map((plant) => (
            <div
              key={plant.id}
              className="bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition"
            >
              <Link to={`/plants/${plant.id}`}>
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-full h-40 object-cover rounded-md mb-3 hover:scale-105 transition"
                />
                <h3 className="font-semibold text-lg text-green-800 hover:underline">
                  {plant.name}
                </h3>
              </Link>

              
            </div>
          ))
        ) : (
          <p>No matching plants found.</p>
        )}
      </div>
    </div>
  );
};

export default PlantCatalog;

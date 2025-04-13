import React, { useEffect, useState } from "react";

const PlantDiseases = () => {
  const [diseases, setDiseases] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/plantDiseases.json")
      .then((res) => res.json())
      .then((data) => setDiseases(data));
  }, []);

  const filteredDiseases = diseases.filter(disease =>
    disease.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-green-700">🪴 Common Plant Diseases</h1>

      <input
        type="text"
        placeholder="Search diseases..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 p-3 border border-gray-300 rounded-lg w-full"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiseases.map((disease) => (
          <div key={disease.id} className="bg-white p-4 rounded-xl shadow-md">
            <img
              src={disease.image}
              alt={disease.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold text-green-800">{disease.name}</h2>
            <p className="text-sm mt-2"><strong>Symptoms:</strong> {disease.symptoms}</p>
            <p className="text-sm mt-2"><strong>Treatment:</strong> {disease.treatment}</p>
            <p className="text-sm mt-2"><strong>Precaution:</strong> {disease.precaution}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantDiseases;

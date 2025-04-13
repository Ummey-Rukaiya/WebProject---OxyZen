import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const PlantDetail = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/plants.json')
      .then((res) => res.json())
      .then((data) => {
        const selected = data.find((p) => p.id === parseInt(id));
        setPlant(selected);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!plant) return <div className="p-8 text-center text-red-600">Plant not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <Link to="/plants" className="text-green-700 hover:underline text-sm mb-4 inline-block">
        ← Back to Plant Catalog
      </Link>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full md:w-1/2 rounded-xl shadow-md object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">{plant.name}</h1>
          <div className="flex gap-2 mb-4 flex-wrap">
            {plant.tags.map((tag, i) => (
              <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
          <br></br>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">ABOUT THIS PLANT</h2><br></br>
          {plant.about && <p className="text-gray-700">{plant.about}</p>}
        </div>
      </div>

      {plant.taxonomy && (
        <div className="mb-6">
          <br></br><h2 className="text-xl font-semibold text-gray-800 mb-2">🌿 Taxonomy</h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-700">
            <li className='italic'><strong>Scientific name:</strong> {plant.taxonomy.scientificName}</li>
            <li><strong>Genus:</strong> {plant.taxonomy.genus}</li>
            <li><strong>Family:</strong> {plant.taxonomy.family}</li>
            <li><strong>Order:</strong> {plant.taxonomy.order}</li>
          </ul>
        </div>
      )}

      {plant.alsoKnownAs && (
        <div className="mb-6">
          <br></br><h2 className="text-xl font-semibold text-gray-800 mb-2">🪴 Also Known As</h2>
          <p className="text-gray-700">{plant.alsoKnownAs.join(', ')}</p>
        </div>
      )}

      {plant.care && (
        <div className="space-y-6">
          <br></br><h2 className="text-xl font-semibold text-gray-800 mb-4">🌱 How to Care</h2>

          <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-medium mb-1">💧 Water</h3>
            <p className="text-sm">{plant.care.water.frequency}</p>
            <p className="text-sm text-gray-600">{plant.care.water.notes}</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-medium mb-1">☀️ Light</h3>
            <p className="text-sm">{plant.care.light.requirements}</p>
            <p className="text-sm text-gray-600">{plant.care.light.tolerance}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg shadow-sm">
            <h3 className="font-medium mb-1">🌿 Nutrients</h3>
            <p className="text-sm">{plant.care.nutrients.fertilization}</p>
            <p className="text-sm text-gray-600">{plant.care.nutrients.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantDetail;

import React from "react";
import { Link } from "react-router-dom";

const PlantHeader = () => {
  return (
    <header className="bg-green-100 shadow-md py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <Link to="/plants" className="text-4xl font-bold text-[rgb(205,185,92)] hover:text-green-900 transition">
        🌿 OxyZen
      </Link>

      {/* Navigation */}
      <nav className="font-bold flex items-center gap-6 text-green-900 text-sm">
        <Link to="/plants/plant-disease" className="hover:text-green-600">
          🐛 Plant Disease
        </Link>
        <Link to="/reminder" className="hover:text-green-600">
          ⏰ Reminders
        </Link>
        <Link to="/notes" className="hover:text-green-600">
          📝 Notes
        </Link>
        <Link to="/" className="hover:text-green-600">
          Logout
        </Link>
      </nav>
    </header>
  );
};

export default PlantHeader;

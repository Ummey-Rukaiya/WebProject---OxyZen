import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import confetti from "canvas-confetti";

const tips = {
  Water: {
    emoji: "💧",
    tip: "Water early in the morning and avoid overwatering.",
    frequency: "Every 3 days",
    color: "bg-blue-50",
  },
  Fertilize: {
    emoji: "🌿",
    tip: "Use a balanced fertilizer once a month.",
    frequency: "Every 4 weeks",
    color: "bg-yellow-50",
  },
  Light: {
    emoji: "☀️",
    tip: "Place plant in bright, indirect sunlight.",
    frequency: "6+ hrs daily",
    color: "bg-green-50",
  },
};

const PlantReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({ task: "", plant: "", time: "" });
  const [filter, setFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Ask notification permission on load
  useEffect(() => {
    Notification.requestPermission();
    const saved = localStorage.getItem("plantReminders");
    if (saved) {
      setReminders(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("plantReminders", JSON.stringify(reminders));
  }, [reminders]);

  // 🎉 Confetti trigger if all tasks are done
  useEffect(() => {
    if (reminders.length > 0 && reminders.every((r) => r.done)) {
      confetti({ particleCount: 150, spread: 80 });
      toast.success("All reminders completed! You're a plant superstar 🌟");
    }
  }, [reminders]);

  // ⏰ Notification trigger based on time (runs every minute)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"
      reminders.forEach((reminder) => {
        const dateStr = reminder.date || new Date().toDateString();
        if (
          reminder.time === currentTime &&
          !reminder.notified &&
          dateStr === new Date().toDateString()
        ) {
          showNotification(reminder);
          reminder.notified = true;
        }
      });
    }, 60000); // check every 1 min
    return () => clearInterval(interval);
  }, [reminders]);

  const showNotification = (reminder) => {
    if (Notification.permission === "granted") {
      new Notification(`🌿 ${reminder.task} Reminder`, {
        body: `It's time to ${reminder.task.toLowerCase()} your ${reminder.plant}.`,
        icon: "/assets/plant-icon.png",
      });
    }
  };

  const handleChange = (e) => {
    setNewReminder({ ...newReminder, [e.target.name]: e.target.value });
  };

  const playSound = () => {
    new Audio("/ding.mp3").play();
  };

  const addReminder = () => {
    if (!newReminder.task || !newReminder.plant || !newReminder.time) {
      toast.warn("Please fill out all fields");
      return;
    }

    const updated = [
      ...reminders,
      {
        ...newReminder,
        date: selectedDate.toDateString(),
        done: false,
        notified: false,
      },
    ];
    setReminders(updated);
    setNewReminder({ task: "", plant: "", time: "" });
    toast.success("Reminder added!");
    playSound();
  };

  const deleteReminder = (index) => {
    const updated = reminders.filter((_, i) => i !== index);
    setReminders(updated);
    toast.info("Reminder removed");
  };

  const toggleDone = (index) => {
    const updated = reminders.map((reminder, i) =>
      i === index ? { ...reminder, done: !reminder.done } : reminder
    );
    setReminders(updated);
  };

  const filteredReminders = filter === "All"
    ? reminders.filter((r) => r.date === selectedDate.toDateString())
    : reminders.filter(
        (reminder) =>
          reminder.task === filter && reminder.date === selectedDate.toDateString()
      );

  const completedCount = reminders.filter((r) => r.done).length;

  return (
    <div className="bg-green-50 min-h-screen">
      {/* Header */}
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

      <div className="p-6 max-w-6xl mx-auto">
        {/* Banner */}
        <div className="bg-gradient-to-r from-green-300 via-lime-200 to-green-100 p-4 rounded-lg shadow mb-6 text-center">
          <h2 className="text-xl font-semibold text-green-900">
            Welcome to your Plant Care Dashboard 🌱
          </h2>
        </div>

        {/* Tip of the Day */}
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-4 shadow">
          🌟 <strong>Tip of the Day:</strong>{" "}
          {Object.values(tips)[Math.floor(Math.random() * 3)].tip}
        </div>

        {/* Add Reminder Form */}
        <div className="mb-6 bg-green-100 p-4 rounded-lg shadow-md flex flex-wrap gap-2 items-center justify-between border border-green-200">
          <input
            type="text"
            name="task"
            placeholder="e.g., Water"
            value={newReminder.task}
            onChange={handleChange}
            className="p-2 border rounded w-full sm:w-[30%]"
          />
          <input
            type="text"
            name="plant"
            placeholder="Plant name"
            value={newReminder.plant}
            onChange={handleChange}
            className="p-2 border rounded w-full sm:w-[30%]"
          />
          <input
            type="time"
            name="time"
            value={newReminder.time}
            onChange={handleChange}
            className="p-2 border rounded w-full sm:w-[20%]"
          />
          <button
            onClick={addReminder}
            className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600 w-full sm:w-[15%]"
          >
            ➕ Add
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="mb-4 flex flex-wrap gap-2 justify-center">
          {["All", "Water", "Fertilize", "Light"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 rounded-full border transition ${
                filter === type
                  ? "bg-lime-500 text-white"
                  : "bg-white text-green-700 border-green-300"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Calendar + Achievements + Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-10">
          {/* Calendar */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-semibold mb-2 text-green-800">📅 Calendar View</h2>
            <Calendar value={selectedDate} onChange={setSelectedDate} />
            <p className="text-sm mt-2 text-gray-600">Viewing tasks for: <b>{selectedDate.toDateString()}</b></p>
          </div>

          {/* Achievements */}
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold text-green-700 mb-2">🏆 Achievements</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {completedCount >= 3 && (
                <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full">
                  🌸 Hydration Hero
                </span>
              )}
              {completedCount >= 5 && (
                <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full">
                  🌿 Green Guardian
                </span>
              )}
              {completedCount === 0 && (
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                  🚀 Get started by completing your first task!
                </span>
              )}
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4 text-left">
              <li> Set up your first reminder</li>
              <li> Created {reminders.length} reminder{reminders.length !== 1 && "s"}</li>
              <li> Staying consistent is key 🌱</li>
              <li> Every plant loves your attention 💚</li>
            </ul>
          </div>

          {/* Animation */}
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center">
            <img
              src="/assets/care.avif"
              alt="Plant animation"
              className="w-full h-64 object-contain"
            />
          </div>
        </div>

        {/* Reminder List */}
        {filteredReminders.length === 0 ? (
          <p className="text-gray-500 text-center mt-6">No reminders for this day.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredReminders.map((reminder, index) => {
              const info = tips[reminder.task] || {
                emoji: "🌱",
                tip: "Keep an eye on your plant's needs.",
                frequency: "Custom",
                color: "bg-gray-50",
              };
              return (
                <div
                  key={index}
                  className={`rounded-lg shadow-md p-4 flex gap-4 items-start ${info.color}`}
                >
                  <div className="text-4xl">{info.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={reminder.done}
                        onChange={() => toggleDone(index)}
                      />
                      <h2
                        className={`text-lg font-semibold ${
                          reminder.done ? "line-through text-gray-500" : "text-green-900"
                        }`}
                      >
                        {reminder.task} - {reminder.plant}
                      </h2>
                    </div>
                    <p className="text-sm text-gray-600">⏰ {reminder.time}</p>
                    <p className="text-sm text-green-700 mt-1">💡 {info.tip}</p>
                    <p className="text-sm text-gray-500">
                      📅 Recommended: {info.frequency}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteReminder(index)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    ❌
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantReminders;

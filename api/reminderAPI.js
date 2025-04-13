import axios from 'axios';

const BASE_URL = 'http://localhost:7700'; 

export const getAllReminders = async () => {
  const res = await axios.get(`${BASE_URL}/api/reminders`, { withCredentials: true });
  return res.data;
};

export const createReminder = async (reminder) => {
  const res = await axios.post(`${BASE_URL}/api/reminders`, reminder, { withCredentials: true });
  return res.data;
};

export const updateReminder = async (id, updateData) => {
  const res = await axios.put(`${BASE_URL}/api/reminders/${id}`, updateData, { withCredentials: true });
  return res.data;
};

export const deleteReminder = async (id) => {
  const res = await axios.delete(`${BASE_URL}/api/reminders/${id}`, { withCredentials: true });
  return res.data;
};

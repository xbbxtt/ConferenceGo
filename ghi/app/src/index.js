import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



async function loadAttendees() {
  const response = await fetch('http://localhost:8001/api/attendees/');
  if (response.ok) {
    const data = await response.json()
    console.log("data: ", data)
    console.log("data.attemdees: ", data.attendees)
    root.render(
      <React.StrictMode>
        <App attendees={data.attendees} />
      </React.StrictMode>
    )
  } else {
    console.error(response);
  }
}
loadAttendees();

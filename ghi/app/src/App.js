import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendConferenceForm from './AttendConferenceForm';
import PresentationForm from './PresentationForm';
import MainPage from './MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="home">
            <Route index element={<MainPage />} />
          </Route>
          {/* <Route path="*">
            <Route path="*" element={<AttendeesList attendees={props.attendees} />} />
          </Route> */}
          <Route path="attendees">
            <Route path="new" element={<AttendConferenceForm />} />
          </Route>
          <Route path="locations">
            <Route path="new" element={<LocationForm />} />
          </Route>
          <Route path="conferences">
            <Route path="new" element={<ConferenceForm />} />
          </Route>
          <Route path="attendconferences">
            <Route path="new" element={<AttendConferenceForm />} />
          </Route>
          <Route path="presentations">
            <Route path="new" element={<PresentationForm />} />
          </Route>
        </Routes>
        {/* <LocationForm /> */}
        {/* <ConferenceForm /> */}
        {/* <AttendConferenceForm /> */}
        {/* <AttendeesList attendees={props.attendees} /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;

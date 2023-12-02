import './App.css';
import Navbar from './components/Navbar';
import CaseApplicationUser from './components/CaseApplicationUser';
import HomeUser from './components/HomeUser';
import EventsUser from './components/EventsUser';
import ItemsUser from './components/ItemsUser';
import UserHistory from './components/UserHistory';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeUser />} />
          <Route path="/item_donation_user" element={<ItemsUser />} />
          <Route path="/history_user" element={<UserHistory />} />
          <Route path="/caseapplication" element={<CaseApplicationUser />} />
          <Route path="/events_user" element={<EventsUser />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

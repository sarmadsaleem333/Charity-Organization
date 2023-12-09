import './App.css';
import CaseApplicationUser from './components/CaseApplicationUser';
import HomeUser from './components/HomeUser';
import EventsUser from './components/EventsUser';
import ItemsUser from './components/ItemsUser';
import UserHistory from './components/UserHistory';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserCaseState from './context/UserCaseState';

function App() {
  return (
    <>
      <UserCaseState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeUser />} />
            <Route path="/item_donation_user" element={<ItemsUser />} />
            <Route path="/history_user" element={<UserHistory />} />
            <Route path="/caseapplication" element={<CaseApplicationUser />} />
            <Route path="/events_user" element={<EventsUser />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UserCaseState>


    </>
  );
}

export default App;

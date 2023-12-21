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
import EventsServer from './components/EventsServer';
import ItemServer from './components/ItemServer';
import TransactionServer from './components/TransactionServer';
import CasesServer from './components/CasesServer';
import AlertState from './context/alertContext/AlertState';
import Alert from "./components/Alert"
import ServerCaseState from './context/ServerCase/ServerCaseState';
import DonationCaseState from './context/DonationCase/DonationCaseState';
import SuccessfulCases from './components/SuccessfulCases';
import NotificationsState from './context/notifications/NotificationsState';
import HistoryDonationState from './context/HistroyOfDonations/HistoryDonationState';
import CaseHistoryDonations from './components/CaseHistoryDonations';
import ItemState from './context/itemsContext/ItemState';
global.user = false  ;

function App() {
  return (
    <>
      <ItemState>
        <HistoryDonationState>
          <NotificationsState>
            <DonationCaseState>
              <ServerCaseState>
                <UserCaseState>
                  <AlertState>
                    <BrowserRouter>
                      <Navbar user={global.user} />
                      <Alert />
                      <Routes>
                        <Route path="/" element={<HomeUser />} />
                        <Route path="/item_donation_user" element={<ItemsUser />} />
                        <Route path="/history_user" element={<UserHistory />} />
                        <Route path="/my_cases" element={<CaseApplicationUser />} />
                        <Route path="/events_user" element={<EventsUser />} />
                        <Route path="/events_server" element={<EventsServer />} />
                        <Route path="/items_server" element={<ItemServer />} />
                        <Route path="/pending_transfer_server" element={<TransactionServer />} />
                        <Route path="/applications_server" element={<CasesServer />} />
                        <Route path="/transferedcompletedcases" element={<SuccessfulCases />} />
                        <Route path="/case_donation_history/:id" element={<CaseHistoryDonations />} />
                      </Routes>
                      <Footer />
                    </BrowserRouter>
                  </AlertState >
                </UserCaseState >
              </ServerCaseState>
            </DonationCaseState>
          </NotificationsState>
        </HistoryDonationState>
      </ItemState>
    </>
  );
}

export default App;

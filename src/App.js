import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Alert from './components/Alert';
import LoginUser from './components/LoginUser';
import LoginServer from './components/LoginServer';
import HomeUser from './components/HomeUser';
import ItemsUser from './components/ItemsUser';
import UserHistory from './components/UserHistory';
import CaseApplicationUser from './components/CaseApplicationUser';
import EventsUser from './components/EventsUser';
import EventsServer from './components/EventsServer';
import ItemServer from './components/ItemServer';
import TransactionServer from './components/TransactionServer';
import CasesServer from './components/CasesServer';
import SuccessfulCases from './components/SuccessfulCases';
import CaseHistoryDonations from './components/CaseHistoryDonations';
import UserAuthState from './context/userContext/UserAuthState';
import ServerAuthState from './context/serverContext/ServerAuthState';
import EventState from './context/eventsContext/EventState';
import ItemState from './context/itemsContext/ItemState';
import HistoryDonationState from './context/HistroyOfDonations/HistoryDonationState';
import NotificationsState from './context/notifications/NotificationsState';
import DonationCaseState from './context/DonationCase/DonationCaseState';
import ServerCaseState from './context/ServerCase/ServerCaseState';
import UserCaseState from './context/UserCaseState';
import AlertState from './context/alertContext/AlertState';
import './App.css';
import NoNavbar from './components/NoNavbar';


function App() {
  const isLoggedIn = localStorage.getItem("token");
  const userRole = localStorage.getItem('role');




  return (
    <>
      <UserAuthState>
        <ServerAuthState>
          <EventState>
            <ItemState>
              <HistoryDonationState>
                <NotificationsState>
                  <DonationCaseState>
                    <ServerCaseState>
                      <UserCaseState>
                        <AlertState>
                          <BrowserRouter>

                            {isLoggedIn && <Navbar />}
                            {!isLoggedIn && <NoNavbar />}
                            <Alert />
                            <Routes>
                              <Route path="/login_user" element={<LoginUser />} />
                              <Route path="/login_server" element={<LoginServer />} />
                              <>
                                {userRole === 'user' && (
                                  <>
                                    <Route path="/" element={<HomeUser />} />
                                    <Route path="/item_donation_user" element={<ItemsUser />} />
                                    <Route path="/history_user" element={<UserHistory />} />
                                    <Route path="/my_cases" element={<CaseApplicationUser />} />
                                    <Route path="/events_user" element={<EventsUser />} />
                                  </>
                                )}
                                {userRole === 'server' && (
                                  <>
                                    <Route path="/events_server" element={<EventsServer />} />
                                    <Route path="/items_server" element={<ItemServer />} />
                                    <Route path="/pending_transfer_server" element={<TransactionServer />} />
                                    <Route path="/applications_server" element={<CasesServer />} />
                                    <Route path="/transferedcompletedcases" element={<SuccessfulCases />} />
                                    <Route
                                      path="/case_donation_history/:id"
                                      element={<CaseHistoryDonations />}
                                    />
                                  </>
                                )}
                              </>


                            </Routes>
                            <Footer />
                          </BrowserRouter>
                        </AlertState>
                      </UserCaseState>
                    </ServerCaseState>
                  </DonationCaseState>
                </NotificationsState>
              </HistoryDonationState>
            </ItemState>
          </EventState>
        </ServerAuthState>
      </UserAuthState>
    </>
  );
}

export default App;


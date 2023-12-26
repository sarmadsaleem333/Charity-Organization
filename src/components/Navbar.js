import { Fragment } from 'react';
import { Disclosure, } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Notifications from "./Notifications"
import ServerNotifications from './ServerNotifications';
import { useNavigate } from 'react-router-dom';
const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Item Donation', href: '/item_donation_user', current: false },
  { name: 'History', href: '/history_user', current: false },
  { name: 'My Cases', href: '/my_cases', current: false },
  { name: 'Applications', href: '/applications_server', current: false },
  { name: 'Pending Transfer', href: '/pending_transfer_server', current: false },
  { name: 'Successful Cases', href: '/transferedcompletedcases', current: false },
  { name: 'Events', href: '/events_server', current: false },
  { name: 'Items', href: '/items_server', current: false },
];



function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar(props) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    global.user = false;
    navigate("/login_user");
  }
  let { user } = props;

  const visibleNavigation = user ? navigation.slice(0, 4) : navigation.slice(4, 9);


  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>

          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Logging Out</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <p>Are You sure you want to Log Out?</p>
                </div>
                <div class="modal-footer">
                  <button class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                  <button class="btn btn-primary" data-bs-dismiss="modal" onClick={handleLogout} >Log Out</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>

                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {visibleNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {user ?
                (<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Notifications />
                </div>) :
                (<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <ServerNotifications />
                </div>)
              }
              <div className="btn btn-danger mx-9" data-bs-toggle="modal" data-bs-target="#exampleModal">Log Out</div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>

          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
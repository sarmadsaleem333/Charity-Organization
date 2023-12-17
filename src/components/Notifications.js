import { Fragment, useContext, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, BellIcon } from '@heroicons/react/20/solid';
import notificationsContext from '../context/notifications/notificationsContext';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}
export default function Notifications() {
    const context = useContext(notificationsContext);
    // const { getAllNotificationsUser, userNotifications } = context;

    // useEffect(() => {
    //     getAllNotificationsUser();
    //     console.log(userNotifications)
    // }, [])



    // const [notifications, setNotifications] = useState([
    //     // Your notification data goes here
    //     { id: 1, text: 'Notification 1' },
    //     { id: 2, text: 'Notification 2' },
    //     // Add more notifications as needed
    // ]);

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <span className="flex items-center">
                        {/* Notifications
                        {userNotifications.length > 0 && (
                            <span className="ml-2">
                                <BellIcon className="h-4 w-4 text-red-500" />
                            </span>
                        )} */}
                    </span>
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {/* Notifications section */}
                        {/* {userNotifications.length > 0 && (
                            <div className="border-b border-gray-200 py-2 px-4 text-sm text-gray-500">
                                Notifications
                            </div>
                        )} */}

                        {/* Render notifications */}
                        {/* {userNotifications.map((notification) => (
                            <Menu.Item key={notification.nno}>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        {notification.nmessage}
                                    </a>
                                )}
                            </Menu.Item>
                        ))} */}

                        {/* Menu items */}
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Account settings
                                </a>
                            )}
                        </Menu.Item>
                        {/* ... (other menu items) */}

                        <form method="POST" action="#">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        type="submit"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block w-full px-4 py-2 text-left text-sm'
                                        )}
                                    >
                                        Sign out
                                    </button>
                                )}
                            </Menu.Item>
                        </form>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

import { Disclosure } from '@headlessui/react';

const NoNavbar = () => {
  return (
    <Disclosure as="nav" className="bg-blue-500 p-4">
      {({ open }) => (
        <>
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-white font-bold text-xl">Give Hope Network</span>
            </div>
            <div className="hidden sm:flex space-x-4">
              {/* Add your custom links or components here */}
            </div>
            <div className="sm:hidden">
              <Disclosure.Button className="text-white">
                {open ? 'Close' : 'Open'}
              </Disclosure.Button>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="flex flex-col space-y-2 mt-2">
              {/* Add your custom links or components here */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NoNavbar;

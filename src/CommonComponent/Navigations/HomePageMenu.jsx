import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const navigation = [
  { name: "HomePage", to: "/", current: false },
  {
    name: "Election Commissioner Login",
    to: "/ElectionCommissionLoginPage",
    current: false,
  },
  { name: "Candidates Login", to: "/CandidateLogin", current: false },
  { name: "Minners Login", to: "/MinnerLogin", current: false },
  { name: "Voter Login", to: "/VoterLogin", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HomeNavBar({ children }) {
  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-indigo-400">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="h-14 w-auto rounded-full"
                      src="evote.png"
                      alt="E-Vote System Logo"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          className={classNames(
                            item.current
                              ? "bg-indigo-900 text-white"
                              : "text-gray-300 hover:bg-indigo-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Link to={item.to} key={item.name}>
                    <Disclosure.Button
                      as="a"
                      className={classNames(
                        item.current
                          ? "bg-indigo-900 text-white"
                          : "text-gray-300 hover:bg-indigo-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <header className="bg-white shadow"></header>

      <main>
        <div className="mx-1   py- sm:px-0 lg:px-0">{children}</div>
      </main>
    </div>
  );
}

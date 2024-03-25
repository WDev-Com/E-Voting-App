import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEleCommissionAsync,
  handleECPages,
  selectAllElectionOfficer,
  selectECPage,
  selectTotalElectionCommissions,
} from "./electionOfficerSlice";
import NavBar from "../Navigations/ElectionComNav";
import { Link, Navigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { ITEMS_PER_PAGE } from "../../../Store/constants";
import Pagination from "../../CommonComponent/Pagination/Pagination";

const filters = [
  {
    id: "role",
    name: "Role",
    options: [
      { value: "user", label: "user", checked: false },
      { value: "officer", label: "officer", checked: false },
      { value: "VCNofficer", label: "VCNofficer", checked: false },
      {
        value: "VoteCounterofficer",
        label: "VoteCounterofficer",
        checked: false,
      },
    ],
  },
];
const VievElectionCommissionPage = () => {
  const dispatch = useDispatch();
  const electionCommissners = useSelector(selectAllElectionOfficer);
  const totalCommissners = useSelector(selectTotalElectionCommissions);
  console.log("Total election : " + totalCommissners);
  const [filter, setFilter] = useState({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const pages = useSelector(selectECPage);
  const handlePage = (page) => {
    dispatch(handleECPages(page));
  };

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    // console.log(newFilter);
    if (e.currentTarget.checked) {
      // console.log(e.currentTarget.checked);
      // dispatch(navsearchFalse());
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    setFilter(newFilter);
  };

  useEffect(() => {
    let pagination = { _page: pages, _limit: ITEMS_PER_PAGE };
    dispatch(getAllEleCommissionAsync({ pagination, filter }));
  }, [dispatch, pages, filter]);

  return (
    <>
      <>
        <NavBar>
          <div className="bg-white">
            <div>
              {/* Mobile filter dialog */}
              <MobileFilter
                handleFilter={handleFilter}
                mobileFiltersOpen={mobileFiltersOpen}
                setMobileFiltersOpen={setMobileFiltersOpen}
                setFilter={setFilter}
              ></MobileFilter>

              <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-3">
                  <h3 className="text-2xl font-bold mb-4">All Candidate</h3>
                  <div className="mb-4 font-bold">
                    Total Officer Count : {totalCommissners}
                  </div>
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                      onClick={() => setMobileFiltersOpen(true)}
                    >
                      <span className="sr-only">Filter Candidate</span>
                      <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <section
                  aria-labelledby="products-heading"
                  className="pb-24 pt-6"
                >
                  <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {/* Desktop Filter */}
                    <DesktopFilter
                      filters={filters}
                      handleFilter={handleFilter}
                      setFilter={setFilter}
                    ></DesktopFilter>

                    {/* Voter List */}
                    <div className="lg:col-span-3">
                      {
                        <ViewList
                          electionCommissners={electionCommissners}
                          totalCommissners={totalCommissners}
                          dispatch={dispatch}
                        />
                      }
                    </div>
                  </div>
                </section>
                <Pagination
                  page={pages}
                  // setPage={setPage}
                  filters={filter}
                  handlePage={handlePage}
                  totalItems={totalCommissners}
                ></Pagination>
              </main>
            </div>
          </div>
        </NavBar>
      </>
    </>
  );
};

const ViewList = ({ electionCommissners, totalCommissners, dispatch }) => {
  return (
    <div className="container mx-auto p-4">
      <div>
        {electionCommissners.map((ele) => (
          <div
            key={ele.id}
            className="mb-8 p-4 rounded-lg shadow-lg border border-gray-200 hover:border-blue-500 flex flex-col relative mr-4 "
          >
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <img
                  src={ele.profileimages}
                  alt={ele.name}
                  className="w-16 h-16 rounded-full"
                />
                <p className="text-sm text-center mt-2">{ele.name}</p>
              </div>

              <div className="flex-1">
                <p className="text-lg font-bold">Officer ID: {ele.OffierID}</p>
                <p>Username: {ele.username}</p>
                <p>Role: {ele.role}</p>
                <p>Email: {ele.email}</p>
              </div>
            </div>
            <div className="absolute bottom-2 right-3 flex justify-end">
              <Link to={`/UpdateElectionOfficer/${ele.id}`}>
                <button className="mr-2">
                  <FaEdit />
                </button>
              </Link>
              <button
                onClick={() => {
                  //   dispatch(deleteCandidateAsync(ele.id));
                }}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  setFilter,
}) {
  return (
    <div>
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Filter Voter
                  </h2>
                  <button onClick={() => setFilter({})}>
                    <FaTrash />
                  </button>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    onChange={(e) =>
                                      handleFilter(e, section, option)
                                    }
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

function DesktopFilter({ filters, handleFilter, setFilter }) {
  return (
    <div>
      <form className="hidden lg:block">
        {filters.map((section) => (
          <Disclosure
            as="div"
            key={section.id}
            className="border-b border-gray-200 py-6"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      {open ? (
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </Disclosure.Button>
                </h3>
                <Disclosure.Panel className="pt-6">
                  <div className="space-y-4">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          onChange={(e) => handleFilter(e, section, option)}
                          defaultChecked={option.checked}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </form>
    </div>
  );
}
export default VievElectionCommissionPage;

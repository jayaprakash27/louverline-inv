import React, { useState, Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";

import { motion } from "framer-motion";
import { HiCheck, HiChevronDown } from "react-icons/hi";

import { Listbox, Transition } from "@headlessui/react";

const people = [
  {
    id: 1,
    name: "Wade Cooper",
  },
  {
    id: 2,
    name: "Arlene Mccoy",
  },
  {
    id: 3,
    name: "Devon Webb",
  },
  {
    id: 4,
    name: "Tom Cook",
  },
  {
    id: 5,
    name: "Tanya Fox",
  },
  {
    id: 6,
    name: "Hellen Schmidt",
  },
  {
    id: 7,
    name: "Caroline Schultz",
  },
  {
    id: 8,
    name: "Mason Heaney",
  },
  {
    id: 9,
    name: "Claudie Smitham",
  },
  {
    id: 10,
    name: "Emil Schaefer",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MainContainer = () => {
  const [selected, setSelected] = useState(people[0]);
  return (
    <div>
      {/* <Header /> */}
      <div className="flex justify-center align-middle">
        <div className="card flex-col p-4 mt-16 mb-16 items-center bg-cust-white rounded-lg w-fit ">
          <div class="flex justify-center">
            <div class=" bg-light mb-3 xl:w-96">
              <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm font-medium leading-6 text-cust-red">
                      Select Category
                    </Listbox.Label>
                    <div className="relative mt-2">
                      <Listbox.Button className="relative bg-transparent text-cust-red border border-cust-red focus:outline-none  w-80 rounded-full m-2 text-center">
                        <span className="flex m-2 items-center">
                          <span className="ml-3 text-center block ">
                            {selected.name}
                          </span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <HiChevronDown
                            className="h-5 w-5 text-cust-red"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {people.map((category) => (
                            <Listbox.Option
                              key={category.id}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "bg-cust-red text-white"
                                    : "text-gray-900",
                                  "relative text-center cursor-default select-none py-2 pl-3 pr-9"
                                )
                              }
                              value={category}
                            >
                              {({ selected, active }) => (
                                <>
                                  <div className="flex items-center">
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "ml-3 block truncate"
                                      )}
                                    >
                                      {category.name}
                                    </span>
                                  </div>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? "text-white" : "text-cust-red",
                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                      )}
                                    >
                                      <HiCheck
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
          </div>

          <div className="dataInput ">
            <input
              type="text"
              placeholder="Product ID"
              className=" bg-transparent border  w-80 rounded-full m-2 text-center"
              name="prod_id"
              id="prod_id"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Quantity"
              className=" bg-transparent border  w-80 rounded-full m-2 text-center"
              name="qty"
              id="qty"
            />
          </div>
          <div className="flex justify-around m-3 ">
            <motion.button
              whileTap={{ translateX: 4 }}
              className="  cursor-pointer border border-cust-red w-32 ml-4 mr-4  shadow-md hover:shadow-cust-red text-cust-red hover:bg-cust-red hover:text-cust-white pl-8 pr-8 pt-2 pb-2 rounded-full "
            >
              SUBMIT
            </motion.button>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default MainContainer;

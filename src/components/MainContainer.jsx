import React, { useEffect, useState, Fragment } from "react";

import { motion } from "framer-motion";
import { HiCheck, HiChevronDown } from "react-icons/hi";

import { Listbox, Transition } from "@headlessui/react";
import Announcements from "./Announcements";
import axios from "axios";
import { toast } from "react-toastify";


const MainContainer = () => {
  const [apidata, setAPIdata] = useState([]);
  const [input, setInput] = useState("");
  const [ids, setIds] = useState([]);
  const [qty, setQty] = useState(0);
  const [res, setRes] = useState("");

  const fetchData = async () => {
    try {
      const outlookData = await axios.get('https://script.google.com/macros/s/AKfycbwtOMSeHNYq3lIpCEyiNGvSqrHojuWQCzS_5Je7kSgrBuK_RfNGV5pbHq7a5BgDeQEn/exec');
      const deliteData = await axios.get('https://script.google.com/macros/s/AKfycbxALepPsSx_7zHQmVMEAZYJgbUNR-CB5v40pzNH8YgPRJl0MdYyPpEJE_8ImpNpgG-Hjg/exec');
      const newaluminiumData = await axios.get('https://script.google.com/macros/s/AKfycbyaWOc7luSYJ5SjzV-5CqwfruUNw76fiZrgbTUuRJfuuz5jsbKGlzkCU8E3PI0WkMPq/exec');

      const mergedData = [...outlookData.data.data, ...deliteData.data.data, ...newaluminiumData.data.data];
      setAPIdata(mergedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    // console.log(apidata);
    console.log(ids)
  }, []);
  // const getAllIds = async () => {
  //   await fetchData();
  //   for (let i = 0; i < apidata.length; i++) {
  //     ids.push(apidata[i].prod_id);
  //   }
  // }

  useEffect(() => {
    if (apidata.length > 0) {
      const uniqueIds = new Set(apidata.map((item) => item.prod_id));
      setIds(Array.from(uniqueIds));
   }
},[apidata]);

const inputFn =(value) => {
  setInput(value);
}
  const showRes = () => {
    console.log(apidata);
    var x = 0;
    var idhai = false;
    for (let i = 1; i < apidata.length; i++) {
      if (apidata[i].prod_id.toLowerCase() == input.toLowerCase()) {
        x += Number(apidata[i].quantity);
        idhai = true;
      }
    }
    console.log(x);
    if(idhai){
      if (qty < 0.8*x) {
      setRes("Available");
      toast.success('Available');
    } else {
      setRes("Unavailable");
      toast.error('Unavailable');
    }
    } else {
      toast.error("Product doesn't exist");
      setRes(null);
    }
    
  };
  return (
    <div>
      {/* <Header /> */}
      <div className="flex flex-col md:flex-row justify-around items-center">
        <div className="card flex-col min-h-80 p-4 mt-16 mb-16 items-center bg-cust-white rounded-lg w-fit ">
          <div class="flex justify-center">
            <div class=" bg-light mb-3 xl:w-96">
              {/* <button onClick={(e) => setCat('Roller Blinds')}>Select</button> */}
              {/* <Listbox value={selected} onChange={(e) => setCat(e.target.value)}>
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
                          {categories.map((category) => (
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
              </Listbox> */}
            </div>
          </div>

          <div className="dataInput ">
            <input
              type="text"
              placeholder="Product ID"
              className=" bg-transparent border  w-80 rounded-full m-2 text-center"
              name="prod_id"
              id="prod_id"
              value={input}
              onChange={(e) => setInput(e.target.value.toLowerCase())}
            />
            <ul className={`fixed bg-cust-white `}>
              { ids?.map((id) => (
                 id.toLowerCase().includes(input) && input != '' && <li 
                key={id}
                onClick={() => inputFn(id) }
                className={`bg-transparent border cursor-pointer hover:bg-cust-red bg-cust-khaki hover:text-white w-80 rounded-full m-2 text-center`}
                 > {id} </li>
              )) }
            </ul>
            {/* <ul className="fixed ">
              { ids?.map((id) => (
                 id.includes(input) && <li 
                key={id}
                className={`bg-transparent border cursor-pointer hover:bg-cust-white w-80 rounded-full m-2 text-center`}
                 > {id} </li>
              )) }
            </ul> */}
          </div>
          <div>
            <input
              type="text"
              placeholder="Quantity in Sqft."
              className=" bg-transparent border  w-80 rounded-full m-2 text-center"
              name="qty"
              id="qty"
              onChange={(e) => setQty(e.target.value)}
            />
          </div>
          <div className="flex justify-around h-full scroll m-3 ">
            <motion.button
              whileTap={{ translateX: 4 }}
              onClick={showRes}
              className="  cursor-pointer border border-cust-red w-32 ml-4 mr-4  shadow-md hover:shadow-cust-red text-cust-red hover:bg-cust-red hover:text-cust-white pl-8 pr-8 pt-2 pb-2 rounded-full "
            >
              SUBMIT
            </motion.button>
          </div>
          <p>{res}</p>
        </div>
        <div className="card min-h-80 flex-col w-96  p-4 mt-16 mb-16 items-center bg-cust-white rounded-lg">
          <Announcements />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default MainContainer;

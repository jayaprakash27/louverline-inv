import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
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
      const newaluminiumData = await axios.get('https://script.google.com/macros/s/AKfycbwJ6jLtrf-AmG6KCaLx-Tj1yJPQ8MyUHTQ_dAJN7yEAiYbyiZ1uJgJuB6L9CN45jQ/exec');
      const symphonyData = await axios.get('https://script.google.com/macros/s/AKfycbyvDWSjTv0F2_ni7S8chAbOGeCpcJKQWlXqyVZxvyWPsSY-6zQyUsVJQkD3ISp1Box_zg/exec');
      const rollerFabricData = await axios.get('https://script.google.com/macros/s/AKfycbzBTh-IE3F8lIsJltaapT-w4CSt92voh_-JdUem95bCPp81v7Yv6DG0JbQxtVBLIhuy/exec');
      const woodData = await axios.get('https://script.google.com/macros/s/AKfycbzIgLtjiP0GYJdiSgKFUhGodIx2_WvV6K4krFATAk0rzhc2KzurICWBIyGJV0mXb88G/exec');

      const mergedData = [...outlookData.data.data, ...deliteData.data.data, ...newaluminiumData.data.data, ...symphonyData.data.data, ...rollerFabricData.data.data, ...woodData.data.data];
      setAPIdata(mergedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          
      <h1 className="text-cust-red">Stock enquiry</h1>

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

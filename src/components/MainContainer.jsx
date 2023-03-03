import React from 'react'
import Header from './Header'
import Footer from './Footer'

import { motion } from 'framer-motion'

const MainContainer = () => {
    return (
        <div>
            <Header/>
        <div className='flex justify-center align-middle'>
            <div className="card flex-col p-4 mt-16 mb-16 items-center bg-cust-white rounded-lg w-fit ">
            <p className='text-cust-red p-3 m-6 ' >Select a category</p>
            <select className='bg-transparent border  w-80 rounded-full m-2 text-center' name="category" id="category">
                <option value="cat1">Cat 1</option>
                <option value="cat2">Cat 2</option>
                <option value="cat3">Cat 3</option>
                <option value="cat4">Cat 4</option>
            </select>
            <div className='dataInput '>
                    <input type="text" placeholder='Product ID' className=' bg-transparent border  w-80 rounded-full m-2 text-center' name="prod_id" id="prod_id"/>
                </div>
                <div>
                    <input type="text" placeholder='Quantity' className=' bg-transparent border  w-80 rounded-full m-2 text-center' name="qty" id="qty"/>
                </div>
                <div className='flex justify-around m-3 '>
                    <motion.button whileTap={{ translateX:4 }} className='  cursor-pointer border border-cust-red w-32 ml-4 mr-4  shadow-md hover:shadow-cust-red text-cust-red hover:bg-cust-red hover:text-cust-white pl-8 pr-8 pt-2 pb-2 rounded-full '>SUBMIT</motion.button>
                </div>
            </div>
        </div>
            <Footer />
        </div>
    )
}

export default MainContainer

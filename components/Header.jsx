import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { WebsiteContent } from '../context/WebsiteContext'


const Header = () => {

  const {userData} = useContext(WebsiteContent)
  
  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
      <img src={assets.header_img} alt="" className='w-36 h-36 rounded-full mb-6' />

      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey {userData ? userData.name : 'Plant Enthusiast'}! 
        <img className='w-8 aspect-square' src={assets.hand_wave} alt=""/>
        </h1>

      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to our website</h2>

      <p className='mb-8 max-w-md'>Welcome to our Plant Care Website, your go-to platform for keeping your plants healthy and thriving!</p>

      <a href="http://localhost:5173/plants"><button className='border border-gray-900 rounded-full px-8 py-2.5 hover:bg-green-500 transition-all'>Get Started</button>
      </a>
    </div>
  )
}

export default Header

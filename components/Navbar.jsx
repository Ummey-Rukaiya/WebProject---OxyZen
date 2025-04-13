import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { WebsiteContent } from '../context/WebsiteContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {
  
  const navigate = useNavigate()
  const {userData, backendUrl, setUserData, setIsLoggedin} = useContext(WebsiteContent)

  const sendVerificationOtp = async()=>{
    try {
      axios.defaults.withCredentials = true;

      const {data} = await axios.post(backendUrl + '/api/oxyzen/send-verify-otp')

      if(data.success){
        navigate('/email-verify')
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const logout = async ()=>{
    try {
        axios.defaults.withCredentials = true

        const { data } = await axios.post(backendUrl + '/api/oxyzen/logout')

        data.success && setIsLoggedin(false)
        data.success && setUserData(false)
        navigate('/')

    } catch (error) {
        toast.error(error.message)
    }
  }

    return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <h1 className='text-[39px] font-semibold font-size-34px text-[rgb(205,185,92)] mt-10'>OxyZen</h1>

      {/*<img src={assets.logo} alt="" className='w-28 sm:w-32'/>*/}
      {userData ? 
      <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
        {userData.name[0].toUpperCase()}
        <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
            <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
                {!userData.isAccountVerified && <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify email</li>}
                
                <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
            </ul>
        </div>
      </div>

      :
      <button onClick={()=>navigate('/login')}
      className='flex items-center gap-2 border border-white rounded-full mt-10 px-6 py-2 text-white hover:bg-green-500 transition-all'>Login 
        <img src={assets.arrow_icon} alt="" />
        </button>
    }

    </div>
  )
}

export default Navbar

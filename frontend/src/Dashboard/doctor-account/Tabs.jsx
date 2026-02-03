import { useContext } from 'react'
import { BiMenu } from 'react-icons/bi'
import { authContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Tabs = ({ tab, setTab }) => {
  const { dispatch } = useContext(authContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
    navigate('/')
  }

  return (
    <div>
      {/* Mobile Menu Icon */}
      <span className="lg:hidden">
        <BiMenu className='w-6 h-6 cursor-pointer' />
      </span>

      {/* Sidebar Tabs */}
      <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
        <button
          onClick={() => setTab('overview')}
          className={`${tab === 'overview' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md`}
        >
          Overview
        </button>

        <button
          onClick={() => setTab('appointments')}
          className={`${tab === 'appointments' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full btn mt-3 rounded-md`}
        >
          Appointments
        </button>

        <button
          onClick={() => setTab('settings')}
          className={`${tab === 'settings' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full btn mt-3 rounded-md`}
        >
          Profile
        </button>

        {/* Logout / Delete */}
        <div className="mt-[100px] w-full flex flex-col gap-3">
          <button
            onClick={handleLogout}
            className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white hover:bg-[#2a2c30]"
          >
            Logout
          </button>

          <button
            className="w-full bg-red-800 p-3 text-[16px] leading-7 rounded-md text-white hover:bg-red-900"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Tabs

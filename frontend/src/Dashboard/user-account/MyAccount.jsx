import { useContext, useState } from 'react'
import { authContext } from '../../context/AuthContext'
import MyBookings from './MyBookings'
import Profile from './Profile'
import useGetProfile from '../../hooks/useFetchData'
import { BASE_URL } from '../../../config'
import Loading from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'

const MyAccount = () => {
  const { dispatch } = useContext(authContext)
  const [tab, setTab] = useState('bookings')

  const { data: userData, loading, error } = useGetProfile(`${BASE_URL}/users/profile/me`)

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMessage={error} />}

        {!loading && !error && userData && (
          <div className="grid md:grid-cols-3 gap-10">

            {/* Sidebar */}
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-primaryColor overflow-hidden">
                  <img src={userData.photo} alt={userData.name} className="w-full h-full object-cover" />
                </figure>
              </div>

              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">{userData.name}</h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Blood Type: <span className="ml-2 text-headingColor text-[22px] leading-8">{userData.bloodType}</span>
                </p>
              </div>

              <div className="mt-[50px] md:mt-[100px] flex flex-col gap-3">
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

            {/* Main Content */}
            <div className="md:col-span-2 md:px-[30px]">
              <div className="flex gap-5 mb-5">
                <button
                  onClick={() => setTab('bookings')}
                  className={`py-2 px-5 rounded-md border border-solid border-primaryColor text-[16px] font-semibold leading-7 ${
                    tab === 'bookings' ? 'bg-primaryColor text-white font-normal' : 'text-headingColor'
                  }`}
                >
                  My Bookings
                </button>

                <button
                  onClick={() => setTab('settings')}
                  className={`py-2 px-5 rounded-md border border-solid border-primaryColor text-[16px] font-semibold leading-7 ${
                    tab === 'settings' ? 'bg-primaryColor text-white font-normal' : 'text-headingColor'
                  }`}
                >
                  Profile Settings
                </button>
              </div>

              {/* Tab Content */}
              {tab === 'bookings' && <MyBookings />}
              {tab === 'settings' && <Profile user={userData} />}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default MyAccount

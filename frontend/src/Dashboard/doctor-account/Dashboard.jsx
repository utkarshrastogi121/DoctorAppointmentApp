import React, { useState } from 'react'
import Loader from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'
import useGetProfile from '../../hooks/useFetchData'
import { BASE_URL } from '../../../config'
import Tabs from './Tabs.jsx'
import starIcon from '../../assets/images/Star.webp'
import DoctorAbout from '../../pages/Doctors/DoctorAbout.jsx'
import Profile from './Profile.jsx'
import Appointments from './Appointments.jsx'
import defaultPhoto from "../../assets/images/default.webp"

const Dashboard = () => {
  const { data, loading, error } = useGetProfile(`${BASE_URL}/doctors/profile/me`)
  const [tab, setTab] = useState('overview')

  if (loading) return <Loader />
  if (error) return <Error />

  return (
    <section className="py-8">
      <div className="max-w-[1170px] px-5 mx-auto">
        {!loading && !error && data && (
          <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            
            {/* Tabs Section */}
            <div className="lg:col-span-1">
              <Tabs tab={tab} setTab={setTab} />
            </div>

            {/* Main Content Section */}
            <div className="lg:col-span-2">
              
              {/* Pending Approval Notice */}
              {data?.isApproved?.toLowerCase() === 'pending' && (
                <div className="mb-6 p-4 rounded bg-yellow-200 text-sm font-medium text-headingColor">
                  To get approval, please complete your profile. We&apos;ll review manually and approve within 3 days.
                </div>
              )}

              <div className="mt-8">
                {/* Overview Tab */}
                {tab === 'overview' && (
                  <div>
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-10">
                      <figure className="w-[200px] h-[200px] flex-shrink-0 rounded overflow-hidden">
                        <img src={data?.photo || defaultPhoto} alt={data?.name} className="w-full h-full object-cover" />
                      </figure>

                      <div className="flex-1">
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] lg:text-[14px] font-semibold">
                          {data?.specialization || 'N/A'}
                        </span>

                        <h3 className="text-[22px] lg:text-[24px] font-bold text-headingColor mt-3">
                          {data?.name || 'N/A'}
                        </h3>

                        <div className="flex items-center gap-2 mt-2">
                          <img src={starIcon} alt="star" className="w-4 h-4" />
                          <span className="text-headingColor font-semibold">
                            {data?.averageRating ?? 0}
                          </span>
                          <span className="text-textColor ml-2">
                            ({data?.totalRating ?? 0} reviews)
                          </span>
                        </div>

                        {data?.bio && (
                          <p className="text__para mt-3 text-[15px] leading-6 lg:max-w-[500px]">
                            {data.bio}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Doctor About */}
                    <DoctorAbout
                      name={data?.name || ''}
                      about={data?.about || ''}
                      qualifications={data?.qualifications || []}
                      experiences={data?.experiences || []}
                    />
                  </div>
                )}

                {/* Appointments Tab */}
                {tab === 'appointments' && (
                  <Appointments appointments={data?.appointments || []} />
                )}

                {/* Settings Tab */}
                {tab === 'settings' && <Profile doctorData={data} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Dashboard

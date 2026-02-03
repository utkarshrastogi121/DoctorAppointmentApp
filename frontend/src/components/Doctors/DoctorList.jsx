import React from 'react'
import DoctorCard from './DoctorCard'
import { BASE_URL } from '../../../config'
import useFetchData from '../../hooks/useFetchData'
import Loading from '../Loader/Loading'
import Error from '../Error/Error'

function DoctorList() {
  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`)

  if (loading) return <Loading />
  if (error) return <Error />
  if (!doctors || doctors.length === 0)
    return <p className="text-center text-textColor mt-10">No doctors found.</p>

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
      {doctors.map(doctor => (
        <DoctorCard key={doctor._id} doctor={doctor} />
      ))}
    </div>
  )
}

export default DoctorList

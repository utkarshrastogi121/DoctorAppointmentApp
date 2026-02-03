import React from 'react'
import starIcon from '../../assets/images/Star.png'
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'

function DoctorCard({ doctor }) {
  const {
    name,
    specialization,
    avgRating,
    totalRating,
    photo,
    experiences,
  } = doctor

  return (
    <div className='p-3 lg:p-5 bg-white rounded-lg shadow-md'>
      {/* Doctor Photo */}
      <div className='overflow-hidden rounded-lg'>
        <img
          src={photo}
          alt={name}
          className='w-full h-60 lg:h-72 object-cover'
        />
      </div>

      {/* Doctor Name */}
      <h2 className='text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5'>
        {name}
      </h2>

      {/* Specialization & Rating */}
      <div className='mt-2 lg:mt-4 flex items-center justify-between'>
        <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>
          {specialization}
        </span>

        <div className='flex items-center gap-2'>
          <span className='flex items-center gap-1 text-[12px] lg:text-[16px] font-semibold text-headingColor'>
            <img src={starIcon} alt="Rating" className='w-4 h-4' />
            {avgRating || '0.0'}
          </span>
          <span className='text-[12px] lg:text-[16px] font-[400] text-textColor'>
            ({totalRating || 0})
          </span>
        </div>
      </div>

      {/* Experience & Arrow */}
      <div className='mt-4 lg:mt-5 flex items-center justify-between'>
        <div>
          <p className='text-[14px] lg:text-[16px] leading-6 font-[400] text-textColor'>
            {experiences && experiences.length > 0
              ? `At ${experiences[0].hospital}`
              : 'Experience info not available'}
          </p>
        </div>

        <Link
          to={`/doctors/${doctor._id}`}
          className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none'
        >
          <BsArrowRight className='group-hover:text-white w-6 h-5' />
        </Link>
      </div>
    </div>
  )
}

export default DoctorCard

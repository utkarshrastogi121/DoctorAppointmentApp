import React from "react";
import starIcon from "../../assets/images/Star.webp";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

function DoctorCard({ doctor }) {
  const { name, specialization, avgRating, totalRating, photo, experiences } =
    doctor;

  return (
    <div className="p-4 lg:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Doctor Photo */}
      <div className="overflow-hidden rounded-xl">
        <img src={photo} alt={name} className="w-full h-[220px] lg:h-[280px] object-cover" />
      </div>

      {/* Name */}
      <h2 className="mt-3 lg:mt-5 text-[18px] lg:text-[22px] font-bold text-headingColor leading-[28px] lg:leading-8">
        {name}
      </h2>

      {/* Specialization & Ratings */}
      <div className="mt-2 lg:mt-4 flex items-center justify-between">
        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-3 lg:py-2 lg:px-5 text-[12px] lg:text-[14px] font-semibold rounded-full">
          {specialization}
        </span>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <img src={starIcon} alt="star" className="w-4 h-4 lg:w-5 lg:h-5" />
            <span className="text-[14px] lg:text-[16px] font-semibold text-headingColor">
              {avgRating}
            </span>
          </div>
          <span className="text-[12px] lg:text-[14px] text-textColor">
            ({totalRating})
          </span>
        </div>
      </div>

      {/* Hospital / Experience */}
      <div className="mt-3 lg:mt-5 flex items-center justify-between">
        <p className="text-[14px] lg:text-[16px] text-textColor font-medium">
          {experiences && experiences[0]?.hospital
            ? `At ${experiences[0].hospital}`
            : "Hospital info not available"}
        </p>

        <Link
          to={`/doctors/${doctor._id}`}
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-[#181A1E] flex items-center justify-center group transition-all duration-300 hover:bg-primaryColor hover:border-none"
        >
          <BsArrowRight className="w-5 h-5 lg:w-6 lg:h-6 text-headingColor group-hover:text-white" />
        </Link>
      </div>
    </div>
  );
}

export default DoctorCard;

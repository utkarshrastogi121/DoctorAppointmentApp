import { useState } from 'react';
import { useParams } from 'react-router-dom';
import starIcon from '../../assets/images/Star.webp';
import DoctorAbout from './DoctorAbout';
import Feedback from './Feedback';
import SidePanel from './SidePanel';
import { BASE_URL } from '../../../config';
import useFetchData from '../../hooks/useFetchData';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';

const DoctorsDetails = () => {
  const [tab, setTab] = useState('about');
  const { id } = useParams();
  const { data: doctor, loading, error } = useFetchData(`${BASE_URL}/doctors/${id}`);

  // Loading and error handling
  if (loading) return <Loading />;
  if (error) return <Error errMessage={error} />;
  if (!doctor || Object.keys(doctor).length === 0)
    return <p className="text-center mt-10 text-headingColor">No doctor found</p>;

  // Destructure data
  const {
    _id,
    name,
    qualifications,
    experiences,
    timeSlots,
    reviews,
    bio,
    about,
    averageRating,
    totalRating,
    specialization,
    ticketPrice,
    photo,
  } = doctor;

  return (
    <section className="py-10">
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          
          {/* Left Section */}
          <div className="md:col-span-2 space-y-8">
            {/* Doctor Info */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
              <figure className="w-[200px] h-[200px] flex-shrink-0">
                <img src={photo} alt={name} className="w-full h-full object-cover rounded" />
              </figure>
              <div className="flex-1 space-y-2">
                <span className="bg-[#ccf0f3] text-irisBlueColor py-1 px-6 text-[12px] lg:text-[16px] font-semibold rounded">
                  {specialization}
                </span>
                <h3 className="text-headingColor text-[22px] lg:text-[26px] leading-9 font-bold">
                  {name}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[14px] lg:text-[16px] font-semibold text-headingColor">
                    <img src={starIcon} alt="star" className="w-5 h-5" /> {averageRating}
                  </span>
                  <span className="text-[14px] lg:text-[16px] font-[400] text-textColor">
                    ({totalRating})
                  </span>
                </div>
                <p className="text__para text-[14px] lg:text-[15px] mt-2">{bio}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-10 border-b border-[#0066ff34]">
              <button
                onClick={() => setTab('about')}
                className={`py-2 px-5 mr-5 text-[16px] font-semibold ${
                  tab === 'about' ? 'border-b-2 border-primaryColor' : ''
                }`}
              >
                About
              </button>
              <button
                onClick={() => setTab('feedback')}
                className={`py-2 px-5 mr-5 text-[16px] font-semibold ${
                  tab === 'feedback' ? 'border-b-2 border-primaryColor' : ''
                }`}
              >
                Feedback
              </button>
            </div>

            {/* Tab Content */}
            <div className="mt-10">
              {tab === 'about' && (
                <DoctorAbout
                  name={name}
                  about={about}
                  qualifications={qualifications}
                  experiences={experiences}
                />
              )}
              {tab === 'feedback' && <Feedback reviews={reviews} totalRating={totalRating} />}
            </div>
          </div>

          {/* Side Panel */}
          <div>
            <SidePanel doctorId={_id} ticketPrice={ticketPrice} timeSlots={timeSlots} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorsDetails;

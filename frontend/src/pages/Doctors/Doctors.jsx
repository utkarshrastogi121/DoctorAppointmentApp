import { useEffect, useState } from 'react';
import DoctorCard from './../../components/Doctors/DoctorCard';
import Testimonial from '../../components/Testimonial/Testimonial';
import { BASE_URL } from '../../../config';
import useFetchData from '../../hooks/useFetchData';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';

const Doctors = () => {
  const [query, setQuery] = useState('');
  const [debounceQuery, setDebounceQuery] = useState('');

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query.trim());
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  const { data: doctors, loading, error } = useFetchData(
    `${BASE_URL}/doctors?query=${debounceQuery}`
  );

  const handleSearch = () => {
    setDebounceQuery(query.trim());
  };

  return (
    <>
      {/* Search Section */}
      <section className="bg-[#fff9ea] py-10">
        <div className="container text-center">
          <h2 className="heading">Find A Doctor</h2>
          <div className="max-w-[570px] mt-8 mx-auto bg-[#0066ff2c] rounded-md flex items-center">
            <input
              type="search"
              placeholder="Search Doctor by name or specialization"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none placeholder:text-textColor"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn mt-0 rounded-r-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-10">
        <div className="container">
          {loading && <Loading />}
          {error && <Error errMessage={error} />}

          {!loading && !error && doctors?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          ) : (
            !loading &&
            !error && (
              <p className="text-center text-headingColor mt-10">
                No doctors found
              </p>
            )
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-10">
        <div className="container">
          <div className="xl:w-[470px] mx-auto text-center mb-8">
            <h2 className="heading">What Our Patients Say</h2>
            <p className="text__para">
              World-Class Care For Everyone. Our Health System Offers Unmatched,
              Expert Health Care.
            </p>
          </div>

          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;

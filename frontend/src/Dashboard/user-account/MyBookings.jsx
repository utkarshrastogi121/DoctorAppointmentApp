import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../../config";
import DoctorCard from "../../components/Doctors/DoctorCard";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const MyBookings = () => {
  const { data, loading, error } = useFetchData(
    `${BASE_URL}/users/appointments/my-appointments`
  );

  const appointments = Array.isArray(data) ? data : [];

  if (loading) return <Loading />;
  if (error) return <Error errMessage={error} />;

  return (
    <div>
      {appointments.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map((appointment) =>
            appointment?.doctor ? (
              <DoctorCard
                key={appointment._id}
                doctor={appointment.doctor}
              />
            ) : null
          )}
        </div>
      ) : (
        <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
          You have not booked any doctor yet!
        </h2>
      )}
    </div>
  );
};

export default MyBookings;

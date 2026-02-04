import { formatDate } from '../../utils/formatDate'
import defaultPhoto from "../../assets/images/default.jpeg"

const Appointments = ({ appointments }) => {
  return (
    <table className="w-full text-left text-sm text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">Name</th>
          <th scope="col" className="px-6 py-3">Gender</th>
          <th scope="col" className="px-6 py-3">Payment</th>
          <th scope="col" className="px-6 py-3">Price</th>
          <th scope="col" className="px-6 py-3">Booked On</th>
        </tr>
      </thead>

      <tbody>
        {appointments?.map(item => (
          <tr key={item._id}>
            <th
              scope="row"
              className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
            >
              <img
                src={item.user.photo || defaultPhoto}
                alt=""
                className="w-10 h-10 rounded-full"
              />
              <div className="pl-3">
                <div className="text-base font-semibold">{item.user.name}</div>
                <div className="text-normal text-gray-500">{item.user.email}</div>
              </div>
            </th>

            <td className="px-6 py-4">{item.user.gender}</td>

            <td className="px-6 py-4">
              {item.isPaid ? (
                <span className="inline-flex items-center px-2 py-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full">
                  Paid
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-1 text-sm font-semibold text-red-800 bg-red-100 rounded-full">
                  Unpaid
                </span>
              )}
            </td>

            <td className="px-6 py-4">Rs. {item.ticketPrice}</td>
            <td className="px-6 py-4">{formatDate(item.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Appointments

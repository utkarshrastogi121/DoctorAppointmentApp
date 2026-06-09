import { useState, useEffect,useContext } from 'react';
import uploadImageToCloudinary from '../../utils/uploadCloudinary.js';
import { BASE_URL } from '../../../config.js';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
import { authContext } from '../../context/AuthContext';
import defaultPhoto from '../../assets/images/default.webp';

const Profile = ({ user }) => {
  const { token } = useContext(authContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photo: null,
    gender: '',
    bloodType: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        photo: user.photo ,
        gender: user.gender || '',
        bloodType: user.bloodType || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const data = await uploadImageToCloudinary(file);
      setSelectedFile(file);
      setFormData({ ...formData, photo: data.url });
    } catch (err) {
      toast.error('Failed to upload image');
    }
  };

  const submitHandler = async (event) => {
  event.preventDefault();
  setLoading(true);

  try {
    const res = await fetch(`${BASE_URL}/users/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.message || 'Something went wrong');

    toast.success(result.message);

    window.location.reload();

  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="mt-10">
      <form onSubmit={submitHandler}>
        {/* Name */}
        <div className="mb-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
            required
          />
        </div>

        {/* Email (readonly) */}
        <div className="mb-5">
          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            readOnly
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] text-[16px] leading-7 text-headingColor placeholder:text-textColor bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Blood Type */}
        <div className="mb-5">
          <input
            type="text"
            name="bloodType"
            placeholder="Blood Type"
            value={formData.bloodType}
            onChange={handleInputChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
            required
          />
        </div>

        {/* Gender */}
        <div className="mb-5">
          <label className="text-headingColor font-bold text-[16px] leading-7">
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="ml-3 text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none border-b border-solid border-[#0066ff61]"
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </div>

        {/* Photo */}
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img src={formData.photo || defaultPhoto } alt="Profile" className="w-full h-full rounded-full" />
            </figure>
          )}
          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg,.png,.jpeg"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-3 py-2 text-[15px] leading-6 bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              {selectedFile ? selectedFile.name : 'Upload Photo'}
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-7">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 flex items-center justify-center"
          >
            {loading ? <HashLoader size={25} color="#ffffff" /> : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;

import { useState } from 'react';
import signupImg from '../assets/images/signup.gif';
import { Link, useNavigate } from 'react-router-dom';
import uploadImageToCloudinary from '../utils/uploadCloudinary.js';
import { BASE_URL } from '../../config.js';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const Signup = () => {
  const [photoURL, setPhotoURL] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: '',
    gender: '',
    role: 'patient',
    specialization: '',
    ticketPrice: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const data = await uploadImageToCloudinary(file);
      setPhotoURL(data.url);
      setFormData({ ...formData, photo: data.url });
    } catch (error) {
      toast.error('Failed to upload image. Please try again.');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Only send doctor fields if role is doctor
      const payload =
        formData.role === 'doctor'
          ? formData
          : { ...formData, specialization: undefined, ticketPrice: undefined };

      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Registration failed');

      toast.success(result.message);
      setLoading(false);
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 xl:px-0 py-10">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg shadow-md overflow-hidden">
          {/* Left Image */}
          <div className="hidden lg:block bg-primaryColor">
            <figure className="h-full flex items-center justify-center">
              <img src={signupImg} alt="Signup" className="w-full h-full object-cover" />
            </figure>
          </div>

          {/* Sign Up Form */}
          <div className="p-8 lg:p-16">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-8">
              Create An <span className="text-primaryColor">Account</span>
            </h3>

            <form onSubmit={submitHandler} className="space-y-5">
              {/* Full Name */}
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-headingColor placeholder:text-textColor"
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-headingColor placeholder:text-textColor"
              />

              {/* Password */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-headingColor placeholder:text-textColor"
              />

              {/* Role & Gender */}
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <label className="text-headingColor font-semibold flex-1">
                  Are You A:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="ml-2 px-4 py-2 text-textColor border rounded-md focus:outline-none w-full"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>

                <label className="text-headingColor font-semibold flex-1">
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="ml-2 px-4 py-2 text-textColor border rounded-md focus:outline-none w-full"
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </label>
              </div>

              {/* Doctor Fields */}
              {formData.role === 'doctor' && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    name="specialization"
                    placeholder="Specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor"
                  />
                  <input
                    type="number"
                    name="ticketPrice"
                    placeholder="Ticket Price"
                    value={formData.ticketPrice}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-b border-[#0066ff61] focus:outline-none focus:border-b-primaryColor"
                  />
                </div>
              )}

              {/* Photo Upload */}
              <div className="flex items-center gap-4">
                {photoURL && (
                  <figure className="w-[60px] h-[60px] rounded-full border-2 border-primaryColor flex items-center justify-center overflow-hidden">
                    <img src={photoURL} alt="Preview" className="w-full h-full object-cover" />
                  </figure>
                )}
                <div className="relative w-[150px] h-[50px]">
                  <input
                    type="file"
                    id="photo"
                    accept=".jpg,.png"
                    onChange={handleFileInputChange}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="photo"
                    className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#0066ff46] rounded-lg text-headingColor font-semibold cursor-pointer px-3"
                  >
                    Upload Photo
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-primaryColor text-white px-4 py-3 rounded-lg text-[18px] font-semibold flex justify-center items-center ${
                  loading
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:bg-blue-600 transition-all duration-300'
                }`}
              >
                {loading ? <HashLoader size={30} color="#fff" /> : 'Sign Up'}
              </button>

              {/* Login Link */}
              <p className="text-center text-textColor">
                Already have an account?
                <Link to="/login" className="text-primaryColor font-medium ml-1">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;

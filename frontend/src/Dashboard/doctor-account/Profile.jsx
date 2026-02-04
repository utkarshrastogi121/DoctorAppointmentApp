import React, { useState, useEffect, useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL } from "../../../config";
import { toast } from "react-toastify";
import { authContext } from "../../context/AuthContext";
import defaultPhoto from "../../assets/images/default.jpeg";

const DoctorProfile = ({ doctorData }) => {
  const { token } = useContext(authContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: "",
    photo: null,
  });

  useEffect(() => {
    if (doctorData) {
      setFormData({
        name: doctorData.name || "",
        email: doctorData.email || "",
        phone: doctorData.phone || "",
        bio: doctorData.bio || "",
        gender: doctorData.gender || "",
        specialization: doctorData.specialization || "",
        ticketPrice: doctorData.ticketPrice || 0,
        qualifications: doctorData.qualifications || [],
        experiences: doctorData.experiences || [],
        timeSlots: doctorData.timeSlots || [],
        about: doctorData.about || "",
        photo: doctorData.photo,
      });
    }
  }, [doctorData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const data = await uploadImageToCloudinary(file);
      setFormData({ ...formData, photo: data?.url });
    } catch (err) {
      toast.error("Failed to upload image");
    }
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Authentication token is missing. Please login again.");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Something went wrong");

      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const addItem = (key, item) => {
    setFormData((prev) => ({ ...prev, [key]: [...prev[key], item] }));
  };

  const handleReusableInputChangeFunc = (key, index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedItems = [...prev[key]];
      updatedItems[index][name] = value;
      return { ...prev, [key]: updatedItems };
    });
  };

  const deleteItem = (key, index) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  const addQualification = (e) => {
    e.preventDefault();
    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "MBBS",
      university: "KGMU",
    });
  };

  const addExperience = (e) => {
    e.preventDefault();
    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "Senior Surgeon",
      hospital: "KGMU",
    });
  };

  const addTimeSlots = (e) => {
    e.preventDefault();
    addItem("timeSlots", {
      day: "Sunday",
      startingTime: "10:00",
      endingTime: "16:30",
    });
  };

  return (
    <div>
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Profile Information
      </h2>

      <form onSubmit={updateProfileHandler}>
        {/* Name */}
        <div className="mb-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form__input"
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <input
            type="text"
            name="email"
            value={formData.email}
            placeholder="Email"
            className="form__input bg-gray-100 cursor-not-allowed"
            readOnly
          />
        </div>

        {/* Phone */}
        <div className="mb-5">
          <input
            type="text"
            name="phone"
            value={formData.phone}
            placeholder="Phone Number"
            onChange={handleInputChange}
            className="form__input"
          />
        </div>

        {/* Bio */}
        <div className="mb-5">
          <input
            type="text"
            name="bio"
            value={formData.bio}
            placeholder="Bio"
            maxLength={100}
            onChange={handleInputChange}
            className="form__input"
          />
        </div>

        {/* Gender, Specialization, Ticket Price */}
        <div className="grid grid-cols-3 gap-5 mb-5">
          <div>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="form__input py-3.5"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="form__input py-3.5"
            >
              <option value="">Select Specialization</option>
              <option value="surgeon">Surgeon</option>
              <option value="neurologist">Neurologist</option>
              <option value="dermatologist">Dermatologist</option>
            </select>
          </div>
          <div>
            <input
              type="number"
              name="ticketPrice"
              value={formData.ticketPrice}
              placeholder="Ticket Price"
              onChange={handleInputChange}
              className="form__input"
            />
          </div>
        </div>

        {/* Qualifications */}
        <div className="mb-5">
          <p className="form__label">Qualifications*</p>
          {formData.qualifications.map((item, index) => (
            <div key={index} className="mb-3">
              <div className="grid grid-cols-2 gap-5">
                <input
                  type="date"
                  name="startingDate"
                  value={item.startingDate}
                  onChange={(e) =>
                    handleReusableInputChangeFunc("qualifications", index, e)
                  }
                  className="form__input"
                />
                <input
                  type="date"
                  name="endingDate"
                  value={item.endingDate}
                  onChange={(e) =>
                    handleReusableInputChangeFunc("qualifications", index, e)
                  }
                  className="form__input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mt-2">
                <input
                  type="text"
                  name="degree"
                  value={item.degree}
                  onChange={(e) =>
                    handleReusableInputChangeFunc("qualifications", index, e)
                  }
                  className="form__input"
                />
                <input
                  type="text"
                  name="university"
                  value={item.university}
                  onChange={(e) =>
                    handleReusableInputChangeFunc("qualifications", index, e)
                  }
                  className="form__input"
                />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteItem("qualifications", index);
                }}
                className="bg-red-600 p-2 rounded-full text-white mt-2"
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button
            onClick={addQualification}
            className="bg-black text-white py-2 px-5 rounded"
          >
            Add Qualification
          </button>
        </div>

        {/* Experiences */}
        <div className="mb-5">
          <p className="form__label">Experiences*</p>
          {formData.experiences.map((item, index) => (
            <div key={index} className="mb-3">
              <div className="grid grid-cols-2 gap-5">
                <input
                  type="date"
                  name="startingDate"
                  value={item.startingDate}
                  onChange={(e) =>
                    handleReusableInputChangeFunc("experiences", index, e)
                  }
                  className="form__input"
                />
                <input
                  type="date"
                  name="endingDate"
                  value={item.endingDate}
                  onChange={(e) =>
                    handleReusableInputChangeFunc("experiences", index, e)
                  }
                  className="form__input"
                />
              </div>
              <div className="grid grid-cols-2 gap-5 mt-2">
                <input
                  type="text"
                  name="position"
                  value={item.position}
                  onChange={(e) =>
                    handleReusableInputChangeFunc("experiences", index, e)
                  }
                  className="form__input"
                />
                <input
                  type="text"
                  name="hospital"
                  value={item.hospital}
                  onChange={(e) =>
                    handleReusableInputChangeFunc("experiences", index, e)
                  }
                  className="form__input"
                />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteItem("experiences", index);
                }}
                className="bg-red-600 p-2 rounded-full text-white mt-2"
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button
            onClick={addExperience}
            className="bg-black text-white py-2 px-5 rounded"
          >
            Add Experience
          </button>
        </div>

        {/* Time Slots */}
        <div className="mb-5">
          <p className="form__label">Time Slots*</p>
          {formData.timeSlots.map((item, index) => (
            <div key={index} className="mb-3 grid grid-cols-4 gap-5">
              <select
                name="day"
                value={item.day}
                onChange={(e) =>
                  handleReusableInputChangeFunc("timeSlots", index, e)
                }
                className="form__input"
              >
                <option value="">Select Day</option>
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
              </select>
              <input
                type="time"
                name="startingTime"
                value={item.startingTime}
                onChange={(e) =>
                  handleReusableInputChangeFunc("timeSlots", index, e)
                }
                className="form__input"
              />
              <input
                type="time"
                name="endingTime"
                value={item.endingTime}
                onChange={(e) =>
                  handleReusableInputChangeFunc("timeSlots", index, e)
                }
                className="form__input"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  deleteItem("timeSlots", index);
                }}
                className="bg-red-600 p-2 rounded-full text-white"
              >
                <AiOutlineDelete />
              </button>
            </div>
          ))}
          <button
            onClick={addTimeSlots}
            className="bg-black text-white py-2 px-5 rounded"
          >
            Add TimeSlot
          </button>
        </div>

        {/* About */}
        <div className="mb-5">
          <textarea
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            placeholder="Write about you"
            rows={5}
            className="form__input"
          ></textarea>
        </div>

        {/* Photo Upload */}
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo || defaultPhoto}
                alt="Profile"
                className="w-full h-full rounded-full"
              />
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
              Upload Photo
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-7">
          <button
            type="submit"
            className="w-full bg-primaryColor text-white py-3 px-4 rounded-lg text-[18px]"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorProfile;

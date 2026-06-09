import React, { useState } from "react";
import PatientAvatar from "../../assets/images/patient-avatar.webp";
import { HiStar } from "react-icons/hi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  { name: "Akash Gupta", text: "I have taken Medical services from them, they treat so well and they are providing the best medical services." },
  { name: "Ayush Singh", text: "They have an excellent team of doctors and staff. The environment is very friendly, and they ensure the best care for their patients." },
  { name: "Rohan Mishra", text: "The doctors are very professional and caring. They listen to your concerns and provide the best possible treatment. Highly recommended!" },
  { name: "Harsh Rastogi", text: "The staff is very cooperative and understanding. They provide excellent service and ensure that all your needs are met with utmost care." },
  { name: "Prateek Shukla", text: "The facilities are top-notch, and the staff is extremely professional. They ensure that every patient receives personalized attention and care." },
  { name: "Ashish Yadav", text: "The experience was amazing! The doctors and staff are very friendly and professional. I highly recommend their services to everyone." },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsToShow = 3;
  const total = testimonials.length;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  // Get circular visible testimonials
  const visibleTestimonials = Array.from({ length: cardsToShow }).map((_, i) => {
    return testimonials[(currentIndex + i) % total];
  });

  return (
    <section className="py-16 bg-gray-50 relative">
      <div className="container mx-auto text-center">
        <h2 className="heading mb-4">What Our Patients Say</h2>
        <p className="text__para max-w-[600px] mx-auto mb-12">
          We value our patients' feedback and strive to provide the best care possible. Here's what some of our patients have to say about their experiences with us.
        </p>

        {/* Slider */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <FaChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          {/* Slider Cards */}
          <div className="flex gap-6">
            {visibleTestimonials.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md p-6 w-[350px] flex-shrink-0 transition-transform duration-500"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={PatientAvatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <h4 className="text-[18px] font-semibold text-headingColor">{item.name}</h4>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <HiStar key={i} className="text-yellowColor w-5 h-5" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-textColor text-[16px] leading-7 mt-4 text-left">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          >
            <FaChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;

import React from "react";

const AboutUs = () => {
  return (
    <section className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            About <span className="text-primaryColor">Us</span>
          </h1>

          <p className="mt-5 text-gray-600 max-w-3xl mx-auto leading-7">
            Welcome to <span className="font-semibold">MediCare</span>, your
            trusted healthcare appointment platform. We aim to make booking
            doctor appointments simple, fast, and hassle-free for everyone.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop"
              alt="Healthcare"
              className="rounded-2xl shadow-lg w-full"
            />
          </div>

          {/* Text Content */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-5">
              Who We Are
            </h2>

            <p className="text-gray-600 leading-7 mb-4">
              MediCare is a modern healthcare solution that connects patients
              with experienced doctors through an easy-to-use online platform.
              Our goal is to improve accessibility to quality healthcare
              services anytime and anywhere.
            </p>

            <p className="text-gray-600 leading-7 mb-6">
              We believe healthcare should be convenient and stress-free.
              Patients can browse doctors, check availability, and book
              appointments within minutes.
            </p>

            {/* Feature Cards */}
            <div className="grid gap-4">
              <div className="bg-white border rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-primaryColor text-lg">
                  Easy Booking
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Schedule appointments quickly with a seamless experience.
                </p>
              </div>

              <div className="bg-white border rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-primaryColor text-lg">
                  Verified Doctors
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Connect with trusted and experienced healthcare specialists.
                </p>
              </div>

              <div className="bg-white border rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-primaryColor text-lg">
                  Secure Platform
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Your information and appointments are safe and protected.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Our Mission
          </h2>

          <p className="mt-4 text-gray-600 max-w-3xl mx-auto leading-7">
            Our mission is to bridge the gap between patients and healthcare
            providers by using technology to create a smarter and more
            accessible healthcare experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
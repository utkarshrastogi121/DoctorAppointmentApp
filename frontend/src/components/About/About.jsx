import React from 'react';
import { Link } from 'react-router-dom';
import aboutImg from '../../assets/images/about.jpg';
import aboutCardImg from '../../assets/images/about-card.png';

function About() {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-16">

          {/* Images */}
          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start pl-12">
            <img 
              src={aboutImg} 
              alt="About Us" 
              className="max-w-[380px] w-full h-auto rounded-lg object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 max-w-[650px] mr-20">
            <h2 className="heading text-3xl lg:text-4xl">
              Proud To Be One Of The Nation's Best
            </h2>

            <p className="text__para mt-4">
              Welcome to Our Doctor's Appointment App! Our goal is to provide seamless healthcare access, enabling you to book appointments, access medical records, and receive personalized care, all in one place.
            </p>

            <p className="text__para mt-6">
              Introducing Our revolutionary Doctor's Appointment App! Designed with your convenience in mind, it streamlines the booking process, offers real-time availability, and provides secure communication with healthcare professionals. Experience hassle-free healthcare at your fingertips!
            </p>

            <Link to="/" className="inline-block mt-6">
              <button className="btn">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

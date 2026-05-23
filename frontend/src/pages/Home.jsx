import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

import hero1 from '../assets/images/hero1.png';
import hero2 from '../assets/images/hero2.jpg';
import hero3 from '../assets/images/hero3.jpg';
import icon01 from '../assets/images/icon01.png';
import icon02 from '../assets/images/icon02.png';
import icon03 from '../assets/images/icon03.png';
import faq from '../assets/images/faq.jpeg';

import About from '../components/About/About';
import FaqList from '../components/Faq/FaqList';
import Testimonial from '../components/Testimonial/Testimonial';

// AI Chatbot Import
import AIChatbot from '../components/chatbot/AIChatbot';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero__section pt-[60px] 2xl:h-[680px]">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center justify-between">

            {/* Hero Text */}
            <div className="lg:w-[570px]">
              <h1 className="text-[36px] leading-[46px] md:text-[60px] md:leading-[70px] font-[800] text-headingColor">
                We help patients live a healthy, longer life
              </h1>

              <p className="text__para mt-4">
                Our mission is to provide top-notch healthcare services,
                empowering individuals to achieve optimal wellness and
                improve their quality of life.
              </p>

              {/* Stats */}
              <div className="mt-8 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-10">

                <div className="text-center">
                  <h2 className="text-[36px] lg:text-[44px] font-[700] text-headingColor">
                    20+
                  </h2>

                  <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px] mx-auto"></span>

                  <p className="text__para mt-2">
                    Years Of Experience
                  </p>
                </div>

                <div className="text-center">
                  <h2 className="text-[36px] lg:text-[44px] font-[700] text-headingColor">
                    10+
                  </h2>

                  <span className="w-[100px] h-2 bg-purple-300 rounded-full block mt-[-14px] mx-auto"></span>

                  <p className="text__para mt-2">
                    Clinic Locations
                  </p>
                </div>

                <div className="text-center">
                  <h2 className="text-[36px] lg:text-[44px] font-[700] text-headingColor">
                    100%
                  </h2>

                  <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px] mx-auto"></span>

                  <p className="text__para mt-2">
                    Patient Satisfaction
                  </p>
                </div>

              </div>
            </div>

            {/* Hero Images */}
            <div className="hidden lg:flex gap-16 justify-end items-start">

              {/* Main Image */}
              <div className="flex-shrink-0">
                <img
                  src={hero1}
                  alt="Hero 1"
                  className="max-w-[350px] w-full h-auto rounded-lg shadow-md"
                />
              </div>

              {/* Small Images */}
              <div className="flex flex-col gap-4 mt-6">

                <img
                  src={hero2}
                  alt="Hero 2"
                  className="max-w-[180px] w-full h-auto rounded-lg shadow-md"
                />

                <img
                  src={hero3}
                  alt="Hero 3"
                  className="max-w-[180px] w-full h-auto rounded-lg shadow-md mt-28"
                />

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">

          <div className="max-w-[470px] mx-auto">
            <h2 className="heading">
              Providing The Best Medical Services
            </h2>

            <p className="text__para mt-4">
              World-Class Care For Everyone. Our Health System Offers
              Unmatched, Expert Health Care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 mt-10">

            {[
              {
                icon: icon01,
                title: 'Find A Doctor',
                desc:
                  'Easily search and connect with experienced doctors for your healthcare needs.',
                link: '/doctors',
              },

              {
                icon: icon02,
                title: 'Choose A Location',
                desc:
                  'Locate our clinics and healthcare facilities near you for convenient access.',
                link: '/doctors',
              },

              {
                icon: icon03,
                title: 'Book Appointment',
                desc:
                  'Schedule appointments with our expert doctors at your convenience.',
                link: '/doctors',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="py-8 px-5 text-center border rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <img
                  src={service.icon}
                  alt={service.title}
                  className="mx-auto"
                />

                <h3 className="text-[26px] font-[700] text-headingColor mt-6">
                  {service.title}
                </h3>

                <p className="text-textColor mt-4">
                  {service.desc}
                </p>

                <Link
                  to={service.link}
                  className="inline-flex items-center justify-center mt-6 w-12 h-12 mx-auto rounded-full border border-[#181A1E] hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="text-lg text-headingColor group-hover:text-white" />
                </Link>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto">

          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">

            <div className="w-full md:w-1/2">
              <h2 className="heading mb-6">
                Most Questions By Our Beloved Patients
              </h2>

              <FaqList />
            </div>

            <div className="w-full md:w-1/2 flex justify-center md:justify-end mr-24">

              <img
                src={faq}
                alt="FAQ"
                className="max-w-[300px] w-full h-auto rounded-lg shadow-md"
              />

            </div>

          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <Testimonial />

      {/* AI Chatbot */}
      <AIChatbot />
    </>
  );
};

export default Home;
import React from 'react';
import MacbookImage from '../assets/Macbook.png'
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
<div 
  className="
    w-screen
    min-h-screen
    bg-[#E5ECF4]
    mx-auto
    flex
    items-center
    justify-center
    overflow-hidden
  "
>
  {/* Modal-Like Box */}
  <div 
    className="
      bg-[#B2DFEA]
      shadow-lg
      rounded-lg
      p-28
      w-[90%]       /* Increase default width */
      max-w-[1000px] /* Increase maximum width */
      min-h-[700px]  /* Set a minimum height */
      flex
      flex-col
      items-center
      text-center
      transform
      transition-transform
    "
  >
    {/* Heading */}
    <h1 
      className="
        text-4xl
        font-bold
        mb-4
      "
    >
      TeleHealth Insights
    </h1>

    {/* Subheading */}
    <p 
      className="
        text-lg
        text-black
        mb-6
        max-w-[600px]
        leading-relaxed
      "
    >
      Empower bilingual families to conduct at-home speech and language
      assessments with confidence through our intuitive telehealth solution.
    </p>

    {/* Buttons */}
    <div 
      className="
        flex
        gap-6
        mb-8
      "
    >
      <Link
      to="/clinicians/login"
        className="
          px-8
          py-3
          bg-[#1E293B]
          text-white
          text-lg
          rounded-full
          hover:bg-[#0F172A]
          transition-colors
        "
        aria-label="Clinicians login"
      >
        Clinicians login
      </Link>

      <Link
      to="/parents/login"
        className="
          px-8
          py-3
          bg-[#1E293B]
          text-white
          text-lg
          rounded-full
          hover:bg-[#0F172A]
          transition-colors
        "
        aria-label="Parents login"
      >
        Parents login
      </Link>
    </div>

    {/* Fixed Laptop Image */}
    <img
      src={MacbookImage}
      alt="TeleHealth platform interface"
      className="w-[400px] object-contain"
    />
  </div>
</div>
  );
};

export default LandingPage;

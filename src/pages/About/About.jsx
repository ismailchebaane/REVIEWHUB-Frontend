import React from 'react';
import { Link } from 'react-router-dom';

const user = localStorage.getItem("user")


const About = () => {
  return (
    <div className="bg-gray-100 mt-[90px] px-8 sm:px-16 py-12 lg:px-24 xl:px-32">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-600 mb-8">
          About Our Review Website
        </h1>
        <p className="text-gray-600 text-lg mb-12">
          Welcome to our review website! Our platform is dedicated to providing honest and helpful reviews of cafes, restaurants, and other destinations to help you make informed decisions about where to go. Our community of reviewers is made up of people just like you who have visited these places and want to share their experiences with others.
        </p>
        <h2 className="text-3xl font-bold text-orange-600 mb-8">
          Our Mission
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          Our mission is to empower consumers by providing a platform for them to share their opinions and experiences with others. We believe that by giving people a voice, we can help create a more transparent and fair marketplace. We are committed to maintaining the integrity of our platform and ensuring that our reviews are unbiased and trustworthy.
        </p>
        <h2 className="text-3xl font-bold text-orange-600 mb-8">
          Join Our Community
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          We invite you to join our community of reviewers and share your experiences with others. By leaving reviews on our website, you can help others make informed decisions and discover new places to visit. You can also follow us on social media to stay up-to-date on the latest reviews and recommendations from our community.
        </p>
        {user ? null : (
  <Link
    to="/signup"
    className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md transition duration-300"
  >
    Sign Up Now
  </Link>
)}

      </div>
    </div>
  );
};

export default About;

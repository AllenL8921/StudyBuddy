// pages/Home.js

// Import Components
import Navbar from '../components/GeneralComponents/Navbar';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />

      <div id="aboutus">
        <AboutUs />
      </div>

      <div className="container bg-gray mx-auto p-4">
        <h2 className="text-2xl font-bold text-center mt-8">Explore More</h2>
        {/* Add additional sections or components here */}

      </div>

      <div className="container bg-gray-100 mx-auto p-4">
        <h2 className="text-2xl font-bold text-center mt-8">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 mt-8">

          {/* Team Member 1 */}
          <div className="text-center bg-white p-4 rounded-lg shadow-md">
            {/* Path to image */}
            <img src="path-to-image1.jpg" alt="Team Member 1" className="w-32 h-32 mx-auto rounded-full mb-4" />
            <h3 className="text-lg font-semibold">Allen Liu</h3>
            {/* Add Description */}

          </div>

          {/* Team Member 2 */}
          <div className="text-center bg-white p-4 rounded-lg shadow-md">
            {/* Path to image */}
            <img src="path-to-image2.jpg" alt="Team Member 2" className="w-32 h-32 mx-auto rounded-full mb-4" />
            <h3 className="text-lg font-semibold">Shuyi Zhou</h3>
            {/* Add Description */}

          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Home;

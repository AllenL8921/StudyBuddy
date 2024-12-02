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

      <div className="container bg-gray mx-auto p-4">
        <h2 className="text-2xl font-bold text-center mt-8">Meet the Team</h2>
        {/* Add additional sections or components here */}
      </div>

      <Footer />
    </>
  );
};

export default Home;

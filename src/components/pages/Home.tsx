import About from "./sections/About";
import Contacts from "./sections/Contact";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import ArrowButtonUp from "../ui/ArrowButtonUp";

const Home = () => {
  return (
    <div className="w-full h-full">
      <Hero />
      <div id="about">
        <About />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="contact">
        <Contacts />
      </div>
      <Footer />
      <div className="z-10">
        <ArrowButtonUp />
      </div>
    </div>
  );
};

export default Home;

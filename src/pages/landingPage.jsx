import Footer from "../componentx/Footer";
import Kit from "../componentx/Kit";
import Nav from "../componentx/Nav";
import Newsletter from "../componentx/Newsletter";
import Quality from "../componentx/Quality";
import Services from "../componentx/Services";
import Slider from "../componentx/Slider";
import Top from "../componentx/Top";
import "../styles.css"
import 'aos-animations/dist/animations.min.css';
import 'aos-animations/dist/animations.min.js';

const LandingPage = () => {
  return (
    <div>
      <Top/>
      <Nav />
      <Slider />
      <Quality />
      <Services />
      <Kit />
      <Newsletter />
      <Footer />
    </div>
  )
};

export default LandingPage;

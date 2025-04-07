import TrueAutoAfter from "../assets/TrueAutoAfter.jpg";
import TrueAutoGray from "../assets/TrueAutoBeforeGray.jpg";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import { FaArrowCircleRight } from "react-icons/fa";
import { motion } from "motion/react";

function LandingPageHero() {
  const FIRST_IMAGE = {
    imageUrl: TrueAutoGray,
  };
  const SECOND_IMAGE = {
    imageUrl: TrueAutoAfter,
  };

  return (
    <>
      <div className="landing-container">
        <div className="gradient-top"></div>
        <div className="gradient-bottom"></div>
        <span className="blur-span left"></span>
        <span className="blur-span right"></span>

        <div className="landing-inner-container">
          <motion.div
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
            transition={{ duration: 2.0 }}
          >
            <div className="cta-callout">
              <h1>
                Boost Your Business with Custom Web Design in the{" "}
                <span>Coastal Bend</span>
              </h1>
              <div className="cta-inner">
                <p>
                  Helping local businesses thrive with stunning, user-friendly
                  websites that attract more customers and drive growth. Let's
                  build your online presence today.
                </p>
                <a href="#contact" className="primary-button">Get Your Free Quote</a>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 1000 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2.0 }}
          >
            <div className="before-after-container">
              <ReactBeforeSliderComponent
                firstImage={FIRST_IMAGE}
                secondImage={SECOND_IMAGE}
                delimiterIconStyles={{ scale: 1.5 }}
              />
              <p>
                Drag handle to see the transformation{" "}
                <span>
                  {" "}
                  <FaArrowCircleRight />{" "}
                </span>
              </p>
            </div>
          </motion.div>
          {/* <div className="benefits-block">
                    <div className="left-block">
                    <div className="icon">
                        <MdOutlineAttachMoney />
                    </div>
                    <div className="icon-content">
                        <p>Convert more sales</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, quaerat.</p>
                    </div>
                    </div>
                    <div className="right-block">
                    <div className="icon">
                        <MdOutlineAttachMoney />
                    </div>
                    <div className="icon-content">
                    <p>Convert more sales</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, quaerat.</p>
                    </div>
                    </div>
                </div> */}
        </div>
      </div>
    </>
  );
}

export default LandingPageHero;

import hiveimg from '../assets/hiveprofileimg.png/';
import RobertHero from '../assets/robertHero.png';
import Rypic from '../assets/ryanpic.jpeg';

import './section.css';

function HeroSection() {
  return (
    <>
      <div className="hero-container w-full ">
        <div className="gradient-top"></div>
        <div className="gradient-bottom"></div>
        <span className="blur-span left"></span>
        <span className="blur-span right"></span>
        <div className="hero-container-inner">
          <div className="content text-left  flex flex-col gap-[30px]">
            <h1>
              Hello World, <br></br>I'm<span> Ryan Rodriguez </span>
              <br></br> <h1 className="email">officialryanrod@gmail.com </h1>
            </h1>

            <p>Creative web developer based in Robstown, TX</p>
            <div className="button-wrap">
              <a
                href="Ryan Rodriguez Frontend Developer Resume.pdf"
                className="primary-button"
              >
                Download Resume
              </a>
            </div>
          </div>
          <div className="img flex items-center justify-center">
            <div className="img-label">
              <span>Web Developer</span>
            </div>
            <div className="img-circle"></div>
            <img src={Rypic} className="Rypic" />
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;

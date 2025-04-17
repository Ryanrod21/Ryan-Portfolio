import Slider from 'react-slick';
import { skillsData } from '../data/SkillsData';

export default function LogoSlider() {
  const renderedLogos = skillsData.map((logo, index) => {
    return (
      <div key={index} className="skillLogo">
        <img src={logo.skillLogo} />
        <p>{logo.skill}</p>
      </div>
    );
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: 'linear',
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };
  return (
    <div className="slider-container" id="skills">
      <div className="slider-content">
        <h2>My Experience</h2>
        <p>
          I've been designing websites for a year focusing on creating intuitive
          user experiences and visually appealing interfaces. My approach blends
          clean design principles with a user-centered mindset, ensuring that
          every website I build not only looks great but also functions
          seamlessly across devices. Here are some of my skills:
        </p>
      </div>
      <Slider {...settings}>{renderedLogos}</Slider>
    </div>
  );
}

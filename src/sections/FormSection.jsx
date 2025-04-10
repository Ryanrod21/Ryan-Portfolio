import { useState } from "react";
import { motion } from "motion/react";
import HubspotForm from "../components/HubspotForm";
import RyanResPic from '../assets/RyanResPic.png'
import RobPortfolio from "../assets/robresume.jpg"

function FormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFadeOut(true);

    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  };

  return (
    <>
      <div id="contact" className="contactForm">
        <h2>
          Let's get in touch!  
        </h2>
        <p>Feel free to reach out to me via email or download my resume for more information.</p>
         <p>
          Email: officialryanrod@gmail.com  
        </p>
        <a href="/RyanRes.pdf" className="primary-button">Download Resume</a>
        <div
          className="contact-div"
          
        >
          <img src={RyanResPic} />
        </div>
      </div>
    </>
  );
}

export default FormSection;

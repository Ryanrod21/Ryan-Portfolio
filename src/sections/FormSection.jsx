import { useState } from "react";
import { motion } from "motion/react";
import HubspotForm from "../components/HubspotForm";
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
          Email: robgh4@yahoo.com
        </p>
        <a href="/robres.pdf" className="primary-button">Download Resume</a>
        <div
          className="contact-div"
          
        >
          <img src={RobPortfolio} />
        </div>
      </div>
    </>
  );
}

export default FormSection;

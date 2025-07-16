import { useState } from 'react';
import { motion } from 'motion/react';
import HubspotForm from '../components/HubspotForm';
import RyanRodriguez_WebDeveloper_Resume from '../assets/RyanRodriguez_WebDeveloper_Resume.png';

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
        <h2>Let's get in touch!</h2>
        <p>
          Feel free to reach out to me via email or download my resume for more
          information.
        </p>
        <p>Email: officialryanrod@gmail.com</p>
        <a
          href="/RyanRodriguez_WebDeveloper_Resume.pdf"
          className="primary-button"
        >
          Download Resume
        </a>
        <div className="contact-div">
          <img src={RyanRodriguez_WebDeveloper_Resume} />
        </div>
      </div>
    </>
  );
}

export default FormSection;

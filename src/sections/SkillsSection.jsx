import { skillsData2 } from "../data/SkillsData";
import { useState, useRef, useEffect } from "react";

function SkillsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const indicatorRef = useRef(null);
  const menuRefs = useRef([]);

  useEffect(() => {
    if (indicatorRef.current && menuRefs.current[activeIndex]) {
      const activeItem = menuRefs.current[activeIndex];
      indicatorRef.current.style.top = `${activeItem.offsetTop}px`;
      indicatorRef.current.style.height = `${activeItem.offsetHeight}px`;
    }

    const timeout = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % skillsData2.length);
    }, 12000);

    return () => clearTimeout(timeout);
  }, [activeIndex]);

  const handleImageClick = (index) => {
    setActiveIndex(index);
  };

  const renderedListItems = skillsData2.map((skill, index) => {
    return (
      <li
        className={`menu-item ${activeIndex === index ? "active" : ""}`}
        ref={(el) => (menuRefs.current[index] = el)}
        onClick={() => {
          handleImageClick(index);
        }}
        key={index}
      >
        {skill.skill}
      </li>
    );
  });

  return (
    <>
      <div id="skills" className="skills-section">
        <h2>Our Simple, Proven Process for Your Custom Web Design Project</h2>
        <div className="skills-container">
          <div className="gradient-top"></div>
          <div className="gradient-bottom"></div>

          <div className="skills-list">
            <ul>
              {renderedListItems}
              <div className="active-indicator" ref={indicatorRef}></div>
            </ul>
          </div>
          <div className="skills-logos ">
            <img src={skillsData2[activeIndex].skillLogo} />
            <p>{skillsData2[activeIndex].skillDescription}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SkillsSection;

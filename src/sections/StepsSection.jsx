import { skillsData2 } from "../data/SkillsData";
import {
  TbCircleNumber1,
  TbCircleNumber2,
  TbCircleNumber3,
} from "react-icons/tb";
import { useState, useEffect } from "react";

const StepsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  const iconSize = 60;

  const numberedIcons = [
    <TbCircleNumber1 size={iconSize} key={1} />,
    <TbCircleNumber2 size={iconSize} key={2} />,
    <TbCircleNumber3 size={iconSize} key={3} />,
  ];

  const renderedStepBlocks = skillsData2.map((step, index) => {
    return (
      <div
        key={index}
        className={`step-block ${index === activeIndex ? "active" : ""}`}
      >
        <div className="step-icon">{numberedIcons[index]}</div>
        <div className="step-heading">{step.skill}</div>
        <div className="step-description">{step.skillDescription}</div>
      </div>
    );
  });

  return (
    <>
      <div className="steps-section">
        <h2>Your Custom Web Design Project in 3 simple steps!</h2>
        <div className="steps-inner">{renderedStepBlocks}</div>
      </div>
    </>
  );
};

export default StepsSection;

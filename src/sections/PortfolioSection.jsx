import { useState } from 'react';
import { motion } from 'motion/react';

function PortfolioSection({ portfolioItems }) {
  const [activeNav, setActiveNav] = useState(-1);
  const [currentAtt, setCurrentAtt] = useState('all');
  const [openSelect, setOpenSelect] = useState(false);

  const resetNav = () => {
    setActiveNav(-1);
    setCurrentAtt('all');
  };

  const handleFilter = (industry, index) => {
    setActiveNav(index);
    setCurrentAtt(industry);
  };

  const handleSelectFilter = (e) => {
    setCurrentAtt(e.target.value);
  };

  const handleOpenSelect = () => {
    setOpenSelect((prev) => !prev);
  };

  const filteredItems =
    currentAtt === 'all'
      ? portfolioItems
      : portfolioItems.filter((port) => port.industry === currentAtt);

  const uniqueIndustries = Array.from(
    new Set(portfolioItems.map((item) => item.industry))
  ).sort();

  return (
    <div id="portfolio" className="portfolioSection">
      <h2 className="text-center">Check out my latest projects</h2>

      {/* Animated Navigation List */}
      {/* <motion.ul 
        className="portfolio-navigation"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }} // Ensures animation runs only once
      >
        <motion.li
          className={activeNav < 0 ? "active" : ""}
          onClick={resetNav}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          All
        </motion.li>

        {uniqueIndustries.map((industry, index) => (
          <motion.li
            className={activeNav === index ? "active" : ""}
            onClick={() => handleFilter(industry, index)}
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {industry}
          </motion.li>
        ))}
      </motion.ul> */}

      {/* <div
        className={`portfolio-navigation-mobile-container ${
          openSelect ? "active" : ""
        }`}
      >
        <select
          onChange={handleSelectFilter}
          onClick={handleOpenSelect}
          value={currentAtt}
          className="portfolio-navigation-mobile"
        >
          <option value="all" className={activeNav < 0 ? "active" : ""}>
            All
          </option>
          {uniqueIndustries.map((industry, index) => (
            <option
              className={activeNav === index ? "active" : ""}
              key={index}
              value={industry}
            >
              {industry}
            </option>
          ))}
        </select>
      </div> */}

      {/* Animated Portfolio Items */}
      <motion.div
        className="portfolioContainer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {filteredItems.map((port, index) => (
          <motion.div
            data-Att={port.industry}
            key={index}
            className="portfolio-item text-white flex flex-col items-center"
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <img src={port.image} alt={port.title} />
            <h3>{port.title}</h3>
            <p>
              <em>{port.description}</em>
            </p>
            <a href={port.link} className="primary-button" target="_blank">
              View my webpage
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default PortfolioSection;

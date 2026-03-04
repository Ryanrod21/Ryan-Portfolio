import { useState } from "react";
import { motion } from "motion/react";

function PortfolioSection({ portfolioItems }) {
	const [activeNav, setActiveNav] = useState(-1);
	const [currentAtt, setCurrentAtt] = useState("all");
	const [openSelect, setOpenSelect] = useState(false);

	const resetNav = () => {
		setActiveNav(-1);
		setCurrentAtt("all");
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
		currentAtt === "all"
			? portfolioItems
			: portfolioItems.filter((port) => port.industry === currentAtt);

	const uniqueIndustries = Array.from(
		new Set(portfolioItems.map((item) => item.industry)),
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
						data-att={port.industry}
						key={index}
						className="portfolio-item text-white flex flex-col items-center p-4 bg-gray-900 rounded-md transform transition duration-300 hover:scale-105 hover:shadow-xl"
						initial={{ opacity: 0, x: -50, scale: 0.8 }}
						whileInView={{ opacity: 1, x: 0, scale: 1 }}
						transition={{ duration: 0.5, delay: index * 0.2 }}
						viewport={{ once: true }}
					>
						{/* Image with hover zoom */}
						<img
							src={port.image}
							alt={`${port.title} project screenshot`}
							className="mb-4 rounded-md "
						/>

						{/* Title */}
						<h3 className="text-xl font-bold mb-2">{port.title}</h3>

						{/* Description */}
						<p className="mb-2 whitespace-pre-line text-center">
							<em>{port.description}</em>
						</p>

						{/* Featured Section */}
						{port.featured && port.featured.length > 0 && (
							<div className="mt-2 text-left w-full max-w-md">
								<h4 className="font-semibold mb-1">Featured:</h4>
								<ul className="list-disc list-inside ml-4">
									{port.featured.map((item, i) => (
										<li key={i}>{item}</li>
									))}
								</ul>
							</div>
						)}

						{/* Link */}
						<div className="flex space-x-3 mt-4">
							{port.link && (
								<a
									href={port.link}
									className="primary-button px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 transition"
									target="_blank"
									rel="noopener noreferrer"
								>
									View my webpage
								</a>
							)}

							{port.gitLink && (
								<a
									href={port.gitLink}
									className="primary-button px-4 py-2 bg-gray-800 rounded text-white hover:bg-gray-700 transition"
									target="_blank"
									rel="noopener noreferrer"
								>
									View my Code
								</a>
							)}
						</div>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}

export default PortfolioSection;

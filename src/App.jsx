import LandingPageHero from "./sections/LandingPageHero";
import HeroSection from "./sections/HeroSection";
import PortfolioSection from "./sections/PortfolioSection";
import FormSection from "./sections/FormSection";
import Navbar from "./components/Navbar";
import LogoSlider from "./sections/LogoSlider";
import { useState } from "react";
import portfolioData from "./data/PortfolioData";
import ReviewsSection from "./sections/ReviewsSection";
import StepsSection from "./sections/StepsSection";
import Chatbox from "./components/Chatbox";

function App() {
	return (
		<>
			<Navbar />
			<HeroSection />
			<PortfolioSection portfolioItems={portfolioData} />
			{/* <StepsSection /> */}
			<LogoSlider />
			<FormSection />
			<Chatbox />
		</>
	);
}

export default App;

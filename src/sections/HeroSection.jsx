import Rypic from "../assets/ryan-port-pic.png";
import Chatbox from "../components/Chatbox";

import "./section.css";

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
							<br></br> <p className="email">officialryanrod@gmail.com </p>
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
						<img src={Rypic || null} alt="Ryan Picture" className="Rypic" />
					</div>
				</div>
			</div>
		</>
	);
}

export default HeroSection;

import hiveimg from "../assets/hiveprofileimg.png/";
import RobertHero from "../assets/robertHero.png"


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
              Hello World, <br></br>I'm<span> Robert Rodriguez </span><br></br>robgh4@yahoo.com{" "}
            </h1>

            <p>
            Creative web designer based in San Antonio, TX
            </p>
            <div className="button-wrap">
              <a href="/robres.pdf" className="primary-button">Download Resume</a>
            </div>
          </div>
          <div className="img flex items-center justify-center">
            <div className="img-label">
              <span>Web Designer</span>
            </div>
            <div className="img-circle"></div>
            <img src={RobertHero} />
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;

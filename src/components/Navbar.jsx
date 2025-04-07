import headerMenu from "../data/MenuData";
import logo from "../assets/r2logo.png";
import ThemeMode from "./ThemeMode";

function Navbar() {
  const lastNavIndex = headerMenu.length - 1;

  const renderedHeader = headerMenu.map((item, index) => {
    return (
      <li onClick={() => {}} key={index}>
        <a
          className={`${
            lastNavIndex === index ? "primary-button" : "nav-item"
          }`}
          href={item.link}
        >
          {item.text}
        </a>
      </li>
    );
  });

  return (
    <>
      <div className="headerContainer">
        <div className="homeHeader">
          <img src={logo} />
          <ul className="desktop-nav">
            {renderedHeader}{" "}
            <li>
              <ThemeMode />
            </li>
          </ul>
          
        </div>
      </div>
    </>
  );
}

export default Navbar;

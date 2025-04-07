import { useTheme } from "../store/context/ThemeContext";
import { useEffect } from "react";
import Sun from "../assets/sun.png";
import Moon from "../assets/moon.png";

const ThemeMode = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {

    const currentMode = isDarkMode ? "dark" : "light"

    const root = document.getElementById("root")
    root.classList.remove("light", "dark")
    root.classList.add(currentMode)


  }, [isDarkMode])

  return (
    <>
      <div
        onClick={toggleTheme}
        className={`toggle-container ${isDarkMode ? "dark" : "light"}`}
      >
        <img className="moon" src={Moon} />
        <img className="sun" src={Sun} />
        <span className="toggle-slider"></span>
      </div>
    </>
  );
};

export default ThemeMode;

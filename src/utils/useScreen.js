import { useEffect, useState } from "react";

const UseScreen = () => {
  const [screen, setScreen] = useState({ with: 0, height: 0, loading: false });

  useEffect(() => {
    const setWindowSize = () => {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      setScreen({ with: windowWidth, height: windowHeight, loading: true });
    };
    setWindowSize();

    window.addEventListener("resize", setWindowSize);
    return () => window.removeEventListener("resize", setWindowSize);
  }, []);

  return screen;
};

export default UseScreen;

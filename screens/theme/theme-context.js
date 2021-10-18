import React from "react";
const themes = {
  dark: {
    backgroundColor: "black",
    backgroundCard: "#25282c",
    color: "white",
  },
  light: {
    backgroundColor: "#222238",
    backgroundCard: "#fff",
    color: "black",
  },
};
const initialState = {
  dark: true,
  theme: themes.dark,
  toggle: () => {},
};
const ThemeContext = React.createContext(initialState);
function ThemeProvider({ children }) {
  const [dark, setDark] = React.useState(true);

  // To toggle between dark and light modes
  const toggle = () => {
    setDark(!dark);
  };

  // Filter the styles based on the theme selected
  const theme = dark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ theme, dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
export { ThemeProvider, ThemeContext };

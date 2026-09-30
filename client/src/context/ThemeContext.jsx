
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {

    const [darkMode, setDarkMode] = useState(() => {

        const savedTheme = localStorage.getItem("smartCampusTheme");

        if (savedTheme === null) {
            return true;
        }

        return savedTheme === "dark";
    });

    useEffect(() => {

        if (darkMode) {

            document.body.classList.add("dark-mode");

            localStorage.setItem(
                "smartCampusTheme",
                "dark"
            );

        } else {

            document.body.classList.remove("dark-mode");

            localStorage.setItem(
                "smartCampusTheme",
                "light"
            );

        }

    }, [darkMode]);

    const toggleDarkMode = () => {

        setDarkMode((previousMode) => !previousMode);

    };

    return (

        <ThemeContext.Provider
            value={{
                darkMode,
                setDarkMode,
                toggleDarkMode
            }}
        >
            {children}
        </ThemeContext.Provider>

    );
}

export function useTheme() {

    return useContext(ThemeContext);

}

export default ThemeProvider;


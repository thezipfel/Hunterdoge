import { useEffect, useState } from "react";
import ReactGA from "react-ga";

const useGaTracker = () => {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!window.location.href.includes("localhost")) {
        ReactGA.initialize("UA-215524202-1");
        }
        setInitialized(true);
    }, []);

    useEffect(() => {
        if (initialized) {
        ReactGA.pageview(window.location.pathname + window.location.search);
        ReactGA.event({
            category: 'User',
            action: 'Opened HunterDoge Website'
          });
        }
    }, [initialized, window.location]);
};

export default useGaTracker;
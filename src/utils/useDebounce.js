import { useState } from "react";

const useDebounce = (func, delay) => {
    const [timer, setTimer] = useState(null);

    return (...args) => {
        clearTimeout(timer);

        let tempTimer = setTimeout(() => {
            func(...args);
        }, delay);

        setTimer(tempTimer);
    }
}

export default useDebounce;
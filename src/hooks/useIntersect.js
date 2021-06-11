import { useCallback, useEffect, useState } from "react";

const baseOption = {
  threshold: 1,
};
// { target: { current },
export const useIntersect = ({ option, callback }) => {
  const [intersectionObserver, setIntersectionObserver] = useState(null);

  const checkIntersect = useCallback(
    ([entry], observer) => {
      console.log("entry", entry);

      if (entry.isIntersecting) {
        callback(entry, observer);
      }
    },
    [callback]
  );

  useEffect(() => {
    // if (current) {
    const intersectionObj = new IntersectionObserver(checkIntersect, {
      ...baseOption,
      ...option,
    });
    // intersectionObj.observe(current);
    setIntersectionObserver(() => intersectionObj);
    // }
    return () => intersectionObserver && intersectionObserver.disconnect();
  }, []);
  // [current]
  return [intersectionObserver];
};

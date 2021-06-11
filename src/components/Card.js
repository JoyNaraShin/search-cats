import React, { useState, useEffect, useRef, useCallback } from "react";
import { useIntersect } from "../hooks/useIntersect";
import { MakeCard } from "./MakeCard";
import { fetchData } from "../api/index";

export const Card = () => {
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const target = useRef(null);
  const [inputValue, setInputValue] = useState("");

  const getData = useCallback(async () => {
    const list = await fetchData(pageNum);
    if (list.length > 0) setData((prev) => [...prev, ...list]);
  }, [pageNum]);

  useEffect(() => {
    try {
      setLoading(true);
      getData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [getData]);

  // IntersectionObserver hooks
  const [intersectionObserver] = useIntersect({
    // target,
    callback: (entry, observer) => {
      observer.unobserve(entry.target);
      setPageNum((prev) => prev + 1);
    },
    option: {},
  });

  useEffect(() => {
    if (target.current && intersectionObserver) {
      intersectionObserver.observe(target.current);
    }
    return () => {};
  }, [intersectionObserver, target, data]);

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <div>
      <input
        className="srch-input"
        type="text"
        value={inputValue}
        onChange={onChange}
      />
      <div className="container">
        {data
          ?.filter((item) => item.name.includes(inputValue))
          ?.map((item, idx, arr) => (
            <span key={idx} ref={idx === arr.length - 1 ? target : null}>
              <MakeCard
                altName={item.alt_names}
                name={item.name}
                image={item.image}
              />
            </span>
          ))}
      </div>
      <div className="spinner">{loading && "loading..."}</div>
    </div>
  );
};

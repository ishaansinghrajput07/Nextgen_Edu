import { useEffect, useState } from "react";

export default function CountUp({
  end = 0,
  duration = 2000,
  suffix = "",
  prefix = "",
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    if (end === 0) {
      setCount(0);
      return;
    }

    const incrementTime = 20;
    const totalSteps = Math.ceil(duration / incrementTime);
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </>
  );
}
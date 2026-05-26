"use client";
import CountUp from "react-countup";
const CountIncreaser = ({ number }: { number: number }) => {
  return <CountUp end={number} duration={12} />;
};

export default CountIncreaser;

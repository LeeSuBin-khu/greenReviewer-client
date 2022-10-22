import { useRef } from "react";

const useScroll = () => {
  const ele = useRef<HTMLDivElement>(null);
  const onScroll = () => {
    ele.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return { ele, onScroll };
};

export default useScroll;

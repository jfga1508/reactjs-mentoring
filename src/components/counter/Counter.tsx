import { createElement, useState } from "react";

const Counter = ({ initial }: { initial: number }) => {
  const [count, setCount] = useState(initial);

  return createElement(
    "div",
    { className: "card" },
    createElement(
      "button",
      { onClick: () => setCount((count) => count - 1) },
      "-"
    ),
    createElement("span", null, count),
    createElement(
      "button",
      { onClick: () => setCount((count) => count + 1) },
      "+"
    )
  );
};

export default Counter;

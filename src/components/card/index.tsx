import React from "react";

interface Props {
  color: string;
  width: string;
  height: string;
  border: string;
  children?: React.ReactNode;
}

const Card = ({ color, width, height, border, children }: Props) => {
  return (
    <div
      style={{
        backgroundColor: color,
        width,
        height,
        borderRadius: border,
      }}
      className={`flex shadow-xl flex-shrink-0`}
    >
      {children}
    </div>
  );
};

export default Card;

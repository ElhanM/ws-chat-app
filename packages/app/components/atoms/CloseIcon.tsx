import React from "react";

type Props = {
  onClick?: () => void;
};

const CloseIcon = ({ onClick = () => {} }: Props) => {
  return (
    <div className="cursor-pointer pb-4" onClick={onClick}>
      <svg
        aria-label="Close"
        fill="currentColor"
        height="18"
        role="img"
        viewBox="0 0 24 24"
        width="18"
      >
        <title>Close</title>
        <polyline
          fill="none"
          points="20.643 3.357 12 12 3.353 20.647"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        ></polyline>
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          x1="20.649"
          x2="3.354"
          y1="20.649"
          y2="3.354"
        ></line>
      </svg>
    </div>
  );
};

export default CloseIcon;

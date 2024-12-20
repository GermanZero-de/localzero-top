/*
This component is a SVG icon of an arrow pointing to the right.
*/

import React from 'react';

interface ArrowRightProps {
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ArrowRight: React.FC<ArrowRightProps> = ({
  color = '#696969',
  className,
  style,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 32"
    className={className}
    style={style}
  >
    <path
      fill={color}
      d="M8.453 5.2 13.201.452l14.876 14.875L13.626 29.78l-4.831-4.832 6.109-6.109-.12-.238-13.897-.215.204-6.8 13.564.175.108-.243-6.314-6.313.004-.004Z"
    />
  </svg>
);

export default ArrowRight;

import React from "react";
import "../styles/styles.scss";

interface CardProps {
  title: string;
  subtitle: string;
  stars: number;
  code: string;
}

const Card: React.FC<CardProps> = ({ title, subtitle, stars, code }) => {
  return (
    <div className="card">
      <div>
        <p className="subtitle">{subtitle}</p>
        <h3>{title}</h3>
      </div>
      <div className="card-bottom">
        <div className="stars">
          {Array.from({ length: stars }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
        <p className="code">{code}</p>
      </div>
    </div>
  );
};

export default Card;

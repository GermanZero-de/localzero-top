import React from "react";
import Link from "next/link";
import ArrowRight from "@/app/components/Arrow-Right";
import "../styles/Focuses.scss";
import { Blueprint } from "@/app/models/blueprint";

interface MeasureCardProps {
  blueprint: Blueprint;
}

const MeasureCard: React.FC<MeasureCardProps> = ({ blueprint }) => {
  const { title, sector, priority, focuses, code, cities } = blueprint;

  const focuseBalls = focuses.map((focus, index) => (
    <div key={index} className="focus-item">
      <div
        className="color-ball"
        style={{ backgroundColor: focus.color }}
      ></div>
    </div>
  ));

  return (
    <div className={`measure-card priority-${priority.stars}`}>
      <div className="card-header">
        <span className="sector">{sector.title}</span>
        <div className="stars">{"★".repeat(priority.stars)}</div>

      </div>
      <div className="card-body">
        <h5>{title}</h5>
        <div className="focuses">{focuseBalls}</div>
        <div className="code">
          <p>{code}</p>
        </div>
        <div className="cities">
          <span className="cities-icon">●</span>
          <div className="cities-list">
            {cities.map((city) => (
              <span key={city.title}>{city.title}</span>
            ))}
            </div>
        </div>
      </div>
      <div className="card-footer">
        <Link href={`/measures/${code}`}>
          {/* Wrapping the ArrowRight in a button to ensure consistent styling */}
          <button className="arrow-button">
            <ArrowRight color="#4b0082" style={{ height: 55, width: 55 }} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MeasureCard;

import React from "react";
import Link from "next/link";
import ArrowRight from "@/app/components/Arrow-Right";
import "../styles/Focuses.scss";
import { Blueprint } from "@/app/models/blueprint";
import Image from "next/image";
import cityIcon from "../photos/cityIconAlt.png";

interface MeasureCardProps {
  blueprint: Blueprint;
  hideArrow?: boolean; // New optional prop to control the visibility of the arrow
}

const MeasureCard: React.FC<MeasureCardProps> = ({ blueprint, hideArrow }) => {
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
        <div className="cities">
          <Image src={cityIcon} alt="City Icon" width={32} height={32} />
          <div className="cities-list">
            {cities.map((city) => (
              <div key={city.title} className="city-separator">
                <span>{city.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="code">
          <p>{code}</p>
        </div>
      </div>
      <div className="card-footer">
        {/* Conditionally render the arrow button based on the hideArrow prop */}
        {!hideArrow && (
          <Link href={`/measures/${code}`}>
            <button className="arrow-button">
              <ArrowRight color="#4b0082" style={{ height: 55, width: 55 }} />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MeasureCard;

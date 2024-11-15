// src/components/MeasureCard.tsx
import React from 'react';
import ArrowRight from "@/app/components/Arrow-Right";
import "../styles/Focuses.scss";
import {Blueprint} from "@/app/models/blueprint";

interface MeasureCardProps {
  blueprint: Blueprint;
  onOpenDetails: (measure: {
    blueprint: Blueprint;
  }) => void;
}

const MeasureCard: React.FC<MeasureCardProps> = ({
  blueprint,
  onOpenDetails,
}) => {
    const {title, sector, priority, focuses, code, cities} = blueprint;

    const focuseBalls = focuses.map((focus, index) => {
        return (
            <div key={index} className="focus-item">
                <div
                    className="color-ball"
                    style={{backgroundColor: focus.color}}
                ></div>
            </div>
        );
    })

  return (
    <div className={`measure-card priority-${priority.stars}`}>
      <div className='card-header'>
        <span className='sector'>{sector.title}</span>
        <div className='stars'>{'★'.repeat(priority.stars)}</div>
      </div>
        <div className='card-body'>
            <h5>{title}</h5>
            <div className="focuses">
                {focuseBalls}
            </div>
            <div className='code'>
                <p>{code}</p>
            </div>
        </div>
        <div className='card-footer'>
            <button
                className='arrow-button'
                onClick={() =>
                    onOpenDetails({
                        blueprint: blueprint
                    })
                }
            >
                <ArrowRight color='#4b0082' style={{height: 55, width: 55}} />
        </button>
      </div>
    </div>
  );
};

export default MeasureCard;

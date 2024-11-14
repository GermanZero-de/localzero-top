// src/components/MeasureCard.tsx
import React from 'react';
import ArrowRight from "@/app/components/Arrow-Right";
import "../styles/Focuses.scss";
import {Measure} from "@/app/Redo/Measure";

interface MeasureCardProps {
  measure: Measure;
  onOpenDetails: (measure: {
    measure: Measure;
  }) => void;
}

const MeasureCard: React.FC<MeasureCardProps> = ({
  measure,
  onOpenDetails,
}) => {
    const {title, sector, priority, focuses, code, cities} = measure;

    const focuseBalls = focuses.map((_focus, index) => {
        return (
            <div key={index} className="focus-item">
                <div
                    className="color-ball"
                    style={{backgroundColor: "#4b0082"}} // todo
                ></div>
            </div>
        );
    })

  return (
    <div className={`measure-card priority-${priority}`}>
      <div className='card-header'>
        <span className='sector'>{sector.title}</span>
        <div className='stars'>{'★'.repeat(priority)}</div>
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
                        measure: measure
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

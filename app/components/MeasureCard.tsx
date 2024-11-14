// src/components/MeasureCard.tsx
import React from 'react';
import ArrowRight from "@/app/components/Arrow-Right";
import "../styles/Focuses.scss";

interface MeasureCardProps {
  title: string;
  sector: string;
  priority: number;
  focuses: string[];
  code: string;
  onOpenDetails: (measure: {
    title: string;
    sector: string;
    priority: number;
    focuses: string[];
    code: string;
    description: string;
  }) => void;
}

const MeasureCard: React.FC<MeasureCardProps> = ({
  title,
  sector,
  priority,
  focuses,
  code,
  onOpenDetails,
}) => {
    const focuseBalls = focuses.map((focus, index) => {
        const [_, hexColor] = focus.split('::');
        if (focus.trim().length === 0) return <div></div>;
        return (
            <div key={index} className="focus-item">
                <div
                    className="color-ball"
                    style={{backgroundColor: hexColor}}
                ></div>
            </div>
        );
    })

  return (
    <div className={`measure-card priority-${priority}`}>
      <div className='card-header'>
        <span className='sector'>{sector}</span>
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
                        title,
                        sector,
                        priority,
                        focuses,
                        code,
                        description: 'Full description to be handled in MeasuresGrid',
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

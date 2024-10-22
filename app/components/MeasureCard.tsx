// src/components/MeasureCard.tsx
import React from "react";

interface MeasureCardProps {
  title: string;
  sector: string;
  priority: number;
  code: string;
  onOpenDetails: (measure: {
    title: string;
    sector: string;
    priority: number;
    code: string;
    description: string;
  }) => void;
}

const MeasureCard: React.FC<MeasureCardProps> = ({
  title,
  sector,
  priority,
  code,
  onOpenDetails,
}) => {
  return (
    <div className="measure-card">
      <div className="card-header">
        <span className="sector">{sector}</span>
        <div className="stars">{"★".repeat(priority)}</div>
      </div>
      <div className="card-body">
        <h5>{title}</h5>
        <p>{code}</p>
      </div>
      <div className="card-footer">
        <button
          className="arrow-button"
          onClick={() =>
            onOpenDetails({
              title,
              sector,
              priority,
              code,
              description:
                "Lorem ipsum dolor sit amet, commodo scriptorem ea sed, quo soluta eligendi molestie ut. Eu eam possit apeirian prodesset, nostrum commune cu vis, an mucius gubergren eum. Ex eum error eruditi euripidis, ut pro natum tritani, aliquando neglegentur pro ne. An placerat rationibus ius, mel meliore denique mnesarchum ea, ex nam rebum abhorreant. Vis ut corpora senserit mediocritatem.",
            })
          }
        >
          ➔
        </button>
      </div>
    </div>
  );
};

export default MeasureCard;

// src/components/Navbar.tsx
import React from 'react';
import Image from 'next/image';
import '../styles/navbar.scss';
import logo from '../photos/logo.png';
import styles from '@/app/styles/SocialIcon.module.scss';
import { Focus } from '@/app/models/focus';

const FocusesBallDetails: React.FC<{
  measureFocuses?: Focus[];
  allFocuses?: Focus[] | null;
}> = ({ measureFocuses, allFocuses }) => {
  return (
    <div>
      {measureFocuses &&
        allFocuses &&
        allFocuses.map((focus, index) => {
          // Check if the current focus exists in measureFocuses
          const isInMeasureFocuses = measureFocuses.some(
            (measureFocus) => measureFocus.title === focus.title
          );

          return (
            <div key={index} className="focus-item">
              <div
                className="color-ball"
                style={{
                  backgroundColor: isInMeasureFocuses ? focus.color : "transparent",
                }}
              ></div>
                <span
                    style={{
                        color: isInMeasureFocuses ? "inherit" : "rgba(128, 128, 128, 0.7)",
                    }}>
                {focus.title}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default FocusesBallDetails;

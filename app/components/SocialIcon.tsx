"use client";
import * as React from "react";
import styles from "../styles/SocialIcon.module.scss";

type Props = {
  name: string;
  link: string;
};

const SocialIcon: React.FC<Props> = ({ name, link }) => {
  const imgSrc = `/imgs/icon-social-${name}.svg`;
  return (
    <div className={styles.wrapper}>
      <img
        onClick={() => window.open(link)}
        src={imgSrc}
        alt={name}
      />
    </div>
  );
};

export default SocialIcon;
import React from 'react';
import { FaHome, FaInfoCircle, FaCog } from 'react-icons/fa';
import styles from './Sidebar.module.scss';
import { VscSettings } from "react-icons/vsc";
import { IoIosBookmark } from "react-icons/io";

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.icons}>
        <button title="Settings">
         <VscSettings />
        </button>
        <button title="Bookmark">
         <IoIosBookmark />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

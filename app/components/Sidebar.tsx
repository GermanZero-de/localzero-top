'use client';

import React from 'react';
import { VscSettings } from 'react-icons/vsc';
import { IoIosBookmark } from 'react-icons/io';
import { useRouter } from 'next/navigation'; // Import from next/navigation for App Router
import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const router = useRouter();

  const handleSettingsClick = () => {
    window.history.back(); // Goes back to the previous page in the browser history
  };

  const handleBookmarkClick = () => {
    // Update the URL to include ?showBookmarks=true
    router.push('/?showBookmarks=true');
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.icons}>
        <button title="Settings" onClick={handleSettingsClick}>
          <VscSettings />
        </button>
        <button title="Bookmark" onClick={handleBookmarkClick}>
          <IoIosBookmark />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

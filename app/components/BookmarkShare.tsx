import { Blueprint } from '@/app/models/blueprint';
import { AppData } from '@/app/models/appData';

interface Bookmark {
  name: string;
  measures: Blueprint[];
}

interface SerializedMeasure {
  code: string;
}

interface SerializedBookmark {
  name: string;
  measures: SerializedMeasure[];
}

const urlSafeBase64Encode = (str: string): string => {
  console.log('Encode', str);
  try {
    return btoa(encodeURIComponent(str));
  } catch (error) {
    console.error('Failed to encode string:', error);
    throw new Error('Failed to encode bookmark data');
  }
};

const urlSafeBase64Decode = (str: string): string => {
  console.log('Decode', str);
  try {
    return decodeURIComponent(atob(str));
  } catch (error) {
    console.error('Failed to decode string:', error);
    throw new Error('Failed to decode bookmark data');
  }
};

export const encodeBookmarksToURL = (bookmarks: Bookmark[]): string => {
  const serializedBookmarks: SerializedBookmark[] = bookmarks.map(
    (bookmark) => ({
      name: bookmark.name,
      measures: bookmark.measures.map((measure) => ({
        code: measure.code,
      })),
    }),
  );

  try {
    const encodedData = urlSafeBase64Encode(
      JSON.stringify(serializedBookmarks),
    );
    return `bookmarks=${encodedData}`;
  } catch (error) {
    console.error('Failed to encode bookmarks:', error);
    return '';
  }
};

export const decodeBookmarksFromURL = (
  queryString: string,
  appData: AppData,
): Bookmark[] => {
  const params = new URLSearchParams(queryString);
  const bookmarksParam = params.get('bookmarks');

  if (!bookmarksParam) return [];

  try {
    const decodedString = urlSafeBase64Decode(bookmarksParam);
    const serializedBookmarks: SerializedBookmark[] = JSON.parse(decodedString);

    // Reconstruct full bookmarks by matching measure codes with appData
    return serializedBookmarks.map((serializedBookmark) => ({
      name: serializedBookmark.name,
      measures: serializedBookmark.measures
        .map((measure) =>
          appData.blueprints.find((bp) => bp.code === measure.code),
        )
        .filter((measure): measure is Blueprint => measure !== undefined),
    }));
  } catch (error) {
    console.error('Failed to decode bookmarks:', error);
    return [];
  }
};

export const useBookmarkSharing = (bookmarks: Bookmark[], appData: AppData) => {
  const shareBookmarks = () => {
    if (!bookmarks.length) {
      alert('No bookmarks to share');
      return;
    }

    const queryString = encodeBookmarksToURL(bookmarks);
    if (!queryString) {
      alert('Failed to generate bookmark link');
      return;
    }

    const currentURL = new URL(window.location.href);
    currentURL.search = queryString;

    navigator.clipboard
      .writeText(currentURL.toString())
      .then(() => alert('Bookmark link copied to clipboard!'))
      .catch((err) => {
        console.error('Failed to copy link:', err);
        alert('Failed to copy link to clipboard');
      });
  };

  return { shareBookmarks };
};

import { Blueprint } from '@/app/models/blueprint';
import { AppData } from '@/app/models/appData';

export interface Bookmark {
  name: string;
  measures: Blueprint[];
  date: string;
}

interface SerializedMeasure {
  code: string;
}

interface SerializedBookmark {
  name: string;
  measures: SerializedMeasure[];
  date: string;
}

const urlSafeBase64Encode = (str: string): string => {
  try {
    const base64 = Buffer.from(str).toString('base64');
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (error) {
    console.error('Failed to encode string:', error);
    throw new Error('Failed to encode bookmark data');
  }
};

const urlSafeBase64Decode = (str: string): string => {
  try {
    const prefix = 'bookmarks=';
    if (str.startsWith(prefix)) {
      str = str.slice(prefix.length);
    }
    return new TextDecoder().decode(Buffer.from(str, 'base64'));
  } catch (error) {
    console.error('Failed to decode string:', error);
    throw new Error('Failed to decode bookmark data');
  }
};

export const loadBookmarksFromStorage = (): Bookmark[] => {
  if (typeof window === 'undefined') return [];

  try {
    const savedBookmarks = localStorage.getItem('bookmarks');
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  } catch (error) {
    console.error('Error loading bookmarks from localStorage:', error);
    return [];
  }
};

export const saveBookmarksToStorage = (bookmarks: Bookmark[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};

export const createBookmark = (
  bookmarks: Bookmark[],
  name: string,
): Bookmark[] => {
  if (bookmarks.some((bookmark) => bookmark.name === name)) {
    return bookmarks;
  }

  const newBookmark: Bookmark = {
    name,
    measures: [],
    date: new Date().toISOString(),
  };

  return [...bookmarks, newBookmark];
};

export const deleteBookmark = (
  bookmarks: Bookmark[],
  name: string,
): Bookmark[] => {
  return bookmarks.filter((bookmark) => bookmark.name !== name);
};

export const addMeasureToBookmark = (
  bookmarks: Bookmark[],
  bookmarkName: string,
  measure: Blueprint,
): Bookmark[] => {
  return bookmarks.map((bookmark) => {
    if (bookmark.name === bookmarkName) {
      const measureExists = bookmark.measures.some(
        (m) => m.code === measure.code,
      );
      const updatedMeasures = measureExists
        ? bookmark.measures.filter((m) => m.code !== measure.code)
        : [...bookmark.measures, measure];

      return {
        ...bookmark,
        measures: updatedMeasures,
      };
    }
    return bookmark;
  });
};

export const encodeBookmarksToURL = (bookmarks: Bookmark[]): string => {
  if (!bookmarks?.length) return '';

  const serializedBookmarks: SerializedBookmark[] = bookmarks.map(
    (bookmark) => ({
      name: bookmark.name,
      measures: bookmark.measures.map((measure) => ({
        code: measure.code,
      })),
      date: bookmark.date,
    }),
  );

  try {
    const encodedData = urlSafeBase64Encode(
      JSON.stringify(serializedBookmarks),
    );
    return `bookmarks=${encodeURIComponent(encodedData)}`;
  } catch (error) {
    console.error('Failed to encode bookmarks:', error);
    return '';
  }
};

export const decodeBookmarksFromURL = (
  queryString: string,
  appData: AppData,
): Bookmark[] => {
  try {
    const params = new URLSearchParams(queryString);
    const bookmarksParam = params.get('bookmarks');

    if (!bookmarksParam) return [];

    const decodedString = urlSafeBase64Decode(
      decodeURIComponent(bookmarksParam),
    );
    if (!decodedString.trim().startsWith('[')) return [];

    const serializedBookmarks: SerializedBookmark[] = JSON.parse(decodedString);
    if (!Array.isArray(serializedBookmarks)) return [];

    return serializedBookmarks.map((serializedBookmark) => ({
      name: serializedBookmark.name,
      measures: serializedBookmark.measures
        .map((measure) =>
          appData.blueprints.find((bp) => bp.code === measure.code),
        )
        .filter((measure): measure is Blueprint => measure !== undefined),
      date: serializedBookmark.date,
    }));
  } catch (error) {
    console.error('Failed to decode bookmarks:', error);
    return [];
  }
};

export const useBookmarkSharing = (bookmarks: Bookmark[]) => {
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
      .then(() => alert('Link to all bookmarks copied!'))
      .catch((err) => {
        console.error('Failed to copy link:', err);
        alert('Failed to copy link to clipboard');
      });
  };

  return { shareBookmarks };
};

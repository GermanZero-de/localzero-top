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
  try {
    const base64 = Buffer.from(str).toString('base64');
    // Replace standard Base64 characters with URL-safe characters
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (error) {
    console.error('Failed to encode string:', error);
    throw new Error('Failed to encode bookmark data');
  }
};

const urlSafeBase64Decode = (str: string): string => {
  try {
    console.log('Input string:', str);

    const prefix = 'bookmarks=';
    if (str.startsWith(prefix)) {
      str = str.slice(prefix.length);
    }

    const decoded = new TextDecoder().decode(Buffer.from(str, 'base64'));
    console.log('After decoding:', decoded);

    return decoded;
  } catch (error) {
    console.error('Failed to decode string:', error);
    throw new Error('Failed to decode bookmark data');
  }
};

export const encodeBookmarksToURL = (bookmarks: Bookmark[]): string => {
  if (!bookmarks || bookmarks.length === 0) {
    return '';
  }

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

    // Early return for empty or invalid bookmark parameter
    if (!bookmarksParam) {
      return [];
    }

    const decodedString = urlSafeBase64Decode(
      decodeURIComponent(bookmarksParam),
    );

    // Validate decoded string is valid JSON
    if (!decodedString.trim().startsWith('[')) {
      console.error('Invalid JSON format in decoded string');
      console.log(decodedString);
      return [];
    }

    const serializedBookmarks: SerializedBookmark[] = JSON.parse(decodedString);

    // Validate serialized bookmarks structure
    if (!Array.isArray(serializedBookmarks)) {
      console.error('Decoded data is not an array');
      return [];
    }

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

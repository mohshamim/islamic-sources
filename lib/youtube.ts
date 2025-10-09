/**
 * YouTube Utility Functions
 * Handles YouTube URL parsing and thumbnail generation
 */

/**
 * Extract YouTube video ID from various URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/v/VIDEO_ID
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  // Remove whitespace
  url = url.trim();

  // Regular expression patterns for different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  // If no pattern matches, check if it's already just the video ID (11 characters)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }

  return null;
}

/**
 * Generate YouTube embed URL from video URL or ID
 */
export function getYouTubeEmbedUrl(urlOrId: string): string | null {
  const videoId = extractYouTubeVideoId(urlOrId);
  if (!videoId) return null;

  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Generate YouTube thumbnail URL from video URL or ID
 * Quality options:
 * - default: 120x90
 * - mqdefault: 320x180
 * - hqdefault: 480x360
 * - sddefault: 640x480
 * - maxresdefault: 1280x720 (highest quality, may not exist for all videos)
 */
export function getYouTubeThumbnail(
  urlOrId: string,
  quality: 'default' | 'mq' | 'hq' | 'sd' | 'maxres' = 'maxres'
): string | null {
  const videoId = extractYouTubeVideoId(urlOrId);
  if (!videoId) return null;

  const qualityMap = {
    default: 'default',
    mq: 'mqdefault',
    hq: 'hqdefault',
    sd: 'sddefault',
    maxres: 'maxresdefault',
  };

  const qualityString = qualityMap[quality];
  return `https://img.youtube.com/vi/${videoId}/${qualityString}.jpg`;
}

/**
 * Get multiple thumbnail qualities for fallback
 */
export function getYouTubeThumbnails(urlOrId: string) {
  const videoId = extractYouTubeVideoId(urlOrId);
  if (!videoId) return null;

  return {
    default: `https://img.youtube.com/vi/${videoId}/default.jpg`,
    medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    high: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    standard: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  };
}

/**
 * Validate if a URL is a valid YouTube URL
 */
export function isValidYouTubeUrl(url: string): boolean {
  return extractYouTubeVideoId(url) !== null;
}

/**
 * Convert video duration from ISO 8601 format (PT1H2M10S) to minutes
 * Note: This requires YouTube API to get actual duration
 * For now, this is a helper for when we integrate the API
 */
export function parseYouTubeDuration(duration: string): number {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return 0;

  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;

  return hours * 60 + minutes + Math.ceil(seconds / 60);
}

/**
 * Format minutes to readable duration string
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (mins === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${mins}m`;
}

/**
 * Get YouTube watch URL from video ID
 */
export function getYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}


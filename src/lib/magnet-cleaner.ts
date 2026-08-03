/**
 * Pure Magnet - Base64 & Polluted Magnet URL Cleaner Engine
 */

export interface ParsedTracker {
  url: string;
  isAdTracker: boolean;
}

export interface MagnetCleanResult {
  success: boolean;
  originalInput: string;
  cleanedMagnet?: string;
  extractedBase64?: string;
  decodedRaw?: string;
  infoHash?: string;
  displayName?: string;
  fileSize?: string;
  fileSizeBytes?: number;
  trackers: ParsedTracker[];
  removedTrackersCount: number;
  errorType?: 'empty' | 'invalid_format' | 'no_magnet_found';
  errorMessage?: string;
}

// Known ad / junk / tracking patterns in tracker URLs
const AD_TRACKER_PATTERNS = [
  'doubleclick',
  'google-analytics',
  'adsystem',
  'adserver',
  'popads',
  'propellerads',
  'exoclick',
  'trafficjunky',
  'monetag',
  'tracking',
  'pixel',
  'click',
  'redirect',
];

/**
 * Robust UTF-8 Base64 Decoder
 */
export function safeBase64Decode(str: string): string | null {
  try {
    // Sanitize base64 string
    let sanitized = str.trim().replace(/\s+/g, '');

    // Handle URL-safe Base64
    sanitized = sanitized.replace(/-/g, '+').replace(/_/g, '/');

    // Add padding if missing
    while (sanitized.length % 4 !== 0) {
      sanitized += '=';
    }

    // Decode base64 to binary string
    const binary = atob(sanitized);

    // Convert binary to UTF-8
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
  } catch (e) {
    return null;
  }
}

/**
 * Helper to format byte count into human readable units (e.g. 1.45 GB)
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Extract Base64 candidate strings from text/URL
 */
function findBase64Candidates(input: string): string[] {
  const candidates: string[] = [];

  // If input itself looks like base64
  if (/^[A-Za-z0-9+/=_-]{16,}$/.test(input.trim())) {
    candidates.push(input.trim());
  }

  // Try extracting from URL query parameters (e.g. ?url=..., ?link=..., ?hash=..., ?data=...)
  try {
    const urlObj = new URL(input);

    // Check all search query params
    urlObj.searchParams.forEach((val) => {
      if (val && val.length >= 16) {
        candidates.push(val);
      }
    });

    // Check hash fragment
    if (urlObj.hash && urlObj.hash.length > 1) {
      const hashContent = urlObj.hash.substring(1);
      candidates.push(hashContent);
    }
  } catch (e) {
    // Not a valid URL structure, search with regex
  }

  // Regex pattern for base64 strings embedded in text/URL
  const b64Regex = /[A-Za-z0-9+/=_-]{24,}/g;
  let match;
  while ((match = b64Regex.exec(input)) !== null) {
    candidates.push(match[0]);
  }

  // Return unique candidates
  return Array.from(new Set(candidates));
}

/**
 * Parse magnet URI string into metadata
 */
function parseMagnetString(magnetUrl: string): {
  infoHash?: string;
  displayName?: string;
  fileSizeBytes?: number;
  trackers: ParsedTracker[];
  cleanedMagnet: string;
  removedTrackersCount: number;
} {
  // Ensure starts with magnet:?
  const cleanUri = magnetUrl.substring(magnetUrl.indexOf('magnet:?'));

  let infoHash = '';
  let displayName = '';
  let fileSizeBytes: number | undefined;
  const rawTrackers: string[] = [];

  // Parse query params
  const queryString = cleanUri.replace(/^magnet:\?/, '');
  const params = new URLSearchParams(queryString);

  // Extract Topic/Hash
  const xt = params.get('xt') || '';
  if (xt) {
    const hashMatch = xt.match(/urn:btih:([a-fA-F0-9]{40}|[a-zA-Z2-7]{32})/i);
    if (hashMatch) {
      infoHash = hashMatch[1].toUpperCase();
    } else {
      infoHash = xt.replace(/^urn:btih:/i, '').toUpperCase();
    }
  }

  // Extract Display Name
  const dn = params.get('dn');
  if (dn) {
    displayName = decodeURIComponent(dn.replace(/\+/g, ' '));
  }

  // Extract Exact Length
  const xl = params.get('xl');
  if (xl && !isNaN(Number(xl))) {
    fileSizeBytes = Number(xl);
  }

  // Extract Trackers
  params.forEach((value, key) => {
    if (key === 'tr' && value) {
      const decodedTracker = decodeURIComponent(value);
      if (!rawTrackers.includes(decodedTracker)) {
        rawTrackers.push(decodedTracker);
      }
    }
  });

  // Categorize trackers
  const parsedTrackers: ParsedTracker[] = rawTrackers.map((trUrl) => {
    const isAd = AD_TRACKER_PATTERNS.some((pattern) =>
      trUrl.toLowerCase().includes(pattern)
    );
    return {
      url: trUrl,
      isAdTracker: isAd,
    };
  });

  // Filter clean trackers (remove ad trackers)
  const validTrackers = parsedTrackers.filter((t) => !t.isAdTracker);
  const removedCount = parsedTrackers.length - validTrackers.length;

  // Reconstruct clean Magnet URI
  let reconstructed = `magnet:?xt=urn:btih:${infoHash || ''}`;
  if (displayName) {
    reconstructed += `&dn=${encodeURIComponent(displayName)}`;
  }
  if (fileSizeBytes) {
    reconstructed += `&xl=${fileSizeBytes}`;
  }
  validTrackers.forEach((tr) => {
    reconstructed += `&tr=${encodeURIComponent(tr.url)}`;
  });

  return {
    infoHash,
    displayName,
    fileSizeBytes,
    trackers: parsedTrackers,
    cleanedMagnet: reconstructed,
    removedTrackersCount: removedCount,
  };
}

/**
 * Main function to clean any input string or URL containing Base64 magnet links
 */
export function cleanMagnetUrl(input: string): MagnetCleanResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return {
      success: false,
      originalInput: '',
      trackers: [],
      removedTrackersCount: 0,
      errorType: 'empty',
      errorMessage: 'Cole uma URL contendo Base64 ou um Magnet Link para iniciar.',
    };
  }

  // 1. Direct Magnet Link
  if (trimmed.toLowerCase().includes('magnet:?')) {
    const parsed = parseMagnetString(trimmed);
    return {
      success: true,
      originalInput: trimmed,
      cleanedMagnet: parsed.cleanedMagnet,
      decodedRaw: trimmed,
      infoHash: parsed.infoHash,
      displayName: parsed.displayName,
      fileSizeBytes: parsed.fileSizeBytes,
      fileSize: parsed.fileSizeBytes ? formatBytes(parsed.fileSizeBytes) : undefined,
      trackers: parsed.trackers,
      removedTrackersCount: parsed.removedTrackersCount,
    };
  }

  // 2. Base64 encoded magnet link (find in URL or direct string)
  const candidates = findBase64Candidates(trimmed);

  for (const candidate of candidates) {
    const decoded = safeBase64Decode(candidate);

    if (decoded && decoded.toLowerCase().includes('magnet:?')) {
      const parsed = parseMagnetString(decoded);
      return {
        success: true,
        originalInput: trimmed,
        extractedBase64: candidate,
        decodedRaw: decoded,
        cleanedMagnet: parsed.cleanedMagnet,
        infoHash: parsed.infoHash,
        displayName: parsed.displayName,
        fileSizeBytes: parsed.fileSizeBytes,
        fileSize: parsed.fileSizeBytes ? formatBytes(parsed.fileSizeBytes) : undefined,
        trackers: parsed.trackers,
        removedTrackersCount: parsed.removedTrackersCount,
      };
    }
  }

  // 3. Couldn't extract valid magnet link
  return {
    success: false,
    originalInput: trimmed,
    trackers: [],
    removedTrackersCount: 0,
    errorType: 'no_magnet_found',
    errorMessage:
      'Nenhum parâmetro Base64 ou Magnet Link válido foi detectado nesta URL. Verifique o link e tente novamente.',
  };
}

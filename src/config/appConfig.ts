/**
 * Centralized application configuration
 * All URLs, ports, paths, and credentials should be configured here
 * Values can be overridden via environment variables
 */

// Helper to get environment variable with fallback
// In Next.js, NEXT_PUBLIC_* variables are available on both client and server
const getEnv = (key: string, defaultValue: string = ''): string => {
  // Next.js makes NEXT_PUBLIC_* env vars available via process.env on both client and server
  return process.env[key] || defaultValue;
};

// Extract host and port from URL or use defaults
const parseUrl = (url: string, defaultHost: string = 'localhost', defaultPort?: number) => {
  try {
    const urlObj = new URL(url);
    return {
      protocol: urlObj.protocol.replace(':', ''),
      host: urlObj.hostname,
      port: urlObj.port || defaultPort?.toString() || '',
      path: urlObj.pathname,
      fullUrl: url,
    };
  } catch {
    // If URL parsing fails, try to extract from string
    const match = url.match(/^(https?):\/\/([^:/]+)(?::(\d+))?(.*)$/);
    if (match) {
      return {
        protocol: match[1],
        host: match[2],
        port: match[3] || defaultPort?.toString() || '',
        path: match[4] || '',
        fullUrl: url,
      };
    }
    return {
      protocol: 'http',
      host: defaultHost,
      port: defaultPort?.toString() || '',
      path: '',
      fullUrl: url,
    };
  }
};

// Base configuration
const config = {
  // Frontend configuration
  frontend: {
    host: getEnv('NEXT_PUBLIC_FRONTEND_HOST', 'localhost'),
    port: getEnv('NEXT_PUBLIC_FRONTEND_PORT', '3000'),
    protocol: getEnv('NEXT_PUBLIC_FRONTEND_PROTOCOL', 'http'),
    baseUrl: getEnv('NEXT_PUBLIC_FRONTEND_URL', 'http://localhost:3000'),
  },

  // API Service URLs
  services: {
    user: {
      baseUrl: getEnv('NEXT_PUBLIC_USER_SERVICE_URL', 'http://localhost:3001'),
      apiPath: getEnv('NEXT_PUBLIC_USER_SERVICE_API_PATH', '/api'),
      host: '',
      port: '',
    },
    content: {
      baseUrl: getEnv('NEXT_PUBLIC_CONTENT_SERVICE_URL', 'http://localhost:3002'),
      apiPath: getEnv('NEXT_PUBLIC_CONTENT_SERVICE_API_PATH', '/api'),
      host: '',
      port: '',
    },
    media: {
      baseUrl: getEnv('NEXT_PUBLIC_MEDIA_SERVICE_URL', 'http://localhost:3003'),
      apiPath: getEnv('NEXT_PUBLIC_MEDIA_SERVICE_API_PATH', '/api'),
      uploadsPath: getEnv('NEXT_PUBLIC_MEDIA_SERVICE_UPLOADS_PATH', '/uploads'),
      host: '',
      port: '',
    },
    category: {
      baseUrl: getEnv('NEXT_PUBLIC_CATEGORY_SERVICE_URL', 'http://localhost:3004'),
      apiPath: getEnv('NEXT_PUBLIC_CATEGORY_SERVICE_API_PATH', '/api'),
      host: '',
      port: '',
    },
    comment: {
      baseUrl: getEnv('NEXT_PUBLIC_COMMENT_SERVICE_URL', 'http://localhost:3005'),
      apiPath: getEnv('NEXT_PUBLIC_COMMENT_SERVICE_API_PATH', '/api'),
      host: '',
      port: '',
    },
  },

  // Asgardeo Authentication Configuration
  asgardeo: {
    clientId: getEnv('NEXT_PUBLIC_ASGARDEO_CLIENT_ID', 'Y4Yrhdn2PcIxQRLfWYDdEycYTfUa'),
    baseUrl: getEnv('NEXT_PUBLIC_ASGARDEO_BASE_URL', 'https://api.asgardeo.io/t/g11engineering'),
    redirectUrl: getEnv('NEXT_PUBLIC_ASGARDEO_REDIRECT_URL', 'http://localhost:3000'),
    scope: getEnv('NEXT_PUBLIC_ASGARDEO_SCOPE', 'openid profile email groups').split(' '),
  },

  // API Paths (can be customized)
  paths: {
    posts: getEnv('NEXT_PUBLIC_API_PATH_POSTS', '/posts'),
    users: getEnv('NEXT_PUBLIC_API_PATH_USERS', '/users'),
    categories: getEnv('NEXT_PUBLIC_API_PATH_CATEGORIES', '/categories'),
    tags: getEnv('NEXT_PUBLIC_API_PATH_TAGS', '/tags'),
    comments: getEnv('NEXT_PUBLIC_API_PATH_COMMENTS', '/comments'),
    media: getEnv('NEXT_PUBLIC_API_PATH_MEDIA', '/media'),
    uploads: getEnv('NEXT_PUBLIC_API_PATH_UPLOADS', '/uploads'),
    settings: getEnv('NEXT_PUBLIC_API_PATH_SETTINGS', '/settings'),
    auth: getEnv('NEXT_PUBLIC_API_PATH_AUTH', '/auth'),
  },
};

// Parse service URLs to extract host and port
Object.keys(config.services).forEach((key) => {
  const service = config.services[key as keyof typeof config.services];
  const parsed = parseUrl(service.baseUrl);
  service.host = parsed.host;
  service.port = parsed.port;
});

// Helper functions to build full API URLs
export const getApiUrl = {
  // User Service
  users: (path: string = '') => {
    const base = config.services.user.baseUrl;
    const apiPath = config.services.user.apiPath;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${apiPath}${config.paths.users}${cleanPath}`;
  },

  // Content Service
  posts: (path: string = '') => {
    const base = config.services.content.baseUrl;
    const apiPath = config.services.content.apiPath;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${apiPath}${config.paths.posts}${cleanPath}`;
  },

  // Media Service
  media: (path: string = '') => {
    const base = config.services.media.baseUrl;
    const apiPath = config.services.media.apiPath;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${apiPath}${config.paths.media}${cleanPath}`;
  },

  // Category Service
  categories: (path: string = '') => {
    const base = config.services.category.baseUrl;
    const apiPath = config.services.category.apiPath;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${apiPath}${config.paths.categories}${cleanPath}`;
  },

  // Comment Service
  comments: (path: string = '') => {
    const base = config.services.comment.baseUrl;
    const apiPath = config.services.comment.apiPath;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${apiPath}${config.paths.comments}${cleanPath}`;
  },

  // Settings
  settings: (path: string = '') => {
    const base = config.services.content.baseUrl;
    const apiPath = config.services.content.apiPath;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${apiPath}${config.paths.settings}${cleanPath}`;
  },

  // Auth
  auth: (path: string = '') => {
    const base = config.services.user.baseUrl;
    const apiPath = config.services.user.apiPath;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${apiPath}${config.paths.auth}${cleanPath}`;
  },
};

// Helper to get media upload URL
export const getMediaUploadUrl = (filename: string): string => {
  const base = config.services.media.baseUrl;
  const uploadsPath = config.services.media.uploadsPath;
  return `${base}${uploadsPath}/${filename}`;
};

// Export configuration
export default config;

// Export individual service configs for convenience
export const {
  frontend,
  services,
  asgardeo,
  paths,
} = config;


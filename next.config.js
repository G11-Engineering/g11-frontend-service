/** @type {import('next').NextConfig} */

// Extract configuration from environment variables with defaults
const getEnv = (key, defaultValue) => process.env[key] || defaultValue;

// Media service configuration for image optimization
const mediaServiceUrl = getEnv('NEXT_PUBLIC_MEDIA_SERVICE_URL', 'http://localhost:3003');
const mediaServiceHost = new URL(mediaServiceUrl).hostname;
const mediaServicePort = new URL(mediaServiceUrl).port || '3003';
const mediaServiceProtocol = new URL(mediaServiceUrl).protocol.replace(':', '');

// Frontend configuration
const frontendHost = getEnv('NEXT_PUBLIC_FRONTEND_HOST', 'localhost');
const frontendPort = getEnv('NEXT_PUBLIC_FRONTEND_PORT', '3000');

// Build image domains and remote patterns dynamically
const imageDomains = getEnv('NEXT_PUBLIC_IMAGE_DOMAINS', 'localhost').split(',').map(d => d.trim()).filter(Boolean);
const additionalImageHosts = getEnv('NEXT_PUBLIC_ADDITIONAL_IMAGE_HOSTS', '').split(',').map(h => h.trim()).filter(Boolean);
const allImageDomains = [...new Set([...imageDomains, ...additionalImageHosts, mediaServiceHost])];

// Build remote patterns for Next.js Image component
const remotePatterns = [
  {
    protocol: mediaServiceProtocol,
    hostname: mediaServiceHost,
    ...(mediaServicePort && { port: mediaServicePort }),
    pathname: getEnv('NEXT_PUBLIC_MEDIA_SERVICE_UPLOADS_PATH', '/uploads') + '/**',
  },
];

// Add additional remote patterns if configured
const additionalRemotePatterns = getEnv('NEXT_PUBLIC_ADDITIONAL_IMAGE_PATTERNS', '');
if (additionalRemotePatterns) {
  try {
    const patterns = JSON.parse(additionalRemotePatterns);
    if (Array.isArray(patterns)) {
      remotePatterns.push(...patterns);
    }
  } catch (e) {
    console.warn('Invalid NEXT_PUBLIC_ADDITIONAL_IMAGE_PATTERNS format, should be JSON array');
  }
}

const nextConfig = {
  output: 'standalone',
  // Skip static optimization to prevent prerendering issues with client-only code
  // This allows the build to complete even if some pages fail to prerender
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  images: {
    domains: allImageDomains,
    remotePatterns: remotePatterns,
  },
  env: {
    // Frontend configuration
    NEXT_PUBLIC_FRONTEND_HOST: frontendHost,
    NEXT_PUBLIC_FRONTEND_PORT: frontendPort,
    NEXT_PUBLIC_FRONTEND_URL: getEnv('NEXT_PUBLIC_FRONTEND_URL', `http://${frontendHost}:${frontendPort}`),
    
    // Service URLs (already used by appConfig, but keeping for backward compatibility)
    NEXT_PUBLIC_API_BASE_URL: getEnv('NEXT_PUBLIC_API_BASE_URL', 'http://localhost'),
    NEXT_PUBLIC_USER_SERVICE_URL: getEnv('NEXT_PUBLIC_USER_SERVICE_URL', 'http://localhost:3001'),
    NEXT_PUBLIC_CONTENT_SERVICE_URL: getEnv('NEXT_PUBLIC_CONTENT_SERVICE_URL', 'http://localhost:3002'),
    NEXT_PUBLIC_MEDIA_SERVICE_URL: mediaServiceUrl,
    NEXT_PUBLIC_CATEGORY_SERVICE_URL: getEnv('NEXT_PUBLIC_CATEGORY_SERVICE_URL', 'http://localhost:3004'),
    NEXT_PUBLIC_COMMENT_SERVICE_URL: getEnv('NEXT_PUBLIC_COMMENT_SERVICE_URL', 'http://localhost:3005'),
    
    // API Paths (configurable)
    NEXT_PUBLIC_USER_SERVICE_API_PATH: getEnv('NEXT_PUBLIC_USER_SERVICE_API_PATH', '/api'),
    NEXT_PUBLIC_CONTENT_SERVICE_API_PATH: getEnv('NEXT_PUBLIC_CONTENT_SERVICE_API_PATH', '/api'),
    NEXT_PUBLIC_MEDIA_SERVICE_API_PATH: getEnv('NEXT_PUBLIC_MEDIA_SERVICE_API_PATH', '/api'),
    NEXT_PUBLIC_MEDIA_SERVICE_UPLOADS_PATH: getEnv('NEXT_PUBLIC_MEDIA_SERVICE_UPLOADS_PATH', '/uploads'),
    NEXT_PUBLIC_CATEGORY_SERVICE_API_PATH: getEnv('NEXT_PUBLIC_CATEGORY_SERVICE_API_PATH', '/api'),
    NEXT_PUBLIC_COMMENT_SERVICE_API_PATH: getEnv('NEXT_PUBLIC_COMMENT_SERVICE_API_PATH', '/api'),
    
    // Asgardeo configuration
    NEXT_PUBLIC_ASGARDEO_CLIENT_ID: getEnv('NEXT_PUBLIC_ASGARDEO_CLIENT_ID', 'Y4Yrhdn2PcIxQRLfWYDdEycYTfUa'),
    NEXT_PUBLIC_ASGARDEO_BASE_URL: getEnv('NEXT_PUBLIC_ASGARDEO_BASE_URL', 'https://api.asgardeo.io/t/g11engineering'),
    NEXT_PUBLIC_ASGARDEO_REDIRECT_URL: getEnv('NEXT_PUBLIC_ASGARDEO_REDIRECT_URL', `http://${frontendHost}:${frontendPort}`),
    NEXT_PUBLIC_ASGARDEO_SCOPE: getEnv('NEXT_PUBLIC_ASGARDEO_SCOPE', 'openid profile email groups'),
  },
}

module.exports = nextConfig

# Frontend Service

Next.js frontend application for the G11 CMS platform.

## Stack

- Next.js 14
- React 18
- TypeScript
- Mantine UI
- TipTap editor
- NextAuth.js

## Features

- Server-side rendering
- Responsive design
- Rich text editor
- Image uploads
- User authentication
- Post management
- Category and tag filtering
- Comment system

## Environment Variables

```env
NEXT_PUBLIC_USER_SERVICE_URL=http://localhost:3001
NEXT_PUBLIC_CONTENT_SERVICE_URL=http://localhost:3002
NEXT_PUBLIC_MEDIA_SERVICE_URL=http://localhost:3003
NEXT_PUBLIC_CATEGORY_SERVICE_URL=http://localhost:3004
NEXT_PUBLIC_COMMENT_SERVICE_URL=http://localhost:3005
```

## Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## Build

```bash
npm run build
npm start
```

## Docker

```bash
docker build -t g11-frontend .
docker run -p 3000:3000 g11-frontend
```

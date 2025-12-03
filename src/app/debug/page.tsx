'use client';

import { useState, useEffect } from 'react';
import { Container, Stack, Title, Text, Button, Card } from '@mantine/core';

export default function DebugPage() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      // Only call the Next.js API route
      const response = await fetch('/api/posts?status=published');
      const data = await response.json();

      if (response.ok) {
        setPosts(data);
        console.log('Posts fetched via proxy:', data);
      } else {
        setError(data.error || 'Failed to fetch posts');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container size="lg" py="xl">
      <Stack gap="md">
        <Title order={1}>Debug Page</Title>
        <Text>Testing API connection via Next.js server proxy</Text>

        <Button onClick={fetchPosts} loading={loading}>
          Fetch Posts
        </Button>

        {error && (
          <Card withBorder p="md" style={{ backgroundColor: '#ffebee' }}>
            <Text c="red">Error: {error}</Text>
          </Card>
        )}

        {posts && (
          <Card withBorder p="md">
            <Title order={3}>API Response:</Title>
            <pre style={{ fontSize: '12px', overflow: 'auto' }}>
              {JSON.stringify(posts, null, 2)}
            </pre>
          </Card>
        )}

        {loading && <Text>Loading...</Text>}
      </Stack>
    </Container>
  );
}


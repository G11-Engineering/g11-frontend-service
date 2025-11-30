'use client';

import { Container, Stack, Group, Text, Anchor, Divider, Box } from '@mantine/core';
import { IconBrandGithub, IconBrandTwitter, IconBrandLinkedin, IconMail, IconBookmark } from '@tabler/icons-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .footer-link {
            transition: color 0.2s;
          }
          .footer-link:hover {
            color: #ff8c00 !important;
          }
        `
      }} />
      <Box
        component="footer"
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          color: 'white',
          marginTop: 'auto',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
      <Container size="xl" py="xl">
        <Stack gap="xl">
          {/* Main Footer Content */}
          <Group justify="space-between" align="flex-start" wrap="wrap">
            {/* Brand Section */}
            <Stack gap="md" style={{ flex: 1, minWidth: 250 }}>
              <Group gap="xs">
                <IconBookmark size={24} color="#ff8c00" />
                <Text size="lg" fw={700} c="white">
                  G11 Blog
                </Text>
              </Group>
              <Text size="sm" c="dimmed" style={{ maxWidth: 300 }}>
                Enterprise Content & Stories Platform. Share your insights, technical knowledge, and innovative solutions with the G11 community.
              </Text>
              <Group gap="md" mt="xs">
                <Anchor
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  c="dimmed"
                  className="footer-link"
                >
                  <IconBrandGithub size={20} />
                </Anchor>
                <Anchor
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  c="dimmed"
                  className="footer-link"
                >
                  <IconBrandTwitter size={20} />
                </Anchor>
                <Anchor
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  c="dimmed"
                  className="footer-link"
                >
                  <IconBrandLinkedin size={20} />
                </Anchor>
                <Anchor
                  href="mailto:support@g11.com"
                  c="dimmed"
                  className="footer-link"
                >
                  <IconMail size={20} />
                </Anchor>
              </Group>
            </Stack>

            {/* Quick Links */}
            <Stack gap="sm" style={{ flex: 1, minWidth: 150 }}>
              <Text fw={600} size="sm" c="white" mb="xs">
                Quick Links
              </Text>
              <Anchor
                component={Link}
                href="/posts"
                c="dimmed"
                size="sm"
                className="footer-link"
              >
                All Posts
              </Anchor>
              <Anchor
                component={Link}
                href="/categories"
                c="dimmed"
                size="sm"
                className="footer-link"
              >
                Categories
              </Anchor>
              <Anchor
                component={Link}
                href="/tags"
                c="dimmed"
                size="sm"
                className="footer-link"
              >
                Tags
              </Anchor>
              <Anchor
                component={Link}
                href="/posts/create"
                c="dimmed"
                size="sm"
                className="footer-link"
              >
                Write Post
              </Anchor>
            </Stack>

            {/* Resources */}
            <Stack gap="sm" style={{ flex: 1, minWidth: 150 }}>
              <Text fw={600} size="sm" c="white" mb="xs">
                Resources
              </Text>
              <Anchor
                href="https://g11.com"
                target="_blank"
                rel="noopener noreferrer"
                c="dimmed"
                size="sm"
                className="footer-link"
              >
                G11 Website
              </Anchor>
              <Anchor
                href="https://docs.g11.com"
                target="_blank"
                rel="noopener noreferrer"
                c="dimmed"
                size="sm"
                className="footer-link"
              >
                Documentation
              </Anchor>
              <Anchor
                href="https://g11.com/support"
                target="_blank"
                rel="noopener noreferrer"
                c="dimmed"
                size="sm"
                className="footer-link"
              >
                Support
              </Anchor>
              <Anchor
                component={Link}
                href="/settings"
                c="dimmed"
                size="sm"
                className="footer-link"
              >
                Settings
              </Anchor>
            </Stack>

            {/* Legal */}
            <Stack gap="sm" style={{ flex: 1, minWidth: 150 }}>
              <Text fw={600} size="sm" c="white" mb="xs">
                Legal
              </Text>
              <Anchor
                href="#"
                c="dimmed"
                size="sm"
                className="footer-link"
              >
                Privacy Policy
              </Anchor>
              <Anchor
                href="#"
                c="dimmed"
                size="sm"
                className="footer-link"
              >
                Terms of Service
              </Anchor>
              <Anchor
                href="#"
                c="dimmed"
                size="sm"
                className="footer-link"
              >
                Cookie Policy
              </Anchor>
              <Anchor
                href="#"
                c="dimmed"
                size="sm"
                className="footer-link"
              >
                About
              </Anchor>
            </Stack>
          </Group>

          <Divider color="rgba(255, 255, 255, 0.1)" />

          {/* Copyright */}
          <Group justify="space-between" wrap="wrap">
            <Text size="sm" c="dimmed">
              © {currentYear} G11 Blog. All rights reserved.
            </Text>
            <Text size="sm" c="dimmed">
              Built with ❤️ by the G11 Community
            </Text>
          </Group>
        </Stack>
      </Container>
    </Box>
    </>
  );
}


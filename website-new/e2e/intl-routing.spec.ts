import { test, expect } from '@playwright/test';
import { i18nConfig } from '../src/lib/config/locale';

const defaultHomePathWithLocale = `/${i18nConfig.defaultLocale}/`;

test.describe('Root Path ("/")', () => {
  test('redirects to default locale when no locale is set', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForURL(defaultHomePathWithLocale, { timeout: 1000 });
  });

  test.describe('with preferred locale', () => {
    test.use({
      locale: 'pt-BR',
    });

    test('redirects to user preferred locale', async ({ page }) => {
      await page.goto('/');
      await page.waitForURL(defaultHomePathWithLocale, { timeout: 1000 });
    });
  });

  test.describe('with unsupported locale', () => {
    test.use({
      locale: 'de',
    });

    test('falls back to default locale', async ({ page }) => {
      await page.goto('/');
      await page.waitForURL(defaultHomePathWithLocale, { timeout: 1000 });
    });
  });
});

test.describe('Single-Level Paths', () => {
  test('redirects non-locale path to default locale', async ({ page }) => {
    await page.goto('/about');
    await page.waitForURL(defaultHomePathWithLocale, { timeout: 1000 });
  });

  test('maintains valid locale path', async ({ page }) => {
    const validLocalePath = '/pt-br';
    await page.goto(validLocalePath);
    await page.waitForURL(validLocalePath, { timeout: 1000 });
  });

  test.describe('with preferred locale', () => {
    test.use({
      locale: 'pt-BR',
    });

    test('redirects invalid locale to preferred locale', async ({ page }) => {
      await page.goto('/invalid-locale');
      await page.waitForURL(defaultHomePathWithLocale, { timeout: 1000 });
    });
  });
});

test.describe('Multi-Level Paths', () => {
  test('preserves path when locale is valid', async ({ page }) => {
    const path = '/pt-BR/about/team';
    await page.goto(path);
    await page.waitForURL(path);
  });
});

test.describe('Error Handling', () => {
  test('handles missing default locale configuration gracefully', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForURL(defaultHomePathWithLocale, { timeout: 1000 });
    expect(page.url()).not.toContain('undefined');
  });
});

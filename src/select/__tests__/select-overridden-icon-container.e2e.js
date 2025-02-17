/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global */
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount } = require('../../../e2e/helpers/index.js');

const { expect, test } = require('@playwright/test');

test.describe('select overridden icon container', () => {
  test.use({ hasTouch: true });
  test('does not call custom click handler on clear icon clicks on mobile', async ({ page }) => {
    await mount(page, 'select--overridden-icon-container');

    const counter = page.locator('[data-testId="click-count"]');
    await expect(counter).toHaveText('0');
    await page.locator('[data-testId="custom-icon"]').tap();
    await expect(counter).toHaveText('1');

    await page.locator('input').tap();
    await page.locator('li').first().tap();
    await page.locator('[aria-label="Clear value"]').tap();
    await expect(counter).toHaveText('1');
  });
});

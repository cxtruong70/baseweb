/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const { mount } = require('../../../e2e/helpers');

const { test } = require('@playwright/test');

test.describe('popover', () => {
  test('hover trigger does not cause loop on click', async ({ page }) => {
    await mount(page, 'popover--focus-loop');
    await page.waitForSelector('button');
    await page.hover('button');
    await page.waitForSelector('div[data-e2e="content"]');

    await page.click('button');
    await page.waitForSelector('div[data-e2e="content"]', { hidden: false });
    await page.click('button');
    await page.waitForSelector('div[data-e2e="content"]', { hidden: false });

    await page.mouse.move(200, 200);
    await page.hover('button');
    await page.waitForSelector('div[data-e2e="content"]');
  });
});

/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */

// @flow

const TABLE_ROOT = 'div[data-baseweb="data-table"]';

// flowlint-next-line unclear-type:off
function getTable(page /*: any */) {
  return page.$('div[data-baseweb="data-table"]');
}

// flowlint-next-line unclear-type:off
function getHeaderCellAtIndex(page /*: any */, index /*: number */) {
  return page.$(
    // plus one to convert to one indexed item
    `${TABLE_ROOT} > div > div:nth-child(${index + 1})`
  );
}

// flowlint-next-line unclear-type:off
function getCellsAtColumnIndex(page /*: any */, columnCount /*: number */, index /*: number */) {
  // At most, sample 20 rows. Seems like a reasonable ceiling for now.
  const MAX_ROW_SAMPLES = 20;
  const indices = [];
  for (let i = 0; i < MAX_ROW_SAMPLES; i++) {
    indices.push(i * columnCount + index);
  }

  function getCellAtIndex(page, index) {
    // plus two to convert to one indexed item and skips header row
    return page.$(`${TABLE_ROOT} > div:nth-child(${index + 2})`);
  }

  return Promise.all(indices.map((i) => getCellAtIndex(page, i)));
}

async function getCellContentsAtColumnIndex(
  // flowlint-next-line unclear-type:off
  page /*: any */,
  columnCount /*: number */,
  index /*: number */
) {
  const elements = await getCellsAtColumnIndex(page, columnCount, index);

  function getTextContentFromElements(page, elements) {
    return Promise.all(
      elements.map((element) => {
        return page.evaluate((e) => e.textContent, element);
      })
    );
  }

  return getTextContentFromElements(page, elements.filter(Boolean));
}

// flowlint-next-line unclear-type:off
function getActionButtonByLabel(parent /*: any */, label /*: string */) {
  return parent.$(`button[alt="${label}"]`);
}

// flowlint-next-line unclear-type:off
async function sortColumnAtIndex(page /*: any */, index /*: number */) {
  const headerCell = await getHeaderCellAtIndex(page, index);
  const sortButton = await headerCell.$('div[role="button"]');
  return sortButton.click();
}

// flowlint-next-line unclear-type:off
async function openFilterAtIndex(page /*: any */, index /*: number */) {
  await page.click('button');
  const options = await page.$$('li[role="option"]');
  await options[index].click();
  return page.$('div[data-baseweb="popover"]');
}

function matchArrayElements(a /*: string[] */, b /*: string[] */) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

module.exports = {
  TABLE_ROOT,
  getActionButtonByLabel,
  getCellContentsAtColumnIndex,
  getTable,
  sortColumnAtIndex,
  openFilterAtIndex,
  matchArrayElements,
};

import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';
import * as t from 'types';
import { PAGES_PER_SECTOR, SECTOR_COLORS } from '../../constants';

/* the pages are numbered from zero */
function generatePages(sectorNum: number): Array<t.Page> {
  const pages: Array<t.Page> = [];
  for (let i = 0; i < PAGES_PER_SECTOR; i += 1) {
    pages.push({
      key: i,
      title: `Страница ${i + 1}`,
      url: `/textbook/${sectorNum}/${i}`,
      show: true,
    });
  }
  return pages;
}

/* the sectors are numbered from zero */
const initialState: t.ISectorsInfo = {
  sectors: SECTOR_COLORS.map((_, index) => ({
    key: index,
    title: `Раздел ${index + 1}`,
    pages: generatePages(index),
  })),
};

export const sectorsSlice = createSlice({
  name: 'sectors',
  initialState,
  reducers: {},
});

export const selectSectors = (state: RootState) => state.sectors.sectors;

export default sectorsSlice.reducer;

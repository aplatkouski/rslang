import { createSlice /* , PayloadAction */ } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';

import { PAGES_PER_SECTOR, SECTOR_COLORS } from '../../constants';

export interface SectorPageVisibility {
  sectorNum: number;
  pageNum: number;
  visible: boolean;
}

export interface Page {
  key: number;
  title: string;
  url: string;
  show: boolean;
}

export interface Sector {
  key: number;
  title: string;
  color: string;
  pages: Array<Page>;
}

interface SectorsState {
  sectors: Array<Sector>;
}

function generatePages(sectorNum: number, color: string): Array<Page> {
  const pages: Array<Page> = [];
  for (let i = 1; i <= PAGES_PER_SECTOR; i += 1) {
    pages.push({
      key: +`${sectorNum}${i}`,
      title: `Страница ${i}`,
      url: `/section/${sectorNum}/${i}/${encodeURIComponent(color)}`,
      show: true,
    });
  }
  return pages;
}

const initialState: SectorsState = {
  sectors: SECTOR_COLORS.map((color, index) => {
    return {
      key: index,
      title: `Раздел ${index + 1}`,
      color,
      get pages() {
        return generatePages(index, color);
      },
    };
  }),
};

export const sectorsSlice = createSlice({
  name: 'sectors',
  initialState,
  reducers: {
    /*
    setSectorPageVisibility: (state, action: PayloadAction<SectorPageVisibility>) => {
      return state.sectors.map((item, index) => {
        if (index !== action.payload.sectorNum) {
          // This isn't the item we care about - keep it as-is
          return item;
        }

        // Otherwise, this is the one we want - return an updated value
        return {
          ...item,
          pages: item.pages.map((page) =>
            page.key === action.payload.pageNum
              ? page
              : { ...page, show: action.payload.visible }
          ),
        };
      });
    }, */
  },
});

// export const { setSectorPageVisibility } = sectorsSlice.actions;

export const getSectors = (state: RootState) => state.sectors.sectors;

export default sectorsSlice.reducer;
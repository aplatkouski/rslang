import { createSlice /* , PayloadAction */ } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';
import * as t from 'types';
import { PAGES_PER_SECTOR, SECTOR_COLORS } from '../../constants';

/* Страницы нумеруются с нуля! */
function generatePages(sectorNum: number, color: string): Array<t.Page> {
  const pages: Array<t.Page> = [];
  for (let i = 0; i < PAGES_PER_SECTOR; i += 1) {
    pages.push({
      key: i,
      title: `Страница ${i + 1}`,
      url: `/section/${sectorNum}/${i}/${encodeURIComponent(color)}`,
      show: true,
    });
  }
  return pages;
}

/* Разделы нумеруются с нуля! */
const initialState: t.SectorsState = SECTOR_COLORS.map((color, index) => {
  return {
    key: index,
    title: `Раздел ${index + 1}`,
    color,
    get pages() {
      return generatePages(index, color);
    },
  };
});

export const sectorsSlice = createSlice({
  name: 'sectors',
  initialState,
  reducers: {
    /*
    setSectorPageVisibility: (state, action: PayloadAction<SectorPageVisibility>) => {
      return state.map((item) => {
        if (item.key !== action.payload.sectorNum) {
          // This isn't the item we care about - keep it as-is
          return { ...item, pages: item.pages.map((el) => el) };
        }

        return { ...item, pages: item.pages.map((el) => el) };

        // Otherwise, this is the one we want - return an updated value
        return {
          ...item,
          pages: item.pages.map((page) =>
            page.key === action.payload.pageNum
              ? page
              : { ...page, show: action.payload.visible }
          ),
        };
      }); */
  },
});

// export const { setSectorPageVisibility } = sectorsSlice.actions;

export const selectSectors = (state: RootState) => state.sectors;

export const selectAdjacentPages = (
  state: RootState,
  requestData: t.SectorPage
): Array<t.Page | undefined> => {
  let prevPage;
  let nextPage;
  const sector = state.sectors.find((item) => item.key === requestData.sectorNum);
  if (sector) {
    for (let index = 0; index < sector.pages.length; index += 1) {
      const page = sector.pages[index];
      if (page.show && page.key < requestData.pageNum) {
        prevPage = page;
      } else if (nextPage) {
        break;
      } else if (page.show && page.key > requestData.pageNum) {
        nextPage = page;
      }
    }
  }
  return [prevPage, nextPage];
};

export default sectorsSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk, RootState } from 'app/store';
import * as t from 'types';
import {
  PAGES_PER_SECTOR,
  SECTOR_COLORS,
  api,
  GET_DELETED_WORDS_STAT,
  SERVER_OK_STATUS,
  WORDS_PER_PAGE,
} from '../../constants';

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
    pages: generatePages(index, color),
  };
});

export const sectorsSlice = createSlice({
  name: 'sectors',
  initialState,
  reducers: {
    setSectorPageVisibility: (state, action: PayloadAction<t.SectorPageVisibility>) => {
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].key === action.payload.sectorNum) {
          for (let j = 0; j < state[i].pages.length; j += 1) {
            if (state[i].pages[j].key === action.payload.pageNum) {
              state[i].pages[j].show = action.payload.visible;
              break;
            }
          }
          break;
        }
      }
    },
  },
});

export const { setSectorPageVisibility } = sectorsSlice.actions;

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

export const updatePagesVisibility = (
  userId?: string,
  userToken?: string
): AppThunk => async (dispatch) => {
  if (!userId || !userToken) {
    return;
  }

  const options = {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };

  try {
    const response = await fetch(`${api}/${GET_DELETED_WORDS_STAT(userId)}`, options);

    if (response.status === SERVER_OK_STATUS) {
      const data = await response.json();

      data.forEach((stat: any) => {
        // eslint-disable-next-line no-underscore-dangle
        const { group, page } = stat._id;
        const visibObj: t.SectorPageVisibility = {
          sectorNum: group,
          pageNum: page,
          visible: stat.count !== WORDS_PER_PAGE,
        };
        dispatch(setSectorPageVisibility(visibObj));
      });
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
};

export default sectorsSlice.reducer;

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
const initialState: t.ISectorsInfo = {
  sectors: SECTOR_COLORS.map((color, index) => {
    return {
      key: index,
      title: `Раздел ${index + 1}`,
      color,
      pages: generatePages(index, color),
    };
  }),
  // флаг окончания загрузки информации о разделах и страницах
  sectorsReady: true,
  // массив страниц раздела "удаленные слова"
  deletedSections: [],
  // массив страниц раздела "сложные слова"
  hardSections: [],
  hardSectionsReady: true,
};

export const sectorsSlice = createSlice({
  name: 'sectors',
  initialState,
  reducers: {
    /**
     * Устанавливает/сбраысвает флаг видимости для конкретной страницы основного раздела учебника.
     */
    setSectorPageVisibility: (state, action: PayloadAction<t.SectorPageVisibility>) => {
      for (let i = 0; i < state.sectors.length; i += 1) {
        if (state.sectors[i].key === action.payload.sectorNum) {
          for (let j = 0; j < state.sectors[i].pages.length; j += 1) {
            if (state.sectors[i].pages[j].key === action.payload.pageNum) {
              state.sectors[i].pages[j].show = action.payload.visible;
              break;
            }
          }
          break;
        }
      }
    },
    /**
     * Устанавливает/сбрасывает флаг видимости для заданных страниц заданных разделов учебника.
     */
    setSectorPagesVisibility: (
      state,
      action: PayloadAction<Array<t.SectorPageVisibility>>
    ) => {
      for (let i = 0; i < action.payload.length; i += 1) {
        const visibObj = action.payload[i];

        for (let j = 0; j < state.sectors.length; j += 1) {
          if (state.sectors[j].key === visibObj.sectorNum) {
            for (let k = 0; k < state.sectors[k].pages.length; k += 1) {
              if (state.sectors[j].pages[k].key === visibObj.pageNum) {
                state.sectors[j].pages[k].show = visibObj.visible;
                break;
              }
            }
            break;
          }
        }
      }
    },
    /**
     * Для всех страниц всех разделов учебника устанавливает флаг видимости.
     */
    setAllPagesVisible: (state) => {
      for (let i = 0; i < state.sectors.length; i += 1) {
        for (let j = 0; j < state.sectors[i].pages.length; j += 1) {
          state.sectors[i].pages[j].show = true;
        }
      }
      state.deletedSections = [];
    },
    /**
     * Устанавливает/сбрасывает флаг готовности разделов и страниц.
     */
    setSectorsReadyState: (state, action: PayloadAction<boolean>) => {
      state.sectorsReady = action.payload;
    },
    /**
     * Устанавливает массив страниц с удаленными словами.
     */
    setDeletedSections: (state, action: PayloadAction<t.SpecialSections>) => {
      state.deletedSections = action.payload;
    },
    /**
     * Устанавливает массив страниц со сложными словами.
     */
    setHardSections: (state, action: PayloadAction<t.SpecialSections>) => {
      state.hardSections = action.payload;
    },
    /**
     * Устанавливает/сбрасывает флаг готовности страниц со сложными словами.
     */
    setHardSectionsReadyState: (state, action: PayloadAction<boolean>) => {
      state.hardSectionsReady = action.payload;
    },
  },
});

export const {
  setDeletedSections,
  setHardSections,
  setHardSectionsReadyState,
  setAllPagesVisible,
  setSectorPageVisibility,
  setSectorPagesVisibility,
  setSectorsReadyState,
} = sectorsSlice.actions;

export const selectSectors = (state: RootState) => state.sectors.sectors;
export const selectSectorsReadyState = (state: RootState) => state.sectors.sectorsReady;
export const selectDeletedSections = (state: RootState) => state.sectors.deletedSections;
export const selectHardSections = (state: RootState) => state.sectors.hardSections;
export const selectHardSectionsReadyState = (state: RootState) =>
  state.sectors.hardSectionsReady;

/**
 * Для заданной страницы основного раздела учебника возвращает смежные ей страницы,
 * с учетом их видимости.
 */
export const selectAdjacentPages = (
  state: RootState,
  requestData: t.SectorPage
): Array<t.Page | undefined> => {
  let prevPage;
  let nextPage;
  const sector = state.sectors.sectors.find((item) => item.key === requestData.sectorNum);
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

/**
 * Позволяет установить видимость страниц основного раздела учебника, основываясь на
 * данных о текущем пользователе и данных, содержащихся в БД.
 * Параллельно формирует массив информации о страницах с удаленными словами.
 */
export const updatePagesVisibility = (
  userId?: string,
  userToken?: string
): AppThunk => async (dispatch) => {
  // Если пользователь не вошел в систему, то все страницы visible = true
  // и нет страниц с deleted words
  if (!userId || !userToken) {
    dispatch(setAllPagesVisible());
    return;
  }

  // Если же пользователь вошел в систему, то необходим дополнительный запрос на сервер,
  // чтобы решить, все ли страницы visible = true, или для некоторых visible = false.
  // Параллельно будет сформирован массив страниц с deleted words.

  const options = {
    method: 'GET',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${userToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
    },
  };

  dispatch(setSectorsReadyState(false));

  try {
    const response = await fetch(`${api}/${GET_DELETED_WORDS_STAT(userId)}`, options);

    if (response.status === SERVER_OK_STATUS) {
      const data = await response.json();

      // Страницы учебника, для которых необходимо изменить visibility
      const visibilityObjects: Array<t.SectorPageVisibility> = [];
      // Объект, определяющий количество deleted-слов в каждом разделе учебника
      const deletedWordsTotal: any = {};

      data.forEach((stat: any) => {
        // eslint-disable-next-line no-underscore-dangle
        const { group, page } = stat._id;

        visibilityObjects.push({
          sectorNum: group,
          pageNum: page,
          visible: stat.count !== WORDS_PER_PAGE,
        });

        if (!deletedWordsTotal[group]) {
          deletedWordsTotal[group] = stat.count;
        } else {
          deletedWordsTotal[group] += stat.count;
        }
      });

      dispatch(setSectorPagesVisibility(visibilityObjects));

      // На основании deletedWordsTotal формируем страницы с удаленными словами
      const deletedSections: t.SpecialSections = [];
      let lastDeletedSectionNum = 0;

      Object.keys(deletedWordsTotal).forEach((sector) => {
        for (
          let i = 0;
          i < Math.ceil(deletedWordsTotal[sector] / PAGES_PER_SECTOR);
          i += 1
        ) {
          deletedSections.push({
            group: Number(sector),
            page: lastDeletedSectionNum,
          });
          lastDeletedSectionNum += 1;
        }
      });

      dispatch(setDeletedSections(deletedSections));
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}

  dispatch(setSectorsReadyState(true));
};

export default sectorsSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk, RootState } from 'app/store';
import * as t from 'types';
import {
  api,
  DELETED_WORDS_SECTOR_COLOR,
  GET_DELETED_WORDS_STAT,
  HARD_WORDS_SECTOR_COLOR,
  GET_HARD_WORDS_STAT,
  PAGES_PER_SECTOR,
  SECTOR_COLORS,
  SERVER_OK_STATUS,
  SPECIAL_WORD_INDICATOR,
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
     * Устанавливает/сбрасывает флаг видимости для заданных страниц заданных основных разделов учебника.
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
     * Чистит массивы страниц сложных и удаленных слов.
     */
    setAllPagesVisible: (state) => {
      for (let i = 0; i < state.sectors.length; i += 1) {
        for (let j = 0; j < state.sectors[i].pages.length; j += 1) {
          state.sectors[i].pages[j].show = true;
        }
      }
      state.deletedSections = [];
      state.hardSections = [];
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
  },
});

export const {
  setDeletedSections,
  setHardSections,
  setAllPagesVisible,
  setSectorPageVisibility,
  setSectorPagesVisibility,
  setSectorsReadyState,
} = sectorsSlice.actions;

export const selectSectors = (state: RootState) => state.sectors.sectors;
export const selectSectorsReadyState = (state: RootState) => state.sectors.sectorsReady;
export const selectDeletedSections = (state: RootState) => state.sectors.deletedSections;
export const selectHardSections = (state: RootState) => state.sectors.hardSections;

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
 * Для заданной страницы раздела словаря сложных слов возвращает смежные ей страницы.
 */
export const selectAdjacentHardPages = (
  state: RootState,
  requestData: t.SectorPage
): Array<t.ISpecialSection | undefined> => {
  let prevPage;
  let nextPage;
  const { hardSections } = state.sectors;

  for (let index = 0; index < hardSections.length; index += 1) {
    const page = hardSections[index];
    if (page.page < requestData.pageNum) {
      prevPage = page;
    } else if (nextPage) {
      break;
    } else if (page.page > requestData.pageNum) {
      nextPage = page;
    }
  }

  return [prevPage, nextPage];
};

/**
 * Для заданной страницы раздела словаря удаленных слов возвращает смежные ей страницы.
 */
export const selectAdjacentDeletedPages = (
  state: RootState,
  requestData: t.SectorPage
): Array<t.ISpecialSection | undefined> => {
  let prevPage;
  let nextPage;
  const { deletedSections } = state.sectors;

  for (let index = 0; index < deletedSections.length; index += 1) {
    const page = deletedSections[index];
    if (page.page < requestData.pageNum) {
      prevPage = page;
    } else if (nextPage) {
      break;
    } else if (page.page > requestData.pageNum) {
      nextPage = page;
    }
  }

  return [prevPage, nextPage];
};

/**
 * Формирует страницы для разделов сложных / удаленных слов.
 */
const formSpecialSections = (data: any, urlIndicator: string, color: string) => {
  // Объект, определяющий количество special-слов в каждом разделе учебника
  const specialWordsTotal: any = {};

  data.forEach((stat: any) => {
    // eslint-disable-next-line no-underscore-dangle
    const { group } = stat._id;

    if (!specialWordsTotal[group]) {
      specialWordsTotal[group] = stat.count;
    } else {
      specialWordsTotal[group] += stat.count;
    }
  });

  // На основании specialWordsTotal формируем страницы с удаленными/сложными словами
  const specialSections: t.SpecialSections = [];
  let lastSpecialSectionNum = 0;

  Object.keys(specialWordsTotal).forEach((sector) => {
    for (let i = 0; i < Math.ceil(specialWordsTotal[sector] / PAGES_PER_SECTOR); i += 1) {
      specialSections.push({
        group: Number(sector),
        page: lastSpecialSectionNum,
        dbRefPage: i,
        url: `/hardOrDeletedSection/${urlIndicator}/${sector}/${lastSpecialSectionNum}/${i}/${encodeURIComponent(
          color
        )}`,
      });
      lastSpecialSectionNum += 1;
    }
  });

  return specialSections;
};

/**
 * Позволяет установить видимость страниц основного раздела учебника, основываясь на
 * данных о текущем пользователе и данных, содержащихся в БД.
 * Параллельно формирует массив информации о страницах с удаленными словами.
 * А также массив информации о страницах со сложными словами.
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
  // А также массив страниц с hard words.

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

      data.forEach((stat: any) => {
        // eslint-disable-next-line no-underscore-dangle
        const { group, page } = stat._id;

        visibilityObjects.push({
          sectorNum: group,
          pageNum: page,
          visible: stat.count !== WORDS_PER_PAGE,
        });
      });

      dispatch(setSectorPagesVisibility(visibilityObjects));

      // Формируем страницы для deleted words

      const deletedSections = formSpecialSections(
        data,
        SPECIAL_WORD_INDICATOR.DEL,
        DELETED_WORDS_SECTOR_COLOR
      );

      dispatch(setDeletedSections(deletedSections));

      // Переходим к hard words

      const hardResponse = await fetch(`${api}/${GET_HARD_WORDS_STAT(userId)}`, options);

      if (hardResponse.status === SERVER_OK_STATUS) {
        const hardData = await hardResponse.json();

        const hardSections = formSpecialSections(
          hardData,
          SPECIAL_WORD_INDICATOR.HARD,
          HARD_WORDS_SECTOR_COLOR
        );

        dispatch(setHardSections(hardSections));
      }
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}

  dispatch(setSectorsReadyState(true));
};

export default sectorsSlice.reducer;

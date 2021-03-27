export type SectionPageParams = {
  sector?: string;
  page?: string;
  color?: string;
};

export interface SectorPage {
  sectorNum: number;
  pageNum: number;
}

export interface SectorPageVisibility extends SectorPage {
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

export type SectorsState = Array<Sector>;

export interface Settings {
  translation: boolean;
  buttons: boolean;
}

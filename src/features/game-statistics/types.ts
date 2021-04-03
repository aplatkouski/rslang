import { ICredentials, IGameStatistic } from 'types';

export interface CreateThunkArguments extends ICredentials {
  gameStatistic: Omit<IGameStatistic, 'id'>;
}

export interface FetchThunkArguments extends ICredentials {}

export interface RemoveThunkArguments extends ICredentials {
  gameStatisticId: string;
}

export interface UpdateThunkArguments extends ICredentials {
  gameStatistic: IGameStatistic;
}

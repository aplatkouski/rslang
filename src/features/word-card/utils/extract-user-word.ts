import { IUserWord, IWord } from 'types';

export default (word: IWord, userWord?: IUserWord) => {
  if (!userWord) {
    const { id: wordId, group, page } = word;
    return { wordId, group, page } as Omit<IUserWord, 'id'>;
  }
  return userWord;
};

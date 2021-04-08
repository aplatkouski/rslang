import { IUserWord } from 'types';

const requiredFields = ['isDeleted', 'isDifficult', 'isStudied'] as Array<
  keyof IUserWord
>;

const isAllRequiredFieldEmpty: IsAllRequiredFieldEmpty = (
  except = '',
  userWord = undefined
) => {
  if (!userWord) {
    return false;
  }
  return requiredFields.every((field) =>
    field === except ? userWord[field] : !userWord[field]
  );
};

type IsAllRequiredFieldEmpty = (
  except: keyof IUserWord | '',
  userWord?: IUserWord
) => boolean;

export default isAllRequiredFieldEmpty;

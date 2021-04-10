import { IUser } from 'types';
import { v4 } from 'uuid';
import { api, requestMethods } from '../../constants';

interface Param {
  [key: string]: string;
}

interface FetchDataArguments {
  currentUser?: IUser;
  body?: {
    [key: string]: any;
  };
  id?: string;
  method: keyof typeof requestMethods;
  path: string;
}

const pathToParamIdMap = {
  words: 'wordId' as const,
  default: 'id' as const,
};

const pathToResponseTypeMap = {
  settings: '{}' as const,
  default: '[]' as const,
};

const IdToParam = (path: string, id?: string): Param => {
  // replace 'id' param with appropriate field name by pathToParamIdMap
  const param = {} as Param;
  if (id) {
    // @ts-ignore
    param[pathToParamIdMap[path] || pathToParamIdMap.default] = id;
  }
  return param;
};

const handlers = {
  [requestMethods.GET]: async ({ path }: Pick<FetchDataArguments, 'path'>) => {
    const rawData = await localStorage.getItem(path);
    // @ts-ignore
    const defaultType = pathToResponseTypeMap[path] || pathToResponseTypeMap.default;
    return JSON.parse(rawData || defaultType);
  },
  [requestMethods.POST]: async (args: Omit<FetchDataArguments, 'method'>) => {
    const { path, body, id } = args;

    const param = IdToParam(path, id);
    const responseEntity = { id: v4(), ...body, ...param };
    // @ts-ignore
    const defaultType = pathToResponseTypeMap[path] || pathToResponseTypeMap.default;
    if (defaultType === '{}') {
      await localStorage.setItem(path, JSON.stringify(responseEntity));
    } else {
      // '[]' - Array
      const data = await handlers[requestMethods.GET](args);
      data.push(responseEntity);
      await localStorage.setItem(path, JSON.stringify(data));
    }
    return responseEntity;
  },
  [requestMethods.PUT]: async (args: Omit<FetchDataArguments, 'method'>) => {
    const { path, body, id } = args;

    const param = IdToParam(path, id);
    const newEntity = { ...body, ...param };
    let responseEntity = {};
    // @ts-ignore
    const defaultType = pathToResponseTypeMap[path] || pathToResponseTypeMap.default;

    if (defaultType === '{}') {
      const entityFromLocalStorage = await handlers[requestMethods.GET](args);
      responseEntity = { id: v4(), ...entityFromLocalStorage, ...newEntity };
      await localStorage.setItem(path, JSON.stringify(responseEntity));
      return responseEntity;
    }

    if (id) {
      // '[]' - Array
      const data = (await handlers[requestMethods.GET](args)) as Array<{
        [key: string]: any;
      }>;
      const entityFromLocalStorage =
        data.find((entity) =>
          Object.entries(param).every(([key, value]) => entity[key] === value)
        ) || {};
      const entityIndex = data.indexOf(entityFromLocalStorage);
      responseEntity = { id: v4(), ...entityFromLocalStorage, ...newEntity };
      if (entityIndex >= 0) {
        data.splice(entityIndex, 1, responseEntity);
      } else {
        data.push(responseEntity);
      }
      await localStorage.setItem(path, JSON.stringify(data));
      return responseEntity;
    }
    throw Error('Wrong prams!');
  },
  [requestMethods.DELETE]: async (args: Omit<FetchDataArguments, 'method' | 'body'>) => {
    const { path, id } = args;

    const param = IdToParam(path, id);

    if (id) {
      const data = (await handlers[requestMethods.GET](args)) as Array<{
        [key: string]: any;
      }>;
      const entityFromLocalStorage =
        data.find((entity) =>
          Object.entries(param).every(([key, value]) => entity[key] === value)
        ) || {};
      const entityIndex = data.indexOf(entityFromLocalStorage);
      if (entityIndex >= 0) data.splice(entityIndex, 1);
      await localStorage.setItem(path, JSON.stringify(data));
      return null;
    }
    throw Error('Wrong prams!');
  },
  DEFAULT: () => {
    throw Error('Wrong method!');
  },
};

export async function fetchUserData<T>(args: FetchDataArguments): Promise<T> {
  const { method, path, body, id, currentUser } = args;
  if (currentUser) {
    const { userId, token } = currentUser;
    const options = {
      method,
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: body ? JSON.stringify(body) : undefined,
    };
    const entityId = id ? `/${id}` : '';
    const response = await fetch(`${api}/users/${userId}/${path}${entityId}`, options);
    if (method !== requestMethods.DELETE) {
      return response.json();
    }
  }
  const handle = handlers[method] || handlers.DEFAULT;
  return handle({
    path,
    body,
    id,
  });
}

import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUstensil, defaultValue } from 'app/shared/model/ustensil.model';

export const ACTION_TYPES = {
  FETCH_USTENSIL_LIST: 'ustensil/FETCH_USTENSIL_LIST',
  FETCH_USTENSIL: 'ustensil/FETCH_USTENSIL',
  CREATE_USTENSIL: 'ustensil/CREATE_USTENSIL',
  UPDATE_USTENSIL: 'ustensil/UPDATE_USTENSIL',
  DELETE_USTENSIL: 'ustensil/DELETE_USTENSIL',
  RESET: 'ustensil/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IUstensil>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type UstensilState = Readonly<typeof initialState>;

// Reducer

export default (state: UstensilState = initialState, action): UstensilState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USTENSIL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_USTENSIL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_USTENSIL):
    case REQUEST(ACTION_TYPES.UPDATE_USTENSIL):
    case REQUEST(ACTION_TYPES.DELETE_USTENSIL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_USTENSIL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_USTENSIL):
    case FAILURE(ACTION_TYPES.CREATE_USTENSIL):
    case FAILURE(ACTION_TYPES.UPDATE_USTENSIL):
    case FAILURE(ACTION_TYPES.DELETE_USTENSIL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USTENSIL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_USTENSIL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_USTENSIL):
    case SUCCESS(ACTION_TYPES.UPDATE_USTENSIL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_USTENSIL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/ustensils';

// Actions

export const getEntities: ICrudGetAllAction<IUstensil> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USTENSIL_LIST,
  payload: axios.get<IUstensil>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IUstensil> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USTENSIL,
    payload: axios.get<IUstensil>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IUstensil> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USTENSIL,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IUstensil> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USTENSIL,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUstensil> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USTENSIL,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});

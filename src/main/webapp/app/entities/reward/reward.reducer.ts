import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IReward, defaultValue } from 'app/shared/model/reward.model';

export const ACTION_TYPES = {
  FETCH_REWARD_LIST: 'reward/FETCH_REWARD_LIST',
  FETCH_REWARD: 'reward/FETCH_REWARD',
  CREATE_REWARD: 'reward/CREATE_REWARD',
  UPDATE_REWARD: 'reward/UPDATE_REWARD',
  DELETE_REWARD: 'reward/DELETE_REWARD',
  RESET: 'reward/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IReward>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type RewardState = Readonly<typeof initialState>;

// Reducer

export default (state: RewardState = initialState, action): RewardState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_REWARD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_REWARD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_REWARD):
    case REQUEST(ACTION_TYPES.UPDATE_REWARD):
    case REQUEST(ACTION_TYPES.DELETE_REWARD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_REWARD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_REWARD):
    case FAILURE(ACTION_TYPES.CREATE_REWARD):
    case FAILURE(ACTION_TYPES.UPDATE_REWARD):
    case FAILURE(ACTION_TYPES.DELETE_REWARD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_REWARD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_REWARD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_REWARD):
    case SUCCESS(ACTION_TYPES.UPDATE_REWARD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_REWARD):
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

const apiUrl = 'api/rewards';

// Actions

export const getEntities: ICrudGetAllAction<IReward> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_REWARD_LIST,
  payload: axios.get<IReward>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IReward> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_REWARD,
    payload: axios.get<IReward>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IReward> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_REWARD,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IReward> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_REWARD,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IReward> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_REWARD,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});

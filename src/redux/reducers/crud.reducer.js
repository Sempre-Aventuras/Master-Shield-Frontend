// Use this as a template
import {
  CRUD_FETCHING,
  CRUD_SUCCESS,
  CRUD_FAILED,
  CRUD_CLEAR,
} from "../constants";
 
const initialState = {
  isFetching: false,
  isError: false,
  result: null,
};
 
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CRUD_FETCHING:
      return { ...state, isFetching: true, isError: false, result: null };
    case CRUD_FAILED:
      return { ...state, isFetching: false, isError: true, result: null };
    case CRUD_SUCCESS:
      return { ...state, isFetching: false, isError: false, result: payload };
    case CRUD_CLEAR:
      return { ...state, result: null, isFetching: false, isError: false };
    default:
      return state;
  }
};
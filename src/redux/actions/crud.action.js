// Use this as a template
import {
  CRUD_FETCHING,
  CRUD_SUCCESS,
  CRUD_FAILED,
  CRUD_CLEAR,
  server,
} from "../constants";
import swal from "sweetalert";
import { httpClient } from "./../utils/HttpClient";
 
export const setCRUDStateToFetching = () => ({
  type: CRUD_FETCHING,
});
 
export const setCRUDStateToFailed = () => ({
  type: CRUD_FAILED,
});
export const setCRUDStateToClear = () => ({
  type: CRUD_CLEAR,
});
export const setCRUDStateToSuccess = (payload) => ({
  type: CRUD_SUCCESS,
  payload,
});

// CREATE operation
export const create = (values, history) => {
  return async (dispatch) => {
    dispatch(setCRUDStateToFetching());
    const response = await httpClient.post(
      process.env.REACT_APP_API_URL + "crud",
      values
    );
    if (response.data.result == "success") {
      dispatch(setCRUDStateToSuccess(response.data));
      swal("Success!", response.data.message, "success").then((value) => {
        dispatch(setCRUDStateToClear());
        history.goBack();
        dispatch(index());
      });
    } else if (response.data.result === "error") {
      dispatch(setCRUDStateToFailed());
      swal("Error!", response.data.message, "error");
    }
  };
};

// Index Action
export const index = () => {
  return async (dispatch) => {
    dispatch(setCRUDStateToFetching);
    const response = await httpClient.get(
      process.env.REACT_APP_API_URL + "crud"
    );
    if (response.data.result == "success") {
      // console.log(response.data);
      dispatch(setCRUDStateToSuccess(response.data.data));
    } else if (response.data.result === "error") {
      dispatch(setCRUDStateToFailed());
      swal("Error!", response.data.message, "error");
    }
  };
};

// UPDATE operation
// Fetch CRUD by ID
export const getCRUDById = (id) => {
  return async (dispatch) => {
    dispatch(setCRUDStateToFetching());
    const response = await httpClient.get(
      process.env.REACT_APP_API_URL + "crud/" + id
    );
    if (response.data.result == "success") {
      dispatch(setCRUDStateToSuccess(response.data.data));
    } else if (response.data.result === "error") {
      dispatch(setCRUDStateToFailed());
      swal("Error!", response.data.message, "error");
    }
  };
};

// Then Update
export const update = (values, history) => {
  return async (dispatch) => {
    dispatch(setCRUDStateToFetching());
    const response = await httpClient.put(
      process.env.REACT_APP_API_URL + "crud",
      values
    );
    if (response.data.result == "success") {
      dispatch(setCRUDStateToClear());
      history.goBack();
      dispatch(index());
    } else if (response.data.result === "error") {
      dispatch(setCRUDStateToFailed());
      swal("Error!", response.data.message, "error");
    }
  };
};

// DELETE operation
export const remove = (id) => {
  return async (dispatch) => {
    console.log("remove");
    dispatch(setCRUDStateToFetching());
    const response = await httpClient.delete(
      process.env.REACT_APP_API_URL + "crud/" + id
    );
    if (response.data.result == "success") {
      dispatch(setCRUDStateToSuccess());
      dispatch(index());
    } else if (response.data.result === "error") {
      dispatch(setCRUDStateToFailed());
      swal("Error!", response.data.message, "error");
    }
  };
};
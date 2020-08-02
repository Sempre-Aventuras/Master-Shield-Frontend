import React, { useState, useEffect } from "react";
import * as crudActions from "../../../../redux/actions/crud.action";
import { server } from "../../../../redux/constants";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";

import Header from "../../../../components/header";
import Footer from "../../../../components/footer";

const CRUD_index = (props) => {
  const crudReducer = useSelector(
    ({ crudReducer }) => crudReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push("/login");
    }
    dispatch(crudActions.index());
  }, []);

  function confirmDelete(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(crudActions.remove(id));
        swal("Poof! Your data has been deleted!", {
          icon: "success",
        });
      }
    });
  }  

  return (
    <>
    <Header/>
    <div className="container-fluid">
      <div className="container">
        <div className="page-container">
        <table className="table table-hover text-nowrap">
          <thead>
            <tr>
              <th>Alias</th>
              <th>Serial Name</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {crudReducer.result ? (
              crudReducer.result.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.alias}</td>
                    <td>{data.serial_number}</td>
                    <td>{data.created}</td>
                    <td>
                      <Link to={"/crud/update/" + data._id}>
                        Edit
                      </Link>
                      {" | "}
                      <Link onClick={() => confirmDelete(data._id)}>
                        Delete
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <td></td>
            )}
          </tbody>
        </table>
        </div>
      </div>    
    </div>
    <Footer/>
    </>
  )
}

export default CRUD_index;

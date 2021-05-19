import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "store/users/actions";
function About(props) {
  useEffect(() => {
    if (!props.users.length) {
      props.fetchUsers();
    }
  }, []);
  return (
    <>
      <h1>Users List 1</h1>
      {props.users.map((user) => {
        return <li key={user.id}>{user.name}</li>;
      })}
    </>
  );
}

const mapStateToProps = (state) => {
  return { users: state.users };
};

const getInitialData = (store) => {
  return store.dispatch(fetchUsers());
};

About.getInitialData = getInitialData;

export default connect(mapStateToProps, { fetchUsers })(About);

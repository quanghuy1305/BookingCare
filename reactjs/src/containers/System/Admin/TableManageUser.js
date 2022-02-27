import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

import * as ReactDOM from "react-dom";
import MarkdownIt from "markdown-it";

import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }
  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers,
      });
    }
  }
  handleDeleteUser = (user) => {
    this.props.deleteAUserRedux(user.id);
  };

  handleEditUser = (user) => {
    this.props.handleEditUserFromParent(user);
  };
  render() {
    let arrUsers = this.state.usersRedux;
    return (
      <React.Fragment>
        <table id="TableManageUser">
          <tbody>
            <tr>
              <th>Email</th>
              <th>Họ</th>
              <th>Tên</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Edit</th>
            </tr>
            {arrUsers &&
              arrUsers.length > 0 &&
              arrUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>{item.phoneNumber}</td>

                    <td>
                      <button
                        onClick={() => this.handleEditUser(item)}
                        className="btn-edit"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        onClick={() => this.handleDeleteUser(item)}
                        className="btn-delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);

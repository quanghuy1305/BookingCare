import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageSpecialty.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";

import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialty: [],
    };
  }
  componentDidMount() {
    this.props.fetchSpecialtyRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listSpecialty !== this.props.listSpecialty) {
      this.setState({
        specialty: this.props.listSpecialty,
      });
      this.props.fetchSpecialtyRedux();
    }
  }
  handleDeleteSpecialty = (specialty) => {
    this.props.deleteASpecialtyRedux(specialty.id);
  };

  handleEditSpecialty = (specialty) => {
    this.props.handleEditSpecialtyFromParent(specialty);
  };
  render() {
    let arrSpecialty = this.state.specialty;
    return (
      <React.Fragment>
        <table id="TableManageSpecialty">
          <tbody>
            <tr>
              <th>STT</th>
              <th>Chuyên khoa khám bệnh</th>
              <th>Nội dung</th>
              <th>Edit</th>
            </tr>
            {arrSpecialty &&
              arrSpecialty.length > 0 &&
              arrSpecialty.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.descriptionMarkdown}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditSpecialty(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteSpecialty(item)}
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
    listSpecialty: state.admin.allSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSpecialtyRedux: () => dispatch(actions.fetchAllSpecialtyStart()),
    deleteASpecialtyRedux: (id) => dispatch(actions.deleteASpecialty(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageSpecialty);

import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageDoctorOnline.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { LANGUAGES, CommonUtils, CRUD_ACTIONS } from "../../../utils";
import { createNewDoctorOnlineService } from "../../../services/userService";
import { toast } from "react-toastify";
import TableManageSpecialty from "../Admin/TableManageSpecialty";
import * as actions from "../../../store/actions";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctorOnline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    }
  }

  onChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };

  handleOnChangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  openPreviewImg = () => {
    if (!this.state.imageBase64) return;
    this.setState({ isOpen: true });
  };

  handleSaveDoctorOnline = async () => {
    let res = await createNewDoctorOnlineService(this.state);
    if (res && res.errCode === 0) {
      toast.success("Lưu thành công !");
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Lưu thất bại !");
      console.log("Check res ==>:  ", res);
    }
  };

  render() {
    let { name } = this.state;
    return (
      <div className="manage-DoctorOnline-container">
        <div className="md-title">Quản lý Tư Vấn Qua Video</div>
        <div className="add-new-DoctorOnline row">
          <div className="col-6 form-group ">
            <label>Tên Chuyên Khoa</label>
            <input
              className="form-control"
              type="text"
              value={name}
              onChange={(event) => this.onChangeInput(event, "name")}
            />
          </div>
          <div className="col-6 form-group ">
            <label>Hình Ảnh</label>
            <div className="add-img-specialty">
              <input
                id="previewImg"
                type="file"
                hidden="hidden"
                onChange={(event) => this.handleOnChangeImg(event)}
              />
              <label className="label-upload" htmlFor="previewImg">
                <i className="fas fa-arrow-circle-up"></i>
                Tải ảnh
              </label>
              <div
                className="previewImg"
                style={{
                  backgroundImage: `url(${this.state.imageBase64})`,
                }}
                onClick={() => this.openPreviewImg()}
              ></div>
            </div>
          </div>
          <div className="col-12">
            <MdEditor
              style={{ height: "350px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12 my-3">
            <button
              className="btn-save-DoctorOnline"
              onClick={() => this.handleSaveDoctorOnline()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listSpecialty: state.admin.allSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editASpecialty: (data) => dispatch(actions.editASpecialty(data)),
    createNewSpecialty: (data) => dispatch(actions.createNewSpecialty(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctorOnline);

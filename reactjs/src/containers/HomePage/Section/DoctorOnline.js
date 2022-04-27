import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getDoctorOnline } from "../../../services/userService";
import { withRouter } from "react-router";
import "./DoctorOnline.scss";

class DoctorOnline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDoctorOnline: {},
    };
  }

  async componentDidMount() {
    let res = await getDoctorOnline();
    if (res && res.errCode === 0) {
      this.setState({
        dataDoctorOnline: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailDoctorOnline = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor-online/${item.id}`);
    }
  };

  render() {
    let { dataDoctorOnline } = this.state;
    return (
      <div className="section-share section-DoctorOnline">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.doctorOnline" />
              <i className="video fa fa-video" />
            </span>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataDoctorOnline &&
                dataDoctorOnline.length > 0 &&
                dataDoctorOnline.map((item, index) => {
                  return (
                    <div
                      className="section-customize doctorOnline-child"
                      key={index}
                      onClick={() => this.handleViewDetailDoctorOnline(item)}
                    >
                      <div
                        className="bg-img section-DoctorOnline"
                        style={{
                          backgroundImage: `url(${item.image})`,
                        }}
                      />
                      <div className="doctorOnline-name">{item.name}</div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language, //xử lý chuyển đổi ngôn ngữ
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DoctorOnline)
);

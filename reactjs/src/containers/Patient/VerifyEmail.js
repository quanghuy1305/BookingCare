import React, { Component } from "react";
import { connect } from "react-redux";
import { postVerifyBookAppointment } from "../../services/userService";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../HomePage/HomeHeader";
import "./VerifyEmail.scss";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }
  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let timeType = urlParams.get("timeType");

      let res = await postVerifyBookAppointment({
        token: token,
        doctorId: doctorId,
        timeType: timeType,
      });

      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { statusVerify, errCode } = this.state;
    return (
      <>
        <div className="Header">
          <HomeHeader />
        </div>
        <div className="verifyEmail-container">
          {statusVerify === false ? (
            <div>Loading data...</div>
          ) : (
            <div className="verifyEmail-content">
              {+errCode === 0 ? (
                <div className="infor-booking">
                  <FormattedMessage id="patient.verify-email.success" />
                </div>
              ) : (
                <div className="infor-booking">
                  <FormattedMessage id="patient.verify-email.failed" />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="content-footer">
          <p>&copy; 2021-2022 BookingCare B1812794</p>
          <i className="fas fa-phone"> Hỗ trợ: 0819 39 99 88</i>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import tokhaiyte from '../../../assets/QRCODE_khaibaoyte.png';
import chungnhan from '../../../assets/bo-cong-thuong.svg';

class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    <FormattedMessage id="about.title" />
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe
                            width="100%"
                            height="380px"
                            src="https://www.youtube.com/embed/-YRCU8wrYcE"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className="content-center">
                        <div className="content-child">
                            <p><b><FormattedMessage id="about.left.1" /></b></p>
                            <p><b><FormattedMessage id="about.left.2" /></b></p>
                            <p><b><FormattedMessage id="about.left.3" /></b></p>
                            <p><b><FormattedMessage id="about.left.4" /></b></p>
                            <p><i className="fas fa-plus-square"> <FormattedMessage id="about.left.HealthDeclaration" /> </i></p>
                            <img src={tokhaiyte} />
                        </div>

                    </div>
                    <div className="content-right">
                        <div className="content-child">
                            <p> <i className="fas fa-map-marker-alt"><FormattedMessage id="about.right.location" />  </i><FormattedMessage id="about.right.address" /> </p>
                            <p><i className="fas fa-envelope"> Email: </i>  chamsockhachhang_gov.com.vn </p>
                            <p> <i className="fas fa-phone-volume"> Tel: </i>  <FormattedMessage id="about.right.tel" /> </p>
                            <p> <b><FormattedMessage id="about.right.timework" /></b> <br /> <FormattedMessage id="about.right.time" /></p>
                            <img src={chungnhan} />
                         </div>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn, language: state.app.language //xử lý chuyển đổi ngôn ngữ
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);

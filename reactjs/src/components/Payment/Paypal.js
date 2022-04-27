import React, { useRef, useEffect, useState } from "react";
import { postPatientBookAppointment } from "../../services/userService";
import { LANGUAGES } from "../../utils";
import _ from "lodash";
import moment from "moment";
import { toast } from "react-toastify";
import ProfileDoctor from "../../containers/Patient/Doctor/ProfileDoctor";

export default function Paypal(props) {
  const paypal = useRef();

  const checkInput = () => {
    let isValid = true;
    let arrCheck = [
      "fullName",
      "phoneNumber",
      "email",
      "address",
      "reason",
      "birthday",
      "selectedGender",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (![arrCheck[i]]) {
        isValid = false;
        alert("Chưa nhập đầy đủ thông tin:  " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  const buildDoctorName = (dataTime) => {
    let { language } = props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
          : `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`;

      return name;
    }
    return "";
  };

  const buildTimeBooking = (dataTime) => {
    let { language } = props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");

      return ` ${time} : ${date}`;
    }
    return "";
  };

  useEffect(() => {
    window.paypal
      .Buttons({
        style: {
          color: "blue",
          shape: "pill",
          label: "pay",
          height: 30,
          width: 100,
        },
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Booking Doctor",
                amount: {
                  currency_code: "USD",
                  value: 100.0,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          console.log(props);
          props.state.isShowLoading = true;
          console.log(props.state.isShowLoading);
          let date = new Date(props.state.birthday).getTime();
          let timeString = buildTimeBooking(props.dataTime);
          let doctorName = buildDoctorName(props.dataTime);

          let res = await postPatientBookAppointment({
            fullName: props.state.fullName,
            phoneNumber: props.state.phoneNumber,
            email: props.state.email,
            address: props.state.address,
            reason: props.state.reason,
            date: props.dataTime.date,
            birthday: date,
            selectedGender: props.state.selectedGender.value,
            doctorId: props.state.doctorId,
            timeType: props.state.timeType,
            language: props.language,
            timeString: timeString,
            doctorName: doctorName,
          });
          props.state.isShowLoading = false;
          <ProfileDoctor isShowPrice={true} />;
          if (res && res.errCode === 0) {
            toast.success("Đặt lịch thành công !");
            props.closeBookingModal();
          } else {
            toast.error("Chưa nhập đủ thông tin !");
          }
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}

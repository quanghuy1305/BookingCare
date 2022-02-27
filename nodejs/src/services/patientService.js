import db from "../models/index";
require("dotenv").config();
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  // mở URL bên phía front-end
  return result;
};

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.phoneNumber ||
        !data.timeType ||
        !data.date ||
        !data.fullName ||
        !data.selectedGender ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let token = uuidv4();
        await emailService.sendSimpleEmail({
          receiverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          reason: data.reason,
          language: data.language,
          redirectLink: buildUrlEmail(data.doctorId, token),
        });
        //update and insert patient
        let user = await db.Patient.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            gender: data.selectedGender,
            address: data.address,
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
          },
        });
        // tao bang ghi booking record
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              fullName: data.fullName,
              phoneNumber: data.phoneNumber,
              date: data.date,
              email: data.email,
              timeType: data.timeType,
              reason: data.reason,
              token: token,
            },
          });
        }
        let schedule = await db.Schedule.findOne({
          where: {
            doctorId: data.doctorId,
            date: data.date,
            timeType: data.timeType,
            status: 1,
          },
          raw: false,
        });
        if (schedule) {
          schedule.status = false;
          await schedule.save();
          resolve({
            errCode: 0,
            errMessage: "Update the schedule succeed !",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "schedule has been disabled or does not exist !",
          });
        }
        resolve({
          data: user,
          errCode: 0,
          errMessage: "Save infor patient success !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let postVerifyBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "Update the appointment succeed !",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Appointment has been activated or does not exist !",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postBookAppointment,
  postVerifyBookAppointment,
};

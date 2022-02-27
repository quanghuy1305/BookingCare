require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com" || "@student.ctu.edu.vn",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Quản lý hệ thống" <huyhoanganphong@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
            <h3>Xin chào ${dataSend.patientName}</h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh trên BookingCare của chúng tôi</p>
            <p>Nội dung đặt lịch: </p>
            <div><b>Thời gian: ${dataSend.time}</b></div>
            <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
            <div><b>Lý do khám: ${dataSend.reason}</b></div>

            <p>Nếu thông tin trên là đúng, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lệnh khám bệnh. </p>
            <div>
                <a href=${dataSend.redirectLink} target="_blank"> Xác nhận</a>
            </div>

            <div>Xin chân thành cảm ơn !</div>    
        `;
  }
  if (dataSend.language === "en") {
    result = `
            <h3>Xin chào ${dataSend.patientName}</h3>
            <p>You received this email because you booked a medical appointment on our BookingCare</p>
            <p>Schedule content: </p>
            <div><b>Time: ${dataSend.time}</b></div>
            <div><b>Doctor:  ${dataSend.doctorName}</b></div>
            <div><b>Reason: ${dataSend.reason}</b></div>

            <p>If the above information is correct, please click on the link below to confirm and complete the medical examination order procedure. </p>
            <div>
                <a href=${dataSend.redirectLink} target="_blank"> Xác nhận</a>
            </div>

            <div>Sincerely thank !</div>    
          `;
  }
  return result;
};

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
            <h3>Xin chào</h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh thành công. </p>
            <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm bên dưới.</p>

            <div>Xin chân thành cảm ơn đã sử dụng dịch vụ chúng tôi!</div>    
        `;
  }
  if (dataSend.language === "en") {
    result = `
            <h3>Dear</h3>
            <p>You received this email because you booked a medical appointment on our BookingCare</p>
            <p>Prescription/invoice information is sent in the attached file below.</p>
            <div>Sincerely thank !</div>    
          `;
  }
  return result;
};

let sendAttachment = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP, // generated ethereal user
          pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
      });

      let info = await transporter.sendMail({
        from: '"Quản lý hệ thống" <huyhoanganphong@gmail.com>',
        to: dataSend.email,
        subject: "Kết quả đặt lịch khám bệnh.",
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
          {
            filename: `remedy-${
              dataSend.patientId
            }-${new Date().getTime()}.png`,
            content: dataSend.imgBase64.split("base64,")[1],
            encoding: "base64",
          },
        ],
      });
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachment: sendAttachment,
};

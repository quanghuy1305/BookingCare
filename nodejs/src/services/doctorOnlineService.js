const db = require("../models");

let createDoctorOnline = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionMarkdown ||
        !data.descriptionHTML
      ) {
        resolve({ errCode: 1, errMessage: "Missing parameter" });
      } else {
        await db.Doctor_Online.create({
          name: data.name,
          image: data.imageBase64,
          descriptionMarkdown: data.descriptionMarkdown,
          descriptionHTML: data.descriptionHTML,
        });
        resolve({ errCode: 0, errMessage: "Save infor specialty success !" });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getDoctorOnline = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Doctor_Online.findAll({});
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({ errMessage: "OK", errCode: 0, data });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailDoctorOnlineById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.Doctor_Online.findOne({
          where: {
            id: inputId,
          },
          attributes: ["descriptionHTML", "descriptionMarkdown"],
          raw: true,
        });
        if (data) {
          let doctorOnline = [];
          if (location === "ALL") {
            doctorOnline = await db.Doctor_Infor.findAll({
              where: { clinicId: inputId },
              attributes: ["doctorId", "provinceId"],
            });
          } else {
            doctorOnline = await db.Doctor_Infor.findAll({
              where: {
                clinicId: inputId,
                provinceId: location,
              },
              attributes: ["doctorId", "provinceId"],
            });
          }
          data.doctorOnline = doctorOnline;
          resolve({
            errMessage: "OK",
            errCode: 0,
            data,
          });
        } else data = {};
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createDoctorOnline: createDoctorOnline,
  getDoctorOnline: getDoctorOnline,
  getDetailDoctorOnlineById: getDetailDoctorOnlineById,
};

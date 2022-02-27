const db = require("../models");

let createSpecialty = (data) => {
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
        await db.Specialty.create({
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

let getAllSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialty.findAll({});
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

let getDetailSpecialtyById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.Specialty.findOne({
          where: {
            id: inputId,
          },
          attributes: ["descriptionHTML", "descriptionMarkdown"],
          raw: true,
        });
        if (data) {
          let doctorSpecialty = [];
          if (location === "ALL") {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: { specialtyId: inputId },
              attributes: ["doctorId", "provinceId"],
            });
          } else {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: {
                specialtyId: inputId,
                provinceId: location,
              },
              attributes: ["doctorId", "provinceId"],
            });
          }
          data.doctorSpecialty = doctorSpecialty;
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

let deleteSpecialty = (specialtyId) => {
  return new Promise(async (resolve, reject) => {
    let foundUser = await db.Specialty.findOne({
      where: { id: specialtyId }, //== select * from table ==> gọi về cơ sở dữ liệu
    });
    if (!foundUser) {
      resolve({
        errCode: 2,
        errMessage: `Chuyên khoa không tồn tại.`,
      });
    }
    await db.Specialty.destroy({
      where: { id: specialtyId },
    });
    resolve({
      errCode: 0,
      message: "Chuyên khoa đã bị xóa",
    });
  });
};

let updateSpecialty = (data) => {
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
        let specialty = await db.Specialty.findOne({
          where: { name: data.name },
          raw: false,
        });
        if (specialty) {
          specialty.name = data.name;
          specialty.descriptionMarkdown = data.descriptionMarkdown;
          specialty.descriptionHTML = data.descriptionHTML;
          if (data.image) {
            specialty.image = data.image;
          }
          await specialty.save();
          resolve({
            errCode: 0,
            message: "Cập nhật thành công",
          });
        } else {
          resolve({
            errCode: 1,
            errMessage: "Không tìm thấy nội dung",
          });
        }
        resolve({ errCode: 0, errMessage: "Save infor specialty success !" });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialtyById: getDetailSpecialtyById,
  deleteSpecialty: deleteSpecialty,
  updateSpecialty: updateSpecialty,
};

import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExist = await checkUserEmail(email); //hàm check user có tồn tại kh
      if (isExist) {
        //user tồn tại
        let user = await db.User.findOne({
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "firstName",
            "lastName",
          ],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Ok!";

            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage =
              "Email hoặc mật khẩu không đúng. Vui lòng nhập lại!";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `Email hoặc mật khẩu không đúng. Vui lòng nhập lại!`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Email hoặc mật khẩu không đúng. Vui lòng nhập lại!`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: userEmail,
        },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: {
            id: userId,
          },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email co chua ?
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "Email đã được sử dụng. Vui lòng chọn email khác !",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: hashPasswordFromBcrypt,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.avatar,
        });

        resolve({
          errCode: 0,
          message: "Tạo thành công !",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let foundUser = await db.User.findOne({
      where: { id: userId }, //== select * from table ==> gọi về cơ sở dữ liệu
    });
    if (!foundUser) {
      resolve({
        errCode: 2,
        errMessage: `Người dùng không tồn tại.`,
      });
    }
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      errCode: 0,
      message: "Người dùng đã bị xóa",
    });
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id && !data.roleId && data.positionId && !data.gender) {
        resolve({
          errCode: 2,
          errMessage: "Không tìm thấy yêu cầu",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        user.roleId = data.roleId;
        user.positionId = data.positionId;
        user.gender = data.gender;
        if (data.avatar) {
          user.image = data.avatar;
        }
        await user.save();
        resolve({
          errCode: 0,
          message: "Cập nhật thành công",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Không tìm thấy người dùng",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  checkUserEmail: checkUserEmail,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUserData: updateUserData,
  getAllCodeService: getAllCodeService,
};

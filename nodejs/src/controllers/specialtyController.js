import specialtyService from "../services/specialtyService";

let handleCreateSpecialty = async (req, res) => {
  try {
    let infor = await specialtyService.createSpecialty(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let getAllSpecialty = async (req, res) => {
  try {
    let infor = await specialtyService.getAllSpecialty();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let getDetailSpecialtyById = async (req, res) => {
  try {
    let infor = await specialtyService.getDetailSpecialtyById(
      req.query.id,
      req.query.location
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleDeleteSpecialty = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Đã xảy ra lỗi. Vui lòng thử lại !",
    });
  }
  let message = await specialtyService.deleteSpecialty(req.body.id);
  return res.status(200).json(message);
};

let handleEditSpecialty = async (req, res) => {
  let data = req.body;
  let message = await specialtyService.updateSpecialty(data);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateSpecialty: handleCreateSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialtyById: getDetailSpecialtyById,
  handleDeleteSpecialty: handleDeleteSpecialty,
  handleEditSpecialty: handleEditSpecialty,
};

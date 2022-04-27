import doctorOnlineService from "../services/doctorOnlineService";

let handleCreateDoctorOnline = async (req, res) => {
  try {
    let infor = await doctorOnlineService.createDoctorOnline(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let getDoctorOnline = async (req, res) => {
  try {
    let infor = await doctorOnlineService.getDoctorOnline();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let getDetailDoctorOnlineById = async (req, res) => {
  try {
    let infor = await doctorOnlineService.getDetailDoctorOnlineById(
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

module.exports = {
  handleCreateDoctorOnline: handleCreateDoctorOnline,
  getDoctorOnline: getDoctorOnline,
  getDetailDoctorOnlineById: getDetailDoctorOnlineById,
};

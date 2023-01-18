const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  adminId: { type: String, require: true, unique: true },
  password: { type: String, require: true },
});
const Admin = mongoose.model("Admin", AdminSchema);

const getAdminById = async (adminId) => {
  try {
    const admins = await Admin.findOne({ adminId: adminId });
    return admins;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { Admin, getAdminById };

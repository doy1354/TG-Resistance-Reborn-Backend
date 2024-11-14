const user = require('../models/user');

// Get user by tgId
const getUserAndTotalSingedCount = async (req, res) => {
  const tgId = req.params.tgId;

  try {
    // Find the user by tgId
    const userData = await user.findOne({ tgId });

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    // Count the number of signed users
    const signedUsersCount = await user.countDocuments({ signed: true });

    // Return both user signed status and total signed users count
    return res.status(200).json({
      is_signed_by_user: userData.signed, // User's signed status
      totalSignedUsers: signedUsersCount, // Total count of signed users
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Update user sign status
const updateUserSign = async (req, res) => {
  const id = req.params.tgId;

  try {
    const result = await user.findOneAndUpdate(
      { tgId: id },
      { $set: { signed: true } },
      { new: true } // This option returns the modified document
    );

    if (result) {
      return res.status(200).json({
        message: "success",
      });
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

module.exports = {
  getUserAndTotalSingedCount,
  updateUserSign,
};

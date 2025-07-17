const Announcement = require("../models/Announcement");

const makeAnnouncement = async (req, res) => {
  try {
    const { title, description } = req.body;
    const announcement = new Announcement({
      title,
      description,
    });

    const saveAnnouncement = await announcement.save();

    return res
      .status(201)
      .json({ message: "Announcement created successfully", saveAnnouncement });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const allAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    return res.status(200).json(announcements);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  makeAnnouncement,
  allAnnouncements,
};

export const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const fileUrl = `/uploads/${req.file.filename}`;
    res.status(201).json({ url: fileUrl, originalName: req.file.originalname });
  } catch (err) {
    next(err);
  }
};

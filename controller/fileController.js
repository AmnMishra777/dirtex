// Handle the file upload
const uploadFile = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }

  // Access the uploaded files details
  const files = req.files;

  // Return the uploaded files URLs
  const fileUrls = files.map(file => {
    const fileUrl = `${req.protocol}://${req.get('host')}/${file.path}`;
    return fileUrl;
  });

  res.send(`Files uploaded successfully. File URLs: ${fileUrls.join(', ')}`);
};

module.exports = {
  uploadFile,
};

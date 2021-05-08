export const getFormData = (fileName, fileField, restFields) => {
  const formData = new FormData();

  // Adjunto la imagen al formData
  const file = fileField[0];
  if (file) {
    formData.append(fileName, file); // Se tiene que llamar igual que el nombre que espera multer en el back: uploader.single('picture')
  }

  // Adjunto el resto de información a formData
  Object.entries(restFields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
};

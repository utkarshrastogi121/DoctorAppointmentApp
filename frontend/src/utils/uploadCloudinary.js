const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;

const uploadImageToCloudinary = async (file) => {
  if (!file) throw new Error('No file provided for upload');

  const uploadData = new FormData();
  uploadData.append('file', file);
  uploadData.append('upload_preset', upload_preset);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: 'POST',
      body: uploadData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error?.message || 'Failed to upload image');
    }

    return data;
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    throw err;
  }
};

export default uploadImageToCloudinary;

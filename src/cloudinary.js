import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/doz4j5shv/image/upload'; // Ganti dengan cloud name kamu
const CLOUDINARY_UPLOAD_PRESET = 'UploadJourney'; // Ganti dengan upload preset kamu

export const uploadImageToCloudinary = async uri => {
  const data = new FormData();
  data.append('file', {
    uri,
    type: 'image/jpeg', // Sesuaikan dengan jenis file gambar yang di-upload
    name: 'image.jpg', // Nama file yang di-upload
  });
  data.append('upload_preset', 'UploadJourney'); // Ganti dengan preset upload kamu

  try {
    const response = await axios.post(CLOUDINARY_URL, data, {
      headers: {
        'Content-Type': 'multipart/form-data', // Memberitahukan bahwa ini adalah request untuk upload file
      },
    });
    return response.data.secure_url; // Mengembalikan URL gambar yang sudah di-upload
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; // Melemparkan error jika terjadi masalah saat upload
  }
};

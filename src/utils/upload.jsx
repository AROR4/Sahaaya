import axios from 'axios';

export const uploadFile = async (file, token) => {
  const formData = new FormData();
  formData.append('govtId', file); // or 'document', 'image', etc. based on backend

  try {
    if (!token) throw new Error('No auth token provided');

    const response = await axios.post(
      'http://localhost:5152/api/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Assuming the backend returns { url: '...' } in response
    return response.data.url;
  } catch (error) {
    console.error('File upload failed:', error);
    throw error;
  }
};

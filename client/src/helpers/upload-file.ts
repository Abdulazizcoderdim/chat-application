const url = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_PUBLIC_CLOUDINARY_CLAUD_NAME
}/auto/upload`;

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'chat-app-file');

  const res = await fetch(url, { method: 'POST', body: formData });

  const data = await res.json();

  return data;
}

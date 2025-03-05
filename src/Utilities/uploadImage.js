import axios from "axios";

export const uploadImage = async (file) => {
  // creat formData for upload img in imgBB
  const form = new FormData();
  form.append("image", file);
  console.log(form);
  const imgbbResult = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    form
  );
  const photoUrl = imgbbResult.data.data.display_url;
  return photoUrl;
};

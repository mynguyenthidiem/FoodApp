import api from "../api/client";

// ======================================
// GET USER BY ID
// GET /api/User/{id}
// ======================================

export const getUserById = async (id) => {
  const response = await api.get(`/User/${id}`);

  return response.data;
};

// ======================================
// UPDATE PROFILE
// PUT /api/User/profile/{id}
// multipart/form-data
// ======================================

export const updateProfile = async ({
  id,
  fullName,
  phone,
  address,
  avatar,
}) => {
  const formData = new FormData();

  formData.append("fullName", fullName);

  if (phone) {
    formData.append("phone", phone);
  }

  if (address) {
    formData.append("address", address);
  }

  if (avatar) {
    formData.append("avatar", {
      uri: avatar.uri,
      type: avatar.type || "image/jpeg",
      name: avatar.fileName || "avatar.jpg",
    });
  }

  const response = await api.put(
    `/User/profile/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
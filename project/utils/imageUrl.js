import { API_ORIGIN } from "../api/client";

// Ảnh từ mock local dùng require() → trả về số (number), giữ nguyên.
// Ảnh từ API thật là string "/uploads/xxx.jpg" → cần ghép domain.
// Nếu rỗng/null → dùng ảnh placeholder có sẵn trong assets.
export function resolveImage(image, fallback = require("../assets/banner.jpg")) {
  if (!image) return fallback;
  if (typeof image === "number") return image; // require() cục bộ
  if (typeof image === "string") {
    return { uri: image.startsWith("http") ? image : `${API_ORIGIN}${image}` };
  }
  return fallback;
}
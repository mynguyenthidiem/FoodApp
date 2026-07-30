import api from "./client";

// Dùng SystemCategories cho mục "Categories" ở Home — đây là danh mục ẩm thực chung
// (Pizza, Burger, Sushi...), khác với Category riêng của từng nhà hàng.
export const getSystemCategories = () => api.get("/SystemCategories");
import React, { useEffect } from "react";
import { ScrollView, View, ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import HomeHeader from "../components/HomeHeader";
import BannerCard from "../components/BannerCard";
import SearchBar from "../components/SearchBar";
import SectionHeader from "../components/SectionHeader";
import CategoryCard from "../components/CategoryCard";
import RestaurantCard from "../components/RestaurantCard";
import FoodCard from "../components/FoodCard";

import commonStyles from "../styles/common";
import homeStyles from "../styles/home";
import { COLORS } from "../styles/theme";

import { homeHeader, banner } from "../data/homeData";

import { fetchRestaurants } from "../store/restaurantSlice";
import { resolveImage } from "../utils/imageUrl"; // nếu RestaurantCard cần ảnh URL thật
import { fetchCategories } from "../store/categorySlice";
import { fetchFoods } from "../store/foodSlice";
import { toggleFavorite } from "../store/favoriteSlice";

// Backend không trả icon glyph cho category → map tạm theo tên (không phân biệt hoa/thường)
const CATEGORY_ICON_MAP = {
  mains: "silverware-fork-knife",
  burger: "hamburger",
  sides: "food",
  drinks: "cup",
  desserts: "ice-cream",
  appetizers: "food",
  bakery: "bread-slice",
  cakes: "cake-variant",
  coffee: "coffee",
  salads: "leaf",
  smoothies: "fruit-cherries",
};

function getCategoryIcon(name = "") {
  const key = name.trim().toLowerCase();
  return CATEGORY_ICON_MAP[key] || "silverware-fork-knife"; // fallback mặc định
}

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const {
    categories,
    status: categoryStatus,
    error: categoryError,
  } = useSelector((state) => state.category);

  const {
    items: foods,
    status: foodStatus,
    error: foodError,
  } = useSelector((state) => state.food);

  const {
    items: restaurants,
    status: restaurantStatus,
    error: restaurantError,
  } = useSelector((state) => state.restaurant);

  const favoriteIds = useSelector((state) => state.favorite.items);

  const handleFavorite = (item) => {
    dispatch(toggleFavorite(item.id));
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchFoods());
    dispatch(fetchRestaurants());
  }, [dispatch]);

  return (
    <SafeAreaView style={commonStyles.screen} edges={["top", "left", "right"]}>
      <HomeHeader {...homeHeader} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={commonStyles.scrollContainer}
      >
        <SearchBar editable={false} onPress={() => navigation.navigate("Search")} />

        <BannerCard {...banner} />

        <SectionHeader
          title="Categories"
          buttonText="See All"
          onPress={() => navigation.navigate("Category")}
        />

        <View style={homeStyles.categoryList}>
          {categoryStatus === "loading" && <ActivityIndicator color={COLORS.primary} />}
          {categoryStatus === "failed" && (
            <Text style={{ color: COLORS.error }}>Không tải được danh mục: {categoryError}</Text>
          )}
          {categoryStatus === "succeeded" && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((item) => (
                <CategoryCard
                  key={item.id}
                  item={{ ...item, icon: getCategoryIcon(item.name) }}
                  onPress={() =>
                    dispatch({ type: "food/filterByCategory", payload: item.id }) // placeholder, xem ghi chú bên dưới
                  }
                />
              ))}
            </ScrollView>
          )}
        </View>

        <SectionHeader
          title="Popular Restaurants"
          buttonText="See All"
          onPress={() => navigation.navigate("RestaurantList", { type: "all", title: "Popular Restaurants" })}
        />

        {restaurantStatus === "loading" && <ActivityIndicator color={COLORS.primary} />}
        {restaurantStatus === "failed" && (
          <Text style={{ color: COLORS.error }}>Không tải được nhà hàng: {restaurantError}</Text>
        )}
        {restaurantStatus === "succeeded" &&
          restaurants.map((item) => (
            <RestaurantCard
              key={item.id}
              image={resolveImage(item.imageUrl)}
              name={item.name}
              address={item.address}
              rating={item.rating}
              totalReviews={item.totalReviews}
              deliveryFee={item.deliveryFee}
              isActive={item.isActive}
              onPress={() =>
                navigation.navigate("RestaurantDetail", {
                  restaurantId: item.id,
                })
              }
            />
          ))}

        <SectionHeader title="Recommended for you" buttonText="See All" />

        {foodStatus === "loading" && <ActivityIndicator color={COLORS.primary} />}
        {foodStatus === "failed" && (
          <Text style={{ color: COLORS.error }}>Không tải được món ăn: {foodError}</Text>
        )}
        {foodStatus === "succeeded" && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {foods.map((item) => (
              <FoodCard
                key={item.id}
                item={{ ...item, favorite: favoriteIds.includes(item.id) }}
                onFavoritePress={handleFavorite}
                onPress={() => navigation.navigate("FoodDetail", { food: item })}
              />
            ))}
          </ScrollView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
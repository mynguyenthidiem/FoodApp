import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, View, ActivityIndicator, Text } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import commonStyles from "../styles/common";

import RestaurantHeroCard from "../components/RestaurantHeroCard";
import RestaurantTabs from "../components/RestaurantTabs";
import FilterChip from "../components/FilterChip";
import MenuSection from "../components/MenuSection";
import ReviewCard from "../components/ReviewCard";
import RestaurantInfoSection from "../components/RestaurantInfoSection";
import RestaurantFeatureSection from "../components/RestaurantFeatureSection";
import CartSummaryBar from "../components/CartSummaryBar";

import { getCart, addToCart } from "../api/cartApi";
import { getRestaurantById } from "../api/restaurantApi";
import { getFoodsByRestaurant } from "../api/foodApi";
import { getFoodReviews } from "../api/reviewApi";

export default function RestaurantDetailScreen({ navigation, route }) {
  const { restaurantId } = route.params ?? {};
  const insets = useSafeAreaInsets();

  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedTab, setSelectedTab] = useState("Menu");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    loadRestaurantDetail();
  }, []);


  const loadRestaurantDetail = async () => {
    try {
      const restaurantResponse = await getRestaurantById(restaurantId);
      setRestaurant(restaurantResponse.data);

      const foodResponse = await getFoodsByRestaurant(restaurantId);

      const foodList = foodResponse.data.items ?? [];

      setFoods(foodList);


      let reviewList = [];

      for (const food of foodList) {
        try {
          const reviewResponse = await getFoodReviews(food.id);

          const foodReviews =
            reviewResponse.data.items ??
            reviewResponse.data ??
            [];

          reviewList.push(...foodReviews);

        } catch (error) {
          console.log("Review error:", error);
        }
      }

      setReviews(reviewList);


      const cartResponse = await getCart();

      const cartItems = cartResponse.data ?? [];


      const quantity = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );


      const total = cartItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );


      setCartQuantity(quantity);
      setCartTotal(total);

    } catch (error) {
      console.log("Load restaurant detail error:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleAddToCart = async (food) => {
    try {
      await addToCart({
        foodId: food.id,
        quantity: 1,
      });

      loadRestaurantDetail();

    } catch (error) {
      console.log("Add cart error:", error);
    }
  };


  const restaurantFoods = useMemo(() => {
    return foods;
  }, [foods]);


  const restaurantReviews = useMemo(() => {
    return reviews;
  }, [reviews]);


  const menuCategories = useMemo(() => {
    if (!restaurant?.categories) return [];

    return restaurant.categories.map((category) => ({
      id: category,
      title: category,
    }));

  }, [restaurant]);


  const menuFilters = useMemo(() => [
    {
      id: "all",
      title: "All",
    },
    ...menuCategories,
  ], [menuCategories]);


  const menuSections = useMemo(() => {

    const filteredFoods =
      selectedFilter === "all"
        ? restaurantFoods
        : restaurantFoods.filter(
            (food) =>
              food.categoryName === selectedFilter
          );


    return menuCategories
      .map((section) => ({
        id: section.id,
        title: section.title,
        items: filteredFoods.filter(
          (food) =>
            food.categoryName === section.id
        ),
      }))
      .filter(
        (section) =>
          section.items.length > 0
      );

  }, [
    restaurantFoods,
    selectedFilter,
    menuCategories,
  ]);


  if (loading) {
    return (
      <SafeAreaView style={commonStyles.screen}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }


  if (!restaurant) {
    return null;
  }


  return (
    <SafeAreaView
      style={commonStyles.screen}
      edges={["top", "bottom"]}
    >

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          ...commonStyles.scrollContainer,
          paddingBottom: 120 + insets.bottom,
        }}
      >

        <RestaurantHeroCard
          restaurant={restaurant}
          onBackPress={() => navigation.goBack()}
          onSharePress={() => {}}
          onFavoritePress={() => {}}
        />


        <RestaurantTabs
          tabs={[
            "Menu",
            "Reviews",
            "Info",
          ]}
          selectedTab={selectedTab}
          onChange={setSelectedTab}
        />


        {selectedTab === "Menu" && (
          <>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingVertical: 10,
              }}
            >

              {menuFilters.map((filter) => (
                <FilterChip
                  key={filter.id}
                  title={filter.title}
                  selected={
                    selectedFilter === filter.id
                  }
                  onPress={() =>
                    setSelectedFilter(filter.id)
                  }
                />
              ))}

            </ScrollView>


            {menuSections.map((section) => (
              <MenuSection
                key={section.id}
                category={section.title}
                items={section.items}
                onFoodPress={(food) =>
                  navigation.navigate(
                    "FoodDetail",
                    {
                      foodId: food.id,
                    }
                  )
                }
                onAddPress={handleAddToCart}
              />
            ))}

          </>
        )}


        {selectedTab === "Reviews" && (
          <View>

            {restaurantReviews.length === 0 ? (
              <Text>
                No reviews yet
              </Text>
            ) : (

              restaurantReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                />
              ))

            )}

          </View>
        )}

        {selectedTab === "Info" && (
          <>

            <RestaurantInfoSection
              restaurant={restaurant}
            />

            <RestaurantFeatureSection
              features={
                restaurant.features ?? []
              }
            />

          </>
        )}

      </ScrollView>

      <CartSummaryBar
        quantity={cartQuantity}
        total={cartTotal}
        bottom={insets.bottom}
        onPress={() =>
          navigation.navigate("Cart")
        }
      />

    </SafeAreaView>
  );
}
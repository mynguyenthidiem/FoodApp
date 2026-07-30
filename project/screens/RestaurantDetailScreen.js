import React, { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import commonStyles from "../styles/common";

import RestaurantHeroCard from "../components/RestaurantHeroCard";
import RestaurantTabs from "../components/RestaurantTabs";
import FilterChip from "../components/FilterChip";
import MenuSection from "../components/MenuSection";
import ReviewCard from "../components/ReviewCard";
import RestaurantInfoSection from "../components/RestaurantInfoSection";
import RestaurantFeatureSection from "../components/RestaurantFeatureSection";
import CartSummaryBar from "../components/CartSummaryBar";

import restaurants from "../data/restaurants";
import foods from "../data/foods";
import reviews from "../data/reviews";

const MENU_CATEGORIES = [
  {
    id: "appetizers",
    title: "Appetizers",
  },
  {
    id: "mains",
    title: "Mains",
  },
  {
    id: "sides",
    title: "Sides",
  },
  {
    id: "drinks",
    title: "Drinks",
  },
  {
    id: "desserts",
    title: "Desserts",
  },
];

export default function RestaurantDetailScreen({
  navigation,
  route,
}) {
  const { restaurantId } = route.params ?? {};

  const insets = useSafeAreaInsets();

  const restaurant = restaurants.find(
    (item) => item.id === restaurantId
  );

  const [selectedTab, setSelectedTab] = useState("Menu");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const cartQuantity = 2;
  const cartTotal = 23;

  const restaurantFoods = useMemo(() => {
    if (!restaurant) return [];

    return foods.filter(
      (food) => food.restaurantId === restaurant.id
    );
  }, [restaurant]);

  const restaurantReviews = useMemo(() => {
    if (!restaurant) return [];

    return reviews.filter(
      (review) => review.restaurantId === restaurant.id
    );
  }, [restaurant]);

  const menuFilters = useMemo(
    () => [
      {
        id: "all",
        title: "All",
      },
      ...MENU_CATEGORIES,
    ],
    []
  );

  const menuSections = useMemo(() => {
    const filteredFoods =
      selectedFilter === "all"
        ? restaurantFoods
        : restaurantFoods.filter(
            (food) => food.category === selectedFilter
          );

    return MENU_CATEGORIES.map((section) => ({
      id: section.id,
      title: section.title,
      items: filteredFoods.filter(
        (food) => food.category === section.id
      ),
    })).filter(
      (section) => section.items.length > 0
    );
  }, [restaurantFoods, selectedFilter]);

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
          tabs={["Menu", "Reviews", "Info"]}
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
                onAddPress={(food) =>
                  console.log("Add:", food.name)
                }
              />
            ))}
          </>
        )}

        {selectedTab === "Reviews" && (
          <View>
            {restaurantReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
              />
            ))}
          </View>
        )}

        {selectedTab === "Info" && (
          <>
            <RestaurantInfoSection
              restaurant={restaurant}
            />

            <RestaurantFeatureSection
              features={restaurant.features ?? []}
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
import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import commonStyles from "../styles/common";
import homeStyles from "../styles/home";
import { COLORS } from "../styles/theme";

import HomeHeader from "../components/HomeHeader";
import SearchBar from "../components/SearchBar";
import FilterChip from "../components/FilterChip";
import RestaurantCard from "../components/RestaurantCard";
import FoodCard from "../components/FoodCard";

import { useDispatch, useSelector } from "react-redux";

import { fetchRestaurants } from "../store/restaurantSlice";
import { fetchFoods } from "../store/foodSlice";
import { toggleFavorite } from "../store/favoriteSlice";

export default function SearchScreen({
  navigation,
}) {
  const filterChips = [
    "All",
    "Top Rated",
    "Open Now",
    "Vegan",
  ];

  const [keyword, setKeyword] = useState("");
  const [selectedFilter, setSelectedFilter] =
    useState("All");
  const dispatch = useDispatch();

  const {
    items: restaurants,
    status: restaurantStatus,
  } = useSelector((state) => state.restaurant);

  const {
    items: foods,
    status: foodStatus,
  } = useSelector((state) => state.food);

  const favoriteIds = useSelector(
    (state) => state.favorite.items
  );
  const handleFavorite = (item) => {
    dispatch(toggleFavorite(item.id));
  };
  
  const suggestedRestaurants =
    restaurants.slice(0, 2);

  const suggestedFoods =
    foods.slice(0, 6);
  
    const filteredRestaurants =
    useMemo(() => {
      let data = [...restaurants];

      if (keyword.trim()) {
        const search =
          keyword.toLowerCase();

        data = data.filter(
          (restaurant) =>
            restaurant.name
              .toLowerCase()
              .includes(search) ||
            restaurant.address
              ?.toLowerCase()
              .includes(search) ||
            restaurant.description
              ?.toLowerCase()
              .includes(search) ||
            restaurant.categories.some(
              (category) =>
                category
                  .toLowerCase()
                  .includes(search)
            )
        );
      }

      switch (selectedFilter) {
        case "Top Rated":
          data = data.filter(
            (restaurant) =>
              restaurant.rating >= 4.7
          );
          break;

        case "Open Now":
          data = data.filter(
            (restaurant) =>
              restaurant.isActive
          );
          break;

        case "Vegan":
          data = data.filter(
            (restaurant) =>
              restaurant.categories.some((c) => c.toLowerCase() === "vegan")              
          );
          break;

        default:
          break;
      }

      return data;
    }, [keyword, selectedFilter]);
    const filteredFoods = useMemo(() => {
    if (!keyword.trim()) {
      return suggestedFoods;
    }

    const search =
      keyword.toLowerCase();

    return foods.filter(
      (food) =>
        food.name
          .toLowerCase()
          .includes(search) ||
        food.description
          ?.toLowerCase()
          .includes(search) ||
        food.categoryName
          ?.toLowerCase()
          .includes(search) ||
        food.restaurantName
          ?.toLowerCase()
          .includes(search)
    );
  }, [keyword]);

  useEffect(() => {
    dispatch(fetchRestaurants());
    dispatch(fetchFoods());
  }, [dispatch]);

  if (
  restaurantStatus === "loading" ||
  foodStatus === "loading"
) {
  return (
    <SafeAreaView style={commonStyles.screen}>
      <View
        style={[
          commonStyles.centerContainer,
          { flex: 1 },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
        />

        <Text
          style={{
            marginTop: 12,
          }}
        >
          Loading...
        </Text>
      </View>
    </SafeAreaView>
  );
}
  if (
    restaurantStatus === "failed" ||
    foodStatus === "failed"
  ) {
    return (
      <SafeAreaView style={commonStyles.screen}>
        <View
          style={[
            commonStyles.centerContainer,
            { flex: 1 },
          ]}
        >
          <Text>
            Failed to load data.
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={commonStyles.screen} >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          commonStyles.scrollContainer
        }
      >
        <HomeHeader
          {...homeHeader}
          onNotificationPress={() => {}}
          onProfilePress={() =>
            navigation.navigate("Profile")
          }
        />

        <SearchBar
          value={keyword}
          onChangeText={setKeyword}
        />

        <View style={homeStyles.filterContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {filterChips.map((filter) => (
              <FilterChip
                key={filter}
                title={filter}
                selected={
                  selectedFilter === filter
                }
                onPress={() =>
                  setSelectedFilter(filter)
                }
              />
            ))}
          </ScrollView>
        </View>
        {!keyword.trim() && (
          <>
            <View
              style={
                homeStyles.searchSectionHeader
              }
            >
              <Text
                style={
                  homeStyles.sectionTitle
                }
              >
                Recent Searches
              </Text>

              <Text
                style={
                  homeStyles.clearText
                }
              >
                Clear All
              </Text>
            </View>

            <View
              style={
                homeStyles.recentContainer
              }
            >
              {recentSearches.map((item) => (
                <FilterChip
                  key={item}
                  title={item}
                  onPress={() =>
                    setKeyword(item)
                  }
                />
              ))}
            </View>

            <Text
              style={[
                homeStyles.sectionTitle,
                {
                  marginTop: 24,
                  marginBottom: 16,
                },
              ]}
            >
              Suggested Restaurants
            </Text>

            {suggestedRestaurants.map(
              (restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  image={restaurant.imageUrl}
                  name={restaurant.name}
                  address={restaurant.address}
                  rating={restaurant.rating}
                  totalReviews={
                    restaurant.totalReviews
                  }
                  deliveryFee={
                    restaurant.deliveryFee
                  }
                  isActive={
                    restaurant.isActive
                  }
                  onPress={() =>
                    navigation.navigate(
                      "RestaurantDetail",
                      {
                        restaurantId:
                          restaurant.id,
                      }
                    )
                  }
                />
              )
            )}

            <Text
              style={[
                homeStyles.sectionTitle,
                {
                  marginTop: 24,
                  marginBottom: 16,
                },
              ]}
            >
              Popular Dishes
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={
                false
              }
            >
              {suggestedFoods.map((food) => (
                <FoodCard
                  key={food.id}
                  item={{
                    ...food,
                    favorite: false,
                  }}
                  onFavoritePress={(item) => dispatch(toggleFavorite(item.id))}
                  onPress={() =>
                    navigation.navigate(
                      "FoodDetail",
                      {
                        food,
                      }
                    )
                  }
                />
              ))}
            </ScrollView>
          </>
        )}

        {keyword.trim() && (
          <>
            <Text
              style={[
                homeStyles.sectionTitle,
                {
                  marginTop: 24,
                  marginBottom: 16,
                },
              ]}
            >
              Restaurants
            </Text>

            {filteredRestaurants.length ===
            0 ? (
              <Text
                style={
                  homeStyles.emptySearchText
                }
              >
                No restaurants found.
              </Text>
            ) : (
              filteredRestaurants.map(
                (restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    image={
                      restaurant.imageUrl
                    }
                    name={restaurant.name}
                    address={
                      restaurant.address
                    }
                    rating={
                      restaurant.rating
                    }
                    totalReviews={
                      restaurant.totalReviews
                    }
                    deliveryFee={
                      restaurant.deliveryFee
                    }
                    isActive={
                      restaurant.isActive
                    }
                    onPress={() =>
                      navigation.navigate(
                        "RestaurantDetail",
                        {
                          restaurantId:
                            restaurant.id,
                        }
                      )
                    }
                  />
                )
              )
            )}

            <Text
              style={[
                homeStyles.sectionTitle,
                {
                  marginTop: 24,
                  marginBottom: 16,
                },
              ]}
            >
              Dishes
            </Text>

            {filteredFoods.length ===
            0 ? (
              <Text
                style={
                  homeStyles.emptySearchText
                }
              >
                No dishes found.
              </Text>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={
                  false
                }
              >
                {filteredFoods.map(
                  (food) => (
                    <FoodCard
                      key={food.id}
                      item={{
                        ...food,
                        favorite: favoriteIds.includes(food.id)
                      }}
                      onFavoritePress={handleFavorite}
                      onPress={() =>
                        navigation.navigate(
                          "FoodDetail",
                          {
                            foodId:
                              food.id,
                          }
                        )
                      }
                    />
                  )
                )}
              </ScrollView>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
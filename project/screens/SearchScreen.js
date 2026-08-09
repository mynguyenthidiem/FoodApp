import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import commonStyles from '../styles/common';
import homeStyles from '../styles/home';
import { COLORS } from '../styles/theme';

import SearchBar from '../components/SearchBar';
import FilterChip from '../components/FilterChip';
import RestaurantCard from '../components/RestaurantCard';
import FoodCard from '../components/FoodCard';

import { useDispatch, useSelector } from 'react-redux';

import { fetchRestaurants } from '../store/restaurantSlice';
import {
  fetchFoods,
  fetchSearchFoods,
  clearSearchResults,
} from '../store/foodSlice';
import { toggleFavorite } from '../store/favoriteSlice';

export default function SearchScreen({ navigation }) {
  const filterChips = ['All', 'Top Rated', 'Open'];

  const [keyword, setKeyword] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const dispatch = useDispatch();

  const {
    items: restaurants,
    status: restaurantStatus,
    error: restaurantError,
  } = useSelector(state => state.restaurant);

  const {
    items: foods,
    searchResults,
    status: foodStatus,
    error: foodError,
  } = useSelector(state => state.food);

  const favoriteIds = useSelector(state => state.favorite.items);
  const handleFavorite = item => {
    dispatch(toggleFavorite(item.id));
  };

  const suggestedRestaurants = useMemo(
    () => restaurants.slice(0, 3),
    [restaurants],
  );

  const suggestedFoods = useMemo(() => foods.slice(0, 8), [foods]);

  const filteredRestaurants = useMemo(() => {
    let data = [...restaurants];

    if (keyword.trim()) {
      const search = keyword.toLowerCase();

      data = data.filter(restaurant => {
        const categories = restaurant.categories ?? [];
        return (
          restaurant.name?.toLowerCase().includes(search) ||
          restaurant.address?.toLowerCase().includes(search) ||
          restaurant.description?.toLowerCase().includes(search) ||
          categories.some(category => category.toLowerCase().includes(search))
        );
      });
    }

    switch (selectedFilter) {
      case 'Top Rated':
        data = data.filter(restaurant => restaurant.rating >= 4.5);
        break;

      case 'Open':
        data = data.filter(restaurant => restaurant.isActive);
        break;
      default:
        break;
    }

    return data;
  }, [restaurants, keyword, selectedFilter]);

  useEffect(() => {
    dispatch(
      fetchRestaurants({
        pageNumber: 1,
        pageSize: 20,
      }),
    );
    dispatch(
      fetchFoods({
        pageNumber: 1,
        pageSize: 20,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    const text = keyword.trim();
    if (!text) {
      dispatch(clearSearchResults());
      return;
    }
    const timer = setTimeout(() => {
      dispatch(
        fetchSearchFoods({
          keyword: text,
          pageNumber: 1,
          pageSize: 20,
        }),
      );
    }, 400);
    return () => clearTimeout(timer);
  }, [dispatch, keyword]);

  if (
    (restaurantStatus === 'loading' && restaurants.length === 0) ||
    (foodStatus === 'loading' && foods.length === 0)
  ) {
    return (
      <SafeAreaView style={commonStyles.screen}>
        <View style={[commonStyles.centerContainer, { flex: 1 }]}>
          <ActivityIndicator size="large" color={COLORS.primary} />

          <Text style={{ marginTop: 12 }}>
            {keyword.trim() ? 'Searching...' : 'Loading...'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  if (restaurantStatus === 'failed' || foodStatus === 'failed') {
    return (
      <SafeAreaView style={commonStyles.screen}>
        <View style={[commonStyles.centerContainer, { flex: 1 }]}>
          <Text>{restaurantError || foodError || 'Failed to load data.'}</Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={commonStyles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={commonStyles.scrollContainer}
      >
        <SearchBar value={keyword} onChangeText={setKeyword} />

        <View style={homeStyles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filterChips.map(filter => (
              <FilterChip
                key={filter}
                title={filter}
                selected={selectedFilter === filter}
                onPress={() => setSelectedFilter(filter)}
              />
            ))}
          </ScrollView>
        </View>
        {!keyword.trim() && (
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

            {suggestedRestaurants.map(restaurant => (
              <RestaurantCard
                key={restaurant.id}
                image={restaurant.imageUrl}
                name={restaurant.name}
                address={restaurant.address}
                rating={restaurant.rating}
                totalReviews={restaurant.totalReviews}
                deliveryFee={restaurant.deliveryFee}
                isActive={restaurant.isActive}
                onPress={() =>
                  navigation.navigate('RestaurantDetail', {
                    restaurantId: restaurant.id,
                  })
                }
              />
            ))}

            <Text
              style={[
                homeStyles.sectionTitle,
                {
                  marginTop: 24,
                  marginBottom: 16,
                },
              ]}
            >
              Explore Foods
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {suggestedFoods.map(food => (
                <FoodCard
                  key={food.id}
                  item={{ ...food, favorite: favoriteIds.includes(food.id) }}
                  onPress={() =>
                    navigation.navigate('FoodDetail', {
                      foodId: food.id,
                    })
                  }
                  onFavoritePress={handleFavorite}
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

            {filteredRestaurants.length === 0 ? (
              <Text style={homeStyles.emptySearchText}>
                No restaurants found.
              </Text>
            ) : (
              filteredRestaurants.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  image={restaurant.imageUrl}
                  name={restaurant.name}
                  address={restaurant.address}
                  rating={restaurant.rating}
                  totalReviews={restaurant.totalReviews}
                  deliveryFee={restaurant.deliveryFee}
                  isActive={restaurant.isActive}
                  onPress={() =>
                    navigation.navigate('RestaurantDetail', {
                      restaurantId: restaurant.id,
                    })
                  }
                />
              ))
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

            {searchResults.length === 0 ? (
              <Text style={homeStyles.emptySearchText}>
                No matching foods found.
              </Text>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {searchResults.map(food => (
                  <FoodCard
                    key={food.id}
                    item={{ ...food, favorite: favoriteIds.includes(food.id) }}
                    onFavoritePress={handleFavorite}
                    onPress={() =>
                      navigation.navigate('FoodDetail', {
                        foodId: food.id,
                      })
                    }
                  />
                ))}
              </ScrollView>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

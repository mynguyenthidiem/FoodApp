import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';

import BackHeader from '../components/BackHeader';
import commonStyles from '../styles/common';
import orderStyles from '../styles/order';
import { COLORS } from '../styles/theme';

import { createOrderAsync, clearCurrentOrder } from '../redux/orderSlice';

import { fetchCurrentUser } from '../redux/userSlice';

import { fetchCart } from '../redux/cartSlice';

const CheckoutScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { currentUser, status: userStatus } = useSelector(state => state.user);

  const { items: cartItems, status: cartStatus } = useSelector(
    state => state.cart,
  );

  const {
    currentOrder,
    status: orderStatus,
    error: orderError,
  } = useSelector(state => state.order);

  const userId = useSelector(
    state =>
      state.auth?.user?.id ||
      state.auth?.currentUser?.id ||
      state.user?.currentUser?.id,
  );

  const [paymentMethod, setPaymentMethod] = useState('Cash');

  const [shippingAddress, setShippingAddress] = useState('');

  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Load current user

  useEffect(() => {
    if (userId && !currentUser) {
      dispatch(fetchCurrentUser(userId));
    }
  }, [dispatch, userId, currentUser]);

  // Load cart

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      dispatch(fetchCart());
    }
  }, [dispatch]);

  // Set default shipping address

  useEffect(() => {
    if (currentUser?.address) {
      setShippingAddress(currentUser.address);
    }
  }, [currentUser]);

  // Calculate subtotal

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(
        item.food?.price ?? item.price ?? item.unitPrice ?? 0,
      );

      const quantity = Number(item.quantity || 0);

      return total + price * quantity;
    }, 0);
  }, [cartItems]);

  // Delivery fee

  const deliveryFee = useMemo(() => {
    if (cartItems.length === 0) {
      return 0;
    }

    return 30000;
  }, [cartItems]);

  const total = subtotal + deliveryFee;
  const cartIds = useMemo(() => {
    return cartItems
      .map(item => item.id ?? item.cartId)
      .filter(id => id !== undefined && id !== null);
  }, [cartItems]);
  const formatPrice = value => {
    return `${Number(value || 0).toLocaleString('vi-VN')}đ`;
  };
  const getFoodImage = item => {
    return item.food?.image || item.foodImage || item.image || null;
  };
  const getFoodName = item => {
    return item.food?.name || item.foodName || item.name || 'Food';
  };
  const getItemPrice = item => {
    return Number(item.food?.price ?? item.price ?? item.unitPrice ?? 0);
  };
  const handleSelectPayment = method => {
    setPaymentMethod(method);
  };
  const validateCheckout = () => {
    if (!currentUser) {
      Alert.alert(
        'Account required',
        'Please load your account information before placing the order.',
      );

      return false;
    }

    if (!shippingAddress.trim()) {
      Alert.alert('Shipping address', 'Please enter your shipping address.');

      return false;
    }

    if (cartItems.length === 0) {
      Alert.alert('Empty cart', 'Your cart is empty.');

      return false;
    }

    if (cartIds.length === 0) {
      Alert.alert('Invalid cart', 'Unable to identify cart items.');

      return false;
    }

    return true;
  };

  // Create order

  const handlePlaceOrder = async () => {
    if (orderStatus === 'loading') {
      return;
    }

    if (!validateCheckout()) {
      return;
    }

    try {
      setHasSubmitted(true);

      dispatch(clearCurrentOrder());

      const result = await dispatch(
        createOrderAsync({
          shippingAddress: shippingAddress.trim(),
          paymentMethod,
          cartIds,
        }),
      ).unwrap();

      dispatch(fetchCart());

      Alert.alert(
        'Order placed',
        'Your order has been placed successfully.',
        [
          {
            text: 'View order',
            onPress: () => {
              if (result?.id) {
                navigation.replace('OrderDetail', {
                  orderId: result.id,
                });
              } else {
                navigation.replace('MyOrders');
              }
            },
          },
        ],
        {
          cancelable: false,
        },
      );
    } catch (error) {
      setHasSubmitted(false);

      Alert.alert(
        'Unable to place order',
        typeof error === 'string'
          ? error
          : error?.message || 'Something went wrong while creating your order.',
      );
    }
  };

  // Loading user

  if (userStatus === 'loading' && !currentUser) {
    return (
      <SafeAreaView style={commonStyles.screen}>
        <BackHeader title="Checkout" onBack={() => navigation.goBack()} />

        <View style={commonStyles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />

          <Text style={orderStyles.emptyText}>Loading your information...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Empty cart

  if (cartStatus !== 'loading' && cartItems.length === 0) {
    return (
      <SafeAreaView style={commonStyles.screen}>
        <BackHeader title="Checkout" onBack={() => navigation.goBack()} />

        <View style={orderStyles.emptyCheckout}>
          <MaterialCommunityIcons
            name="cart-outline"
            size={72}
            color={COLORS.neutral}
          />

          <Text style={orderStyles.emptyTitle}>Your cart is empty</Text>

          <Text style={orderStyles.emptyText}>
            Add some delicious food to your cart before checking out.
          </Text>

          <TouchableOpacity
            style={commonStyles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={commonStyles.buttonText}>Back to Cart</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.screen}>
      <BackHeader title="Checkout" onBack={() => navigation.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={commonStyles.scrollContainer}
      >
        {/* Delivery Address */}

        <View style={orderStyles.checkoutSection}>
          <Text style={orderStyles.checkoutSectionTitle}>Delivery Address</Text>

          <View style={orderStyles.checkoutCard}>
            <View style={orderStyles.addressRow}>
              <View style={orderStyles.addressIcon}>
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={23}
                  color={COLORS.primary}
                />
              </View>

              <View style={orderStyles.addressContent}>
                <Text style={orderStyles.addressName}>
                  {currentUser?.fullName || 'Customer'}
                </Text>

                {currentUser?.phone ? (
                  <Text style={orderStyles.addressText}>
                    {currentUser.phone}
                  </Text>
                ) : null}

                <Text style={orderStyles.addressText}>
                  {shippingAddress || 'No delivery address available'}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={orderStyles.changeButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={orderStyles.changeButtonText}>Change</Text>
            </TouchableOpacity>
          </View>

          {!shippingAddress.trim() && (
            <Text style={orderStyles.errorText}>
              Please add a delivery address in your profile.
            </Text>
          )}
        </View>

        {/* Payment Method */}

        <View style={orderStyles.checkoutSection}>
          <Text style={orderStyles.checkoutSectionTitle}>Payment Method</Text>

          <View style={orderStyles.checkoutCard}>
            <TouchableOpacity
              style={orderStyles.paymentOption}
              onPress={() => handleSelectPayment('Cash')}
            >
              <View style={orderStyles.paymentIcon}>
                <MaterialCommunityIcons
                  name="cash"
                  size={22}
                  color={COLORS.primary}
                />
              </View>

              <View style={orderStyles.paymentContent}>
                <Text style={orderStyles.paymentTitle}>Cash on Delivery</Text>

                <Text style={orderStyles.paymentSubtitle}>
                  Pay when your order arrives
                </Text>
              </View>

              <View
                style={[
                  orderStyles.radioOuter,
                  paymentMethod === 'Cash' && orderStyles.radioOuterSelected,
                ]}
              >
                {paymentMethod === 'Cash' && (
                  <View style={orderStyles.radioInner} />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[orderStyles.paymentOption, orderStyles.paymentOptionLast]}
              onPress={() => handleSelectPayment('Online')}
            >
              <View style={orderStyles.paymentIcon}>
                <MaterialCommunityIcons
                  name="credit-card-outline"
                  size={22}
                  color={COLORS.primary}
                />
              </View>

              <View style={orderStyles.paymentContent}>
                <Text style={orderStyles.paymentTitle}>Online Payment</Text>

                <Text style={orderStyles.paymentSubtitle}>
                  Pay securely online
                </Text>
              </View>

              <View
                style={[
                  orderStyles.radioOuter,
                  paymentMethod === 'Online' && orderStyles.radioOuterSelected,
                ]}
              >
                {paymentMethod === 'Online' && (
                  <View style={orderStyles.radioInner} />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Items */}

        <View style={orderStyles.checkoutSection}>
          <Text style={orderStyles.checkoutSectionTitle}>Your Order</Text>

          <View style={orderStyles.checkoutCard}>
            {cartItems.map((item, index) => {
              const image = getFoodImage(item);
              const name = getFoodName(item);
              const price = getItemPrice(item);
              const quantity = Number(item.quantity || 0);

              return (
                <View
                  key={item.id ?? item.cartId ?? `${name}-${index}`}
                  style={orderStyles.checkoutItem}
                >
                  {image ? (
                    <Image
                      source={{ uri: image }}
                      style={orderStyles.checkoutItemImage}
                    />
                  ) : (
                    <View
                      style={[
                        orderStyles.checkoutItemImage,
                        orderStyles.checkoutImagePlaceholder,
                      ]}
                    >
                      <MaterialCommunityIcons
                        name="food-outline"
                        size={28}
                        color={COLORS.neutral}
                      />
                    </View>
                  )}

                  <View style={orderStyles.checkoutItemContent}>
                    <Text
                      style={orderStyles.checkoutItemName}
                      numberOfLines={2}
                    >
                      {name}
                    </Text>

                    <Text style={orderStyles.checkoutItemQuantity}>
                      Quantity: {quantity}
                    </Text>
                  </View>

                  <Text style={orderStyles.checkoutItemPrice}>
                    {formatPrice(price * quantity)}
                  </Text>
                </View>
              );
            })}

            {/* Summary */}

            <View style={orderStyles.checkoutSummary}>
              <View style={orderStyles.checkoutSummaryRow}>
                <Text style={orderStyles.checkoutSummaryLabel}>Subtotal</Text>

                <Text style={orderStyles.checkoutSummaryValue}>
                  {formatPrice(subtotal)}
                </Text>
              </View>

              <View style={orderStyles.checkoutSummaryRow}>
                <Text style={orderStyles.checkoutSummaryLabel}>
                  Delivery fee
                </Text>

                <Text style={orderStyles.checkoutSummaryValue}>
                  {formatPrice(deliveryFee)}
                </Text>
              </View>

              <View style={orderStyles.checkoutTotalRow}>
                <Text style={orderStyles.checkoutTotalLabel}>Total</Text>

                <Text style={orderStyles.checkoutTotalValue}>
                  {formatPrice(total)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Backend Error */}

        {hasSubmitted && orderError ? (
          <Text style={orderStyles.errorText}>{orderError}</Text>
        ) : null}
      </ScrollView>

      {/* Place Order */}

      <View style={orderStyles.checkoutButtonContainer}>
        <TouchableOpacity
          style={commonStyles.button}
          onPress={handlePlaceOrder}
          disabled={orderStatus === 'loading'}
        >
          {orderStatus === 'loading' ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={commonStyles.buttonText}>
              Place Order • {formatPrice(total)}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

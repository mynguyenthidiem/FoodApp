import React, { useEffect, useCallback } from 'react';

import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import commonStyles from '../styles/common';
import profileStyles from '../styles/profile';
import { getProfile } from '../api/authApi';
import { fetchCurrentUser } from '../store/userSlice';
import { resolveImage } from '../utils/imageUrl';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingRow from '../components/SettingRow';
import BackHeader from '../components/BackHeader';
import { COLORS } from '../styles/theme';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { currentUser, status, error } = useSelector(state => state.user);

  // ======================================
  // LOAD USER
  // ======================================

  const loadUser = useCallback(async () => {
    try {
      // Auth profile dùng để lấy ID user hiện tại
      const response = await getProfile();

      const authUser = response.data;

      if (authUser?.id) {
        dispatch(fetchCurrentUser(authUser.id));
      }
    } catch (error) {
      console.warn('Load profile failed:', error?.response?.status);
    }
  }, [dispatch]);

  // ======================================
  // FIRST LOAD
  // ======================================

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // ======================================
  // RELOAD WHEN SCREEN FOCUSED
  // ======================================

  useFocusEffect(
    useCallback(() => {
      loadUser();
    }, [loadUser]),
  );

  // ======================================
  // LOADING
  // ======================================

  if (status === 'loading' && !currentUser) {
    return (
      <SafeAreaView
        style={commonStyles.screen}
        edges={['top', 'left', 'right']}
      >
        <BackHeader title="Profile" />

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  // ======================================
  // RENDER
  // ======================================

  return (
    <SafeAreaView style={commonStyles.screen} edges={['top', 'left', 'right']}>
      <BackHeader title="Profile" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={profileStyles.container}
      >
        <View style={profileStyles.header}>
          <View style={profileStyles.avatarContainer}>
            <View style={profileStyles.profileAvatarWrapper}>
              <Image
                source={resolveImage(currentUser?.avatar)}
                style={profileStyles.profileScreenAvatar}
              />
            </View>

            <TouchableOpacity
              style={profileStyles.editAvatarButton}
              onPress={() => navigation.navigate('EditProfile')}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons
                name="pencil"
                size={16}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>

          <Text style={profileStyles.name}>
            {currentUser?.fullName ?? 'User'}
          </Text>

          <Text style={profileStyles.email}>{currentUser?.email ?? ''}</Text>
        </View>

        <View style={profileStyles.stats}>
          <View style={profileStyles.statBox}>
            <Text style={profileStyles.statNumber}>24</Text>

            <Text style={profileStyles.statLabel}>ORDERS</Text>
          </View>

          <View style={profileStyles.statBox}>
            <Text style={profileStyles.statNumber}>12</Text>

            <Text style={profileStyles.statLabel}>REVIEWS</Text>
          </View>

          <View style={profileStyles.statBox}>
            <Text style={profileStyles.statNumber}>5</Text>

            <Text style={profileStyles.statLabel}>BADGES</Text>
          </View>
        </View>

        <Text style={profileStyles.sectionTitle}>ACCOUNT SETTINGS</Text>

        <SettingRow
          icon="receipt-text-outline"
          title="My Orders"
          onPress={() => {}}
        />

        <SettingRow
          icon="credit-card-outline"
          title="Payment Methods"
          onPress={() => {}}
        />

        <SettingRow
          icon="map-marker-outline"
          title="Addresses"
          onPress={() => {}}
        />

        <SettingRow icon="heart-outline" title="Favorites" onPress={() => {}} />

        <Text style={profileStyles.sectionTitle}>SUPPORT</Text>

        <SettingRow
          icon="cog-outline"
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
        />

        <SettingRow
          icon="help-circle-outline"
          title="Help Center"
          onPress={() => {}}
        />

        <TouchableOpacity style={profileStyles.logoutButton} onPress={() => {}}>
          <MaterialCommunityIcons name="logout" size={20} color="#b30000" />

          <Text style={profileStyles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

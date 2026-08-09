import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';

import ProfileCard from '../components/ProfileCard';
import SettingRow from '../components/SettingRow';

import commonStyles from '../styles/common';
import profileStyles from '../styles/profile';
import { COLORS } from '../styles/theme';

import { fetchCurrentUser, clearCurrentUser } from '../redux/userSlice';

import { removeToken } from '../utils/tokenStorage';

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(true);
  const { currentUser, status, error } = useSelector(state => state.user);

  useEffect(() => {
    /*
     * Nếu currentUser đã có trong Redux
     * thì không cần gọi API lại.
     *
     * Nếu currentUser chưa có thì cần fetch.
     *
     * fetchCurrentUser() hiện tại yêu cầu ID.
     * Vì vậy phần này chỉ chạy được khi
     * currentUser đã có id từ Redux/login flow.
     */

    if (!currentUser) {
      return;
    }

    // User đã có trong Redux → không cần fetch lại
  }, [currentUser]);


  const handleSignOut = async () => {
    try {
      // Xóa JWT/token
      await removeToken();

      // Xóa user khỏi Redux
      dispatch(clearCurrentUser());

      // Quay về Login
      navigation.replace('Login');
    } catch (error) {
      console.warn('Sign out failed:', error);
    }
  };

  if (status === 'loading' && !currentUser) {
    return (
      <SafeAreaView
        style={commonStyles.screen}
        edges={['top', 'left', 'right']}
      >
        <View style={commonStyles.container}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (status === 'failed' && !currentUser) {
    return (
      <SafeAreaView
        style={commonStyles.screen}
        edges={['top', 'left', 'right']}
      >
        <View style={commonStyles.container}>
          <Text>{error || 'Failed to load profile'}</Text>
        </View>
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={commonStyles.screen} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={commonStyles.scrollContainer}
        showsVerticalScrollIndicator={true}
      >

        {currentUser && (
          <ProfileCard
            name={currentUser.fullName}
            email={currentUser.email}
            onPress={() => navigation.navigate('EditProfile')}
          />
        )}

        <View style={profileStyles.divider}>
          <Text style={profileStyles.sectionTitle}>Preferences</Text>

          <View style={profileStyles.settingsRow}>

            <SettingRow
              iconBgColor={COLORS.primaryLighter}
              iconColor={COLORS.primaryDark}
              icon="bell-outline"
              label="Notifications"
              type="switch"
              switchValue={notification}
              onToggle={setNotification}
            />

            <SettingRow
              icon="web"
              iconBgColor={COLORS.secondary}
              iconColor={COLORS.tertiary}
              label="Language"
              type="value"
              value="English (UK)"
              onPress={() => navigation.navigate('Language')}
            />
          </View>
        </View>

        <View style={profileStyles.divider}>
          <Text style={profileStyles.sectionTitle}>Account</Text>

          <View style={profileStyles.settingsRow}>

            <SettingRow
              icon="credit-card-outline"
              iconColor={COLORS.neutral}
              label="Payment Methods"
              type="chevron"
              onPress={() => navigation.navigate('PaymentMethods')}
            />

            <SettingRow
              icon="map-marker-outline"
              iconColor={COLORS.neutral}
              label="Saved Addresses"
              type="chevron"
              onPress={() => navigation.navigate('SavedAddresses')}
            />
          </View>
        </View>

        <View style={profileStyles.divider}>
          <Text style={profileStyles.sectionTitle}>About</Text>

          <View style={profileStyles.settingsRow}>
            <SettingRow
              icon="shield-check-outline"
              iconColor={COLORS.tertiary}
              label="Privacy Policy"
              type="link"
              onPress={() => navigation.navigate('PrivacyPolicy')}
            />

            <SettingRow
              icon="information-outline"
              iconColor={COLORS.tertiary}
              label="About EatLocal"
              type="chevron"
              onPress={() => navigation.navigate('About')}
            />

            <SettingRow
              icon="help-circle-outline"
              iconColor={COLORS.tertiary}
              label="Help & Support"
              type="chevron"
              onPress={() => navigation.navigate('Help')}
            />
          </View>
        </View>

        <TouchableOpacity
          style={profileStyles.signOutButton}
          onPress={handleSignOut}
        >
          <MaterialCommunityIcons
            name="logout"
            size={18}
            color={COLORS.error}
          />

          <Text style={profileStyles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

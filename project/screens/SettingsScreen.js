import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import BackHeader from "../components/BackHeader";
import ProfileCard from "../components/ProfileCard";
import SettingRow from "../components/SettingRow";
import commonStyles from "../styles/common";
import profileStyles from "../styles/profile";
import { COLORS } from "../styles/theme";
import { getProfile } from "../api/authApi";
import { removeToken } from "../utils/tokenStorage";

const SettingsScreen = ({ navigation }) => {
  const [notification, setNotification] = useState(true);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (error) {
      console.warn("Load profile failed:", error?.response?.status);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSignOut = async () => {
    await removeToken();
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={commonStyles.screen} edges={["top", "left", "right"]}>
      <BackHeader title="Settings" />

      <ScrollView contentContainerStyle={commonStyles.scrollContainer} showsVerticalScrollIndicator={true}>
        {user && (
          <ProfileCard
            name={user.fullName}
            email={user.email}
            onPress={() => navigation.navigate("EditProfile")}
          />
        )}
        <View style={profileStyles.divider} >
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
              onPress={() => navigation.navigate("Language")}
            />
          </View>
        </View>
        <View style={profileStyles.divider} >
          <Text style={profileStyles.sectionTitle}>Account</Text>
          <View style={profileStyles.settingsRow}>
            <SettingRow
              icon="credit-card-outline"
              iconColor={COLORS.neutral}
              label="Payment Methods"
              type="chevron"
              onPress={() => navigation.navigate("PaymentMethods")}
            />
            <SettingRow
              icon="map-marker-outline"
              iconColor={COLORS.neutral}
              label="Saved Addresses"
              type="chevron"
              onPress={() => navigation.navigate("SavedAddresses")}
            />
          </View>
        </View>
        <View style={profileStyles.divider} >
          <Text style={profileStyles.sectionTitle}>About</Text>
          <View style={profileStyles.settingsRow}>
            <SettingRow
              icon="shield-check-outline"
              iconColor={COLORS.tertiary}
              label="Privacy Policy"
              type="link"
              onPress={() => navigation.navigate("PrivacyPolicy")}
            />
            <SettingRow
              icon="information-outline"
              iconColor={COLORS.tertiary}
              label="About EatLocal"
              type="chevron"
              onPress={() => navigation.navigate("About")}
            />
            <SettingRow
              icon="help-circle-outline"
              iconColor={COLORS.tertiary}
              label="Help & Support"
              type="chevron"
              onPress={() => navigation.navigate("Help")}
            />
          </View>
        </View>
        <TouchableOpacity style={profileStyles.signOutButton} onPress={handleSignOut}>
          <MaterialCommunityIcons name="logout" size={18} color={COLORS.error} />
          <Text style={profileStyles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView >
  );
};

export default SettingsScreen;
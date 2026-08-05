import React, {
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import commonStyles from "../styles/common";
import profileStyles from "../styles/profile";

import { getProfile } from "../api/authApi";
import { resolveImage } from "../utils/imageUrl";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingRow from "../components/SettingRow";
import BackHeader from "../components/BackHeader";
import { COLORS } from "../styles/theme";
const ProfileScreen = ({ navigation }) => {

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

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );
  return (

    <SafeAreaView
      style={commonStyles.screen}
      edges={["top", "left", "right"]}
    >
      <BackHeader title="Profile" />
      <ScrollView
        contentContainerStyle={profileStyles.container}
      >
        <View style={profileStyles.header}>

          <View style={profileStyles.avatarContainer}>
            <View style={profileStyles.profileAvatarWrapper}>
              <Image
                source={resolveImage(user?.avatar)}
                style={profileStyles.profileScreenAvatar}
              />
            </View>
            <TouchableOpacity
              style={profileStyles.editAvatarButton}
              onPress={() => navigation.navigate("EditProfile")}
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
            {user?.fullName ?? "User"}
          </Text>
          <Text style={profileStyles.email}>
            {user?.email}
          </Text>
        </View>

        <View style={profileStyles.stats}>
          <View style={profileStyles.statBox}>
            <Text style={profileStyles.statNumber}>
              24
            </Text>
            <Text style={profileStyles.statLabel}>
              ORDERS
            </Text>

          </View>


          <View style={profileStyles.statBox}>

            <Text style={profileStyles.statNumber}>
              12
            </Text>

            <Text style={profileStyles.statLabel}>
              REVIEWS
            </Text>

          </View>


          <View style={profileStyles.statBox}>

            <Text style={profileStyles.statNumber}>
              5
            </Text>

            <Text style={profileStyles.statLabel}>
              BADGES
            </Text>

          </View>


        </View>




        <Text style={profileStyles.sectionTitle}>
          ACCOUNT SETTINGS
        </Text>


        <SettingRow
          icon="receipt-text-outline"
          title="My Orders"
          onPress={() => { }}
        />


        <SettingRow
          icon="credit-card-outline"
          title="Payment Methods"
          onPress={() => { }}
        />


        <SettingRow
          icon="map-marker-outline"
          title="Addresses"
          onPress={() => { }}
        />


        <SettingRow
          icon="heart-outline"
          title="Favorites"
          onPress={() => { }}
        />




        <Text style={profileStyles.sectionTitle}>
          SUPPORT
        </Text>


        <SettingRow
          icon="cog-outline"
          title="Settings"
          onPress={() =>
            navigation.navigate("Settings")
          }
        />


        <SettingRow
          icon="help-circle-outline"
          title="Help Center"
          onPress={() => { }}
        />





        <TouchableOpacity
          style={profileStyles.logoutButton}
        >

          <MaterialCommunityIcons
            name="logout"
            size={20}
            color="#b30000"
          />

          <Text style={profileStyles.logoutText}>
            Logout
          </Text>


        </TouchableOpacity>

      </ScrollView>


    </SafeAreaView>

  );
};

export default ProfileScreen;
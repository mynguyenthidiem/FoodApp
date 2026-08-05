import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BackHeader from "../components/BackHeader";
import commonStyles from "../styles/common";
import profileStyles from "../styles/profile";
import { getProfile } from "../api/authApi";
import { resolveImage } from "../utils/imageUrl";
import { updateProfile } from "../api/userApi";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { launchImageLibrary } from "react-native-image-picker";

import { COLORS } from "../styles/theme";
const EditProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName ?? "");
      setEmail(user.email ?? "");
      setPhone(user.phone ?? "");
      setAddress(user.address ?? "");
    }
  }, [user]);

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

  const handleSave = async () => {
    if (!user) return;

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("phone", phone);
      formData.append("address", address);
      if (avatar) {
        formData.append("avatar", {
          uri: avatar.uri,
          name: avatar.fileName || "avatar.jpg",
          type: avatar.type || "image/jpeg",
        });
      }
      await updateProfile(user.id, formData);

      navigation.goBack();
    } catch (error) {
      console.log(error?.response?.data);
      alert("Update failed");
    }
  };

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        quality: 0.8,
      });

      if (
        !result.didCancel &&
        result.assets &&
        result.assets.length > 0
      ) {
        setAvatar(result.assets[0]);
      }
    } catch (error) {
      console.log("Pick image error:", error);
    }
  };

  return (
    <SafeAreaView
      style={commonStyles.screen}
      edges={["top", "left", "right"]}
    >
      <BackHeader title="Edit Profile" />

      <ScrollView
        contentContainerStyle={
          commonStyles.scrollContainer
        }
      ><View style={profileStyles.avatarEditContainer}>
          <View style={profileStyles.editAvatarWrapper}>
            <Image
              source={
                avatar
                  ? { uri: avatar.uri }
                  : resolveImage(user?.avatar)
              }
              style={profileStyles.editAvatarImage}
            />
          </View>
          <TouchableOpacity
            style={profileStyles.editAvatarButton}
            onPress={pickImage}
          >
            <MaterialCommunityIcons
              name="camera"
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        <View style={profileStyles.editForm}>
          <Text style={profileStyles.editFormLabel}>
            Full Name
          </Text>

          <TextInput
            style={profileStyles.editFormInput}
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        <View style={profileStyles.editForm}>
          <Text style={profileStyles.editFormLabel}>
            Address
          </Text>

          <TextInput
            style={profileStyles.editFormInput}
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <View style={profileStyles.editForm}>
          <Text style={profileStyles.editFormLabel}>
            Phone Number
          </Text>

          <TextInput
            style={profileStyles.editFormInput}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity
          style={profileStyles.saveButton}
          onPress={handleSave}
        >
          <MaterialCommunityIcons
            name="content-save"
            size={20}
            color="#fff"
          />

          <Text style={profileStyles.saveButtonText}>
            Save Changes
          </Text>
        </TouchableOpacity>
        <Text style={profileStyles.accountManagement}>Account Management</Text>
        <TouchableOpacity
          style={profileStyles.deleteAccountButton}
          onPress={() => {
          }}
        >
          <MaterialCommunityIcons
            name="delete-outline"
            size={16}
            color={COLORS.error}
          />

          <Text style={profileStyles.deleteAccountText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
import React, { useState } from "react";
import { View, Text, Button, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import commonStyles from "../styles/common";
import authStyles from "../styles/auth";
import onboardingStyles from "../styles/onboarding";
import { COLORS } from "../styles/theme";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import CustomButton from "../components/CustomButton";
import { login, googleLogin } from "../api/authApi";
import { setToken } from "../utils/tokenStorage";
import { signInWithGoogle } from "../services/googleAuth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required.");
      return;
    }
    try {
      setLoading(true);
      const res = await login({ email, password });
      const { token } = res.data;

      await setToken(token);

      navigation.replace("MainTabs");
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong. Please check your internet connection and try again.";
         Alert.alert("Login Failed", message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      // Đăng nhập Google  Firebase
      const userCredential = await signInWithGoogle();

      // Lấy Firebase ID Token
      const idToken = await userCredential.user.getIdToken();

      // Gửi lên backend
      const res = await googleLogin({
        idToken,
      });

      // Backend trả JWT
      const { token } = res.data;

      // Lưu JWT
      await setToken(token);

      // Vào app
      navigation.replace("MainTabs");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Google Login Failed";

      Alert.alert("Google Login", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[commonStyles.screen, commonStyles.container, commonStyles.centerContainer]} edges={["top"]}>
      <View style={[onboardingStyles.logoBox, onboardingStyles.logoBoxPrimary]}>
        <MaterialCommunityIcons
          name="silverware-fork-knife"
          size={32}
          color={COLORS.black}
        />
      </View>
      <Text style={commonStyles.title}>Welcome Back</Text>
      <Text style={commonStyles.subtitle}>Hungry for some local flavors?  </Text>
      <View style={commonStyles.card}>
        <Text style={commonStyles.label}>Email Address</Text>
        <View style={authStyles.inputContainer}>
          <MaterialIcons
            name="email"
            size={22}
            color={COLORS.placeholder}
          />
          <TextInput
            style={authStyles.textInput}
            placeholder="name@example.com"
            placeholderTextColor={COLORS.placeholder}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
        <View style={authStyles.passwordRow}>
          <Text style={commonStyles.label}> Password </Text>
          <TouchableOpacity>
            <Text style={authStyles.forgot}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={authStyles.inputContainer}>
          <MaterialIcons
            name="lock"
            size={22}
            color={COLORS.placeholder}
          />
          <TextInput
            style={authStyles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={COLORS.placeholder}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <CustomButton title="Login" onPress={handleLogin} loading={loading} />
        <Text style={commonStyles.orText}>Or continue with</Text>
        <View style={authStyles.socialContainer}>
          <TouchableOpacity style={authStyles.socialButton} onPress={handleGoogleLogin}>
            <AntDesign
              name="google"
              size={20}
              color="#DB4437"
            />
            <Text style={authStyles.socialText}> Google </Text>
          </TouchableOpacity>

          <TouchableOpacity style={authStyles.socialButton}>
            <FontAwesome
              name="facebook-square"
              size={20}
              color="#1877F2"
            />
            <Text style={authStyles.socialText}> Facebook </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={authStyles.registerContainer}>
        <Text style={commonStyles.footerText}>
          Don't have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={commonStyles.link}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

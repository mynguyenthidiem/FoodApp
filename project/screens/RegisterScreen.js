import React, {useState} from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import commonStyles from "../styles/common";
import authStyles from "../styles/auth";
import { COLORS } from "../styles/theme";

import BackHeader from "../components/BackHeader";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { register } from "../api/authApi";


export default function RegisterScreen({navigation}) {
  const [agree, setAgree] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Required Fields", "Please fill in all mandatory fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match. Please try again.");
      return;
    }
    if (!agree) {
      Alert.alert("Terms & Conditions", "Please accept the Terms of Service and Privacy Policy to continue.");
      return;
    }

    try {
      setLoading(true);
      await register({
        fullName,
        email,
        password,
        phone: phone || undefined,
      });

      Alert.alert("Success", "Your account has been created successfully. You can log in now.", [
        { text: "Log In", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to register. Please check your information or internet connection.";
      Alert.alert("Registration Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={commonStyles.screen}  edges={["top"]} >
      <BackHeader title="EatLocal" />
      <ScrollView contentContainerStyle={[commonStyles.scrollContainer, commonStyles.centerContainer]}  showsVerticalScrollIndicator={false}>
        
        <Text style={commonStyles.title}>
            Create Account
        </Text>

        <Text style={commonStyles.subtitle}>
            Enter your details to start exploring local flavors.
        </Text>
        <View style={commonStyles.card}>
          <CustomInput label="Full name" placeholder="Enter your name" value={fullName} onChangeText={setFullName} />
          <CustomInput label="Email Address" placeholder="name@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <CustomInput label="Phone number" placeholder="(+84)" keyboardType="numeric" value={phone} onChangeText={setPhone} />
          <CustomInput label="Password" placeholder="Enter your password" secureTextEntry value={password} onChangeText={setPassword} />
          <CustomInput label="Confirm password" placeholder="Confirm your password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
        </View>
        <View style={authStyles.checkboxRow}>
          <TouchableOpacity style={authStyles.checkbox} onPress={() => setAgree(!agree)} >       
            {agree && <MaterialIcons name="check" size={16}  color={COLORS.heading} />}
          </TouchableOpacity>
          <Text style={commonStyles.footerText}>
              I agree to the{" "}
          </Text>

          <Text style={commonStyles.link}>
              Terms of Service{" "}
          </Text>
          <Text style={commonStyles.footerText}>
              and{" "}
          </Text>

          <Text style={commonStyles.link}>
              Privacy Policy.
          </Text>
        </View>
        <CustomButton title="Sign Up" onPress={handleRegister} loading={loading} />
        <View style={authStyles.registerContainer}>
          <Text style={commonStyles.footerText}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={commonStyles.link}> Log In </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Layout from "../hoc/Layout";
import { useTheme } from "../../context/ThemeContext";
import { useSetGoalMutation } from "../api/goalSavingsApi";
import { decodeToken, getToken } from "../utils/token";

const SetGoalScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [form, setForm] = useState({
    TargetName: "",
    TargetAmount: "",
    AmountToAdd: "",
    FundFrequency: "",
    EndDate: "",
    WithdrawalDate: "",
    NextRuntime: "",
    AutoSave: "",
  });

  const [setGoal, { isLoading }] = useSetGoalMutation();

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const fundFrequency = ["Daily", "Weekly", "Monthly"]


const handleSetGoal = async () => {
  if (
    !form.TargetName ||
    !form.TargetAmount ||
    !form.AmountToAdd ||
    !form.FundFrequency
  ) {
    Alert.alert("Please fill all fields");
    return;
  }

  try {
    const formData = new FormData();

    formData.append("TargetName", form.TargetName);
    formData.append("TargetAmount", form.TargetAmount);
    formData.append("AmountToAdd", form.AmountToAdd);
    formData.append("FundFrequency", form.FundFrequency);
    formData.append("AutoSave", form.AutoSave ? true : false);
    // Append GoalUrl if selected
    if (form.GoalUrl) {
      formData.append("GoalUrl", {
        uri: form.GoalUrl.uri,
        type: form.GoalUrl.type, 
        name: form.GoalUrl.fileName || "goal.jpg", // fallback name
      });
    }

   const token = await getToken(); 
   const userInfo = decodeToken(token);
          
    if (!userInfo) {
      Alert.alert('Invalid user information received.');
    }
    const userId = userInfo["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
          
    if (!userId) {
            Alert.alert('User ID not found in token.');
   }

    formData.append("UserId", userId);

    console.log("Submitting formData...", formData);

    const result = await setGoal(formData).unwrap();

    console.log("Set Goal successful", result);

    Alert.alert(result.message || "Goal successfully set");

    // Reset form after success
    setForm({
      TargetName: "",
      TargetAmount: "",
      AmountToAdd: "",
      FundFrequency: "",
      EndDate: "",
      WithdrawalDate: "",
      NextRuntime: "",
      AutoSave: false,
      GoalUrl: null,
    });
    navigation.navigate('Dashboard', { id: userId}); // Navigate to Dashboard after setting goal

  } catch (error) {
    console.error("Error setting goal", error);
    Alert.alert("Failed to set goal", error?.data?.message || "An error occurred");
  }
};


  return (
    <Layout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={[styles.title, { color: theme.text }]}>
              Set a Goal
            </Text>

            {[
              { key: "TargetName", label: "Target Name" },
              {
                key: "TargetAmount",
                label: "Target Amount",
                keyboardType: "numeric",
              },
              {
                key: "AmountToAdd",
                label: "Amount To Add",
                keyboardType: "numeric",
              },
              { key: "FundFrequency", label: "Fund Frequency" },
              { key: "EndDate", label: "End Date", keyboardType: "datetime" },
              {
                key: "WithdrawalDate",
                label: "Withdrawal Date",
                keyboardType: "datetime",
              },
              {
                key: "NextRuntime",
                label: "Next Runtime",
                keyboardType: "datetime",
              },
              { key: "AutoSave", label: "Auto Save" },
            ].map((field, index) => (
              <View key={index} style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.text }]}>
                  {field.label}
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: theme.text,
                      borderColor: theme.inputBorder,
                      backgroundColor: theme.inputBg,
                    },
                  ]}
                  placeholder={`Enter ${field.label}`}
                  placeholderTextColor={theme.placeholder}
                  keyboardType={field.keyboardType || "default"}
                  value={form[field.key]}
                  onChangeText={(text) => handleChange(field.key, text)}
                />
              </View>
            ))}

            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.primary }]}
              onPress={() => handleSetGoal()}
            >
              <Text style={styles.buttonText}>Save Goal</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  button: {
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SetGoalScreen;

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
  Modal,
  Alert,
} from "react-native";
import Layout from "../hoc/Layout";
import { useTheme } from "../../context/ThemeContext";
import { ActivityIndicator, Switch, Button } from "react-native-paper";
import { useSetGoalMutation } from "../api/goalSavingsApi";

const SetGoalScreen = ({ navigation }) => {
  const { theme } = useTheme();

  const [form, setForm] = useState({
    TargetName: "",
    TargetAmount: "",
    AmountToAdd: "",
    FundFrequency: "Daily",
    AutoSave: false,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [estimatedDuration, setEstimatedDuration] = useState(null);
  const [durationUnit, setDurationUnit] = useState("day");
  // const [isLoading, setIsLoading] = useState(false);

  const [ setGoal, { isLoading } ] = useSetGoalMutation();

  const fundFrequencyOptions = ["Daily", "Weekly", "Monthly"];

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleCalculate = () => {
    const { TargetAmount, AmountToAdd, FundFrequency, TargetName } = form;
    const target = parseFloat(TargetAmount);
    const amount = parseFloat(AmountToAdd);

    if (!target || !amount || !FundFrequency || !TargetName ) 
      return Alert.alert("Please fill all fields");

    if (target < amount) 
      return Alert.alert("Target amount cannot be less than amount to add");

    const periods = Math.ceil(target / amount);
    let unit = "day";
    if (FundFrequency === "Weekly") unit = "week";
    else if (FundFrequency === "Monthly") unit = "month";

    setEstimatedDuration(periods);
    setDurationUnit(unit);
    setModalVisible(true);
  };

  // const handleSubmit = () => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     setModalVisible(false);
  //     alert("Goal saved successfully!");
  //   }, 2000);
  // };

  const handleSubmit = async () => {
   try {
    const formData = new FormData();

    formData.append("TargetName", form.TargetName);
    formData.append("TargetAmount", form.TargetAmount);
    formData.append("AmountToAdd", form.AmountToAdd);
    formData.append("FundFrequency", form.FundFrequency);
    formData.append("AutoSave", form.AutoSave);
    
    if (form.GoalUrl) {
      formData.append("GoalUrl", {
        uri: form.GoalUrl.uri,
        type: form.GoalUrl.type, 
        name: form.GoalUrl.fileName || "goal.jpg", // fallback name
      });
    }
    console.log("Submitting formData...", formData);
    const result = await setGoal(formData).unwrap();

    console.log("Set Goal successful", result);
    Alert.alert(result.message || "Goal set successfully");

    // Reset form after success
    setForm({
      TargetName: "",
      TargetAmount: "",
      AmountToAdd: "",
      FundFrequency: "",
      AutoSave: false,
    });
    navigation.navigate('Dashboard', { id: userId}); // Navigate to Dashboard after setting goal

  } catch (error) {
    console.error("Error setting goal", error);
    Alert.alert("Failed to set goal", error?.data?.message || "An error occurred");
  }
};

  return (
    <Layout>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={[styles.title, { color: theme.text }]}>Set a Goal</Text>

            {/* Input Fields */}
            {[
              { key: "TargetName", label: "Target Name" },
              { key: "TargetAmount", label: "Target Amount", keyboardType: "numeric" },
              { key: "AmountToAdd", label: "Amount To Add", keyboardType: "numeric" },
            ].map((field, index) => (
              <View key={index} style={styles.inputGroup}>
                <Text style={[styles.label, { color: theme.text }]}>{field.label}</Text>
                {["TargetAmount", "AmountToAdd"].includes(field.key) && (
                  <Text style={{ position: "absolute", top: 42, left: 12, color: theme.text }}>₦</Text>
                )}
                <TextInput
                  style={[
                    styles.input,
                    {
                      color: theme.text,
                      borderColor: theme.inputBorder,
                      backgroundColor: theme.inputBg,
                      paddingLeft: ["TargetAmount", "AmountToAdd"].includes(field.key) ? 28 : 12,
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

            {/* Fund Frequency Dropdown */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>Fund Frequency</Text>
              <View style={[styles.dropdown, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]}>
                {fundFrequencyOptions.map((freq) => (
                  <TouchableOpacity key={freq} onPress={() => handleChange("FundFrequency", freq)}>
                    <Text
                      style={[
                        styles.dropdownItem,
                        {
                          color: form.FundFrequency === freq ? theme.primary : theme.text,
                        },
                      ]}
                    >
                      {freq}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Auto Save Toggle */}
            <View style={styles.toggleRow}>
              <Text style={[styles.label, { color: theme.text }]}>Auto Save</Text>
              <Switch
                value={form.AutoSave}
                onValueChange={(val) => handleChange("AutoSave", val)}
                color={theme.primary}
              />
            </View>

            {/* Calculate Button */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.primary }]}
              onPress={handleCalculate}
            >
              <Text style={styles.buttonText}>Calculate</Text>
            </TouchableOpacity>

            {/* Modal Summary */}
            <Modal visible={modalVisible} transparent animationType="fade">
              <View style={styles.modalBackdrop}>
                <View style={[styles.modalContent, { backgroundColor: "#fff" }]}>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    Based on your inputs, it will take approximately
                  </Text>
                  <Text style={[styles.modalHighlight, { color: theme.primary }]}>
                    {estimatedDuration} {durationUnit}{estimatedDuration > 1 ? "s" : ""}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    to reach your goal of <Text style={{ fontWeight: "bold" }}>₦{form.TargetAmount}</Text>.
                  </Text>
                  <View style={styles.modalActions}>
                    <Button
                      mode="contained"
                      onPress={handleSubmit}
                      loading={isLoading}
                      disabled={isLoading}
                      style={{ backgroundColor: theme.primary }}
                    >
                      Proceed
                    </Button>
                    <Button onPress={() => setModalVisible(false)}>Cancel</Button>
                  </View>
                </View>
              </View>
            </Modal>
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
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownItem: {
    paddingVertical: 6,
    fontSize: 14,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    padding: 24,
    borderRadius: 12,
    width: "85%",
  },
  modalText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  modalHighlight: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default SetGoalScreen;

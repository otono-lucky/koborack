import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Layout from "../hoc/Layout";

const SaveScreen = () => {
  const [selectedGoal, setSelectedGoal] = useState("Rice Fund");
  const [selectedAmount, setSelectedAmount] = useState("100");

  const goalOptions = [
    { label: "Rice Fund", value: "Rice Fund" },
    { label: "Electricity", value: "Electricity" },
    { label: "Rent Fund", value: "Rent Fund" },
  ];

  return (
    <Layout title="Save">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Select Goal</Text>
        <View style={styles.dropdownContainer}>
          <RNPickerSelect
            onValueChange={(value) => setSelectedGoal(value)}
            items={goalOptions}
            value={selectedGoal}
            placeholder={{}}
            style={{
              inputIOS: styles.dropdown,
              inputAndroid: styles.dropdown,
            }}
          />
        </View>

        <Text style={styles.label}>Amount (₦)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={selectedAmount}
          onChangeText={setSelectedAmount}
        />

        <View style={styles.amountGrid}>
          {["100", "200", "500", "1000", "2000", "5000"].map((amt) => (
            <TouchableOpacity
              key={amt}
              onPress={() => setSelectedAmount(amt)}
              style={[
                styles.amountOption,
                selectedAmount === amt && styles.amountSelected,
              ]}
            >
              <Text>₦{amt}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.proceedButton}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Proceed to Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 120,
  },
  label: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 6,
    marginTop: 20,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  dropdown: {
    fontSize: 16,
    paddingVertical: 10,
  },
  input: {
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  amountGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  amountOption: {
    width: "30%",
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  amountSelected: {
    backgroundColor: "#d1fae5",
  },
  proceedButton: {
    backgroundColor: "#16a34a",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default SaveScreen;

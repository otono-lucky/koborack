import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

const HeaderComponent = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.primary }]}>
      <View style={styles.header}>
        <View style={styles.left}>
          <View style={styles.logoCircle}>
            <FontAwesome5 name="piggy-bank" size={20} color="#16a34a" />
          </View>
          <Text style={styles.title}>KoboStack</Text>
        </View>

        <View style={styles.right}>
          <FontAwesome5 name="bell" size={18} color="#fff" style={styles.icon} />
          <FontAwesome5 name="user" size={18} color="#fff" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoCircle: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
});

export default HeaderComponent;

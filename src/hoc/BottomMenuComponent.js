// BottomMenuComponent.js
import React, { useEffect, useRef } from "react";
import { withNavigation } from "react-navigation";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

const BottomMenuComponent = ({ toggleSaveModal, navigation }) => {
  const { theme } = useTheme();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const menuItems = [
    { icon: "home", label: "Home", color: theme.primary, screen: "Dashboard" },
    { icon: "wallet", label: "Wallet", color: theme.text, screen: "Wallet" },
    { icon: "plus", label: "Save", color: "#fff", center: true },
    { icon: "chart-pie", label: "Stats", color: theme.text },
    { icon: "user", label: "Profile", color: theme.text },
  ];

  return (
    <View style={styles.bottomMenuWrapper}>
      <View style={styles.bottomNav}>
        {menuItems.map((item, i) => {
          if (item.center) {
            return (
              <Animated.View
                key={i}
                style={[styles.centerIconWrapper, { backgroundColor: theme.primary, transform: [{ scale: pulseAnim }] }]}
              >
                <TouchableOpacity onPress={() => toggleSaveModal?.()}>
                  <FontAwesome5 name={item.icon} size={20} color={item.color} />
                </TouchableOpacity>
              </Animated.View>
            );
          }

          return (
            <TouchableOpacity
              key={i}
              style={styles.iconWrapper}
              onPress={() => item.screen && navigation.navigate(item.screen)}
            >
              <FontAwesome5 name={item.icon} size={20} color={item.color} />
              <Text style={[styles.iconLabel, { color: theme.text }]}>{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomMenuWrapper: {
    paddingBottom: Platform.OS === "ios" ? 30 : 24,
    paddingTop: 8,
    backgroundColor: "#fff",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  iconWrapper: {
    alignItems: "center",
  },
  iconLabel: {
    fontSize: 10,
  },
  centerIconWrapper: {
    padding: 12,
    borderRadius: 50,
    marginTop: -20,
  },
});

export default withNavigation(BottomMenuComponent);

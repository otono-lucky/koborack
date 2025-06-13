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
} from "react-native";
import { withNavigation } from "react-navigation";
import HeaderComponent from "./HeaderComponent";
import BottomMenuComponent from "./BottomMenuComponent";
import { useTheme } from "../../context/ThemeContext";

const Layout = ({ children, navigation }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.layoutContainer, { backgroundColor: theme.background }]}>
      <View style={styles.headerWrapper}>
        <HeaderComponent navigation={navigation} />
      </View>
      <View style={styles.contentWrapper}>{children}</View>
      <View style={styles.bottomWrapper}>
        <BottomMenuComponent navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
  },
  headerWrapper: {
    paddingTop: Platform.OS === "android" ? 50 : 40,
  },
  contentWrapper: {
    flex: 1,
  },
  bottomWrapper: {
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
  },
});

export default withNavigation(Layout);

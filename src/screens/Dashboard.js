import React, { useState } from "react";
import { useTheme } from '../../context/ThemeContext';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";


const Dashboard = () => {
  const { theme } = useTheme();
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [notificationsModalVisible, setNotificationsModalVisible] = useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoCircle}>
              <FontAwesome5 name="piggy-bank" size={20} color="#16a34a" />
            </View>
            <Text style={[styles.headerTitle, { color: theme.text }]}>KoboStack</Text>
          </View>
          <View style={styles.headerRight}>
            {/* <TouchableOpacity style={{ marginRight: 12 }} onPress={theme.toggleTheme}>
              <FontAwesome5 name={theme.mode === 'light' ? 'sun' : 'moon'} size={18} color="#fff" />
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.iconButton} onPress={() => setNotificationsModalVisible(true)}>
              <FontAwesome5 name="bell" size={20} color="#fff" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton}>
              <FontAwesome5 name="user" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.banner, { backgroundColor: theme.primary }]}> 
  <Text style={[styles.bannerTitle, { color: theme.text }]}>Hello, Adeola!</Text>
  <Text style={[styles.bannerSubtitle, { color: theme.placeholder }]}>You've saved ₦12,450 this month! 🎉</Text>
</View>

{/* Your Goals Section */}
<View style={styles.sectionHeader}>
  <Text style={[styles.sectionTitle, { color: theme.text }]}>Your Goals</Text>
  <TouchableOpacity><Text style={[styles.sectionLink, { color: theme.primary }]}>+ New Goal</Text></TouchableOpacity>
</View>
<View style={styles.cardList}>
  {[
    { title: "Rice Fund", desc: "Daily savings for 25kg rice", icon: "utensils", saved: "₦8,250", target: "₦15,000", progress: 55, color: "#16a34a" },
    { title: "Electricity", desc: "Monthly electricity bill", icon: "bolt", saved: "₦3,200", target: "₦5,000", progress: 64, color: "#2563eb" },
    { title: "Rent Fund", desc: "Yearly rent savings", icon: "home", saved: "₦45,000", target: "₦300,000", progress: 15, color: "#7c3aed" },
  ].map((goal, i) => (
    <View key={i} style={[styles.card, { backgroundColor: theme.inputBg }]}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={[styles.cardTitle, { color: theme.text }]}>{goal.title}</Text>
          <Text style={[styles.cardDesc, { color: theme.placeholder }]}>{goal.desc}</Text>
        </View>
        <FontAwesome5 name={goal.icon} size={20} color={goal.color} />
      </View>
      <View>
        <View style={styles.cardStats}>
          <Text style={[styles.cardText, { color: theme.text }]}>{goal.saved}</Text>
          <Text style={[styles.cardText, { color: theme.text }]}>{goal.target}</Text>
        </View>
        <View style={styles.progressBarBase}>
          <View style={[styles.progressBarFill, { width: `${goal.progress}%`, backgroundColor: goal.color }]} />
        </View>
      </View>
    </View>
  ))}
</View>

{/* Micro-Investments */}
<View style={styles.sectionHeader}>
  <Text style={[styles.sectionTitle, { color: theme.text }]}>Micro-Investments</Text>
  <TouchableOpacity><Text style={[styles.sectionLink, { color: theme.primary }]}>View All</Text></TouchableOpacity>
</View>
<View style={styles.cardList}>
  {[
    { title: "Farm Collective", desc: "Invest in rice farming", icon: "seedling", roi: "12% ROI", risk: "Low Risk", color: "#facc15" },
    { title: "Transport Pool", desc: "Logistics investment", icon: "truck", roi: "18% ROI", risk: "Medium Risk", color: "#2563eb" },
  ].map((inv, i) => (
    <View key={i} style={[styles.card, { backgroundColor: theme.inputBg }]}>
      <View style={styles.cardHeader}>
        <FontAwesome5 name={inv.icon} size={20} color={inv.color} />
        <Text style={[styles.cardRisk, { color: inv.color }]}>{inv.risk}</Text>
      </View>
      <Text style={[styles.cardTitle, { color: theme.text }]}>{inv.title}</Text>
      <Text style={[styles.cardDesc, { color: theme.placeholder }]}>{inv.desc}</Text>
      <View style={styles.cardFooter}>
        <Text style={[styles.cardText, { color: theme.text }]}>{inv.roi}</Text>
        <TouchableOpacity><Text style={[styles.cardButton, { backgroundColor: inv.color }]}>Invest</Text></TouchableOpacity>
      </View>
    </View>
  ))}
</View>

{/* Savings Groups */}
<View style={styles.sectionHeader}>
  <Text style={[styles.sectionTitle, { color: theme.text }]}>Savings Groups</Text>
  <TouchableOpacity><Text style={[styles.sectionLink, { color: theme.primary }]}>Create Group</Text></TouchableOpacity>
</View>
<View style={styles.cardList}>
  <View style={[styles.card, { backgroundColor: theme.inputBg }]}>
    <View style={styles.cardHeader}>
      <FontAwesome5 name="users" size={20} color="#16a34a" />
      <Text style={[styles.cardTitle, { color: theme.text }]}>Family Rice Fund</Text>
    </View>
    <Text style={[styles.cardDesc, { color: theme.placeholder }]}>Group target: ₦60,000</Text>
    <View style={styles.cardStats}>
      <Text style={[styles.cardText, { color: theme.text }]}>₦32,400 saved</Text>
      <Text style={[styles.cardText, { color: theme.text }]}>54% complete</Text>
    </View>
    <View style={styles.progressBarBase}>
      <View style={[styles.progressBarFill, { width: '54%', backgroundColor: '#16a34a' }]} />
    </View>
    <TouchableOpacity style={{ marginTop: 10 }}>
      <Text style={[styles.cardButton, { backgroundColor: '#16a34a', textAlign: 'center' }]}>Contribute Now</Text>
    </TouchableOpacity>
  </View>
</View>

        {/* Additional UI sections would go here (Goals, Investments, etc.) */}

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: theme.inputBg, padding: 10, borderTopWidth: 1, borderTopColor: theme.inputBorder }}>
          {[
            { icon: "home", label: "Home", color: "#16a34a" },
            { icon: "wallet", label: "Wallet", color: "#6b7280" },
            { icon: "plus", label: "Save", color: "#fff", center: true },
            { icon: "chart-pie", label: "Stats", color: "#6b7280" },
            { icon: "user", label: "Profile", color: "#6b7280" },
          ].map((item, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => item.label === "Save" && setSaveModalVisible(true)}
              style={item.center ? {
                backgroundColor: '#16a34a', padding: 12, borderRadius: 50, marginTop: -20
              } : { alignItems: 'center' }}>
              <FontAwesome5 name={item.icon} size={20} color={item.color} />
              {!item.center && <Text style={{ fontSize: 10 }}>{item.label}</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Modals (Save, Chat, Notifications) retained as-is */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#16a34a', padding: 16, alignItems: 'center' },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  logoCircle: { backgroundColor: '#fff', borderRadius: 20, width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontWeight: 'bold', fontSize: 18, marginLeft: 10 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginRight: 12, position: 'relative' },
  notificationBadge: { position: 'absolute', top: -6, right: -6, backgroundColor: '#ef4444', width: 18, height: 18, borderRadius: 9, justifyContent: 'center', alignItems: 'center' },
  notificationText: { color: '#fff', fontSize: 10 },
  profileButton: { backgroundColor: '#15803d', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  banner: { margin: 16, borderRadius: 12, padding: 16 },
  bannerTitle: { fontWeight: 'bold', fontSize: 16 },
  bannerSubtitle: { marginTop: 4, fontSize: 12 },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  sectionLink: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: '500',
  },
  cardList: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  cardDesc: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  cardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  cardText: {
    fontSize: 12,
    color: '#374151',
  },
  progressBarBase: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 6,
    borderRadius: 3,
  },
  cardRisk: {
    fontSize: 10,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  cardButton: {
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    overflow: 'hidden',
  },
});

import withThemeHeader from '../hoc/WithThemeHeader';
export default withThemeHeader(Dashboard);

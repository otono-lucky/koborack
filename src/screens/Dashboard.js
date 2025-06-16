import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Layout from "../hoc/Layout";

const Dashboard = ({navigation}) => {
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [notificationsModalVisible, setNotificationsModalVisible] = useState(false);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState('100');

  // State and modal trigger
const [addMoneyVisible, setAddMoneyVisible] = useState(false);
const [selectedGoal, setSelectedGoal] = useState("");
const [amountToAdd, setAmountToAdd] = useState("");

// Function to open modal with specific goal
const openAddMoneyModal = (goalName) => {
  setSelectedGoal(goalName);
  setAmountToAdd("");
  setAddMoneyVisible(true);
};

  return (
    <Layout title="Dashboard" navigation={navigation} onSavePress={() => setSaveModalVisible(true)}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Welcome Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Hello, Adeola!</Text>
          <Text style={styles.bannerSubtitle}>You've saved ₦12,450 this month! 🎉</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          {[
            { icon: "plus-circle", label: "Save Now", color: "#16a34a", screen: "Save" },
            { icon: "users", label: "Groups", color: "#2563eb" },
            { icon: "chart-line", label: "Invest", color: "#7c3aed" },
            { icon: "wallet", label: "Wallet", color: "#ca8a04", screen: "Wallet" },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.actionItem} onPress={() => navigation.navigate(item.screen)}>
              <FontAwesome5 name={item.icon} size={20} color={item.color} />
              <Text style={[styles.actionText, { color: item.color }]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Your Goals Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Goals</Text>
          <TouchableOpacity><Text style={styles.sectionLink}>+ New Goal</Text></TouchableOpacity>
        </View>
        <View style={styles.cardList}>
          {[
            { title: "Rice Fund", desc: "Daily savings for 25kg rice", icon: "utensils", saved: "₦8,250", target: "₦15,000", progress: 55, color: "#16a34a" },
            { title: "Electricity", desc: "Monthly electricity bill", icon: "bolt", saved: "₦3,200", target: "₦5,000", progress: 64, color: "#2563eb" },
            { title: "Rent Fund", desc: "Yearly rent savings", icon: "home", saved: "₦45,000", target: "₦300,000", progress: 15, color: "#7c3aed" },
          ].map((goal, i) => (
            <View key={i} style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.cardTitle}>{goal.title}</Text>
                  <Text style={styles.cardDesc}>{goal.desc}</Text>
                </View>
                <FontAwesome5 name={goal.icon} size={20} color={goal.color} />
              </View>
              <View>
                <View style={styles.cardStats}>
                  <Text style={styles.cardText}>{goal.saved}</Text>
                  <Text style={styles.cardText}>{goal.target}</Text>
                </View>
                <View style={styles.progressBarBase}>
                  <View style={[styles.progressBarFill, { width: `${goal.progress}%`, backgroundColor: goal.color }]} />
                </View>
              </View>
              <TouchableOpacity
              style={{ marginTop: 10 }}
              onPress={() => openAddMoneyModal(goal.title)}
            >
              <Text style={[styles.cardButton, { backgroundColor: goal.color, textAlign: 'center' }]}>Add Money</Text>
            </TouchableOpacity>

            </View>
          ))}
        </View>

        {/* Micro-Investments */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Micro-Investments</Text>
          <TouchableOpacity><Text style={styles.sectionLink}>View All</Text></TouchableOpacity>
        </View>
        <View style={styles.cardList}>
          {[
            { title: "Farm Collective", desc: "Invest in rice farming", icon: "seedling", roi: "12% ROI", risk: "Low Risk", color: "#facc15" },
            { title: "Transport Pool", desc: "Logistics investment", icon: "truck", roi: "18% ROI", risk: "Medium Risk", color: "#2563eb" },
          ].map((inv, i) => (
            <View key={i} style={styles.card}>
              <View style={styles.cardHeader}>
                <FontAwesome5 name={inv.icon} size={20} color={inv.color} />
                <Text style={[styles.cardRisk, { color: inv.color }]}>{inv.risk}</Text>
              </View>
              <Text style={styles.cardTitle}>{inv.title}</Text>
              <Text style={styles.cardDesc}>{inv.desc}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardText}>{inv.roi}</Text>
                <TouchableOpacity><Text style={[styles.cardButton, { backgroundColor: inv.color }]}>Invest</Text></TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Savings Groups */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Savings Groups</Text>
          <TouchableOpacity><Text style={styles.sectionLink}>Create Group</Text></TouchableOpacity>
        </View>
        <View style={styles.cardList}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <FontAwesome5 name="users" size={20} color="#16a34a" />
              <Text style={styles.cardTitle}>Family Rice Fund</Text>
            </View>
            <Text style={styles.cardDesc}>Group target: ₦60,000</Text>
            <View style={styles.cardStats}>
              <Text style={styles.cardText}>₦32,400 saved</Text>
              <Text style={styles.cardText}>54% complete</Text>
            </View>
            <View style={styles.progressBarBase}>
              <View style={[styles.progressBarFill, { width: '54%', backgroundColor: '#16a34a' }]} />
            </View>
            <TouchableOpacity style={{ marginTop: 10 }}>
              <Text style={[styles.cardButton, { backgroundColor: '#16a34a', textAlign: 'center' }]}>Contribute Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal visible={addMoneyVisible} animationType="slide" transparent>
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{
          width: '90%',
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 20
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Add Money</Text>
            <TouchableOpacity onPress={() => setAddMoneyVisible(false)}>
              <FontAwesome5 name="times" size={20} />
            </TouchableOpacity>
          </View>

          <Text style={{ fontWeight: '500', marginBottom: 6 }}>Goal</Text>
          <View style={{
            padding: 12,
            backgroundColor: '#f3f4f6',
            borderRadius: 10,
            marginBottom: 12
          }}>
            <Text>{selectedGoal}</Text>
          </View>

          <Text style={{ fontWeight: '500', marginBottom: 6 }}>Amount</Text>
          <TextInput
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amountToAdd}
            onChangeText={setAmountToAdd}
            style={{
              borderWidth: 1,
              borderColor: '#e5e7eb',
              borderRadius: 10,
              padding: 12,
              marginBottom: 16
            }}
          />

          <TouchableOpacity
            style={{
              backgroundColor: '#16a34a',
              paddingVertical: 12,
              borderRadius: 10,
              alignItems: 'center'
            }}
            onPress={() => {
              console.log(`Add ₦${amountToAdd} to ${selectedGoal}`);
              setAddMoneyVisible(false);
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add Money</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  scrollContent: { paddingBottom: 100 },
  banner: { backgroundColor: "#16a34a", margin: 16, borderRadius: 12, padding: 16 },
  bannerTitle: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  bannerSubtitle: { color: "#f0fdf4", marginTop: 4, fontSize: 12 },
  quickActions: { flexDirection: "row", justifyContent: "space-around", marginHorizontal: 16, marginBottom: 20 },
  actionItem: { alignItems: "center" },
  actionText: { marginTop: 6, fontSize: 10, fontWeight: "600" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, marginTop: 24, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#1f2937" },
  sectionLink: { fontSize: 14, color: "#16a34a", fontWeight: "500" },
  cardList: { paddingHorizontal: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 1 }, shadowRadius: 3, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 14, fontWeight: '600', color: '#111827' },
  cardDesc: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  cardStats: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 },
  cardText: { fontSize: 12, color: '#374151' },
  progressBarBase: { height: 6, backgroundColor: '#e5e7eb', borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: 6, borderRadius: 3 },
  cardRisk: { fontSize: 10, fontWeight: '500' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  cardButton: { color: '#fff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, fontSize: 12, overflow: 'hidden' },

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

export default Dashboard;

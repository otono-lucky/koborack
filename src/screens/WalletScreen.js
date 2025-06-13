import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import Layout from "../hoc/Layout";

const WalletScreen = () => {
  const { theme } = useTheme();

  const recentTransactions = [
    { id: 1, type: "Deposit", amount: "+₦5,000", icon: "arrow-down", color: "#22c55e" },
    { id: 2, type: "Withdrawal", amount: "-₦2,000", icon: "arrow-up", color: "#ef4444" },
    { id: 3, type: "Transfer", amount: "-₦1,000", icon: "exchange-alt", color: "#3b82f6" },
  ];

  return (
    <Layout title="Wallet">
      <ScrollView contentContainerStyle={styles.content}>
        {/* Wallet Balance */}
        <View style={[styles.walletCard, { backgroundColor: theme.card }]}>
          <Text style={[styles.walletLabel, { color: theme.text }]}>Current Balance</Text>
          <Text style={[styles.walletAmount, { color: theme.primary }]}>₦25,450</Text>
          <View style={styles.walletActions}>
            <TouchableOpacity style={[styles.walletBtn, { backgroundColor: theme.primary }]}>
              <FontAwesome5 name="plus" size={14} color="#fff" />
              <Text style={styles.walletBtnText}>Add Money</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.walletBtn, { backgroundColor: "#ef4444" }]}>
              <FontAwesome5 name="minus" size={14} color="#fff" />
              <Text style={styles.walletBtnText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          {[
            { icon: "paper-plane", label: "Send" },
            { icon: "download", label: "Receive" },
            { icon: "exchange-alt", label: "Transfer" },
            { icon: "receipt", label: "Bills" },
          ].map((action, index) => (
            <TouchableOpacity key={index} style={styles.actionItem}>
              <FontAwesome5 name={action.icon} size={18} color={theme.primary} />
              <Text style={[styles.actionLabel, { color: theme.text }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Transactions */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Transactions</Text>
        <View style={styles.transactionList}>
          {recentTransactions.map(tx => (
            <View key={tx.id} style={[styles.transactionItem, { backgroundColor: theme.card }]}>
              <FontAwesome5 name={tx.icon} size={16} color={tx.color} style={{ marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.transactionType, { color: theme.text }]}>{tx.type}</Text>
                <Text style={styles.transactionDate}>Jun 12, 2025</Text>
              </View>
              <Text style={[styles.transactionAmount, { color: tx.color }]}>{tx.amount}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 100,
    paddingHorizontal: 16,
  },
  walletCard: {
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  walletLabel: {
    fontSize: 14,
  },
  walletAmount: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
  },
  walletActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  walletBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  walletBtnText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 6,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  actionItem: {
    alignItems: "center",
  },
  actionLabel: {
    marginTop: 6,
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  transactionList: {
    gap: 12,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 8,
  },
  transactionType: {
    fontSize: 14,
    fontWeight: "500",
  },
  transactionDate: {
    fontSize: 12,
    color: "#9ca3af",
  },
  transactionAmount: {
    fontWeight: "600",
    fontSize: 14,
  },
});

export default WalletScreen;

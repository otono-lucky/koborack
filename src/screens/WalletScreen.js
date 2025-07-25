import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import Layout from "../hoc/Layout";
import {
  useGetWalletQuery,
} from "../api/walletApi";
import { validateSession } from "../utils/sessionUtils";
import { formatCurrency } from "../utils/format";
import { useGetUserTransactionQuery } from "../api/transactionAPi";

const WalletScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const initialUserId = navigation.getParam("id");
  const [userId, setUserId] = useState(initialUserId);
  const [showBalance, setShowBalance] = useState(true);

  const { data: wallet, isLoading, isError } = useGetWalletQuery(userId, {
    refetchOnMountOrArgChange: true,
    skip: !userId,
  });

  const walletInfo = wallet?.result;

  const {
    data: transactions,
    isError: transactionError,
    isLoading: isTransactionLoading,
  } = useGetUserTransactionQuery(userId, {
    skip: !userId,
  });

  const recentTransactions = transactions?.data || [];

  const getTransactionStyle = (type) => {
    switch (type.toLowerCase()) {
      case "deposit":
        return { icon: "arrow-down", color: "#22c55e" };
      case "withdrawal":
        return { icon: "arrow-up", color: "#ef4444" };
      case "transfer":
        return { icon: "exchange-alt", color: "#3b82f6" };
      default:
        return { icon: "question", color: "#6b7280" };
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      await validateSession(() => navigation.navigate("Login")).then((session) => {
        if (session) {
          setUserId(session.userId);
        }
      });
    };
    checkSession();
  }, []);

  return (
    <Layout title="Wallet">
      <ScrollView contentContainerStyle={styles.content}>
        {/* Wallet Balance */}
        <View style={[styles.walletCard, { backgroundColor: theme.card }]}>
  <Text style={[styles.walletLabel, { color: theme.text }]}>Current Balance</Text>

  {isLoading ? (
    <ActivityIndicator size="small" color={theme.primary} style={{ marginVertical: 20 }} />
  ) : isError ? (
    <Text style={[styles.walletAmount, { color: theme.primary }]}>Failed to load wallet balance</Text>
  ) : (
    <View style={styles.balanceRow}>
      <Text style={[styles.walletAmount, { color: theme.primary }]}>
        {showBalance ? formatCurrency(walletInfo?.availableBalance) : "****"}
      </Text>
      <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
        <FontAwesome5
          name={showBalance ? "eye" : "eye-slash"}
          size={20}
          color={"#842626"} // matches Withdraw button
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
    </View>
  )}

  <View style={styles.walletActions}>
    <TouchableOpacity
      style={[styles.walletBtn, { backgroundColor: theme.primary }]}
      onPress={() => navigation.navigate("FundWallet", { walletNumber: walletInfo?.walletNumber })}
    >
      <FontAwesome5 name="plus" size={14} color="#fff" />
      <Text style={styles.walletBtnText}>Add Money</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.walletBtn, { backgroundColor: "#842626" }]}>
      <FontAwesome5 name="minus" size={14} color="#fff" />
      <Text style={styles.walletBtnText}>Withdraw</Text>
    </TouchableOpacity>
  </View>
</View>


        {/* Savings Sections */}
        <View style={styles.savingsSections}>
          <TouchableOpacity
            style={[styles.savingsCard, { backgroundColor: theme.card }]}
            onPress={() => navigation.navigate("GroupSavings")}
          >
            <FontAwesome5 name="users" size={18} color={theme.primary} style={{ marginRight: 10 }} />
            <Text style={[styles.savingsLabel, { color: theme.text }]}>Group Savings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.savingsCard, { backgroundColor: theme.card }]}
            onPress={() => navigation.navigate("LockedSavings")}
          >
            <FontAwesome5 name="lock" size={18} color={theme.primary} style={{ marginRight: 10 }} />
            <Text style={[styles.savingsLabel, { color: theme.text }]}>Locked Savings</Text>
          </TouchableOpacity>
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
          {isTransactionLoading ? (
            <ActivityIndicator size="small" color={theme.primary} style={{ marginVertical: 20 }} />
          ) : transactionError ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>Failed to load transactions</Text>
          ) : recentTransactions.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>No recent transactions</Text>
          ) : (
            recentTransactions.map((tx) => {
              const { icon, color } = getTransactionStyle(tx.transactionType);
              return (
                <View key={tx.reference} style={[styles.transactionItem, { backgroundColor: theme.card }]}>
                  <FontAwesome5 name={icon} size={16} color={color} style={{ marginRight: 12 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.transactionType, { color: theme.text }]}>{tx.transactionType}</Text>
                    <Text style={styles.transactionDate}>{tx.createdAt}</Text>
                  </View>
                  <Text style={[styles.transactionAmount, { color }]}>{formatCurrency(tx.amount)}</Text>
                </View>
              );
            })
          )}
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
  balanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  savingsSections: {
    marginTop: 20,
  },
  savingsCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  savingsLabel: {
    fontSize: 14,
    fontWeight: "500",
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

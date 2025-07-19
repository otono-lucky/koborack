import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert
} from 'react-native';
// import { Paystack } from 'paystack-react-native';
import Layout from '../hoc/Layout';
import { useFundWalletMutation} from '../api/walletApi';

const FundWalletScreen = ( {navigation}) => {
  const walletNumber = navigation.getParam('walletNumber');
  const [amount, setAmount] = useState('100');
  const [fundWallet, { isLoading }] = useFundWalletMutation();


const handleFundWallet = async () => {
  if (!amount || isNaN(Number(amount))) {
    Alert.alert('Invalid Input', 'Please enter a valid amount');
    return;
  }

  try {
    const { data } = await fundWallet({
      walletNumber,
      fundAmount: Number(amount),
      naration: 'Funding wallet via Paystack'
    }).unwrap();

  console.log("logging data:", data)

    const { accessCode, paymentUrl } = data; // This must be from your API initialize step
    navigation.navigate('PaystackWebview', { paymentUrl });

  } catch (err) {
    console.error('Funding error:', err);
    Alert.alert('Error', err?.data?.message || 'Unable to initiate funding');
  }
};

  return (
    <Layout title="Fund Wallet">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Enter Amount (₦)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <View style={styles.amountGrid}>
          {['100', '200', '500', '1000', '2000', '5000'].map((amt) => (
            <TouchableOpacity
              key={amt}
              onPress={() => setAmount(amt)}
              style={[
                styles.amountOption,
                amount === amt && styles.amountSelected
              ]}
            >
              <Text>₦{amt}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.proceedButton, isLoading && { opacity: 0.6 }]}
          onPress={handleFundWallet}
          disabled={isLoading}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            {isLoading ? 'Processing...' : 'Proceed to Payment'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 120 },
  label: { fontWeight: '600', fontSize: 14, marginBottom: 6, marginTop: 20 },
  input: {
    borderColor: '#e5e7eb',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  amountOption: {
    width: '30%',
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12
  },
  amountSelected: { backgroundColor: '#d1fae5' },
  proceedButton: {
    backgroundColor: '#16a34a',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center'
  }
});

export default FundWalletScreen;
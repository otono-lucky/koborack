import React, { useRef, useState } from 'react';
import { View, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useVerifyFundingMutation } from '../api/walletApi'; // RTK endpoint

const PaystackWebviewScreen = ({ navigation }) => {
  const paymentUrl = navigation.getParam('paymentUrl');
  const [verifying, setVerifying] = useState(false);
  const [verifyFunding] = useVerifyFundingMutation();
  const hasVerified = useRef(false); // Prevent duplicate calls

  const handleNavChange = async (navState) => {
    const url = navState.url;

    // Abort if already handled
    if (hasVerified.current || !url.includes('reference=')) return;

    try {
      hasVerified.current = true;
      setVerifying(true);

      // Extract the reference from the URL
      const urlParams = new URLSearchParams(url.split('?')[1]);
      const reference = urlParams.get('reference');

      if (!reference) throw new Error('Transaction reference not found in URL');

      // 🔍 Verify on the backend
      const { data } = await verifyFunding(reference).unwrap();
      console.log("logging verification data", data)
      Alert.alert('Payment Verified ✅', data);
      navigation.replace('FundSuccess'); // Or pass reference as param

    } catch (err) {
      console.error('Verification error:', err);
      Alert.alert('Verification Failed', err?.data?.message || 'Transaction verification failed.');
      navigation.replace('Wallet');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: paymentUrl }}
        onNavigationStateChange={handleNavChange}
        startInLoadingState
      />
      {verifying && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#16a34a" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default PaystackWebviewScreen;
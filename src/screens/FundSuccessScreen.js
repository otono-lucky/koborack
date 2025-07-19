import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
const FundSuccessScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{}} // replace with your own image
        style={styles.image}
      />
      <Text style={styles.title}>Wallet Funded 🎉</Text>
      <Text style={styles.subtitle}>
        Your payment was successful, and your wallet has been updated.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Wallet')}>
        <Text style={styles.buttonText}>Return to Wallet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6fff8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 24
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#16a34a',
    marginBottom: 12
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 32
  },
  button: {
    backgroundColor: '#16a34a',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  }
});

export default FundSuccessScreen;
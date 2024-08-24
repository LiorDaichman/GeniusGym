import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { addOrder } from '../services/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/colors';

const DeliveryScreen = () => {
  const [address, setAddress] = useState({ city: '', street: '', zip: '', phone: '' });
  const [creditCard, setCreditCard] = useState({ number: '', validity: '', cvc: '' });
  const [isCVCVisible, setIsCVCVisible] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  const handlePurchase = async () => {
    if (!address.city || !address.street || !address.zip || !address.phone || !creditCard.number || !creditCard.validity || !creditCard.cvc) {
      Alert.alert('Error', 'All fields must be filled out.');
      return;
    }

    const order = {
      address,
      creditCard: {
        number: creditCard.number,
        validity: creditCard.validity,
        cvc: creditCard.cvc,
      },
      user: {
        uid: user.uid,
        email: user.email,
      },
      timestamp: Date.now(),
    };

    await addOrder(order);
    Alert.alert('Success', 'Order placed successfully!');
    navigation.goBack();
  };

  const handleZipChange = (text) => {
    if (/^\d*$/.test(text)) {
      setAddress({ ...address, zip: text });
    }
  };

  const handlePhoneChange = (text) => {
    if (/^\d*$/.test(text)) {
      setAddress({ ...address, phone: text });
    }
  };

  const handleCreditCardChange = (text) => {
    if (/^\d*$/.test(text)) {
      setCreditCard({ ...creditCard, number: text });
    }
  };

  const handleCVCChange = (text) => {
    if (/^\d*$/.test(text)) {
      setCreditCard({ ...creditCard, cvc: text });
    }
  };

  const handleValidityChange = (text) => {
    if (/^\d{0,2}\/?\d{0,2}$/.test(text)) {
      if (text.length === 2 && !text.includes('/')) {
        text = text + '/';
      }
      setCreditCard({ ...creditCard, validity: text });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.heading}>Purchase Screen</Text>
        </View>
        <ScrollView>
          <TextInput
            style={styles.input}
            placeholder="City"
            value={address.city}
            onChangeText={(text) => setAddress({ ...address, city: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Street"
            value={address.street}
            onChangeText={(text) => setAddress({ ...address, street: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Zip Code"
            value={address.zip}
            onChangeText={handleZipChange}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={address.phone}
            onChangeText={handlePhoneChange}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Credit Card Number"
            value={creditCard.number}
            onChangeText={handleCreditCardChange}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Validity (MM/YY)"
            value={creditCard.validity}
            onChangeText={handleValidityChange}
            keyboardType="numeric"
            maxLength={5}
          />
          <View style={styles.cvcContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="CVC"
              value={creditCard.cvc}
              onChangeText={handleCVCChange}
              keyboardType="numeric"
              secureTextEntry={!isCVCVisible}
            />
            <TouchableOpacity onPress={() => setIsCVCVisible(!isCVCVisible)} style={styles.eyeIcon}>
              <Ionicons name={isCVCVisible ? "eye-off" : "eye"} size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
            <Text style={styles.purchaseButtonText}>Purchase</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  backButton: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  purchaseButton: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  purchaseButtonText: {
    color: colors.white,
    fontSize: 18,
    marginLeft: 10,
  },
  heading: {
    fontSize: 34,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  cvcContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    marginLeft: 10,
  },
});

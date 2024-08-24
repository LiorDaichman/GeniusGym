import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addOrder } from '../services/firestore';
import { getAuth } from 'firebase/auth';
import { colors } from '../utils/colors';

const products = [
  { id: '1', name: 'Dumbbells', price: 50, image: require('../assets/product1.png') },
  { id: '2', name: 'Gloves', price: 20, image: require('../assets/product2.png') },
  { id: '3', name: 'Gloves', price: 15, image: require('../assets/product3.png') },
  { id: '4', name: 'Bottle', price: 20, image: require('../assets/product4.png') },
  { id: '5', name: 'Bottle', price: 15, image: require('../assets/product5.png') },
  { id: '6', name: 'workout resistance bands', price: 40, image: require('../assets/product6.png') },
  { id: '7', name: 'protein powder', price: 220, image: require('../assets/product7.png') },
  { id: '8', name: 'protein powder', price: 240, image: require('../assets/product8.png') },
  { id: '9', name: 'protein powder', price: 230, image: require('../assets/product9.png') },
  { id: '10', name: 'Bottle for protein powder', price: 20, image: require('../assets/product10.png') },
];

const ShopScreen = () => {
  const [cart, setCart] = useState([]);
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: `${product.id}-${Date.now()}` }]);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleShowDeliveryDetails = async () => {
    const order = {
      items: cart,
      total: calculateTotal(),
      timestamp: Date.now(),
      user: {
        uid: user.uid,
        email: user.email,
      },
    };
    await addOrder(order);
    navigation.navigate('DeliveryScreenMain');
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Genius</Text>
        <Text style={styles.headingText}> Gym</Text>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={item.image} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>₪{item.price.toFixed(2)}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.cart}>
        <Text style={styles.cartTitle}>Cart:</Text>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.cartId}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <Text style={styles.cartItemPrice}>₪{item.price.toFixed(2)}</Text>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.cartId)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          style={styles.cartList}
          ListFooterComponent={<Text style={styles.total}>Total: ₪{calculateTotal().toFixed(2)}</Text>}
        />
      </View>
      <TouchableOpacity style={styles.toggleButton} onPress={handleShowDeliveryDetails}>
        <Text style={styles.toggleButtonText}>Show Delivery Details</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 120,
    height: 120,
    marginLeft: 10,
  },
  headerText: {
    fontSize: 44,
    fontWeight: 'bold',
  },
  product: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 3,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#000000',
  },
  productImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  cart: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    maxHeight: 200,
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  cartItemName: {
    fontSize: 16,
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#4CAF50',
  },
  removeButton: {
    backgroundColor: '#FF5722',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  removeButtonText: {
    color: '#FFFFFF',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  toggleButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  toggleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  details: {
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  purchaseButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  purchaseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  textContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headingText: {
    fontSize: 44,
    color: colors.black,
    fontWeight: 'bold',
  },
});

export default ShopScreen;
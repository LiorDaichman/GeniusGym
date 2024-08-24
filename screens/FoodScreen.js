import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { colors } from '../utils/colors';

const foodData = {
  buildMuscle: [
    { id: '1', name: 'Chicken Breast', quantity: '200g', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { id: '2', name: 'Quinoa', quantity: '100g', calories: 120, protein: 4.1, carbs: 21, fat: 1.9 },
    { id: '3', name: 'Greek Yogurt', quantity: '150g', calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
    { id: '4', name: 'Salmon', quantity: '150g', calories: 206, protein: 22, carbs: 0, fat: 12 },
    { id: '5', name: 'Eggs', quantity: '2 large', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
    { id: '6', name: 'Tuna', quantity: '100g', calories: 132, protein: 28, carbs: 0, fat: 1 },
    { id: '7', name: 'Cottage Cheese', quantity: '100g', calories: 98, protein: 11, carbs: 3.4, fat: 4.3 },
    { id: '8', name: 'Tofu', quantity: '200g', calories: 76, protein: 8, carbs: 1.9, fat: 4.8 },
    { id: '9', name: 'Beef Steak', quantity: '150g', calories: 242, protein: 26, carbs: 0, fat: 15 },
    { id: '10', name: 'Brown Rice', quantity: '100g', calories: 111, protein: 2.6, carbs: 23, fat: 0.9 },
    { id: '11', name: 'Chickpeas', quantity: '100g', calories: 164, protein: 8.9, carbs: 27, fat: 2.6 },
    { id: '12', name: 'Peanut Butter', quantity: '2 tbsp', calories: 588, protein: 25, carbs: 20, fat: 50 },
    { id: '13', name: 'Pork Tenderloin', quantity: '150g', calories: 143, protein: 23, carbs: 0, fat: 5.3 },
    { id: '14', name: 'Edamame', quantity: '150g', calories: 121, protein: 11, carbs: 9, fat: 5 },
    { id: '15', name: 'Turkey Breast', quantity: '200g', calories: 135, protein: 30, carbs: 0, fat: 1 },
    { id: '16', name: 'Bison Steak', quantity: '150g', calories: 190, protein: 27, carbs: 0, fat: 9 },
    { id: '17', name: 'Lentils', quantity: '100g', calories: 116, protein: 9, carbs: 20, fat: 0.4 },
    { id: '18', name: 'Almond Butter', quantity: '2 tbsp', calories: 196, protein: 7, carbs: 6, fat: 18 },
    { id: '19', name: 'Sweet Potato', quantity: '150g', calories: 86, protein: 2, carbs: 20, fat: 0.1 },
    { id: '20', name: 'Whey Protein', quantity: '30g scoop', calories: 120, protein: 24, carbs: 2, fat: 1.5 },
    { id: '21', name: 'Whole Milk', quantity: '250ml', calories: 152, protein: 8, carbs: 12, fat: 8 },
    { id: '22', name: 'Avocado', quantity: '1 medium', calories: 234, protein: 3, carbs: 12, fat: 21 },
    { id: '23', name: 'Pumpkin Seeds', quantity: '30g', calories: 170, protein: 9, carbs: 15, fat: 13 },
    { id: '24', name: 'Black Beans', quantity: '100g', calories: 132, protein: 8.9, carbs: 23, fat: 0.3 },
    { id: '25', name: 'Coconut Oil', quantity: '1 tbsp', calories: 121, protein: 0, carbs: 0, fat: 14 },
    { id: '26', name: 'Chia Seeds', quantity: '30g', calories: 138, protein: 4.7, carbs: 12, fat: 8.7 },
    { id: '27', name: 'Olive Oil', quantity: '1 tbsp', calories: 119, protein: 0, carbs: 0, fat: 14 },
    { id: '28', name: 'Cheddar Cheese', quantity: '50g', calories: 200, protein: 12, carbs: 1, fat: 17 },
    { id: '29', name: 'Egg Yolk', quantity: '1 large', calories: 55, protein: 2.7, carbs: 0.6, fat: 4.5 },
    { id: '30', name: 'Ground Beef (80/20)', quantity: '100g', calories: 254, protein: 17, carbs: 0, fat: 20 },
  ],
  loseWeight: [
    { id: '1', name: 'Spinach Salad', quantity: '150g', calories: 50, protein: 2, carbs: 10, fat: 0.5 },
    { id: '2', name: 'Oatmeal', quantity: '40g', calories: 150, protein: 5, carbs: 27, fat: 3 },
    { id: '3', name: 'Apple', quantity: '1 medium', calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
    { id: '4', name: 'Broccoli', quantity: '100g', calories: 55, protein: 3.7, carbs: 11, fat: 0.6 },
    { id: '5', name: 'Carrot Sticks', quantity: '100g', calories: 41, protein: 0.9, carbs: 10, fat: 0.2 },
    { id: '6', name: 'Celery', quantity: '100g', calories: 16, protein: 0.7, carbs: 3, fat: 0.2 },
    { id: '7', name: 'Cucumber', quantity: '150g', calories: 16, protein: 0.7, carbs: 4, fat: 0.1 },
    { id: '8', name: 'Tomato', quantity: '100g', calories: 18, protein: 0.9, carbs: 4, fat: 0.2 },
    { id: '9', name: 'Greek Yogurt (Non-Fat)', quantity: '150g', calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
    { id: '10', name: 'Zucchini', quantity: '100g', calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3 },
    { id: '11', name: 'Berries', quantity: '100g', calories: 50, protein: 1, carbs: 12, fat: 0.3 },
    { id: '12', name: 'Almonds', quantity: '30g', calories: 579, protein: 21, carbs: 22, fat: 49 },
    { id: '13', name: 'Salmon', quantity: '150g', calories: 206, protein: 22, carbs: 0, fat: 12 },
    { id: '14', name: 'Chicken Breast', quantity: '150g', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { id: '15', name: 'Egg White', quantity: '1 large', calories: 17, protein: 3.6, carbs: 0.2, fat: 0.1 },
    { id: '16', name: 'Cabbage', quantity: '100g', calories: 25, protein: 1.3, carbs: 6, fat: 0.1 },
    { id: '17', name: 'Mushrooms', quantity: '100g', calories: 22, protein: 3.1, carbs: 3.3, fat: 0.2 },
    { id: '18', name: 'Cauliflower', quantity: '100g', calories: 25, protein: 2, carbs: 5, fat: 0.3 },
    { id: '19', name: 'Green Beans', quantity: '100g', calories: 31, protein: 1.8, carbs: 7, fat: 0.2 },
    { id: '20', name: 'Lettuce', quantity: '100g', calories: 15, protein: 1.4, carbs: 2.9, fat: 0.2 },
    { id: '21', name: 'Radishes', quantity: '100g', calories: 16, protein: 0.7, carbs: 3.4, fat: 0.1 },
    { id: '22', name: 'Bell Pepper', quantity: '100g', calories: 31, protein: 1, carbs: 6, fat: 0.3 },
    { id: '23', name: 'Asparagus', quantity: '100g', calories: 20, protein: 2.2, carbs: 3.9, fat: 0.1 },
    { id: '24', name: 'Raspberries', quantity: '100g', calories: 52, protein: 1.2, carbs: 12, fat: 0.7 },
    { id: '25', name: 'Tuna (in water)', quantity: '100g', calories: 116, protein: 25, carbs: 0, fat: 0.6 },
    { id: '26', name: 'Turkey Breast', quantity: '100g', calories: 135, protein: 30, carbs: 0, fat: 1 },
    { id: '27', name: 'Shrimp', quantity: '100g', calories: 99, protein: 24, carbs: 0, fat: 0.3 },
    { id: '28', name: 'Cod', quantity: '100g', calories: 82, protein: 18, carbs: 0, fat: 0.7 },
    { id: '29', name: 'Tilapia', quantity: '100g', calories: 96, protein: 21, carbs: 0, fat: 1.7 },
    { id: '30', name: 'Cottage Cheese (Low-Fat)', quantity: '100g', calories: 98, protein: 11, carbs: 3.4, fat: 4.3 },
  ],
};

const FoodScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const renderFoodItem = ({ item }) => (
    <View style={styles.foodItem}>
      <Text style={styles.foodName}>{item.name}</Text>
      <View style={styles.nutritionContainer}>
        <Text style={styles.nutritionText}>quantity: {item.quantity}</Text>
        <Text style={styles.nutritionText}>Calories: {item.calories}</Text>
        <Text style={styles.nutritionText}>Protein: {item.protein}g</Text>
        <Text style={styles.nutritionText}>Carbs: {item.carbs}g</Text>
        <Text style={styles.nutritionText}>Fat: {item.fat}g</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Genius</Text>
        <Text style={styles.headingText}> Gym</Text>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
      </View>
      <Text style={styles.heading}>Choose Your Goal</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.optionButton, selectedOption === 'buildMuscle' && styles.selectedButton]}
          onPress={() => handleSelectOption('buildMuscle')}
        >
          <Text style={styles.buttonText}>Build Muscle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.optionButton, selectedOption === 'loseWeight' && styles.selectedButton]}
          onPress={() => handleSelectOption('loseWeight')}
        >
          <Text style={styles.buttonText}>Lose Weight</Text>
        </TouchableOpacity>
      </View>

      {selectedOption && (
        <FlatList
          data={foodData[selectedOption]}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.foodList}
        />
      )}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Datacalculationfood')}
      >
        <Text style={styles.navButtonText}>Go to Data Calculation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 15,
    width: '40%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
  },
  foodList: {
    flexGrow: 1,
  },
  foodItem: {
    backgroundColor: colors.secondaryLight,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nutritionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  nutritionText: {
    fontSize: 14,
    color: colors.text,
    marginRight: 10,
  },
  navButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  navButtonText: {
    color: colors.white,
    fontSize: 18,
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
  logo: {
    width: 120,
    height: 120,
    marginLeft: 10,
  },
});

export default FoodScreen;
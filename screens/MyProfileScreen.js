import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../utils/colors';
import { addBMIData, getBMIData } from '../services/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const MyProfileScreen = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const bmiData = await getBMIData(user.uid);
        if (bmiData) {
          setWeight(bmiData.weight);
          setHeight(bmiData.height);
          setAge(bmiData.age);
          setSex(bmiData.sex);
          setBmi(bmiData.bmi);
          setBmiCategory(calculateBMICategory(bmiData.bmi));
        }
      }
    };

    fetchData();
  }, []);

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);
    setBmiCategory(calculateBMICategory(bmiValue));
  };

  const calculateBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) {
      return 'Underweight';
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      return 'Normal weight';
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      return 'Overweight';
    } else {
      return 'Obesity';
    }
  };

  const saveData = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const bmiData = {
        uid: user.uid,
        weight,
        height,
        age,
        sex,
        bmi,
      };

      try {
        await addBMIData(bmiData);
        alert('BMI data saved successfully!');
      } catch (error) {
        console.error('Error saving BMI data: ', error);
      }
    } else {
      alert('No user is logged in.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={28} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.heading}>My Profile</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
        <View style={styles.sexContainer}>
          <TouchableOpacity
            style={[styles.sexButton, sex === 'Male' && styles.selectedSexButton]}
            onPress={() => setSex('Male')}
          >
            <Text style={[styles.sexButtonText, sex === 'Male' && styles.selectedSexButtonText]}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sexButton, sex === 'Female' && styles.selectedSexButton]}
            onPress={() => setSex('Female')}
          >
            <Text style={[styles.sexButtonText, sex === 'Female' && styles.selectedSexButtonText]}>Female</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={calculateBMI}>
          <Ionicons name="calculator-outline" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Calculate BMI</Text>
        </TouchableOpacity>

        {bmi && (
          <View style={styles.bmiContainer}>
            <Text style={styles.bmiText}>Your BMI: {bmi}</Text>
            <Text style={styles.bmiCategory}>Category: {bmiCategory}</Text>
            <Text style={styles.explanationHeading}>How BMI is Calculated:</Text>
            <Text style={styles.explanationText}>
              BMI (Body Mass Index) is calculated using your weight and height. The formula is:
            </Text>
            <Text style={styles.formula}>
              BMI = weight (kg) / (height (m) × height (m))
            </Text>
            <Text style={styles.explanationText}>
              For example, if your height is in centimeters, convert it to meters (by dividing by 100). 
              Then divide your weight by the square of your height to get your BMI.
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={saveData}>
          <Ionicons name="save-outline" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Save Data</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
    justifyContent: 'center',
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  heading: {
    fontSize: 34,
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  sexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sexButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  selectedSexButton: {
    backgroundColor: colors.primary,
  },
  sexButtonText: {
    fontSize: 18,
    color: colors.primary,
  },
  selectedSexButtonText: {
    color: colors.white,
  },
  button: {
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
  buttonText: {
    color: colors.white,
    fontSize: 18,
    marginLeft: 10,
  },
  bmiContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: colors.secondaryLight,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  bmiText: {
    fontSize: 26,
    color: colors.primary,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  bmiCategory: {
    fontSize: 20,
    color: colors.text,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  explanationHeading: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  explanationText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 10,
    textAlign: 'left',
  },
  formula: {
    fontSize: 16,
    fontStyle: 'italic',
    color: colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  icon: {
    marginRight: 10,
  },
});
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';

const Datacalculation = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [goal, setGoal] = useState('');
  const [activityLevel, setActivityLevel] = useState('Moderately active');
  const [results, setResults] = useState(null);
  
  const navigation = useNavigation();

  const calculateNutrition = () => {
    if (!weight || !height || !age || !gender) {
      alert('Please fill out all fields.');
      return;
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);

    const BMR = gender === 'male'
      ? 88.362 + (13.397 * weightNum) + (4.799 * heightNum) - (5.677 * ageNum)
      : 447.593 + (9.247 * weightNum) + (3.098 * heightNum) - (4.330 * ageNum);

    let activityFactor;
    switch (activityLevel) {
      case '1':
        activityFactor = 1.2;
        break;
      case '2':
        activityFactor = 1.375;
        break;
      case '3':
        activityFactor = 1.55;
        break;
      case '4':
        activityFactor = 1.725;
        break;
      case '5':
        activityFactor = 1.9;
        break;
      default:
        activityFactor = 1.55;
    }

    const dailyEnergy = BMR * activityFactor;
    const calories = goal === 'buildMuscle' ? dailyEnergy + 500 : dailyEnergy - 500;
    const protein = weightNum * (goal === 'buildMuscle' ? 2 : 1.5);
    const carbs = goal === 'buildMuscle' ? weightNum * 2 : weightNum * 1.5;
    const fat = weightNum * 0.5;

    setResults({ dailyEnergy, calories, protein, carbs, fat });
  };

  const safeToFixed = (value) => {
    return value !== undefined && value !== null ? value.toFixed(0) : '0';
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.heading}>Nutrition Calculator</Text>
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

      <Text style={styles.label}>Gender:</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === 'male' ? styles.selectedButton : styles.unselectedButton
          ]}
          onPress={() => setGender('male')}
        >
          <Text style={gender === 'male' ? styles.selectedText : styles.unselectedText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.genderButton,
            gender === 'female' ? styles.selectedButton : styles.unselectedButton
          ]}
          onPress={() => setGender('female')}
        >
          <Text style={gender === 'female' ? styles.selectedText : styles.unselectedText}>Female</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Goal:</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.goalButton,
            goal === 'buildMuscle' ? styles.selectedButton : styles.unselectedButton
          ]}
          onPress={() => setGoal('buildMuscle')}
        >
          <Text style={goal === 'buildMuscle' ? styles.selectedText : styles.unselectedText}>Build Muscle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.goalButton,
            goal === 'loseWeight' ? styles.selectedButton : styles.unselectedButton
          ]}
          onPress={() => setGoal('loseWeight')}
        >
          <Text style={goal === 'loseWeight' ? styles.selectedText : styles.unselectedText}>Lose Weight</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Activity Level:</Text>
      <View style={styles.buttonContainer}>
        {['1', '2', '3', '4', '5'].map((level) => (
          <TouchableOpacity
            key={level}
            style={[
              styles.activityButton,
              activityLevel === level ? styles.selectedButton : styles.unselectedButton
            ]}
            onPress={() => setActivityLevel(level)}
          >
            <Text style={activityLevel === level ? styles.selectedText : styles.unselectedText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.activityInfoBox}>
        <Text style={styles.activityInfoText}>Level 1 - Little to no exercise. This level is for individuals who have a desk job and don't engage in regular physical activity.</Text>
        <Text style={styles.activityInfoText}>Level 2 - Light exercise or sports 1-3 days a week. This level is for those who engage in some physical activity but not intensely.</Text>
        <Text style={styles.activityInfoText}>Level 3 - Moderate exercise or sports 3-5 days a week. This includes those who have a regular workout routine or engage in physical activity several times a week.</Text>
        <Text style={styles.activityInfoText}>Level 4 - Hard exercise or sports 6-7 days a week. This level is for individuals who have a rigorous exercise routine or physical job.</Text>
        <Text style={styles.activityInfoText}>Level 5 - Very hard exercise or physical job, and a training session twice a day. This is for those who are extremely active, such as professional athletes or individuals with physically demanding jobs.</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={calculateNutrition}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      <Text>

        
      </Text>

      {results && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultText}>Daily Energy: {safeToFixed(results.dailyEnergy)} kcal</Text>
          <Text style={styles.resultText}>Calories: {safeToFixed(results.calories)} kcal</Text>
          <Text style={styles.resultText}>Protein: {safeToFixed(results.protein)}g</Text>
          <Text style={styles.resultText}>Carbs: {safeToFixed(results.carbs)}g</Text>
          <Text style={styles.resultText}>Fat: {safeToFixed(results.fat)}g</Text>
          <PieChart
            data={[
              { name: 'Protein', population: results.protein, color: '#0000ff', legendFontColor: '#000000', legendFontSize: 15 },
              { name: 'Carbs', population: results.carbs, color: '#FFFF00', legendFontColor: '#000000', legendFontSize: 15 },
              { name: 'Fat', population: results.fat, color: '#FFC0CB', legendFontColor: '#000000', legendFontSize: 15 },
            ]}
            width={300}
            height={220}
            chartConfig={{
              backgroundColor: '#FFFFFF',
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    marginTop: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: '#45484A',
  },
  backButton: {
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#45484A',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    fontSize: 18,
  },
  button: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#45484A',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  resultsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  genderButton: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#45484A',
    borderRadius: 10,
    alignItems: 'center',
  },
  goalButton: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#45484A',
    alignItems: 'center',
  },
  activityButton: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#45484A',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#45484A',
  },
  unselectedButton: {
    backgroundColor: '#FFFFFF',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  unselectedText: {
    color: '#45484A',
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#45484A',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
  },
  activityInfoBox: {
    borderWidth: 1,
    borderColor: '#45484A',
    borderRadius: 10,
    padding: 15,
    marginVertical: 15,
    backgroundColor: '#F5F5F5',
  },
  activityInfoText: {
    fontSize: 16,
    color: '#45484A',
    marginBottom: 10,
  },
  
});

export default Datacalculation;
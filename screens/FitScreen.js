import React, { useState, useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Image, SafeAreaView, TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FitnessItems } from '../components/Context';

const FitScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const exercise = route.params.exercises;
  const current = exercise[index];
  const { completed, setCompleted, calories, setCalories, minutes, setMinutes, workout, setWorkout } = useContext(FitnessItems);

  const handleDone = () => {
    console.log("Done button pressed");
    setCompleted([...completed, current?.name]);
    setWorkout(workout + 1);
    setMinutes(minutes + 2.5);
    setCalories(calories + 6.3);

    if (index + 1 >= exercise.length) {
      console.log("Navigating to Workout screen");
      navigation.navigate("WorkoutScreenMain");
    } else {
      console.log("Navigating to RestScreenMain");
      navigation.navigate("RestScreenMain");
      setTimeout(() => {
        setIndex(index + 1);
      }, 2000);
    }
  };

  const handlePrev = () => {
    console.log("Prev button pressed");
    if (index > 0) {
      navigation.navigate("RestScreenMain");
      setTimeout(() => {
        setIndex(index - 1);
      }, 2000);
    }
  };

  const handleSkip = () => {
    console.log("Skip button pressed");
    if (index + 1 >= exercise.length) {
      console.log("Navigating to Workout screen");
      navigation.navigate("WorkoutScreenMain");
    } else {
      console.log("Navigating to RestScreenMain");
      navigation.navigate("RestScreenMain");
      setTimeout(() => {
        setIndex(index + 1);
      }, 2000);
    }
  };

  return (
    <SafeAreaView>
      <Image style={{ width: "100%", height: 300 }} source={{ uri: current?.image }} />

      <Text style={{ marginLeft: "auto", marginRight: "auto", fontSize: 30, fontWeight: "bold", marginTop: 30 }}>{current?.name}</Text>

      <Text style={{ marginLeft: "auto", marginRight: "auto", fontSize: 45, fontWeight: "bold", marginTop: 10 }}>x{current?.sets}</Text>

      <TouchableOpacity onPress={handleDone} style={{ backgroundColor: "#198f51", marginLeft: "auto", marginRight: "auto", marginTop: 50, borderRadius: 30, padding: 10, width: "90%" }}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20, textAlign: "center" }}><Ionicons name="checkmark-circle" size={24} color="white" /> DONE</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 25 }}>
        <TouchableOpacity disabled={index === 0} onPress={handlePrev} style={{ borderRadius: 30, padding: 10, width: "42%" }}>
          <Text style={{ color: "#6d6868", fontWeight: "bold", fontSize: 18, textAlign: "center" }}><Ionicons name="play-skip-back" size={22} color="#6d6868" /> PREV</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSkip} style={{ borderRadius: 30, padding: 10, width: "42%" }}>
          <Text style={{ color: "#3f3d3d", fontWeight: "bold", fontSize: 18, textAlign: "center" }}><Ionicons name="play-skip-forward" size={22} color="#3f3d3d" /> SKIP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default FitScreen;
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FitnessCards from '../components/FitnessCards';
import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { FitnessItems } from '../components/Context';

const WorkoutScreen = () => {
  const [showIcon, setShowIcon] = useState(false);
  const { calories, minutes, workout } = useContext(FitnessItems);

  if (calories === undefined || minutes === undefined || workout === undefined) {
    return (
      <View style={styles.centeredView}>
        <Text style={{ color: "white" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 40 }}>
      <View style={{ backgroundColor: "#000000d7", paddingTop: 40, paddingHorizontal: 20, height: 160, width: "100%" }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 50 }}>
      </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 30 }}>
          <View style={styles.shadowCards}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{calories.toFixed(2)}</Text>
            <Text>KCAL</Text>
          </View>
          <View style={styles.shadowCards}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{workout}</Text>
            <Text>WORKOUTS</Text>
          </View>
          <View style={styles.shadowCards}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{minutes}</Text>
            <Text>MINUTES</Text>
          </View>
        </View>
      </View>
      <FitnessCards />
    </ScrollView>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
  shadowCards: {
    backgroundColor: "#ffffff",
    width: "32%",
    height: 80,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

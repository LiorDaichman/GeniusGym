import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';

const CalendarScreen = () => {
  const [selected, setSelected] = useState('');
  const [markedDates, setMarkedDates] = useState({});
  const [selectedClasses, setSelectedClasses] = useState([]); // Store classes for the selected date
  const auth = getAuth();

  async function fetchUserRegistrations(userId) {
    const registrationsQuery = query(
      collection(db, 'registrations'),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(registrationsQuery);
    const userRegistrations = [];

    querySnapshot.forEach((doc) => {
      userRegistrations.push(doc.data().classId);
    });

    return userRegistrations;
  }

  const fetchClassesAndMarkDates = async (userId) => {
    try {
      const registeredClassIds = await fetchUserRegistrations(userId);
      const lessonsCollection = collection(db, 'lessons');
      const lessonsSnapshot = await getDocs(lessonsCollection);

      const lessons = lessonsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const registeredClasses = lessons.filter(lesson => registeredClassIds.includes(lesson.id));
      
      const dates = {};
      registeredClasses.forEach((cls) => {
        const date = cls.date; // Ensure 'date' is in 'YYYY-MM-DD' format

        // If the date already exists in 'dates', add the class to the array
        if (dates[date]) {
          dates[date].classes.push({ className: cls.lessonName, classTime: cls.time });
        } else {
          dates[date] = {
            marked: true,
            dotColor: 'blue',
            classes: [{ className: cls.lessonName, classTime: cls.time }]
          };
        }
      });

      setMarkedDates(dates);
    } catch (error) {
      console.error('Error fetching and marking classes:', error);
    }
  };

  const onDayPress = (day) => {
    setSelected(day.dateString);

    // Clear previous selection and mark the new selected date
    setMarkedDates((prevDates) => {
      const updatedDates = { ...prevDates };

      // Remove the 'selected' property from all dates
      Object.keys(updatedDates).forEach((date) => {
        if (updatedDates[date].selected) {
          delete updatedDates[date].selected;
          delete updatedDates[date].selectedColor;
        }
      });

      // Mark the new selected date
      updatedDates[day.dateString] = {
        ...updatedDates[day.dateString],
        selected: true,
        selectedColor: 'tomato',
      };

      return updatedDates;
    });

    // Update selectedClasses to include all classes for the selected date
    if (markedDates[day.dateString] && markedDates[day.dateString].classes) {
      setSelectedClasses(markedDates[day.dateString].classes);
    } else {
      setSelectedClasses([]); // No classes on this date
    }
  };

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      fetchClassesAndMarkDates(userId);
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.headingText}>Genius </Text>
          <Text style={styles.headingText}>Gym</Text>
          <Image source={require('../assets/Logo.png')} style={styles.logo} />
        </View>
        <Calendar
          onDayPress={onDayPress}
          markedDates={markedDates}
          theme={{
            todayTextColor: 'tomato',
            arrowColor: 'tomato',
          }}
        />
        {selected ? (
          <View style={styles.selectedDate}>
            <Text style={styles.text}>Selected Date: {selected}</Text>
            {selectedClasses.length > 0 ? (
              selectedClasses.map((cls, index) => (
                <View key={index} style={styles.classDetails}>
                  <Text style={styles.text}>Class: {cls.className}</Text>
                  <Text style={styles.text}>Time: {cls.classTime}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.text}>No classes registered for this date</Text>
            )}
          </View>
        ) : (
          <Text style={styles.text}>Please select a date</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  selectedDate: {
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  textContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headingText: {
    fontSize: 44,
    color: 'black',
    fontWeight: 'bold',
  },
  logo: {
    width: 120,
    height: 120,
    marginLeft: 10,
  },
  classDetails: {
    marginTop: 10,
  },
});

export default CalendarScreen;

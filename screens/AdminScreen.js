import React, { useEffect, useState } from 'react';
import { Image, View, Text, Button, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { addRecurringClasses } from '../services/firestore';
import { colors } from "../utils/colors";

const AdminScreen = () => {
  const [lessons, setLessons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLessons, setFilteredLessons] = useState([]);

  // Function to fetch and filter lessons from Firestore
  const fetchLessons = async () => {
    try {
      const lessonsCollection = collection(db, 'lessons');
      const lessonsSnapshot = await getDocs(lessonsCollection);
      const lessonsList = lessonsSnapshot.docs.map(doc => {
        const data = doc.data();
        const lessonDate = new Date(data.date);
        return {
          id: doc.id,
          ...data,
          lessonDate,
        };
      });
      
      const now = new Date();
      now.setHours(0, 0, 0, 0); // Set to start of the day

      // Filter out past trainings
      const futureLessons = lessonsList.filter(item => item.lessonDate >= now);

      // Sort the remaining classes by date
      futureLessons.sort((a, b) => a.lessonDate - b.lessonDate);

      setLessons(futureLessons);
      setFilteredLessons(futureLessons);
    } catch (error) {
      console.error("Error fetching lessons: ", error);
    }
  };

  // Function to handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = lessons.filter(item =>
      item.lessonName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredLessons(filtered);
  };

  // Function to delete a lesson from Firestore
  const deleteLesson = async (lessonId) => {
    console.log(`Attempting to delete lesson with ID: ${lessonId}`);
    try {
      const lessonRef = doc(db, 'lessons', lessonId);
      await deleteDoc(lessonRef);
      console.log(`Lesson with ID ${lessonId} deleted successfully.`);
      setLessons(prevLessons => prevLessons.filter(lesson => lesson.id !== lessonId));
      alert('Lesson successfully deleted!');
    } catch (error) {
      console.error("Error deleting lesson: ", error);
      alert('Failed to delete lesson.');
    }
  };

  // Function to handle adding recurring classes
  const handleAddClasses = async () => {
    try {
      console.log("Button clicked, adding classes...");
      await addRecurringClasses();
      fetchLessons(); // Refresh the lesson list after adding
    } catch (error) {
      console.log("Error adding classes:", error);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Genius </Text>
        <Text style={styles.headingText}>Gym</Text>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
      </View>
      <Text style={styles.heading}>Admin Screen</Text>
      <View style={styles.buttonContainer}>
        <Button title="Add Recurring Classes" onPress={handleAddClasses} />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a class..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredLessons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.lessonCard}>
            <Text style={styles.lessonName}>{item.lessonName}</Text>
            <Text style={styles.lessonInfo}>Date: {item.date}</Text>
            <Text style={styles.lessonInfo}>Time: {item.time}</Text>
            <Text style={styles.lessonInfo}>Spots Available: {item.spotsAvailable}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteLesson(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  lessonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 3,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#000000',
  },
  lessonName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lessonInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  deleteButton: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#Ff0000',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
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

export default AdminScreen;

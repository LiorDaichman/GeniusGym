import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, TextInput } from 'react-native';
import { collection, getDocs, updateDoc, doc, addDoc, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { colors } from '../utils/colors';
import { auth } from '../firebaseConfig'; 

const ClassListScreen = () => {
  const [classes, setClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);

  const fetchClasses = async () => {
    const classesCollection = collection(db, 'lessons');
    const classesSnapshot = await getDocs(classesCollection);
    const classList = classesSnapshot.docs.map(doc => {
      const data = doc.data();
      const classDate = new Date(data.date);
      console.log(`Class Date: ${classDate}`);  // Debugging log
  
      return {
        id: doc.id,
        ...data,
        classDate,
      };
    });
  
    const now = new Date();
    now.setHours(0, 0, 0, 0);  // Set to start of the day
    console.log(`Current Date: ${now}`);  // Debugging log
  
    // Filter out past trainings
    const futureClasses = classList.filter(item => item.classDate >= now);
  
    // Sort the remaining classes by date
    futureClasses.sort((a, b) => a.classDate - b.classDate);
  
    setClasses(futureClasses);
    setFilteredClasses(futureClasses);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = classes.filter(item =>
      item.lessonName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredClasses(filtered);
  };

  const registerForClass = async (classId, spotsAvailable) => {
    const userId = auth.currentUser.uid; 
    const registrationsRef = collection(db, 'registrations');
  
    const q = query(registrationsRef, where('userId', '==', userId), where('classId', '==', classId));
    const existingRegistrations = await getDocs(q);
  
    if (!existingRegistrations.empty) {
      alert('You are already registered for this class.');
      return;
    }
  
    if (spotsAvailable > 0) {
      const classRef = doc(db, 'lessons', classId);
      await updateDoc(classRef, {
        spotsAvailable: spotsAvailable - 1
      });
  
      await addDoc(registrationsRef, {
        userId: userId,
        classId: classId,
        registrationDate: new Date(),
      });
  
      fetchClasses(); 
      alert('Successfully registered!');
    } else {
      alert('No spots available for this class.');
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Genius</Text>
        <Text style={styles.headingText}> Gym</Text>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a class..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <Text style={styles.subheading}>Available Classes</Text>
      <FlatList
        data={filteredClasses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.classCard}>
            <Text style={styles.classTitle}>{item.lessonName}</Text>
            <Text style={styles.classInfo}>Date: {item.date}</Text>
            <Text style={styles.classInfo}>Time: {item.time}</Text>
            <Text style={styles.classInfo}>Spots Available: {item.spotsAvailable}</Text>
            <TouchableOpacity
              style={[styles.button, item.spotsAvailable > 0 ? styles.buttonActive : styles.buttonDisabled]}
              onPress={() => registerForClass(item.id, item.spotsAvailable)}
              disabled={item.spotsAvailable <= 0}
            >
              <Text style={styles.buttonText}>
                {item.spotsAvailable > 0 ? 'Register' : 'Full'}
              </Text>
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
    backgroundColor: colors.white,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headingText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.black,
  },
  logo: {
    width: 120,
    height: 120,
    marginLeft: 10,
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
  subheading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  classCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    elevation: 3,
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#000000',
  },
  classTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkBlue,
    marginBottom: 5,
  },
  classInfo: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.black,
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: colors.blue,
  },
  buttonDisabled: {
    backgroundColor: colors.gray,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#0000FF',
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

export default ClassListScreen;

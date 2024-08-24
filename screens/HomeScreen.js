import React, { useEffect, useState } from 'react';
import { logOut } from '../services/auth';
import { Image, StyleSheet, Text, TouchableOpacity, View, Linking, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { colors } from "../utils/colors";
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const HomeScreen = () => {
  const [userEmail, setUserEmail] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserEmail(user.email || 'User');
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  const goToProfile = () => {
    navigation.navigate('Profile');
  };

  const openWebsite = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.headingText}>Genius</Text>
          <Text style={styles.headingText}> Gym</Text>
          <Image source={require('../assets/Logo.png')} style={styles.logo} />
        </View>

        <Text style={styles.welcomeText}>Welcome, {userEmail}!</Text>

        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.buttonWrapper} onPress={goToProfile}>
            <Ionicons name="person" size={24} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Go to Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonWrapper} onPress={handleLogout}>
            <Ionicons name="log-out" size={24} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.quoteText}>
          ‘The last three or four reps is what makes the muscle grow. This area of pain divides a champion from someone who is not a champion.’ — Arnold Schwarzenegger, seven-time Mr. Olympia
        </Text>

        <Text style={styles.sectionHeader}>Websites about Fitness</Text>

        <View style={styles.cardsContainer}>
          <TouchableOpacity style={styles.card} onPress={() => openWebsite('https://www.bodybuilding.com')}>
            <Text style={styles.cardText}>Bodybuilding.com</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => openWebsite('https://www.muscleandfitness.com')}>
            <Text style={styles.cardText}>Muscle & Fitness</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => openWebsite('https://www.menshealth.com')}>
            <Text style={styles.cardText}>Men's Health</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeader}>About us :)</Text>

        <Text style={styles.aboutText}>
          At Genius Gym, we ensure that every workout counts. Our expert trainers and state-of-the-art facilities are designed to help you achieve your fitness goals in the most professional way.
        </Text>

        {/* Contact Info */}
        <View style={styles.contactContainer}>
          <Ionicons name="call" size={24} color={colors.primary} style={styles.icon} />
          <Text style={styles.contactText}>+1 234 567 890</Text>
        </View>

        <View style={styles.contactContainer}>
          <Ionicons name="mail" size={24} color={colors.primary} style={styles.icon} />
          <Text style={styles.contactText}>contact@geniusgym.com</Text>
        </View>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 31.252973,
              longitude: 34.791462,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{ latitude: 31.252973, longitude: 34.791462 }}
              title="Genius Gym"
              description="Basel 46, Beersheba, Israel"
            />
          </MapView>
        </View>
        <View style={styles.contactContainer}>
          <Ionicons name="earth-outline" size={24} color={colors.primary} style={styles.icon} />
          <Text style={styles.contactText}>Israel, Beersheba Basel 46 8428322</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
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
  welcomeText: {
    fontSize: 24,
    color: colors.primary,
    textAlign: 'center',
    marginVertical: 20,
  },
  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    textAlign: "center",
    padding: 5,
  },
  logo: {
    width: 120,
    height: 120,
    marginLeft: 10,
  },
  quoteText: {
    marginTop: 20,
    fontSize: 16,
    color: colors.primary,
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontSize: 20,
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  cardsContainer: {
    marginTop: 10,
  },
  card: {
    backgroundColor: '#ADD8E6',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    color: colors.black,
  },
  aboutText: {
    fontSize: 16,
    color: colors.black,
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  mapContainer: {
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  contactText: {
    fontSize: 16,
    color: colors.black,
    marginLeft: 10,
  },  
});

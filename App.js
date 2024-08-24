import React, { useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';

import HomeScreen from './screens/HomeScreen';
import FoodScreen from './screens/FoodScreen';
import ShopScreen from './screens/ShopScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import FitnessScreen from './screens/FitnessScreen';
import FitScreen from './screens/FitScreen';
import RestScreen from './screens/RestScreen';
import Datacalculation from './screens/Datacalculation';
import DeliveryScreen from './screens/DeliveryScreen';
import CalendarScreen from './screens/CalendarScreen';
import ClassListScreen from './screens/ClassListScreen';
import AdminScreen from './screens/AdminScreen';
import { FitnessContext } from './components/Context';
import { onAuthStateChange } from './services/auth';
import { db } from './firebaseConfig';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen options={{ headerShown: false }} name="HomeMain" component={HomeScreen} />
    <Stack.Screen options={{ headerShown: false }} name="Profile" component={MyProfileScreen} />
  </Stack.Navigator>
);

const WorkoutStack = () => (
  <Stack.Navigator>
    <Stack.Screen options={{ headerShown: false }} name="WorkoutScreenMain" component={WorkoutScreen} />
    <Stack.Screen options={{ headerShown: false }} name="FitnessScreenMain" component={FitnessScreen} />
    <Stack.Screen options={{ headerShown: false }} name="RestScreenMain" component={RestScreen} />
    <Stack.Screen options={{ headerShown: false }} name="FitScreenMain" component={FitScreen} />
  </Stack.Navigator>
);

const FoodStack = () => (
  <Stack.Navigator>
    <Stack.Screen options={{ headerShown: false }} name="FoodScreenMain" component={FoodScreen} />
    <Stack.Screen options={{ headerShown: false }} name="Datacalculationfood" component={Datacalculation} />
  </Stack.Navigator>
);

const ShopStack = () => (
  <Stack.Navigator>
    <Stack.Screen options={{ headerShown: false }} name="ShopScreenMain" component={ShopScreen} />
    <Stack.Screen options={{ headerShown: false }} name="DeliveryScreenMain" component={DeliveryScreen} />
  </Stack.Navigator>
);

const ClassesStack = () => (
  <Stack.Navigator>
    <Stack.Screen options={{ headerShown: false }} name="ClassList" component={ClassListScreen} />
  </Stack.Navigator>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (authUser) => {
      if (authUser) {
        setUser(authUser);

        // Fetch user type from Firestore
        const userDoc = await getDoc(doc(db, 'users', authUser.uid));
        if (userDoc.exists()) {
          setUserType(userDoc.data().type);
        }
      } else {
        setUser(null);
        setUserType(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      {user ? (
        <FitnessContext>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Workout') {
                  iconName = focused ? 'barbell' : 'barbell-outline';
                } else if (route.name === 'Classes') {
                  iconName = focused ? 'fitness' : 'fitness-outline';
                } else if (route.name === 'Food') {
                  iconName = focused ? 'restaurant' : 'restaurant-outline';
                } else if (route.name === 'Shop') {
                  iconName = focused ? 'cart' : 'cart-outline';
                } else if (route.name === 'Calendar') {
                  iconName = focused ? 'calendar' : 'calendar-outline';
                } else if (route.name === 'Trainer') {
                  iconName = focused ? 'person-outline' : 'person-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen options={{ headerShown: false }} name="Home" component={HomeStack} />
            <Tab.Screen options={{ headerShown: false }} name="Workout" component={WorkoutStack} />
            <Tab.Screen options={{ headerShown: false }} name="Classes" component={ClassesStack} />
            <Tab.Screen options={{ headerShown: false }} name="Food" component={FoodStack} />
            <Tab.Screen options={{ headerShown: false }} name="Shop" component={ShopStack} />
            <Tab.Screen options={{ headerShown: false }} name="Calendar" component={CalendarScreen} />

            {userType === 'admin' && (
              <Tab.Screen options={{ headerShown: false }} name="Trainer" component={AdminScreen} />
            )}
          </Tab.Navigator>
        </FitnessContext>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

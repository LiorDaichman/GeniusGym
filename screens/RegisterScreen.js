import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../utils/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { signUp } from '../services/auth';
import { addUser } from '../services/firestore';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await signUp(email, password);
      const user = userCredential.user;
      await addUser({ email: user.email, type: 'normal', uid: user.uid });
      // navigation.navigate('Home'); // Uncomment this line if you want to navigate on successful registration
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('This email is already in use. Please use a different email.');
      } else {
        setErrorMessage('Registration failed. Please check your details and try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Genius</Text>       
        <Text style={styles.headingText}>Gym</Text>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
      </View>      
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name={"mail-outline"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={colors.secondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={colors.secondary}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={30} color={colors.secondary} />
          </TouchableOpacity>
        </View>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text> // Display error message
        ) : null}
        <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleRegister}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}> Already have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.signupText} onPress={() => navigation.navigate('Login')}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
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
    color: colors.primary,
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginTop: 20,
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: colors.primary,
    fontSize: 18, 
  },
  signupText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 18, 
  },
  logo: {
    width: 120,
    height: 120,
    marginLeft: 10,
  },
});

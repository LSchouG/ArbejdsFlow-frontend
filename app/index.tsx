import { router } from "expo-router";
import { StyleSheet, View, ScrollView, Pressable, Text, Image, TextInput } from "react-native";
import Styles from "@/components/styles-web";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import Constants from "expo-constants";
import { useAuth } from "../providers/AuthProvider";
import { useRouter } from "expo-router";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export default function index() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = Styles(colorScheme);
  const { verify } = useAuth() || {};
  const router = useRouter();
  const [showLogin, setShowLogin] = React.useState(true);

  // State for user
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");

  function validateSignup() {
    if (!firstName.trim()) {
      return alert("Fornavn mangler");
    }
    if (!lastName.trim()) {
      return alert("Efternavn mangler");
    }
    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return alert("Ugyldig email");
    }
    // Password match
    if (password !== confirmPassword) {
      return alert("Passwords matcher ikke");
    }
    // Password strength
    var passwordValid = true;
    var alertmassage = "Password skal have følgende:\n";
    if (password.length < 8) {
      alertmassage += "Mindst 8 tegn\n";
      passwordValid = false;
    }
    if (!/[A-Z]/.test(password)) {
      alertmassage += "Mindst ét stort bogstav\n";
      passwordValid = false;
    }
    if (!/[0-9]/.test(password)) {
      alertmassage += "Mindst ét tal\n";
      passwordValid = false;
    }
    if (!passwordValid) {
      return alert(alertmassage);
    }

    // Phone number
    if (!phoneNumber.trim()) {
      return alert("Telefonnummer mangler");
    }
    if (!/^[0-9+\s-]+$/.test(phoneNumber)) {
      return alert("Ugyldigt telefonnummer");
    }
    // Address
    if (!address.trim()) {
      return alert("Adresse mangler");
    }

    // City
    if (!city.trim()) {
      return alert("By mangler");
    }

    // Postnummer
    if (!zipCode.trim()) {
      return alert("Postnummer mangler");
    }
    if (!/^[0-9]{4}$/.test(zipCode)) {
      return alert("Postnummer skal være 4 cifre");
    }

    return true;
  }
  function clearForm() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhoneNumber("");
    setAddress("");
    setCity("");
    setZipCode("");
  }
  async function handleSignup() {
    if (validateSignup()) {
      try {
        const response = await fetch(`${API_URL}register/kunder`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            address,
            city,
            zipCode,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          alert(data.error || "Something went wrong");
          return;
        }

        alert("User created successfully!");
        setShowLogin(true);
        clearForm();
      } catch (error) {
        if (error instanceof Error) {
          alert("Network error: " + error.message);
        } else {
          alert("Unknown error");
        }
      }
    }
  }

  async function handleLogin() {
    try {
      const response = await fetch(`${API_URL}login-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Forkert email eller adgangskode");
        return;
      }

      alert("Login successful!");
      clearForm();
      if (await verify()){
      router.replace("/dashboard");
      } else{
      router.replace("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert("Network error: " + error.message);
      } else {
        alert("Unknown error");
      }
    }
  }

  return (
    <ScrollView>
      <View style={[styles.row, styles.headingContainer]}>
        <Image source={require("@/assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
        <Text style={styles.headingText}>You are logged out, Need to Login on the website!</Text>
      </View>

      {showLogin && (
        <View style={styles.loginContainer}>
          <Text>Email: </Text>
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, padding: 10 }} placeholder="..." value={email} onChangeText={setEmail} />

          <Text>Password: </Text>
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, padding: 10 }} placeholder="..." value={password} onChangeText={setPassword} />

          <Pressable style={styles.button} onPress={() => handleLogin()}>
            <Text style={styles.buttonText}>Login on web</Text>
          </Pressable>

          <Text style={{ marginTop: 10, marginBottom: -10 }}>Opret ny bruger: </Text>
          <Pressable style={styles.button} onPress={() => setShowLogin(false)}>
            <Text style={styles.buttonText}>Opret bruger</Text>
          </Pressable>
        </View>
      )}
      {!showLogin && (
        <View style={styles.loginContainer}>
          <Text>Fornavn: </Text>
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, padding: 10 }} placeholder="..." value={firstName} onChangeText={setFirstName} />

          <Text>Efternavn: </Text>
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, padding: 10 }} placeholder="..." value={lastName} onChangeText={setLastName} />

          <Text>Email: </Text>
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, padding: 10 }} placeholder="..." value={email} onChangeText={setEmail} />

          <Text>Password: </Text>
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, padding: 10 }} placeholder="..." value={password} onChangeText={setPassword} />

          <Text>Confirm Password: </Text>
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, padding: 10 }} placeholder="..." value={confirmPassword} onChangeText={setConfirmPassword} />

          <Text>Telefonnummer: </Text>
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, padding: 10 }} placeholder="..." value={phoneNumber} onChangeText={setPhoneNumber} />

          <Text>Adresse: </Text>
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, padding: 10 }} placeholder="..." value={address} onChangeText={setAddress} />

          <Text>By:</Text>
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, padding: 10 }} placeholder="..." value={city} onChangeText={setCity} />

          <Text>Postnummer:</Text>
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, padding: 10 }} placeholder="..." value={zipCode} onChangeText={setZipCode} />

          <Pressable style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Opret bruger</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => setShowLogin(true)}>
            <Text style={styles.buttonText}>Back</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

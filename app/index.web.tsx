import { router } from "expo-router";
import { StyleSheet, View, ScrollView, Pressable, Text, Image, TextInput } from "react-native";
import Styles from "@/components/styles-web";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";

const API_URL = process.env.EXPO_PUBLIC_API_URL;


export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = Styles(colorScheme);

  const [showLogin, setShowLogin] = React.useState(true);

  // State for user
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");

  function handleLogin() {
    // Implement login logic here
  }

  async function handleSignup() {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          phone,
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
      router.replace("/private/Dashboard");
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
      <View style={[styles.row, styles.headingContainer ]}>
        <Image source={require("@/assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
        <Text style={styles.headingText}>You are logged out, Need to Login on the website!</Text>
      </View>

      {showLogin && (
        <View style={styles.loginContainer}>
          <Text>Bruger navn: </Text>
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, padding: 10 }} placeholder="..." value={username} onChangeText={setUsername} />

          <Text>Password: </Text>
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, padding: 10 }} placeholder="..." value={password} onChangeText={setPassword} />

          <Pressable style={styles.button} onPress={() => router.replace("/private/Dashboard")}>
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
          <Text>Bruger navn: </Text>
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, padding: 10 }} placeholder="..." value={username} onChangeText={setUsername} />

          <Text>Email: </Text>
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, padding: 10 }} placeholder="..." value={email} onChangeText={setEmail} />

          <Text>Telefonnummer: </Text>
          <TextInput style={{ height: 40, borderColor: "gray", borderWidth: 1, padding: 10 }} placeholder="..." value={phone} onChangeText={setPhone} />

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

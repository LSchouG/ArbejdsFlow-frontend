import { Pressable, Text, View } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Styles from '@/components/styles-app';
import { router } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { useEffect } from "react";

export default function MenuWeb() {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = Styles(colorScheme);

  const { user, loading } = useAuth();

  if (loading) {
    return null; // or a loading spinner
  }

  useEffect(() => {
    console.log("User role in MenuWeb:", user?.role);
    console.log("User object in MenuWeb:", user);
  }, []);



  return (
    <View style={[styles.row]}>

      <Pressable style={styles.button} onPress={() => router.push('/dashboard')}>
        <Text style={styles.buttonText}>Dashboard</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push('/projects')}>
        <Text style={styles.buttonText}>Projects</Text>
      </Pressable>

      {/* ADMIN or EMPLOYEE */}
      {(user?.role === "ROLE_ADMIN" || user?.role === "ROLE_EMPLOYEE") && (
        <Pressable style={styles.button} onPress={() => router.push('/kunder')}>
          <Text style={styles.buttonText}>Kunder</Text>
        </Pressable>
      )}

      {/* CUSTOMER only */}
      {user?.role === "ROLE_CUSTOMER" && (
        <Pressable style={styles.button} onPress={() => router.push('/kontakt')}>
          <Text style={styles.buttonText}>Kontakt</Text>
        </Pressable>
      )}

      <Pressable style={styles.button} onPress={() => router.push('/opgaver')}>
        <Text style={styles.buttonText}>Opgaver</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push('/kalender')}>
        <Text style={styles.buttonText}>Kalender</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push('/indstillinger')}>
        <Text style={styles.buttonText}>Indstillinger</Text>
      </Pressable>

    </View>
  );
}

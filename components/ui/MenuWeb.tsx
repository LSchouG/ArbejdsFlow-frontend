import { Pressable, Text, View } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Styles from '@/components/styles';
import { router } from 'expo-router';

export default function MenuWeb() {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = Styles(colorScheme);

  return (
    <View style={[styles.row]}>
      <Pressable style={styles.button} onPress={() => router.push('/private/Dashboard')}>
        <Text style={styles.buttonText}>Dashboard</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push('/private/Projects')}>
        <Text style={styles.buttonText}>Projects</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push('/private/Kunder')}>
        <Text style={styles.buttonText}>Kunder</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push('/private/Opgaver')}>
        <Text style={styles.buttonText}>Opgaver</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push('/private/Kalender')}>
        <Text style={styles.buttonText}>Kalender</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push('/private/Indstillinger')}>
        <Text style={styles.buttonText}>Indstillinger</Text>
      </Pressable>
    </View>
  );
}

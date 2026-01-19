import { router } from 'expo-router';
import { StyleSheet, View, ScrollView, Pressable, Text, Image } from 'react-native';
import Styles from '@/components/styles';
import { useColorScheme } from '@/hooks/use-color-scheme';


export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = Styles(colorScheme);

  return (
    <ScrollView>
            <View style={[styles.row, styles.headingContainer]}>
              <Image
                source={require('@/assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.headingText}>
                You are logged out, Need to Login!
              </Text>
            </View>
      <View style={{ alignSelf: 'center' }}>
        <Pressable style={styles.button} onPress={() => router.replace('/private/Dashboard')}>
         <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
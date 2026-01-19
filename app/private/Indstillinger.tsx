import { Image, Pressable, Text } from 'react-native';
import { ScrollView, View } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Styles from '@/components/styles';
import { router } from 'expo-router';
import MenuWeb from '@/components/ui/MenuWeb';



export default function Indstillinger() {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = Styles(colorScheme);

  return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={[styles.row, styles.headingContainer]}>
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.headingText}>
              Welcome To Indstillinger on web. you are Logged in now!
            </Text>
          </View>
          <MenuWeb />

      <View style={styles.sectionDashBoard}>
        <Text>Indstillinger </Text>
      </View>
        </ScrollView>
  );
}
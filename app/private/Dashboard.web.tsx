import { Image, Pressable, Text } from "react-native";
import { ScrollView, View } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Styles from "@/components/styles";
import { router } from "expo-router";
import MenuWeb from "@/components/ui/MenuWeb";

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const styles = Styles(colorScheme);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.row, styles.headingContainer]}>
        <Image source={require("@/assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
        <Text style={styles.headingText}>Welcome To Home on web. you are Logged in now!</Text>
      </View>
      <MenuWeb />

      <View style={styles.row}>
        <View style={styles.sectionDashBoard}>
          <Text>Dagens opgaver</Text>
        </View>
        <View style={styles.sectionDashBoard}>
          <Text>Aktive projekter</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.sectionDashBoard}>
          <Text>Seneste kunder / kontakter</Text>
        </View>
        <View style={styles.sectionDashBoard}>
          <Text>Timer / tidsregistrering</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.sectionDashBoard}>
          <Text>Notifikationer / påmindelser</Text>
        </View>
        <View style={styles.sectionDashBoard}>
          <Text>Hurtige genveje
Knapper som:

“Opret opgave”

“Opret projekt”

“Tilføj kunde”

“Start timer”</Text>
        </View>
      </View>
    </ScrollView>
  );
}

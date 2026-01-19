import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '@/constants/theme';

const Styles = (colorScheme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: Colors[colorScheme].background,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    logo: {
      width: 120,
      height: 60,
    },
    headingText: {
      fontSize: 18,
      color: Colors[colorScheme].headingText,
      fontFamily: Fonts.sans,
    },
    headingContainer: {
      backgroundColor: 'black',
      width: '100%',
    },
button: {
  width: '17%',
  marginTop: 20,
  padding: 10,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: Colors[colorScheme].headingText,
  borderRadius: 5,
},

buttonText: {
  color: Colors[colorScheme].background,
  fontSize: 16,
  fontWeight: '600',
},
sectionDashBoard: {
  marginTop: 20,
  width: 300,
  height: 300,
  borderRadius: 2,
  borderColor: 'black' ,
  borderWidth: 1,
  padding: 15,
},

  });

export default Styles;

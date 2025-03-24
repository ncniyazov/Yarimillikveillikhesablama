import { Button, Text } from '@react-navigation/elements';
import { View, TouchableOpacity, Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
// import AppMetrica from '@appmetrica/react-native-analytics';

import FooterComp from "../components/FooterComp";
import MenuButton from "../components/ButtonComp";
import YarimillikSecim from "../screens/YarimillikSecim";
 

// AppMetrica.activate({
//   apiKey: '911f98cd-0ed4-4059-a2dd-54fb064944ed',
//   sessionTimeout: 120,
//   logs: true
// });

export default function Home() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.top}>
      <View style={styles.header}>
        <Image source={require('./../../../assets/main-logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>YARIMİLLİK VƏ İLLİK HESABLAMA</Text>
      </View>
    </View>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate('YarimillikSecim')}>
        <MenuButton
          imageSource={require('./../../assets/icons/semestr.png')}
          text="YARIMİLLİK QİYMƏTLƏNDİRMƏ"
          /></Pressable>
        <MenuButton
          imageSource={require('./../../assets/icons/calendar.png')}
          text="İLLİK QİYMƏTLƏNDİRMƏ"
        />
        <MenuButton
          imageSource={require('./../../assets/icons/questions.png')}
          text="SUAL SAYINA GÖRƏ BAL"
        />
        <MenuButton
          imageSource={require('./../../assets/icons/percent.png')}
          text="KEYFİYYƏT VƏ MÜVƏFFƏQİYYƏT FAİZİ"
        />
      </View>
      {/* AppMetrica.reportEvent('Home'); */}
      <FooterComp />
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  top: {
    width: '94%',
    marginHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    shadowColor: 'rgba(182, 182, 182, 0.322)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  header: {
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    textAlign: 'center',
    marginTop: 30,
  },
  logo: {
    // width: '50%',
    height: 100,
    maxWidth: 200,
    resizeMode: 'contain',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#114a69',
    textAlign: 'center',
    fontFamily: 'Calibri',
    marginTop: 10,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  container: {
    width: '94%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 5,
    marginTop: 60,
    marginHorizontal: '3%',
  },
  button: {
    width: '48%',
    height: 115,
    borderWidth: 0,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b4ded7',
    borderRadius: 5,
    paddingTop: 15,
    paddingHorizontal: 10,
    shadowColor: 'rgba(161, 160, 160, 1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 3,
  },
  buttonActive: {
    backgroundColor: '#8fcdc4',
  },
  icon: {
    position: 'absolute',
    top: 15,
    width: 20,
    height: 20,
    borderRadius: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#363636',
    textAlign: 'center',
    fontFamily: 'Calibri',
  },
});

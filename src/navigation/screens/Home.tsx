import React, { useState } from 'react';
import { View, Pressable, Image, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MenuButton from "../components/ButtonComp";
import Footer from "../components/FooterComp";
import {YarimillikSecim} from "../screens/YarimillikSecim";
import { IllikHesabla } from "./IllikHesabla/IllikHesabla";
import { RootStackNavigationProp } from '../types';


const HomeMenu = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [pressed, setPressed] = useState(false);

  const navigateToYarimillikSecim = () => {
    navigation.navigate('YarimillikSecim');
  };

  const navigateToIllikHesabla = () => {
    navigation.navigate('IllikHesabla');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={homeMenuStyles.top}>
        <View style={homeMenuStyles.header}>
          <Image source={require('../../assets/icons/logo.png')} style={homeMenuStyles.logo} />
          <Text style={homeMenuStyles.headerText}>YARIMİLLİK VƏ İLLİK HESABLAMA</Text>
        </View>
      </View>
      <View style={homeMenuStyles.container}>
        <TouchableOpacity
          style={[styles.button, pressed && styles.buttonActive]}
          activeOpacity={0.8}
          onPress={navigateToYarimillikSecim}
        >
          <Image source={require('../../assets/icons/semestr.png')} style={homeMenuStyles.cardImage} />
          <Text style={homeMenuStyles.cardTitle}>YARIMİLLİK QİYMƏTLƏNDİRMƏ</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, pressed && styles.buttonActive]}
          activeOpacity={0.8}
          onPress={navigateToIllikHesabla}
        >
          <Image source={require('../../assets/icons/calendar.png')} style={homeMenuStyles.cardImage} />
          <Text style={homeMenuStyles.cardTitle}>İLLİK QİYMƏTLƏNDİRMƏ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, pressed && styles.buttonActive]}
          activeOpacity={0.8}
          onPress={navigateToIllikHesabla}
        >
          <Image source={require('../../assets/icons/questions.png')} style={homeMenuStyles.cardImage} />
          <Text style={homeMenuStyles.cardTitle}>SUAL SAYINA GÖRƏ BAL</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, pressed && styles.buttonActive]}
          activeOpacity={0.8}
          onPress={navigateToIllikHesabla}
        >
          <Image source={require('../../assets/icons/percent.png')} style={homeMenuStyles.cardImage} />
          <Text style={homeMenuStyles.cardTitle}>KEYFİYYƏT VƏ MÜVƏFFƏQİYYƏT FAİZİ</Text>
        </TouchableOpacity>
        
      </View>

      <Footer />

    </SafeAreaView>
  );
};

const homeMenuStyles = StyleSheet.create({
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
  card: {
    width: '48%',
    height: 115,
    borderWidth: 0,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingTop: 15,
    paddingHorizontal: 10,
    shadowColor: 'rgba(161, 160, 160, 1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 3,
  },
  cardImage: {
    position: 'absolute',
    top: 15,
    width: 20,
    height: 20,
    borderRadius: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#363636',
    textAlign: 'center',
    fontFamily: 'Calibri',
  },
  yarimillikCard: {
    backgroundColor: '#e7f4f2',
  },
  illikCard: {
    backgroundColor: '#f2e7e7',
  },
});

const styles = StyleSheet.create({
    button: {
        width: '48%',
        height: 115,
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
        fontFamily: 'Arial', // Calibri əvəzinə
    },
});

export default HomeMenu;

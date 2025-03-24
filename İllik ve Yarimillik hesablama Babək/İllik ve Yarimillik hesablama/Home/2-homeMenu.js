import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const HomeMenu = () => {
  return (
    <View style={homeMenuStyles.container}>
      <MenuButton imageSource={require('./icons/semestr.png')} text="YARIMİLLİK QİYMƏTLƏNDİRMƏ" />
      <MenuButton imageSource={require('./icons/calendar.png')} text="İLLİK QİYMƏTLƏNDİRMƏ" />
      <MenuButton imageSource={require('./icons/questions.png')} text="SUAL SAYINA GÖRƏ BAL" />
      <MenuButton imageSource={require('./icons/percent.png')} text="KEYFİYYƏT VƏ MÜVƏFFƏQİYYƏT FAİZİ" />
    </View>
  );
};

const MenuButton = ({ imageSource, text }) => {
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      style={[homeMenuStyles.button, pressed && homeMenuStyles.buttonActive]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setTimeout(() => setPressed(false), 100)}
      activeOpacity={1} 
    >
      <Image source={imageSource} style={homeMenuStyles.icon} />
      <Text style={homeMenuStyles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const homeMenuStyles = StyleSheet.create({
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

export default HomeMenu;

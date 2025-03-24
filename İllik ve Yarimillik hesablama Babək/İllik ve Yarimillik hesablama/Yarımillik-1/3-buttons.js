import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ButtonComponent() {
  const [pressedNext, setPressedNext] = useState(false);
  const [pressedBack, setPressedBack] = useState(false);

  return (
    <View style={buttonStyles.buttons}>
      <TouchableOpacity
        style={[buttonStyles.button, buttonStyles.back, pressedBack && buttonStyles.backPressed]}
        onPressIn={() => setPressedBack(true)}
        onPressOut={() => setPressedBack(false)}
        activeOpacity={1} // Opacity değişimini engelliyoruz
      >
        <Text style={[buttonStyles.buttonText, buttonStyles.backText, buttonStyles.calibriFont]}>GERİ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[buttonStyles.button, buttonStyles.next, pressedNext && buttonStyles.nextPressed]}
        onPressIn={() => setPressedNext(true)}
        onPressOut={() => setPressedNext(false)}
        activeOpacity={1} // Opacity değişimini engelliyoruz
      >
        <Text style={[buttonStyles.buttonText, buttonStyles.nextText, buttonStyles.calibriFont]}>İRƏLİ</Text>
      </TouchableOpacity>
    </View>
  );
}

const buttonStyles = StyleSheet.create({
  buttons: {
    width: '94%',
    marginHorizontal: '3%',
    marginTop: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: 'rgba(161, 160, 160, 0.5)', // Android için 'elevation' kullanılabilir
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  next: {
    backgroundColor: 'rgb(6, 151, 144)',
    borderColor: 'transparent',
  },
  back: {
    backgroundColor: 'white',
    borderColor: 'rgb(6, 151, 144)',
    borderWidth: 2,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  nextText: {
    color: 'white', // "İRƏLİ" butonunun metni beyaz
  },
  backText: {
    color: '#363636', // "GERİ" butonunun metni koyu gri
  },
  nextPressed: {
    backgroundColor: 'rgb(5, 140, 132)', // "İRƏLİ" butonunun koyulaşmış rengi
  },
  backPressed: {
    backgroundColor: '#e0e0e0', // "GERİ" butonunun koyulaşmış rengi
  },
  calibriFont: {
    fontFamily: 'Calibri', // Calibri fontu
  },
});

import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function Buttons() {
  const [pressedButton, setPressedButton] = useState(null); // Hangi butona tıklandığını kontrol etmek için state

  return (
    <View style={buttonStyles.buttons}>
      <Pressable
        style={[buttonStyles.button, buttonStyles.back, pressedButton === 'back' && buttonStyles.backPressed]}
        onPressIn={() => setPressedButton('back')}
        onPressOut={() => setPressedButton(null)}
      >
        <Text style={[buttonStyles.buttonText, buttonStyles.backText]}>GERİ</Text>
      </Pressable>

      <View style={buttonStyles.buttonContainer}>
        <Pressable
          style={[buttonStyles.button, buttonStyles.reset, pressedButton === 'reset' && buttonStyles.resetPressed]}
          onPressIn={() => setPressedButton('reset')}
          onPressOut={() => setPressedButton(null)}
        >
          <Text style={[buttonStyles.buttonText, buttonStyles.resetText]}>SIFIRLA</Text>
        </Pressable>

        <Pressable
          style={[buttonStyles.button, buttonStyles.next, pressedButton === 'next' && buttonStyles.nextPressed]}
          onPressIn={() => setPressedButton('next')}
          onPressOut={() => setPressedButton(null)}
        >
          <Text style={[buttonStyles.buttonText, buttonStyles.nextText]}>HESABLA</Text>
        </Pressable>
      </View>
    </View>
  );
}

const buttonStyles = StyleSheet.create({
  buttons: {
    width: '94%',
    marginHorizontal: '3%',
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 90,
    height: 40,
    fontWeight: 'bold',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 10,
    elevation: 2, // Android için gölge efekti
    shadowColor: '#a1a0a0', // iOS için gölge rengi
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Calibri', // Fontu Calibri olarak ayarladık
  },
  next: {
    backgroundColor: 'rgb(6, 151, 144)', 
    borderWidth: 0,
  },
  nextText: {
    color: '#fff', // Beyaz metin rengi
  },
  back: {
    backgroundColor: '#e7f4f2',
    borderWidth: 2,
    borderColor: 'rgb(6, 151, 144)',
  },
  backText: {
    color: '#494949', // Koyu gri metin rengi
  },
  reset: {
    backgroundColor: 'rgb(190, 22, 16)',
    borderWidth: 0,
  },
  resetText: {
    color: '#fff', // Beyaz metin rengi
  },
  // Butonların tıklandığında koyulaşmasını sağlayacak stiller
  nextPressed: {
    backgroundColor: 'rgb(5, 140, 132)', // "HESABLA" butonunun koyulaşmış rengi
  },
  backPressed: {
    backgroundColor: '#d0e9e7', // "GERİ" butonunun koyulaşmış rengi
  },
  resetPressed: {
    backgroundColor: 'rgb(170, 15, 10)', // "SIFIRLA" butonunun koyulaşmış rengi
  },
});

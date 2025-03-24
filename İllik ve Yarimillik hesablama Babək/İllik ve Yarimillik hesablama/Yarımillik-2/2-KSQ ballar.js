import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function CalcArea() {
  const [focus, setFocus] = useState(null); // Focus durumunu takip etmek için state

  return (
    <View style={calcStyles.container}>
      <TextInput
        style={[calcStyles.input, focus === 'KSQ1' && calcStyles.inputFocus]}
        placeholder="KSQ1"
        autoFocus={true}
        onFocus={() => setFocus('KSQ1')}
        onBlur={() => setFocus(null)}
      />
      <TextInput
        style={[calcStyles.input, focus === 'KSQ2' && calcStyles.inputFocus]}
        placeholder="KSQ2"
        onFocus={() => setFocus('KSQ2')}
        onBlur={() => setFocus(null)}
      />
      <TextInput
        style={[calcStyles.input, focus === 'KSQ3' && calcStyles.inputFocus]}
        placeholder="KSQ3"
        onFocus={() => setFocus('KSQ3')}
        onBlur={() => setFocus(null)}
      />
      <TextInput
        style={[calcStyles.input, focus === 'KSQ4' && calcStyles.inputFocus]}
        placeholder="KSQ4"
        onFocus={() => setFocus('KSQ4')}
        onBlur={() => setFocus(null)}
      />
      <TextInput
        style={[calcStyles.input, focus === 'KSQ5' && calcStyles.inputFocus]}
        placeholder="KSQ5"
        onFocus={() => setFocus('KSQ5')}
        onBlur={() => setFocus(null)}
      />
      <TextInput
        style={[calcStyles.input, focus === 'KSQ6' && calcStyles.inputFocus]}
        placeholder="KSQ6"
        onFocus={() => setFocus('KSQ6')}
        onBlur={() => setFocus(null)}
      />
      <TextInput
        style={[calcStyles.input, focus === 'BSQ' && calcStyles.inputFocus]}
        placeholder="BSQ"
        onFocus={() => setFocus('BSQ')}
        onBlur={() => setFocus(null)}
      />
    </View>
  );
}

const calcStyles = StyleSheet.create({
  container: {
    width: '94%',
    marginHorizontal: '3%',
    marginVertical: 40,
    flexDirection: 'row', // Aynı satırda dizilmesini sağlar
    justifyContent: 'space-between', // Aralarındaki boşluğu eşit şekilde dağıtır
  },
  input: {
    flex: 1,  
    height: 50,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#5a94b5', 
    borderRadius: 5,
    backgroundColor: '#e7f4f2',
    marginBottom: 3, // Aralarındaki boşluk
    marginRight: 1, // Aralarındaki boşluk 1px
    minWidth: 40, // Minimum genişlik belirledik, taşmasını engellemek için
    fontFamily: 'Calibri', // Fontu Calibri olarak ayarladık
    color: '#494949', // Metin rengini CSS'teki gibi ayarladık
  },
  // Focus durumunda outline rengi ayarlandı
  inputFocus: {
    borderColor: '#5a94b5', 
    borderWidth: 2, 
  },
});

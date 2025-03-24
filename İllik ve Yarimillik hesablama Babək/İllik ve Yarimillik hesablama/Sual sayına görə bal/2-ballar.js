import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function YearScore() {
  const [focusedInput, setFocusedInput] = useState(null); // Hangi input'un odaklandığını takip etmek için

  return (
    <View style={quesCount.container}>
      <View style={quesCount.inputRow}>
        <Text style={quesCount.label}>Ümumi sual sayı:</Text>
        <TextInput
          style={[
            quesCount.input,
            focusedInput === 'input1' && quesCount.focusedInput,
          ]}
          onFocus={() => setFocusedInput('input1')}
          onBlur={() => setFocusedInput(null)}
        />
        <Text style={[quesCount.label, quesCount.secondLabel]}>Düzgün cavab sayı:</Text>
        <TextInput
          style={[
            quesCount.input,
            focusedInput === 'input2' && quesCount.focusedInput,
          ]}
          onFocus={() => setFocusedInput('input2')}
          onBlur={() => setFocusedInput(null)}
        />
      </View>
    </View>
  );
}

const quesCount = StyleSheet.create({
  container: {
    width: '94%',
    marginHorizontal: '3%',
    marginTop: 80,
    marginBottom: 40,
  },
  inputRow: {
    flexDirection: 'row', // Etiket ve input'ları aynı satıra yerleştiriyoruz
    alignItems: 'center', // Dikey hizalama
    marginBottom: 20, // Etiket ve input arasındaki boşluk
    justifyContent: 'space-between', // Etiketler arasındaki boşluğu dengeleme
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#363636',
    marginRight: 10, // Etiket ve input arasına boşluk
    fontFamily: 'Calibri', // Calibri fontu
  },
  secondLabel: {
    marginLeft: 5, // "2-ci yarımil balı"na sol margin ekliyoruz
  },
  input: {
    width: 50, // Genişlik 50px
    height: 50, // Yükseklik 50px
    borderWidth: 1,
    borderColor: '#5a94b5',
    borderRadius: 5,
    backgroundColor: '#e7f4f2',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Calibri', // Calibri fontu
  },
  focusedInput: {
    outlineWidth: 2, // Outline efekti
    outlineColor: '#5a94b5',
    borderRadius: 5,
  },
});

import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, Pressable, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { validateInput, calculateGrade } from '../../../utils/gradeCalculator';

export function IllikHesabla() {
  // State for the two semester scores
  const [semester1, setSemester1] = useState<string>('');
  const [semester2, setSemester2] = useState<string>('');

  const [focus, setFocus] = useState<string | null>(null);
  const [pressedButton, setPressedButton] = useState<string | null>(null);
  const [calculationResult, setCalculationResult] = useState({
    totalScore: 0,
    grade: 2
  });

  // Create refs for TextInput components
  const semester1Ref = useRef<TextInput>(null);
  const semester2Ref = useRef<TextInput>(null);

  const navigation = useNavigation();

  // Handle input validation for semester scores
  const handleSemesterInput = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const validatedValue = validateInput(value);

    // Check if the value is greater than 100
    if (validatedValue && Number(validatedValue) > 100) {
      Alert.alert('Xəta', 'Bal 100-dən yüksək ola bilməz!');
      // Set the value to empty
      setter('');
      return;
    }

    setter(validatedValue);
  };

  // Calculate yearly score (average of two semesters)
  const calculateYearlyScore = () => {
    // Convert string values to numbers
    const semester1Value = semester1 ? Number(semester1) : undefined;
    const semester2Value = semester2 ? Number(semester2) : undefined;

    // Check if any fields are empty
    if (semester1Value === undefined || semester2Value === undefined) {
      Alert.alert('Xəta', 'Bütün xanaları doldurun!');
      return;
    }

    // Check if any value is over 100
    if (semester1Value > 100 || semester2Value > 100) {
      Alert.alert('Xəta', 'Semester balı 100-dən çox ola bilməz!');
      return;
    }

    // Calculate the average of the two semester scores
    const yearlyAverage = (semester1Value + semester2Value) / 2;

    // Calculate the grade based on the yearly average
    const grade = calculateGrade(yearlyAverage);

    // Update the calculation result
    setCalculationResult({
      totalScore: parseFloat(yearlyAverage.toFixed(1)),
      grade
    });
  };

  // Reset all values
  const resetValues = () => {
    setSemester1('');
    setSemester2('');
    setCalculationResult({
      totalScore: 0,
      grade: 2
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={calcStyles.container}>
        <View style={yearScoreStyles.inputRow}>

          <Text style={yearScoreStyles.label}>1-ci yarımil balı:</Text>
          <TextInput
            ref={semester1Ref}
            style={[calcStyles.input, focus === 'Semester1' && calcStyles.inputFocus]}
            keyboardType="numeric"
            value={semester1}
            onChangeText={(text) => handleSemesterInput(text, setSemester1)}
            autoFocus={true}
            onFocus={() => setFocus('Semester1')}
            onBlur={() => setFocus(null)}
            returnKeyType="next"
            onSubmitEditing={() => semester2Ref.current?.focus()}
          />

          <Text style={yearScoreStyles.label}>2-ci yarımil balı:</Text>
          <TextInput
            ref={semester2Ref}
            style={[calcStyles.input, focus === 'Semester2' && calcStyles.inputFocus]}
            keyboardType="numeric"
            value={semester2}
            onChangeText={(text) => handleSemesterInput(text, setSemester2)}
            onFocus={() => setFocus('Semester2')}
            onBlur={() => setFocus(null)}
            returnKeyType="done"
          />

        </View>
      </View>

      <View style={resultStyles.result}>
        <View style={resultStyles.names}>
          <Text style={resultStyles.nameText}>İllik bal:</Text>
          <Text style={resultStyles.nameText}>İllik qiymət:</Text>
        </View>
        <View style={resultStyles.scores}>
          <Text style={resultStyles.scoreText}>{calculationResult.totalScore}</Text>
          <Text style={resultStyles.scoreText}>{calculationResult.grade}</Text>
        </View>
      </View>

      <View style={buttonStyles.buttons}>
        <View style={buttonStyles.buttonContainer}>
          <Pressable
            style={[buttonStyles.button, buttonStyles.next, pressedButton === 'next' && buttonStyles.nextPressed]}
            onPressIn={() => setPressedButton('next')}
            onPressOut={() => setPressedButton(null)}
            onPress={calculateYearlyScore}
          >
            <Text style={[buttonStyles.buttonText, buttonStyles.nextText]}>HESABLA</Text>
          </Pressable>

          <Pressable
            style={[buttonStyles.button, buttonStyles.reset, pressedButton === 'reset' && buttonStyles.resetPressed]}
            onPressIn={() => setPressedButton('reset')}
            onPressOut={() => setPressedButton(null)}
            onPress={resetValues}
          >
            <Image
              source={require('../../../../assets/icons/reset.png')}
              style={buttonStyles.resetIcon}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const calcStyles = StyleSheet.create({
  container: {
    width: '94%',
    marginHorizontal: '3%',
    marginVertical: 40,
    flexDirection: 'row',
  },
  input: {
    width: '100%',
    height: 50,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#5a94b5',
    borderRadius: 5,
    backgroundColor: '#e7f4f2',
    marginTop: 5,
    fontFamily: 'Calibri',
    color: '#494949',
  },
  inputFocus: {
    borderColor: '#5a94b5',
    borderWidth: 2,
  },
});

const resultStyles = StyleSheet.create({
  result: {
    width: 200,
    marginHorizontal: 'auto',
    backgroundColor: '#f7f7f7',
    borderRadius: 5,
    flexDirection: 'row',
    padding: 10,
    fontWeight: 'bold',
    shadowColor: 'rgba(182, 182, 182, 0.733)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
    marginVertical: 10,
  },
  names: {
    width: '80%',
    height: '100%',
  },
  scores: {
    width: '20%',
    height: '100%',
    color: 'rgb(182, 14, 14)',
  },
  nameText: {
    fontSize: 16,
    color: '#363636',
    fontWeight: 'bold',
    marginBottom: 1,
    lineHeight: 20,
    fontFamily: 'Calibri',
  },
  scoreText: {
    fontSize: 16,
    color: 'rgb(182, 14, 14)',
    fontWeight: 'bold',
    marginBottom: 1,
    lineHeight: 20,
    fontFamily: 'Calibri',
  },
});

const buttonStyles = StyleSheet.create({
  buttons: {
    width: '94%',
    marginHorizontal: '3%',
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    elevation: 2,
    shadowColor: '#a1a0a0',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Calibri',
  },
  next: {
    backgroundColor: 'rgb(6, 151, 144)',
    borderWidth: 0,
    width: 175,
    height: 45,
  },
  nextText: {
    color: '#fff',
  },
  reset: {
    backgroundColor: 'rgb(190, 22, 16)',
    borderWidth: 0,
    width: 45,
    height: 45,
  },
  resetIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  resetText: {
    color: '#fff',
  },
  nextPressed: {
    backgroundColor: 'rgb(5, 140, 132)',
  },
  resetPressed: {
    backgroundColor: 'rgb(170, 15, 10)',
  },
});


const yearScoreStyles = StyleSheet.create({
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
    borderWidth: 2, // Outline efekti
    borderColor: '#5a94b5',
    borderRadius: 5,
  },
});


import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, Pressable, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { validateInput, calculateGrade } from '../../../utils/gradeCalculator';

export function KVMF() {
  // State for the two Score scores
  const [studentcount, setStudentcount] = useState<string>('');
  const [marktwocount, setMarktwocount] = useState<string>('');
  const [markfourandfivecount, setMarkfourandfivecount] = useState<string>('');

  const [focus, setFocus] = useState<string | null>(null);
  const [pressedButton, setPressedButton] = useState<string | null>(null);
  const [calculationResult, setCalculationResult] = useState({
    kfScore: 0,
    mfScore: 0
  });

  // Create refs for TextInput components
  const studentcountRef = useRef<TextInput>(null);
  const marktwocountRef = useRef<TextInput>(null);
  const markfourandfivecountRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  // Handle input validation for Score scores
  const handleScoreInput = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const validatedValue = validateInput(value);

    // Check if the value is greater than 100
    if (validatedValue && Number(validatedValue) > 1000000) {
      Alert.alert('DİQQƏT!', 'Şagird sayının düzgünlüyündən əmin olun!');
      // Set the value to empty
      setter('');
      return;
    }

    setter(validatedValue);
  };

  // Calculate yearly score (average of two Scores)
  const calculateYearlyScore = () => {
    // Convert string values to numbers
    const studentcountValue = studentcount ? Number(studentcount) : undefined;
    const marktwocountValue = marktwocount ? Number(marktwocount) : undefined;
    const markfourandfivecountValue = markfourandfivecount ? Number(markfourandfivecount) : undefined;

    // Check if any fields are empty
    if (studentcountValue === undefined || marktwocountValue === undefined || markfourandfivecountValue === undefined) {
      Alert.alert('DİQQƏT!', 'Bütün xanaları doldurun!');
      return;
    }

    // Check if student count is correct
    if ((marktwocountValue + markfourandfivecountValue ) > studentcountValue) {
      Alert.alert('DİQQƏT!', ' "2", "4" və "5" qiyməti alan şagirdlərin sayı ümumi şagird sayıdan çox ola bilməz!');
      return;
    }

    const mfScore = markfourandfivecountValue * 100 / studentcountValue;

    const kfScore = ((studentcountValue - marktwocountValue) / studentcountValue) * 100;
    

    // Update the calculation result
    setCalculationResult({
      kfScore: parseFloat(kfScore.toFixed(1)),
      mfScore: parseFloat(mfScore.toFixed(1))
      
    });
  };

  // Reset all values
  const resetValues = () => {
    setStudentcount('');
    setMarktwocount('');
    setMarkfourandfivecount('');
    setCalculationResult({
      kfScore: 0,
      mfScore: 0
    });
  };

  return (
    <SafeAreaView>
      <View style={kvmfScoreStyles.container}>
        <View style={kvmfScoreStyles.inputRow}>
          <Text style={kvmfScoreStyles.label}>Sinif üzrə ümumi şagird sayı:</Text>
          <TextInput
            ref={studentcountRef}
            style={[kvmfScoreStyles.input, focus === 'studentcount' && kvmfScoreStyles.focusedInput]}
            keyboardType="numeric"
            value={studentcount}
            onChangeText={(text) => handleScoreInput(text, setStudentcount)}
            autoFocus={true}
            onFocus={() => setFocus('studentcount')}
            onBlur={() => setFocus(null)}
            returnKeyType="next"
            onSubmitEditing={() => marktwocountRef.current?.focus()}
          />
          <Text style={kvmfScoreStyles.label}>"2" qiyməti alan şagirdlərin sayı:</Text>
          <TextInput
            ref={marktwocountRef}
            style={[kvmfScoreStyles.input, focus === 'marktwocount' && kvmfScoreStyles.focusedInput]}
            keyboardType="numeric"
            value={marktwocount}
            onChangeText={(text) => handleScoreInput(text, setMarktwocount)}
            autoFocus={true}
            onFocus={() => setFocus('marktwocount')}
            onBlur={() => setFocus(null)}
            returnKeyType="next"
            onSubmitEditing={() => markfourandfivecountRef.current?.focus()}
          />
          <Text style={[kvmfScoreStyles.label, kvmfScoreStyles.secondLabel]}>"4" və "5" qiyməti alan şagirdlərin sayı:</Text>
          <TextInput
            ref={markfourandfivecountRef}
            style={[kvmfScoreStyles.input, focus === 'markfourandfivecount' && kvmfScoreStyles.focusedInput]}
            keyboardType="numeric"
            value={markfourandfivecount}
            onChangeText={(text) => handleScoreInput(text, setMarkfourandfivecount)}
            onFocus={() => setFocus('markfourandfivecount')}
            onBlur={() => setFocus(null)}
            returnKeyType="done"
          />
        </View>
      </View>

      <View style={resultStyles.result}>
        <View style={resultStyles.names}>
          <Text style={resultStyles.nameText}>Müvəffəqiyyət faizi:</Text>
          <Text style={resultStyles.nameText}>Keyfiyyət faizi:</Text>
        </View>
        <View style={resultStyles.scores}>
          <Text style={resultStyles.scoreText}>{calculationResult.kfScore} %</Text>
          <Text style={resultStyles.scoreText}>{calculationResult.mfScore} %</Text>
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

const kvmfScoreStyles = StyleSheet.create({
  container: {
    width: '94%',
    marginHorizontal: '3%',
    marginTop: 80,
    marginBottom: 40,
    flexDirection: 'column',
    gap: 5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // flexWrap: 'nowrap',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#363636',
    fontFamily: 'Calibri',
    flexShrink: 1,
  },
  secondLabel: {
    marginLeft: 15,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#5a94b5',
    borderRadius: 5,
    backgroundColor: '#e7f4f2',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Calibri',
    marginHorizontal: 5,
  },
  focusedInput: {
    borderWidth: 2,
    borderColor: '#5a94b5',
    borderRadius: 5,
  },
});


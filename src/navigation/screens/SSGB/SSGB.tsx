import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, Pressable, TextInput, Alert, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { validateInput, calculateGrade } from '../../../utils/gradeCalculator';
import { ALERT_TITLE, SCORE_TOO_HIGH, EMPTY_FIELDS, ANSWERS_EXCEED_QUESTIONS } from '../../../utils/errorMessages';
import { FIELDS_RESET } from '../../../utils/toastMessages';

export function SSGB() {
  // State for the two semester scores
  const [questioncount, setQuestioncount] = useState<string>('');
  const [correctcount, setCorrectcount] = useState<string>('');

  const [focus, setFocus] = useState<string | null>(null);
  const [pressedButton, setPressedButton] = useState<string | null>(null);
  const [calculationResult, setCalculationResult] = useState({
    totalScore: 0,
    grade: 2
  });

  // Create refs for TextInput components
  const questioncountRef = useRef<TextInput>(null);
  const correctcountRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  // Handle input validation for scores
  const handleScoreInput = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const validatedValue = validateInput(value);
       
    setter(validatedValue);
  };

 
  const calculateSSGBScore = () => {
    // Convert string values to numbers
    const questioncountValue = questioncount ? Number(questioncount) : undefined;
    const correctcountValue = correctcount ? Number(correctcount) : undefined;

    // Check if any fields are empty
    if (questioncountValue === undefined || correctcountValue === undefined) {
      Alert.alert(ALERT_TITLE, EMPTY_FIELDS);
      return;
    }

    // Check if any value is over 100
    if (correctcountValue > questioncountValue) {
      Alert.alert(ALERT_TITLE, ANSWERS_EXCEED_QUESTIONS);
      return;
    }

    // Calculate the average of the two semester scores
    const testBal = correctcountValue * 100 / questioncountValue;

    // Calculate the grade based on the yearly average
    const grade = calculateGrade(testBal);

    // Update the calculation result
    setCalculationResult({
      totalScore: parseFloat(testBal.toFixed(1)),
      grade
    });
  };

  // Reset all values
  const resetValues = () => {
    setQuestioncount('');
    setCorrectcount('');
    setCalculationResult({
      totalScore: 0,
      grade: 2
    });
    
    // Show toast message at the top of the screen
    ToastAndroid.showWithGravity(
      FIELDS_RESET,
      ToastAndroid.SHORT,
      ToastAndroid.TOP
    );
    
    // Set focus on the first input field
    setTimeout(() => {
      questioncountRef.current?.focus();
    }, 100);
  };

  return (
    <SafeAreaView>
      <View style={ssgbScoreStyles.container}>
        <View style={ssgbScoreStyles.inputRow}>
          <Text style={ssgbScoreStyles.label}>Ümumi sual sayı:</Text>
          <TextInput
            ref={questioncountRef}
            style={[ssgbScoreStyles.input, focus === 'questioncount' && ssgbScoreStyles.focusedInput]}
            keyboardType="numeric"
            value={questioncount}
            onChangeText={(text) => handleScoreInput(text, setQuestioncount)}
            autoFocus={true}
            onFocus={() => setFocus('questioncount')}
            onBlur={() => setFocus(null)}
            returnKeyType="next"
            onSubmitEditing={() => correctcountRef.current?.focus()}
          />
        </View>
        <View style={ssgbScoreStyles.inputRow}>
          <Text style={ssgbScoreStyles.label}>Düzgün cavab sayı:</Text>
          <TextInput
            ref={correctcountRef}
            style={[ssgbScoreStyles.input, focus === 'correctcount' && ssgbScoreStyles.focusedInput]}
            keyboardType="numeric"
            value={correctcount}
            onChangeText={(text) => handleScoreInput(text, setCorrectcount)}
            onFocus={() => setFocus('correctcount')}
            onBlur={() => setFocus(null)}
            returnKeyType="done"
          />
        </View>
      </View>

      <View style={resultStyles.result}>
        <View style={resultStyles.names}>
          <Text style={resultStyles.nameText}>Test üzrə bal:</Text>
          <Text style={resultStyles.nameText}>Test üzrə qiymət:</Text>
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
            onPress={calculateSSGBScore}
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

const ssgbScoreStyles = StyleSheet.create({
  container: {
    width: '94%',
    marginHorizontal: '3%',
    marginTop: 80,
    marginBottom: 40,
    flexDirection: 'column',
    gap: 15,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginStart: 10,
    
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#363636',
    fontFamily: 'Calibri',
    flexShrink: 1,
    width: '75%',
  },
  secondLabel: {
    marginLeft: 0,
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
    marginLeft: 10,
    marginRight: 10,
  },
  focusedInput: {
    borderWidth: 2,
    borderColor: '#5a94b5',
    borderRadius: 5,
  },
});


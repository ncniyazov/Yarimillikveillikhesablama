import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, Pressable, TextInput, Alert, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { validateInput, calculateSemesterScore, calculateGrade } from '../../../utils/gradeCalculator';
import Header from '../../components/YarimilHeaderComp';

type Props = {
  route: {
    params: {
      ksqCount: number;
      hasBigSummative: boolean;
    }
  }
}

export function YarimilHesablaDefault({ route }: Props) {
  const { ksqCount, hasBigSummative } = route.params;
  const [backPressed, setBackPressed] = useState(false);
  const [resetPressed, setResetPressed] = useState(false);
  const [nextPressed, setNextPressed] = useState(false);

  const handlePressInBack = () => setBackPressed(true);
  const handlePressOutBack = () => setBackPressed(false);

  const handlePressInReset = () => setResetPressed(true);
  const handlePressOutReset = () => setResetPressed(false);

  const handlePressInNext = () => setNextPressed(true);
  const handlePressOutNext = () => setNextPressed(false);

  const [ksqValues, setKsqValues] = useState<string[]>(Array(ksqCount).fill(''));
  const [bsq, setBsq] = useState<string>('');
  
  const [focus, setFocus] = useState<string | null>(null);
  const [pressedButton, setPressedButton] = useState<string | null>(null);
  const [calculationResult, setCalculationResult] = useState({
    totalScore: 0,
    grade: 2,
    ksqPercentage: 0,
    bsqPercentage: 0
  });
  
  // Create refs for TextInput components - one for each KSQ plus one for BSQ
  const inputRefs = useRef<Array<TextInput | null>>(Array(ksqCount + 1).fill(null));
  
  const navigation = useNavigation();

  // Handle input validation for KSQs
  const handleKsqInput = (value: string, index: number) => {
    const validatedValue = validateInput(value);
    
    // Check if the value is greater than 100
    if (validatedValue && Number(validatedValue) > 100) {
      Alert.alert('Xəta', 'Bal 100-dən yüksək ola bilməz!');
      // Set the value to empty
      const newKsqValues = [...ksqValues];
      newKsqValues[index] = '';
      setKsqValues(newKsqValues);
      return;
    }
    
    // Update the specific KSQ value
    const newKsqValues = [...ksqValues];
    newKsqValues[index] = validatedValue;
    setKsqValues(newKsqValues);
  };

  // Handle BSQ input validation
  const handleBsqInput = (value: string) => {
    const validatedValue = validateInput(value);
    
    // Check if the value is greater than 100
    if (validatedValue && Number(validatedValue) > 100) {
      Alert.alert('Xəta', 'Bal 100-dən yüksək ola bilməz!');
      // Set the value to empty
      setBsq('');
      return;
    }
    
    setBsq(validatedValue);
  };

  // Calculate scores
  const calculateScores = () => {
    // Convert string values to numbers
    const numericKsqValues = ksqValues.map(val => val ? Number(val) : undefined);
    const bsqValue = bsq ? Number(bsq) : undefined;
    
    // Check if any fields are empty
    const hasEmptyFields = numericKsqValues.some(val => val === undefined);
    if (hasEmptyFields || (hasBigSummative && !bsqValue)) {
      Alert.alert('Xəta', 'Bütün xanaları doldurun!');
      return;
    }
    
    // Check if any value is over 100
    const hasValueOver100 = [...numericKsqValues, bsqValue].some(val => val !== undefined && val > 100);
    if (hasValueOver100) {
      Alert.alert('Xəta', 'BSQ dəyəri 100-dən çox ola bilməz!');
      return;
    }
    
    // Get valid KSQ values (non-undefined)
    const validKsqValues = numericKsqValues.filter((val): val is number => val !== undefined);
    
    // Calculate average of KSQ values
    const ksqAverage = validKsqValues.length > 0
      ? validKsqValues.reduce((sum, val) => sum + val, 0) / validKsqValues.length
      : 0;
    
    let result;
    
    if (hasBigSummative) {
      // If BSQ is selected, use normal calculation
      result = calculateSemesterScore(numericKsqValues, bsqValue);
    } else {
      // If BSQ is not selected, set total score to KSQ average (100%)
      // but still calculate ksqPercentage as 40% of the average for display
      result = {
        totalScore: parseFloat(ksqAverage.toFixed(1)),
        grade: calculateGrade(ksqAverage),
        ksqPercentage: parseFloat((ksqAverage * 0.4).toFixed(1)),
        bsqPercentage: 0
      };
    }
    
    setCalculationResult(result);
  };

  // Reset all values
  const resetValues = () => {
    setKsqValues(Array(ksqCount).fill(''));
    setBsq('');
    setCalculationResult({
      totalScore: 0,
      grade: 2,
      ksqPercentage: 0,
      bsqPercentage: 0
    });
  };

  // Generate KSQ input fields dynamically based on count
  const renderKsqInputs = () => {
    return ksqValues.map((value, index) => (
      <TextInput
        key={`ksq${index + 1}`}
        ref={el => inputRefs.current[index] = el}
        style={[calcStyles.input, focus === `KSQ${index + 1}` && calcStyles.inputFocus]}
        placeholder={`KSQ${index + 1}`}
        keyboardType="numeric"
        value={value}
        onChangeText={(text) => handleKsqInput(text, index)}
        autoFocus={index === 0}
        onFocus={() => setFocus(`KSQ${index + 1}`)}
        onBlur={() => setFocus(null)}
        returnKeyType={index < ksqCount - 1 || hasBigSummative ? "next" : "done"}
        onSubmitEditing={() => {
          if (index < ksqCount - 1) {
            inputRefs.current[index + 1]?.focus();
          } else if (hasBigSummative) {
            inputRefs.current[ksqCount]?.focus(); // BSQ ref
          }
        }}
      />
    ));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
  
      
      <View style={calcStyles.container}>
        {renderKsqInputs()}
        {hasBigSummative && (
          <TextInput
            ref={el => inputRefs.current[ksqCount] = el}
            style={[calcStyles.input, focus === 'BSQ' && calcStyles.inputFocus]}
            placeholder="BSQ"
            keyboardType="numeric"
            value={bsq}
            onChangeText={(text) => handleBsqInput(text)}
            onFocus={() => setFocus('BSQ')}
            onBlur={() => setFocus(null)}
            returnKeyType="done"
          />
        )}
      </View>
      <View style={resultStyles.result}>
        <View style={resultStyles.names}>
          <Text style={resultStyles.nameText}>Yarımillik bal:</Text>
          <Text style={resultStyles.nameText}>Yarımillik qiymət:</Text>
          <Text style={resultStyles.nameText}>KSQ-40%:</Text>
          <Text style={resultStyles.nameText}>BSQ-60%:</Text>
        </View>
        <View style={resultStyles.scores}>
          <Text style={resultStyles.scoreText}>{calculationResult.totalScore}</Text>
          <Text style={resultStyles.scoreText}>{calculationResult.grade}</Text>
          <Text style={resultStyles.scoreText}>{calculationResult.ksqPercentage}</Text>
          <Text style={resultStyles.scoreText}>{calculationResult.bsqPercentage}</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        {/* <TouchableWithoutFeedback
          onPressIn={handlePressInBack}
          onPressOut={handlePressOutBack}
        >
          <View style={[styles.back, backPressed && styles.backPressed]}>
            <Image style={styles.icon} source={require('../../../../assets/icons/back.png')} />
          </View>
        </TouchableWithoutFeedback> */}

        <View style={styles.nextReset}>
          <Pressable
            style={[styles.reset, resetPressed && styles.resetPressed]}
            onPressIn={handlePressInReset}
            onPressOut={handlePressOutReset}
            onPress={resetValues}
          >
            <Image
              source={require('../../../../assets/icons/reset.png')}
              style={buttonStyles.resetIcon}
            />
          </Pressable>
          {/* <TouchableWithoutFeedback
            onPressIn={handlePressInReset}
            onPressOut={handlePressOutReset}
            onPress={() => {
              resetValues();
            }}
          >
            <View style={[styles.reset, resetPressed && styles.resetPressed]}>
              <Image style={styles.icon} source={require('../../../../assets/icons/eraser.png')} />
            </View>
          </TouchableWithoutFeedback> */}

          <TouchableWithoutFeedback
            onPressIn={handlePressInNext}
            onPressOut={handlePressOutNext}
            onPress={() => {
              calculateScores();
            }}
          >
            <View style={[styles.next, nextPressed && styles.nextPressed]}>
              <Text style={styles.text}>HESABLA</Text>
              <Image style={styles.iconSmall} source={require('../../../../assets/icons/calculate.png')} />
            </View>
          </TouchableWithoutFeedback>
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
    flexWrap: 'wrap', // Allow wrapping for more inputs
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: 50,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#5a94b5',
    borderRadius: 5,
    backgroundColor: '#e7f4f2',
    marginBottom: 3,
    marginRight: 5,
    minWidth: 40,
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
const styles = StyleSheet.create({
  buttons: {
    width: '94%',
    marginHorizontal: '3%',
    position: 'relative',
  },
  back: {
    width: 50,
    height: 50,
    backgroundColor: '#e7f4f2',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backPressed: {
    backgroundColor: '#c8e4e0', // Koyu renk tonu
  },
  icon: {
    width: 35,
    height: 35,
  },
  nextReset: {
    position: 'absolute',
    right: 0,
    display: 'flex',
    gap: 10,
    top: 0,
    flexDirection: 'row',
  },
  reset: {
    width: 50,
    height: 50,
    backgroundColor: '#fca2a2',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetPressed: {
    backgroundColor: '#e38989', // Koyu renk tonu
  },
  next: {
    width: 140,
    height: 50,
    backgroundColor: 'rgb(6, 151, 144)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',

  },
  nextPressed: {
    backgroundColor: 'rgb(5, 130, 125)', // Koyu renk tonu
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Calibri',
  },
  iconSmall: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});
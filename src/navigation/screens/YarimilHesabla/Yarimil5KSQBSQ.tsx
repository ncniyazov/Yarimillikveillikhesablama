import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Pressable, TextInput, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { validateInput, calculateSemesterScore } from '../../../utils/gradeCalculator';
import Header from '../../components/YarimilHeaderComp';
import { RootStackNavigationProp } from '../../types';

type Props = {
  route: {
    params: {
      ksqCount: number;
      hasBigSummative: boolean;
    }
  }
}

export function Yarimil5KSQBSQ({ route }: Props) {
  const { ksqCount, hasBigSummative } = route.params;
  const [ksq1, setKsq1] = useState<string>('');
  const [ksq2, setKsq2] = useState<string>('');
  const [ksq3, setKsq3] = useState<string>('');
  const [ksq4, setKsq4] = useState<string>('');
  const [ksq5, setKsq5] = useState<string>('');
  const [bsq, setBsq] = useState<string>('');
  
  const [focus, setFocus] = useState<string | null>(null);
  const [pressedButton, setPressedButton] = useState<string | null>(null);
  const [calculationResult, setCalculationResult] = useState({
    totalScore: 0,
    grade: 2,
    ksqPercentage: 0,
    bsqPercentage: 0
  });
  
  // Create refs for TextInput components
  const ksq1Ref = React.useRef<TextInput>(null);
  const ksq2Ref = React.useRef<TextInput>(null);
  const ksq3Ref = React.useRef<TextInput>(null);
  const ksq4Ref = React.useRef<TextInput>(null);
  const ksq5Ref = React.useRef<TextInput>(null);
  const bsqRef = React.useRef<TextInput>(null);
  
  const navigation = useNavigation<RootStackNavigationProp>();

  // Handle input validation for KSQs
  const handleKsqInput = (value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const validatedValue = validateInput(value);
    
    // Check if the value is greater than 100
    if (validatedValue && Number(validatedValue) > 100) {
      Alert.alert('DİQQƏT!', 'Bal 100-dən yüksək ola bilməz!');
      // Set the value to empty or to 100 (depending on desired behavior)
      setter('');
      return;
    }
    
    setter(validatedValue);
  };

  // Calculate scores
  const calculateScores = () => {
    const ksqValues = [
      ksq1 ? Number(ksq1) : undefined,
      ksq2 ? Number(ksq2) : undefined,
      ksq3 ? Number(ksq3) : undefined,
      ksq4 ? Number(ksq4) : undefined,
      ksq5 ? Number(ksq5) : undefined
    ];
    
    const bsqValue = bsq ? Number(bsq) : undefined;
    
    // Check if any fields are empty
    const hasEmptyFields = ksqValues.some(val => val === undefined);
    if (hasEmptyFields || (hasBigSummative && !bsqValue)) {
      Alert.alert('DİQQƏT!', 'Bütün xanaları doldurun!');
      return;
    }
    
    // Check if any value is over 100
    const hasValueOver100 = [...ksqValues, bsqValue].some(val => val !== undefined && val > 100);
    if (hasValueOver100) {
      Alert.alert('DİQQƏT!', 'BSQ dəyəri 100-dən çox ola bilməz!');
      return;
    }
    
    const result = calculateSemesterScore(ksqValues, bsqValue);
    
    // If BSQ is not selected, adjust the percentages
    if (!hasBigSummative) {
      result.ksqPercentage = result.totalScore; // 100% of the score comes from KSQ
      result.bsqPercentage = 0; // BSQ contributes 0%
    }
    
    setCalculationResult(result);
  };

  // Reset all values
  const resetValues = () => {
    setKsq1('');
    setKsq2('');
    setKsq3('');
    setKsq4('');
    setKsq5('');
    setBsq('');
    setCalculationResult({
      totalScore: 0,
      grade: 2,
      ksqPercentage: 0,
      bsqPercentage: 0
    });
  };

  // Handle back button
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      
      <View style={calcStyles.container}>
        <TextInput
          ref={ksq1Ref}
          style={[calcStyles.input, focus === 'KSQ1' && calcStyles.inputFocus]}
          placeholder="KSQ1"
          keyboardType="numeric"
          value={ksq1}
          onChangeText={(text) => handleKsqInput(text, setKsq1)}
          autoFocus={true}
          onFocus={() => setFocus('KSQ1')}
          onBlur={() => setFocus(null)}
          returnKeyType="next"
          onSubmitEditing={() => ksq2Ref.current?.focus()}
        />
        <TextInput
          ref={ksq2Ref}
          style={[calcStyles.input, focus === 'KSQ2' && calcStyles.inputFocus]}
          placeholder="KSQ2"
          keyboardType="numeric"
          value={ksq2}
          onChangeText={(text) => handleKsqInput(text, setKsq2)}
          onFocus={() => setFocus('KSQ2')}
          onBlur={() => setFocus(null)}
          returnKeyType="next"
          onSubmitEditing={() => ksq3Ref.current?.focus()}
        />
        <TextInput
          ref={ksq3Ref}
          style={[calcStyles.input, focus === 'KSQ3' && calcStyles.inputFocus]}
          placeholder="KSQ3"
          keyboardType="numeric"
          value={ksq3}
          onChangeText={(text) => handleKsqInput(text, setKsq3)}
          onFocus={() => setFocus('KSQ3')}
          onBlur={() => setFocus(null)}
          returnKeyType="next"
          onSubmitEditing={() => ksq4Ref.current?.focus()}
        />
        <TextInput
          ref={ksq4Ref}
          style={[calcStyles.input, focus === 'KSQ4' && calcStyles.inputFocus]}
          placeholder="KSQ4"
          keyboardType="numeric"
          value={ksq4}
          onChangeText={(text) => handleKsqInput(text, setKsq4)}
          onFocus={() => setFocus('KSQ4')}
          onBlur={() => setFocus(null)}
          returnKeyType="next"
          onSubmitEditing={() => ksq5Ref.current?.focus()}
        />
        <TextInput
          ref={ksq5Ref}
          style={[calcStyles.input, focus === 'KSQ5' && calcStyles.inputFocus]}
          placeholder="KSQ5"
          keyboardType="numeric"
          value={ksq5}
          onChangeText={(text) => handleKsqInput(text, setKsq5)}
          onFocus={() => setFocus('KSQ5')}
          onBlur={() => setFocus(null)}
          returnKeyType={hasBigSummative ? "next" : "done"}
          onSubmitEditing={() => hasBigSummative ? bsqRef.current?.focus() : null}
        />
        {hasBigSummative && (
          <TextInput
            ref={bsqRef}
            style={[calcStyles.input, focus === 'BSQ' && calcStyles.inputFocus]}
            placeholder="BSQ"
            keyboardType="numeric"
            value={bsq}
            onChangeText={(text) => handleKsqInput(text, setBsq)}
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

      <View style={buttonStyles.buttons}>
        <View style={buttonStyles.buttonContainer}>
          <Pressable
            style={[buttonStyles.button, buttonStyles.next, pressedButton === 'next' && buttonStyles.nextPressed]}
            onPressIn={() => setPressedButton('next')}
            onPressOut={() => setPressedButton(null)}
            onPress={calculateScores}
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
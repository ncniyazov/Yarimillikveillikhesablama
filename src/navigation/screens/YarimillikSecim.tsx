import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackNavigationProp } from '../types';

export function YarimillikSecim() {
  const [count, setCount] = useState(3);
  const [isChecked, setIsChecked] = useState(false);
  const [pressedButton, setPressedButton] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [pressedNext, setPressedNext] = useState(false);
  const [pressedBack, setPressedBack] = useState(false);
  const navigation = useNavigation<RootStackNavigationProp>();

  const decrease = () => {
    if (count > 3) {
      setCount(count - 1);
    }
  };
 
  const increase = () => {
    if (count < 6) {
      setCount(count + 1);
    }
  };

  const navigateToKSQScreen = () => {
    // Navigate to the default screen with count as parameter
    navigation.navigate('YarimilHesablaDefault', { 
      ksqCount: count,
      hasBigSummative: isChecked
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      <View style={styles.chooseCount}>
        <Text style={styles.label}> Yarımil ərzində keçirilmiş summativ qiymətləndirmələrin sayı:</Text>
        <View style={styles.selectNumber}>
          <TouchableOpacity
            style={[styles.button, pressedButton === 'decrease' && styles.buttonActive]}
            onPress={decrease}
            onPressIn={() => setPressedButton('decrease')}
            onPressOut={() => setPressedButton(null)}
            activeOpacity={1}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            value={String(count)}
            editable={false}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <TouchableOpacity
            style={[styles.button, pressedButton === 'increase' && styles.buttonActive]}
            onPress={increase}
            onPressIn={() => setPressedButton('increase')}
            onPressOut={() => setPressedButton(null)}
            activeOpacity={1}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.note}>
        <Checkbox value={isChecked} onValueChange={setIsChecked} style={styles.checkbox}  />
        <Text style={styles.noteText}>Yarımil ərzində BÖYÜK summativ qiymətləndirmə keçirilmişdir.</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.buttonIreliGeri, styles.back, pressedBack && styles.backPressed]}
          onPressIn={() => setPressedBack(true)}
          onPressOut={() => setPressedBack(false)}
          activeOpacity={1} 
        >
          <Text style={[styles.buttonTextGeriIrreli, styles.backText, styles.calibriFont]}>GERİ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonIreliGeri, styles.next, pressedNext && styles.nextPressed]}
          onPressIn={() => setPressedNext(true)}
          onPressOut={() => setPressedNext(false)}
          activeOpacity={1} 
          onPress={navigateToKSQScreen}
        >
          <Text style={[styles.buttonTextGeriIrreli, styles.nextText, styles.calibriFont]}>İRƏLİ</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  chooseCount: {
    width: '94%',
    height: 60,
    marginHorizontal: '3%',
    marginTop: 70,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
  label: {
    fontWeight: 'bold',
    width: "70%" ,
    fontSize: 16,
    color: '#363636',
    flexWrap: 'wrap',
    textAlign: 'left',
    fontFamily: 'Calibri',
  },
  selectNumber: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5a94b5',
    borderRadius: 5,
  },
  buttonActive: {
    backgroundColor: '#467a94', 
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Calibri',
  },
  input: {
    width: 35,
    height: 50,
    textAlign: 'center',
    fontSize: 24,
    borderWidth: 0,  // border'ı kaldırdık
    backgroundColor: 'rgba(255, 255, 255, 0)', 
    color: '#363636',
    fontFamily: 'Calibri',
  },
  inputFocused: {
    // Focus olduğunda herhangi bir değişiklik yapmadık
  },
  note: {
    marginTop: 40,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#363636',
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  noteText: {
    fontStyle: 'italic',
    maxWidth: '70%',
    textAlign: 'center',
    fontFamily: 'Calibri',
  },
  top: {
    width: '94%',
    marginHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    shadowColor: 'rgba(182, 182, 182, 0.322)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    textAlign: 'center',
  },
  logo: {
    width: '10%',
    maxWidth: 60,
    height: 60,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#363636',
    textAlign: 'center',
    fontFamily: 'Calibri',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  buttons: {
    width: '94%',
    marginHorizontal: '3%',
    marginTop: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonIreliGeri: {
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
  buttonTextGeriIrreli: {
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

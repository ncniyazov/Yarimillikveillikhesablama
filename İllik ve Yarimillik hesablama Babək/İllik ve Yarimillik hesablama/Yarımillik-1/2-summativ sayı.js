import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, CheckBox } from 'react-native';

export default function ChooseCount() {
  const [count, setCount] = useState(3);
  const [isChecked, setIsChecked] = useState(false);
  const [pressedButton, setPressedButton] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

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

  return (
    <View>
      <View style={chooseCountStyles.chooseCount}>
        <Text style={chooseCountStyles.label}>Keçirilmiş summativ qiymətləndirmələrin sayı:</Text>
        <View style={chooseCountStyles.selectNumber}>
          <TouchableOpacity
            style={[chooseCountStyles.button, pressedButton === 'decrease' && chooseCountStyles.buttonActive]}
            onPress={decrease}
            onPressIn={() => setPressedButton('decrease')}
            onPressOut={() => setPressedButton(null)}
            activeOpacity={1}
          >
            <Text style={chooseCountStyles.buttonText}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={[chooseCountStyles.input, isFocused && chooseCountStyles.inputFocused]}
            value={String(count)}
            editable={false}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <TouchableOpacity
            style={[chooseCountStyles.button, pressedButton === 'increase' && chooseCountStyles.buttonActive]}
            onPress={increase}
            onPressIn={() => setPressedButton('increase')}
            onPressOut={() => setPressedButton(null)}
            activeOpacity={1}
          >
            <Text style={chooseCountStyles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={chooseCountStyles.note}>
        <CheckBox value={isChecked} onValueChange={setIsChecked} style={chooseCountStyles.checkbox} />
        <Text style={chooseCountStyles.noteText}>Yarımil ərzində BÖYÜK summativ qiymətləndirmə keçirilmişdir.</Text>
      </View>
    </View>
  );
}

const chooseCountStyles = StyleSheet.create({
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
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5a94b5',
    borderRadius: 5,
  },
  buttonActive: {
    backgroundColor: '#467a94', // Daha koyu ton
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Calibri',
  },
  input: {
    width: 50,
    height: 35,
    textAlign: 'center',
    fontSize: 24,
    borderWidth: 0,  // border'ı kaldırdık
    outlineWidth: 0,  // outline'ı kaldırdık
    backgroundColor: 'rgba(255, 255, 255, 0)',  // saydam arka plan
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
});

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const GradeInputForm = () => {
  const [studentCount, setStudentCount] = useState('');
  const [grade2Count, setGrade2Count] = useState('');
  const [grade25Count, setGrade25Count] = useState('');

  return (
    <View style={gradeInputStyles.formContainer}>
      <View style={gradeInputStyles.inputContainer}>
        <Text style={gradeInputStyles.label}>Sinif üzrə şagird sayı:</Text>
        <TextInput
          style={gradeInputStyles.input}
          value={studentCount}
          onChangeText={setStudentCount}
          keyboardType="numeric"
        />
      </View>

      <View style={gradeInputStyles.inputContainer}>
        <Text style={gradeInputStyles.label}>"2" qiyməti alan şagirdlərin sayı:</Text>
        <TextInput
          style={gradeInputStyles.input}
          value={grade2Count}
          onChangeText={setGrade2Count}
          keyboardType="numeric"
        />
      </View>

      <View style={gradeInputStyles.inputContainer}>
        <Text style={gradeInputStyles.label}>"2" və "5" qiyməti alan şagirdlərin sayı:</Text>
        <TextInput
          style={gradeInputStyles.input}
          value={grade25Count}
          onChangeText={setGrade25Count}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

const gradeInputStyles = StyleSheet.create({
  formContainer: {
    width: '94%',
    margin: '40px 3% 30px',
    flexDirection: 'column',
    gap: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    flex: 1,
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Calibri', // Calibri fontu eklendi
  },
  input: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#5a94b5',
    borderRadius: 5,
    backgroundColor: '#e7f4f2',
    textAlign: 'center',
    marginLeft: 10,
    fontFamily: 'Calibri', // Calibri fontu eklendi
  },
  inputFocused: {
    borderColor: '#5a94b5',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default GradeInputForm;

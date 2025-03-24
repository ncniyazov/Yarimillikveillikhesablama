import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function Header() {
  return (
    <View style={styles.top}>
      <View style={styles.header}>
        <Image source={require('./icons/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>YARIMİLLİK VƏ İLLİK HESABLAMA</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    width: '94%',
    marginHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    shadowColor: 'rgba(182, 182, 182, 0.322)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  header: {
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    textAlign: 'center',
    marginTop: 30,
  },
  logo: {
    width: '50%',
    height: 100,
    maxWidth: 200,
    resizeMode: 'contain',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#114a69',
    textAlign: 'center',
    fontFamily: 'Calibri',
    marginTop: 10,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

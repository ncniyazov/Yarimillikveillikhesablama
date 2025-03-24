import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function Header() {
  return (
    <View style={styles.top}>
      <View style={styles.header}>
        <Image source={require('./icons/percent.png')} style={styles.logo} />
        <Text style={styles.headerText}>KEYFİYYƏT VƏ MÜVƏFFƏQİYYƏT FAİZİ</Text>
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
});

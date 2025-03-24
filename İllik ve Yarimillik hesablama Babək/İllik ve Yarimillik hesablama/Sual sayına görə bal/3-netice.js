import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Result() {
  return (
    <View style={resultStyles.result}>
      <View style={resultStyles.names}>
        <Text style={resultStyles.nameText}>Bal:</Text>
        <Text style={resultStyles.nameText}>Qiymət:</Text>
      </View>
      <View style={resultStyles.scores}>
        <Text style={resultStyles.scoreText}>25</Text>
        <Text style={resultStyles.scoreText}>2</Text>
      </View>
    </View>
  );
}

const resultStyles = StyleSheet.create({
  result: {
    width: 200, // Sabit genişlik
    marginHorizontal: 'auto', // Ortalanmış
    backgroundColor: '#f7f7f7', // Arka plan rengi
    borderRadius: 5, // Kenar yuvarlama
    flexDirection: 'row', // İki kolonu yan yana sıralar
    padding: 10, // İçerik boşluğu
    fontWeight: 'bold', // Yazı kalın
    shadowColor: 'rgba(182, 182, 182, 0.733)', // Gölge rengi (iOS)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 8, // Gölge yayılımı (iOS)
    elevation: 5, // Android için gölge efekti
    marginVertical: 10, // Üstten ve alttan 10px boşluk
  },
  names: {
    width: '80%', // Genişliğin %80'i
    height: '100%',
  },
  scores: {
    width: '20%', // Genişliğin %20'si
    height: '100%',
    color: 'rgb(182, 14, 14)', // Kırmızı renk
  },
  nameText: {
    fontSize: 16,
    color: '#363636', // Metin rengi CSS'teki gibi koyu gri
    fontWeight: 'bold', // Bold stil
    marginBottom: 1, // Metinler arasına 6px boşluk
    lineHeight: 20, // Satır yüksekliği
    fontFamily: 'Calibri', // Fontu Calibri olarak ayarladık
  },
  scoreText: {
    fontSize: 16,
    color: 'rgb(182, 14, 14)', // Skorlar için kırmızı renk
    fontWeight: 'bold', // Bold stil
    marginBottom: 1, // Metinler arasına 6px boşluk
    lineHeight: 20, // Satır yüksekliği
    fontFamily: 'Calibri', // Fontu Calibri olarak ayarladık
  },
});

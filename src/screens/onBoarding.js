import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';

export default function OnBoarding({ navigation }) {

  return (
    <ImageBackground 
      source={require('../../assets/background-1.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Image style={styles.logoBlue} source={require('../../assets/odonto-logo.png')} />
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={styles.focusButton} onPress={() => navigation.navigate('signup')}>
            <Text style={{ fontWeight: 'bold', color: '#fff' }}>Não tenho conta ainda</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('login')}>
            <Text style={{ fontWeight: 'bold', color: '#29468B' }}>Já tenho conta</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', color: '#0066FF', fontSize: 15, width: 150, textAlign: 'center' }}>
            Tudo começa com um sorriso :)
          </Text>
        </View>

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusButton: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#0066FF',
    padding: 15,
    margin: 10,
    borderRadius: 10,
  },
  logoBlue: {
    borderRadius: 5,
    width: 150,
    aspectRatio: 4 / 3,
    resizeMode: 'contain',
  },
});
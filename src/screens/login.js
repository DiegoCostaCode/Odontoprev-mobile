// Login.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function Login({ navigation, route }) {
  const [email, setEmail] = useState(route.params?.email || '');
  const [senha, setSenha] = useState('');

  const submitLogin = async () => {

    const usuarioAuth = {
      email: email,
      senha: senha,
    };

    try {
      const response = await fetch('/usuario/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioAuth),
      });

      if (!response.ok) {
        throw new Error('Erro ao realizar login!');
      }

      const data = await response.json();
      const { id } = data;

      navigation.navigate('welcome', { userId: id });

    } catch (error) {
      console.error('Erro ao realizar login:', error.message);
      Alert.alert('Erro', error.message);
    }
  };

  return (

    <View style={styles.container}>
      <Text style={styles.introText}>Realizar login...</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={submitLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  introText:{
    width: '100%',
    fontSize: '16px',
    marginBottom: 10,
    color: '#002353',
    fontWeight: 'bold'
  },
  
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
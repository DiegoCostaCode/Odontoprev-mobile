// Login.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation, route }) {
  const [email, setEmail] = useState(route.params?.email || '');
  const [senha, setSenha] = useState('');

  const submitLogin = async () => {
    const usuarioAuth = {
      email: email,
      senha: senha,
    };
    
    if (usuarioAuth.email === '' || usuarioAuth.senha === '') {
      alert('Preencha todos os campos.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8080/usuario/api/', usuarioAuth, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if(response.data && response.data.userId && response.data.role && response.status === 200) {
        const { userId, role } = response.data;
  
        await AsyncStorage.setItem('userId', userId.toString());
        await AsyncStorage.setItem('role', role);
    
        console.log('Login realizado com sucesso:', response.data);
    
        navigation.navigate('welcome');
      } else 
      {
        alert('Não foi possível realizar o login. Verifique suas credenciais.');
      }

      
  
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      alert('Falha no login.');
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
    fontSize: 16,
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
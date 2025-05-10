import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Welcome({ navigation }) {
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');

        axios.get(`http://localhost:8080/paciente/api/${id}`)
          .then(response => {
            setNome(response.data.nome);
          })
          .catch(error => {
            console.error('Erro ao buscar dados do usuário:', error.message);
          })
          .finally(() => {
            setLoading(false);
          });

      } catch (error) {
        console.error('Erro ao obter o ID do usuário:', error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem-vindo, {nome}!</Text>
      <Text style={styles.introText}>Estamos felizes em tê-lo conosco.</Text>

      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('tabnavigate')}>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  introText: {
    fontSize: 16,
    marginTop: 10,
    color: '#002353',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#007BFF',
    borderRadius: 50,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

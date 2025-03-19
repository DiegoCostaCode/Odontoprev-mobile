// Welcome.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Welcome({ route }) {
    
  const { userId } = route.params;
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/paciente/api/${userId}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar dados do usuário');
        }
        const data = await response.json();
        setNome(data.nome);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData(); 
  }, [userId]);

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

      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('NextScreen')}>
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Alinhado ao centro
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
    backgroundColor: '#007BFF', // Cor de fundo azul
    borderRadius: 50, // Arredondado 100%
    padding: 15,
    marginTop: 20,
    alignItems: 'center', // Centraliza o conteúdo
    justifyContent: 'center', // Centraliza o conteúdo
  },
});
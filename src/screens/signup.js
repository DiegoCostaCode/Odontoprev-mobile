import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function Signup({ navigation }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [plano, setPlano] = useState('');
  const [planos, setPlanos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/plano/api/')
      .then(response => {
        setPlanos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar planos:', error);
      });
  }, []);

  const formatDate = (dateString) => {
    const cleaned = dateString.replace(/\D/g, '');
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 4) return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    if (cleaned.length <= 8) return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
  };

  const formatTel = (phoneString) => {
    const cleaned = phoneString.replace(/\D/g, '');
    if (cleaned.length <= 2) return `(${cleaned}`;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    if (cleaned.length <= 10) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  };

  const formatCPF = (cpfString) => {
    const cleaned = cpfString.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
  };

  const submit = () => {
    const pacienteData = {
      nome,
      cpf: formatCPF(cpf),
      dataNascimento: formatDate(dataNascimento),
      email,
      telefone: formatTel(telefone),
      senha,
      id_plano: parseInt(plano),
    };

    axios.post('http://localhost:8080/paciente/api/', pacienteData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (!response.status === 200) {
        throw new Error('Erro ao cadastrar paciente');
      }
      navigation.navigate('login', { email });
    })
    .catch((error) => {
      console.error('Erro ao cadastrar paciente', error.message);
      alert('Erro ao cadastrar paciente');
    });
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="CPF" value={cpf} onChangeText={(text) => setCpf(formatCPF(text))} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Data de Nascimento (dd/MM/yyyy)" value={dataNascimento} onChangeText={(text) => setDataNascimento(formatDate(text))} />

      <View style={styles.row}>
        <TextInput style={[styles.input, styles.halfInput]} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextInput style={[styles.input, styles.halfInput]} placeholder="Telefone" value={telefone} onChangeText={(text) => setTelefone(formatTel(text))} keyboardType="phone-pad" />
      </View>

      <TextInput style={styles.input} placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />

      <View style={{ width: '100%', backgroundColor: 'transparent', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 15 }}>
        <Picker
          selectedValue={plano}
          onValueChange={(itemValue) => setPlano(itemValue)}
          style={styles.picker}
        >
          <Picker.Item style={styles.itemPicker} label="Selecione um plano" value="" enabled={false} />
          {planos.map((item) => (
            <Picker.Item key={item.id} label={item.nome} value={item.id.toString()} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
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
  logoBlue: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  halfInput: {
    width: '48%',
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
  picker: {
    height: 53,
    width: '100%',
    backgroundColor: 'transparent',
  },
  itemPicker: {
    color: '#002353',
  },
});

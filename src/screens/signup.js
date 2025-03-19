import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Signup({navigation}) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [plano, setPlano] = useState(''); // Valor padrão para o plano

  const formatDate = (dateString) => {
    const cleaned = dateString.replace(/\D/g, '');
    if (cleaned.length <= 2) return cleaned; // dd
    if (cleaned.length <= 4) return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`; // dd/MM
    if (cleaned.length <= 8) return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`; // dd/MM/yyyy
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`; // Retorna no formato dd/MM/yyyy
  };

  const formatTel = (phoneString) => {
    const cleaned = phoneString.replace(/\D/g, '');
    if (cleaned.length <= 2) return `(${cleaned}`; // (DD
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`; // (DD) 9123
    if (cleaned.length <= 10) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`; // (DD) 91234-5678
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`; // Retorna no formato (DD) 91234-5678
  };

  const formatCPF = (cpfString) => {
    const cleaned = cpfString.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned; // XXX
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`; // XXX.XXX
    if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`; // XXX.XXX.XXX
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`; // XXX.XXX.XXX-XX
  };

  const submit = async () => {
    const formattedDate = formatDate(dataNascimento);
    const formattedPhone = formatTel(telefone);
    const formattedCPF = formatCPF(cpf);
  
    const pacienteData = {
      nome: nome,
      cpf: formattedCPF,
      dataNascimento: formattedDate,
      email: email,
      telefone: formattedPhone,
      senha: senha,
      id_plano: parseInt(plano),
    };
  
    try {
      const response = await fetch('/paciente/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pacienteData),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao cadastrar paciente');
      }
  
      navigation.navigate('login', { email });
  
    } catch (error) {
      console.error('Erro ao cadastrar paciente', error.message);
      alert('Erro ao cadastrar paciente');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logoBlue} source={require('../../assets/odonto-logo.png')} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
 onChangeText={(text) => setCpf(formatCPF(text))}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento (dd/MM/yyyy)"
        value={dataNascimento}
        onChangeText={(text) => setDataNascimento(formatDate(text))}
      />
      
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Telefone"
          value={telefone}
          onChangeText={(text) => setTelefone(formatTel(text))}
          keyboardType="phone-pad"
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <View style={{width: '100%',backgroundColor: 'transparent',borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 15}}>
        <Picker
          selectedValue={plano}
          onValueChange={(itemValue) => setPlano(itemValue)}
          style={styles.picker}
        >
          <Picker.Item style={styles.itemPicker} label="Selecione um plano" value="" enabled={false} />
          <Picker.Item style={styles.itemPicker} label="Básico" value="1" />
          <Picker.Item style={styles.itemPicker} label="Intermediário" value="2" />
          <Picker.Item style={styles.itemPicker} label="Premium" value="3" />
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
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  picker: {
    height: 53,
    width: '100%',
    backgroundColor: 'transparent',
  },
  itemPicker: {
    color: '#002353',
  }
});
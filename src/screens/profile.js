import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function Profile({ navigation }) {
    const [userId, setUserId] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [plano, setPlano] = useState('');
    const [planos, setPlanos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        const id = await AsyncStorage.getItem('userId');
        setUserId(id);

        axios.get(`http://localhost:8080/paciente/api/${id}`)
            .then((res) => {
                
            const user = res.data;

            setNome(user.nome);
            setCpf(formatCPF(user.cpf));
            setDataNascimento(formatDate(user.dataNascimento));
            setEmail(user.email);
            setTelefone(formatTel(user.telefone));
            setSenha(user.senha);
            setPlano(user.id_plano.toString());
            })
            .catch((err) => console.error('Erro ao buscar usuário:', err.message));

        axios.get(`http://localhost:8080/plano/api/`)
            .then((res) => {
            setPlanos(res.data);
            })
            .catch((err) => console.error('Erro ao buscar planos:', err.message));
        };

        fetchData();
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

    const atualizar = async () => {

        const pacienteData = {
            nome,
            cpf: cpf,
            dataNascimento: dataNascimento,
            email,
            telefone: telefone,
            senha,
            id_plano: parseInt(plano),
        };

        console.log('Dados do paciente:', pacienteData);
        
        axios.put(`http://localhost:8080/paciente/api/${userId}`, pacienteData)
        .then(() => {
            alert('Perfil atualizado com sucesso!');
        })
        .catch((error) => {
            console.error('Erro ao atualizar perfil:', error.message);
        });

        console.error('Erro ao atualizar perfil:', error.message);
    }

    const deletar = async () => {
        axios.delete(`http://localhost:8080/paciente/api/${userId}`)
            .then(async () => {
                await AsyncStorage.removeItem('userId');
                alert('Perfil excluído com sucesso!');
                navigation.navigate('login');
            })
            .catch((error) => {
                console.error('Erro ao deletar perfil:', error.message);
            });
    };

    return (
        <View style={styles.container}>

        <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="CPF" value={cpf} onChangeText={(text) => setCpf(formatCPF(text))}/>
        <TextInput style={styles.input} placeholder="Data de Nascimento" value={dataNascimento} onChangeText={(text) => setDataNascimento(formatDate(text))} />

        <View style={styles.row}>
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={[styles.input, styles.halfInput]} placeholder="Telefone" value={telefone} onChangeText={(text) => setTelefone(formatTel(text))} />
        </View>

        <TextInput style={styles.input} placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry />

        <View style={{ width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 15 }}>
            <Picker
            selectedValue={plano}
            onValueChange={(value) => setPlano(value)}
            style={styles.picker}
            >
            <Picker.Item label="Selecione um plano" value="" enabled={false} />
            {planos.map((p) => (
                <Picker.Item key={p.id} label={p.nome} value={p.id.toString()} />
            ))}
            </Picker>
        </View>

        <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#007BFF' }]} onPress={atualizar}>
            <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#FF3B30' }]} onPress={deletar}>
            <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
        </View>
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
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '48%',
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

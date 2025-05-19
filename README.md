# Odontoprev-Mobile (Em desenvolvimento)

---
## 👥 Integrantes do Grupo

- **[Diego Costa Silva RM552648](https://www.linkedin.com/in/diegocostacs/)**: Desenvolvedor Java, frontend com Thymeleaf e mobile com React.
- **[Lucas Minozzo Bronzeri RM553745](https://www.linkedin.com/in/lucas-minozzo-bronzeri-b212a4248/)**: DevOps e Machine Learning.
- **[Thaís Ribeiro Asfur RM553870](https://github.com/ThaiisRibeiro)**: Quality Assurance e API em .NET (Minimal API).

---
## NEW

Aba de visualização, atualização e deleção da conta.

![image](https://github.com/user-attachments/assets/37ddfb75-cb07-43fc-9b0e-c09f7ab69b6c)


## Screenshots

![image](https://github.com/user-attachments/assets/c06b7d19-75a1-4afb-9aa8-d849da374d6e)

![image](https://github.com/user-attachments/assets/8d9f67ee-4ad8-405d-b265-a2c8cd1a77a4)

![image](https://github.com/user-attachments/assets/0d953575-9b88-4bcc-9fe3-2e30f26809c9)

![image](https://github.com/user-attachments/assets/2e9c87fa-2b04-4ecb-bd7d-8e456aadbd01)

## 🏥 Problema

Clínicas médicas fraudam atendimentos, exames e cirurgias, enquanto clientes podem utilizar os planos de forma indevida, gerando prejuízos para a Odontoprev.

## 🔗 API utilizada

Integração com backend Java: 

- [Backend Java](https://github.com/DiegoCostaCode/Odontoprev-Java)
  - [API Paciente - controller](https://github.com/DiegoCostaCode/Odontoprev-Java/blob/master/src/main/java/com/example/Odontoprev_Java/controller/PacienteController.java)
  - [API Usuario/login - controller](https://github.com/DiegoCostaCode/Odontoprev-Java/blob/master/src/main/java/com/example/Odontoprev_Java/controller/UsuarioController.java)

## 💡 Solução

Nosso sistema end-to-end conecta a Odontoprev, clínicas e pacientes em um ecossistema integrado, facilitando auditorias e controle de informações.

- **Pacientes:** Aplicativo em React que permite agendamento de consultas e contratação de planos.
- **Backend:** Arquitetura baseada em microservices utilizando Java API + MVC, .NET Minimal API e Python para Machine Learning.
- **Web e Mobile:** A plataforma web é utilizada por clínicas, administradores e pacientes. Para pacientes, exclusivamente, há também um aplicativo mobile.

Essa solução oferece um ambiente centralizado, moderno e intuitivo para controle eficiente da Odontoprev.

## Dependências

| Pacote                                      | Versão  | Descrição                                                         |
| ------------------------------------------- | ------- | ----------------------------------------------------------------- |
| `@babel/core`                               | 7.26.10 | Transpilador JavaScript necessário para o bundler do React Native |
| `@expo/vector-icons`                        | 14.1.0  | Ícones vetoriais prontos para uso com o Expo                      |
| `@react-native-async-storage/async-storage` | 2.1.2   | Armazenamento assíncrono local                                    |
| `@react-native-community/masked-view`       | 0.1.11  | Componente necessário para navegação com máscaras (Stack)         |
| `@react-native-picker/picker`               | 2.11.0  | Componente de seleção (dropdown) nativo                           |
| `@react-navigation/bottom-tabs`             | 7.3.1   | Navegação por abas inferiores                                     |
| `@react-navigation/native`                  | 7.1.9   | Biblioteca principal de navegação                                 |
| `@react-navigation/stack`                   | 7.1.2   | Navegação empilhada (Stack Navigation)                            |
| `axios`                                     | 1.9.0   | Cliente HTTP para requisições à API                               |
| `expo`                                      | 53.0.9  | Framework e plataforma para apps React Native                     |
| `expo-status-bar`                           | 2.2.3   | Controle da barra de status no Expo                               |
| `react`                                     | 19.0.0  | Biblioteca base para construção da interface                      |
| `react-dom`                                 | 19.0.0  | Usado para compatibilidade com React Web                          |
| `react-native`                              | 0.79.2  | Framework nativo para construção de apps                          |
| `react-native-gesture-handler`              | 2.24.0  | Manipulação de gestos (toques, arrastos, etc.)                    |
| `react-native-reanimated`                   | 3.17.5  | Animações mais performáticas para React Native                    |
| `react-native-safe-area-context`            | 5.4.0   | Garante que conteúdo respeite áreas seguras (notch, status bar)   |
| `react-native-screens`                      | 4.10.0  | Otimização de performance nas telas de navegação                  |
| `react-native-web`                          | 0.20.0  | Suporte para execução do app no navegador                         |


## Diagrama de Arquitetura
![diagrama-arq](https://github.com/user-attachments/assets/aa6e1ea0-c753-4039-ab8f-8dec082cd083)

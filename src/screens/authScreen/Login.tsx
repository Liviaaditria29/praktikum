// // Login.tsx
// import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
// import React, {useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import {TextInput} from 'react-native-gesture-handler';
// import {signInWithEmailAndPassword} from 'firebase/auth';
// import {auth} from '../../firebase/config';
// import {StackNavigationProp} from '@react-navigation/stack';
// import {RootStackParamList} from '../../navigations/MainNavigator';

// type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

// const Login: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigation = useNavigation<LoginScreenNavigationProp>();

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Email dan password tidak boleh kosong!');
//       return;
//     }

//     try {
//       const res = await signInWithEmailAndPassword(auth, email, password);
//       console.log('res:', res);
//       Alert.alert('Success', 'Login berhasil!');
      
//       // Navigasi ke Root (TabNavigator)
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Root' }],
//       });

//       // Reset input
//       setEmail('');
//       setPassword('');
//     } catch (error: any) {
//       Alert.alert('Error', error.message || 'Gagal login!');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         keyboardType="email-address"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <TouchableOpacity onPress={handleLogin} style={styles.button}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//       <Text
//         style={styles.registerText}
//         onPress={() => navigation.navigate('Register')}>
//         Belum punya akun? Register
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ced4da',
//     borderRadius: 4,
//     padding: 10,
//     marginBottom: 12,
//     width: '100%',
//   },
//   button: {
//     backgroundColor: 'blue',
//     padding: 12,
//     borderRadius: 8,
//     marginTop: 8,
//     width: ' 100%',
//   },
//   buttonText: {
//     color: 'white',
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   registerText: {
//     marginTop: 12,
//     color: 'blue',
//     textDecorationLine: 'underline',
//   },
// });

// export default Login;

// Login.tsx
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigations/MainNavigator';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password tidak boleh kosong!');
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log('res:', res);
      Alert.alert('Success', 'Login berhasil!');

      // Navigasi ke Root (TabNavigator)
      navigation.reset({
        index: 0,
        routes: [{ name: 'Root' }],
      });

      // Reset input
      setEmail('');
      setPassword('');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Gagal login!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text
        style={styles.registerText}
        onPress={() => navigation.navigate('Register')}>
        Belum punya akun? Register
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 12,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Login;
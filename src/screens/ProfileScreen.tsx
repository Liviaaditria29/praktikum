import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {auth} from '../firebase/config';

type RootStackParamList = {
  Login: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  // Fungsi Logout
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('Logout berhasil');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Terjadi kesalahan saat logout', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.username}>Livia Aditria</Text> */}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: '#E88D67',
    marginBottom: 10,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;

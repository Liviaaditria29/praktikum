import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigations/MainNavigator';
import {db} from '../firebase/config';
import {doc, updateDoc} from 'firebase/firestore';

type EditScreenProps = {
  route: RouteProp<RootStackParamList, 'EditScreen'>;
  navigation: StackNavigationProp<RootStackParamList, 'EditScreen'>;
};

const EditScreen: React.FC<EditScreenProps> = ({route, navigation}) => {
  const {journey} = route.params;

  const [name, setName] = useState(journey.name);
  const [location, setLocation] = useState(journey.location);
  const [description, setDescription] = useState(journey.description || '');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSave = async () => {
    setLoading(true);
    setErrorMessage('');
    console.log('Starting update...');
    try {
      const journeyRef = doc(db, 'journeys', journey.id);
      console.log('Updating document:', journeyRef);
      await updateDoc(journeyRef, {
        name,
        location,
        description,
      });
      console.log('Journey updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Failed to update journey:', error);
      setErrorMessage('Failed to update journey. Please try again.');
    } finally {
      setLoading(false);
      console.log('Update process finished.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Journey Name"
      />
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Location"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Save Changes" onPress={handleSave} />
      )}
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default EditScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {getFirestore, collection, addDoc} from 'firebase/firestore';
import {uploadImageToCloudinary} from '../cloudinary';
import {getAuth} from 'firebase/auth';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const POSITIONSTACK_API_KEY = '2a165102363e89c4f42a1683f4e3fad7';

const getCoordinatesFromLocation = async (location: string) => {
  try {
    const response = await axios.get(
      `http://api.positionstack.com/v1/forward`,
      {
        params: {
          access_key: POSITIONSTACK_API_KEY,
          query: location,
        },
      },
    );

    if (response.data && response.data.data && response.data.data.length > 0) {
      const {latitude, longitude} = response.data.data[0];
      return {latitude, longitude};
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
};

const AddScreen = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleSelectImage = () => {
    launchImageLibrary(
      { 
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          Alert.alert('Cancelled', 'You cancelled the image picker');
        } else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Error picking image');
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          setImageUri(selectedImage.uri || null);
        }
      },
    );
  };

  const handleDateConfirm = (date: Date) => {
    setDate(date.toLocaleDateString());
    setDatePickerVisible(false);
  };

  const handleDateCancel = () => {
    setDatePickerVisible(false);
  };

  const handleJourney = async () => {
    try {
      if (!name || !location || !date || !description || !imageUri) {
        Alert.alert('Error', 'Please fill in all fields and select an image');
        return;
      }

      const auth = getAuth();
      const userId = auth.currentUser?.uid;

      if (!userId) {
        Alert.alert('Error', 'User is not authenticated');
        return;
      }

      const fetchedCoordinates = await getCoordinatesFromLocation(location);
      setCoordinates(fetchedCoordinates);

      const imageUrl = await uploadImageToCloudinary(imageUri);

      const journeyData = {
        userId,
        name,
        location,
        date,
        description,
        imageUri: imageUrl,
        coordinates: fetchedCoordinates,
      };

      const db = getFirestore();
      await addDoc(collection(db, 'journeys'), journeyData);

      Alert.alert('Success', 'Journey saved to Firebase!');
      setName('');
      setLocation('');
      setDate('');
      setDescription('');
      setImageUri(null);
      setCoordinates(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to save journey to Firebase.');
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Save your journey</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nama Tempat"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Alamat"
            value={location}
            onChangeText={setLocation}
          />
          <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
            <TextInput
              style={styles.input}
              placeholder="Tanggal"
              value={date}
              editable={false}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Deskripsi"
            value={description}
            onChangeText={setDescription}
          />

          <TouchableOpacity
            style={styles.imagePicker}
            onPress={handleSelectImage}>
            <Text style={styles.imagePickerText}>Select Image</Text>
          </TouchableOpacity>

          {imageUri && (
            <Image source={{uri: imageUri}} style={styles.imagePreview} />
          )}

          <TouchableOpacity style={styles.button} onPress={handleJourney}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Date Picker Modal */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={handleDateCancel}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#006989',
  },
  form: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    padding: 10,
    marginBottom: 25,
    backgroundColor: '#f8f9fa',
  },
  imagePickerText: {
    color: 'grey',
  },
  imagePreview: {
    height: 200,
    width: '100%',
    marginVertical: 10,
  },
  button: {
    padding: 15,
    backgroundColor: '#E88D67',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddScreen;

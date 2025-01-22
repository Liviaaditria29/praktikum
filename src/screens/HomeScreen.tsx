import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigations/MainNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Journey {
  id: string;
  name: string;
  location: string;
  imageUri: string;
  date: string;
  description: string;
  coordinates: Coordinates;
}

type DetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DetailScreen'
>;

const HomeScreen = () => {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const navigation = useNavigation<DetailScreenNavigationProp>();

  useEffect(() => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;

    if (userId) {
      const fetchJourneys = () => {
        const db = getFirestore();
        const journeysRef = collection(db, 'journeys');
        const q = query(journeysRef, where('userId', '==', userId));

        // Real-time listener
        const unsubscribe = onSnapshot(q, querySnapshot => {
          const journeysArray: Journey[] = [];
          querySnapshot.forEach(doc => {
            const journey = doc.data();
            journeysArray.push({
              id: doc.id,
              name: journey.name || '',
              location: journey.location || '',
              imageUri: journey.imageUri || '',
              date: journey.date || '',
              description: journey.description || '',
              coordinates: {
                latitude: journey.coordinates?.latitude || 0,
                longitude: journey.coordinates?.longitude || 0,
              },
            });
          });
          setJourneys(journeysArray);
        });

        return unsubscribe;
      };

      fetchJourneys();
    }
  }, []);

  const handlePress = (journey: Journey) => {
  
    navigation.navigate('DetailScreen', {journey});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View>
            <Text style={styles.username}>Hi, User</Text>
            <Text style={styles.judul}>Let's make</Text>
            <Text style={styles.judul}>your journey!</Text>
          </View>
          <Image
            source={require('../assets/icons/avatar.png')}
            style={styles.avatar}
          />
        </View>
        <View style={styles.containerCard}>
          {journeys.map(journey => (
            <TouchableOpacity
              key={journey.id}
              onPress={() => handlePress(journey)}>
              <View style={styles.card}>
                <Image source={{uri: journey.imageUri}} style={styles.image} />
                <Text style={styles.name}>{journey.name}</Text>
                <Text style={styles.location}>{journey.location}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F7EC',
  },
  scrollView: {
    padding: 16,
  },
  header: {
    alignItems: 'flex-start',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    top: 30,
    left: 5,
    color: '#006989',
  },
  judul: {
    fontSize: 50,
    top: 30,
    left: 5,
    fontWeight: 'bold',
    color: '#006989',
  },
  avatar: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: '40%',
    left: '85%',
    borderRadius: 14,
  },
  containerCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: '12%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 11,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 7,
    width: 195,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 155,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 17,
    left: 6,
    bottom: 5,
  },
  location: {
    fontSize: 15,
    left: 6,
    top: -5,
    color: 'black',
  },
});

export default HomeScreen;
 
// // DetailScreen.tsx
// import React from 'react';
// import {View, Text, Image, StyleSheet} from 'react-native';
// import {RouteProp} from '@react-navigation/native';
// import {RootStackParamList} from '../navigations/MainNavigator'; // Adjust the path to where you defined RootStackParamList

// type DetailScreenProps = {
//   route: RouteProp<RootStackParamList, 'DetailScreen'>;
// };

// const DetailScreen: React.FC<DetailScreenProps> = ({route}) => {
//   const {journey} = route.params;

//   return (
//     <View style={styles.container}>
//       <Image source={{uri: journey.imageUri}} style={styles.image} />
//       <Text style={styles.name}>{journey.name}</Text>
//       <Text style={styles.location}>{journey.location}</Text>
//       <Text style={styles.date}>{journey.date || 'No date available'}</Text>
//       <Text style={styles.description}>
//         {journey.description || 'No description available'}
//       </Text>
//       {journey.coordinates && (
//         <Text style={styles.coordinates}>
//           Coordinates: {journey.coordinates.latitude},{' '}
//           {journey.coordinates.longitude}
//         </Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 16,
//   },
//   location: {
//     fontSize: 18,
//     color: '#666',
//     marginTop: 8,
//   },
//   date: {
//     fontSize: 16,
//     marginTop: 8,
//   },
//   description: {
//     fontSize: 16,
//     marginTop: 8,
//     color: '#444',
//   },
//   coordinates: {
//     fontSize: 16,
//     marginTop: 8,
//     color: '#888',
//   },
// });

// export default DetailScreen;
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigations/MainNavigator';
import {doc, deleteDoc} from 'firebase/firestore';
import {db} from '../firebase/config'; // Pastikan path Firebase benar
import { ScrollView } from 'react-native-gesture-handler';

type DetailScreenProps = {
  route: RouteProp<RootStackParamList, 'DetailScreen'>;
  navigation: StackNavigationProp<RootStackParamList, 'DetailScreen'>;
};

const DetailScreen: React.FC<DetailScreenProps> = ({route, navigation}) => {
  const {journey} = route.params;

  // Fungsi untuk navigasi ke EditScreen
  const handleEdit = () => {
    navigation.navigate('EditScreen', {journey});
  };

  // Fungsi untuk menghapus data journey di Firebase
  const handleDelete = async () => {
    Alert.alert(
      'Delete Journey',
      'Are you sure you want to delete this journey?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const journeyRef = doc(db, 'journeys', journey.id);
              await deleteDoc(journeyRef);
              Alert.alert('Success', 'Journey deleted successfully!');
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting journey:', error);
              Alert.alert(
                'Error',
                'Failed to delete journey. Please try again.',
              );
            }
          },
        },
      ],
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{uri: journey.imageUri}} style={styles.image} />
        <Text style={styles.name}>{journey.name}</Text>
        <Text style={styles.location}>{journey.location}</Text>
        <Text style={styles.date}>{journey.date || 'No date available'}</Text>
        <Text style={styles.description}>
          {journey.description || 'No description available'}
        </Text>
        {journey.coordinates && (
          <Text style={styles.coordinates}>
            Coordinates: {journey.coordinates.latitude},{' '}
            {journey.coordinates.longitude}
          </Text>
        )}

        <View style={styles.actions}>
          <TouchableOpacity onPress={handleEdit} style={styles.actionButton}>
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
            <Text style={[styles.actionText]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '50%',
    height: 250,
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  location: {
    fontSize: 18,
    color: '#666',
    marginTop: 8,
  },
  date: {
    fontSize: 16,
    marginTop: 8,
  },
  description: {
    fontSize: 16,
    marginTop: 8,
    color: '#444',
  },
  coordinates: {
    fontSize: 16,
    marginTop: 8,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: 250,
    height: 50,
    marginTop: 24,
    backgroundColor: '#005C78',
    borderRadius: 30,
    paddingHorizontal: 16,
    top: '65%',
  },
  actionButton: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: '10%',
    marginRight: '8%',
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F3F3E0',
    marginLeft: 0,
  },
});

export default DetailScreen;

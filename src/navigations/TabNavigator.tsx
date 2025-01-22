import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from '../components/Icon';
import {colors, sizes} from '../constants/theme';
import {StyleSheet, Animated} from 'react-native';

type TabParamList = {
  Home: undefined;
  Add: undefined;
  Profile: undefined;
};

const tabs: {name: keyof TabParamList; screen: React.ComponentType<any>}[] = [
  {
    name: 'Home',
    screen: HomeScreen,
  },
  {
    name: 'Add',
    screen: AddScreen,
  },
  {
    name: 'Profile',
    screen: ProfileScreen,
  },
];

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  const offsetAnimation = React.useRef(new Animated.Value(0)).current;

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {backgroundColor: '#005C78', height: '7%'},
        }}>
        {tabs.map(({name, screen}, index) => (
          <Tab.Screen
            key={name}
            name={name}
            component={screen}
            options={{
              tabBarIcon: ({focused}) => (
                <Icon
                  icon={name}
                  size={40}
                  style={{
                    tintColor: focused ? '#E88D67' : '#F3F3E0',
                    top: '30%', width: '120%',
                  }}
                />
              ),
            }}
            listeners={{
              focus: () => {
                Animated.spring(offsetAnimation, {
                  toValue: index * (sizes.width / tabs.length),
                  useNativeDriver: true,
                }).start();
              },
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

export default TabNavigator;

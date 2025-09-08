import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Onboarding
import Splash from './src/onboarding/Splash.tsx'; 
import Onboarding01 from './src/onboarding/Onboarding01.tsx';
import Onboarding02 from './src/onboarding/Onboarding02.tsx';
import Onboarding03 from './src/onboarding/Onboarding03.tsx';
import GetStarted from './src/onboarding/GetStarted.tsx';
// Auth
import Login from './src/authentication/Login.tsx';
import SignUp from './src/authentication/SignUp.tsx';
// Main
import MainScreen from './src/main/MainScreen.tsx';
import Home from './src/main/Home.tsx';
import Movies from './src/main/Movies.tsx';
import Favourites from './src/main/Favourites.tsx';
import Profile from './src/main/Profile.tsx';
import ContactUs from './src/main/ContactUs.tsx';
import AboutUs from './src/main/AboutUs.tsx';
import AnimeDetails from './src/main/AnimeDetails';

export type RootStackParamList = {
  Splash: undefined;
  GetStarted: undefined;
  Onboarding01: undefined;
  Onboarding02: undefined;
  Onboarding03: undefined;
  Login: undefined;
  SignUp: undefined;
  MainScreen: undefined;
  Home: undefined;
  Movies: undefined;
  Favourites: undefined;
  Profile: undefined;
  ContactUs: undefined;
  AboutUs: undefined;
  AnimeDetails: { animeId: string } | undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const isDark = useColorScheme() === 'dark';
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Splash" 
          screenOptions={{ 
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        >
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="Onboarding01" component={Onboarding01} />
          <Stack.Screen name="Onboarding02" component={Onboarding02} />
          <Stack.Screen name="Onboarding03" component={Onboarding03} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Movies" component={Movies} />
          <Stack.Screen name="Favourites" component={Favourites} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ContactUs" component={ContactUs} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="AnimeDetails" component={AnimeDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

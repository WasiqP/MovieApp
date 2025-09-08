import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/colors';
import BottomTab from '../components/BottomTab';
import Home from './Home';
import Movies from './Movies';
import Favourites from './Favourites';
import Profile from './Profile';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'MainScreen'>;

const MainScreen: React.FC<Props> = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('Home');

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <Home />;
      case 'Movies':
        return <Movies />;
      case 'Favourites':
        return <Favourites />;
      case 'Profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.screenContainer}>
        {renderActiveScreen()}
      </View>
      <BottomTab activeTab={activeTab} onTabPress={setActiveTab} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  screenContainer: {
    flex: 1,
  },
});

export default MainScreen;

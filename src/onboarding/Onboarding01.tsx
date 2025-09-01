import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App.tsx';
import OnboardingCard from '../components/OnboardingCard';
import Onboarding1Svg from '../../assets/images/onboarding1.svg';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding01'>;

const Onboarding01: React.FC<Props> = ({ navigation }) => {
  return (
    <OnboardingCard
      Illustration={Onboarding1Svg}
      title="Stream Anime Anywhere"
      description="Watch sub & dub episodes, movies, and trailers across devices. Seamless syncing—pick up right where you left off."
      step={1}
      total={3}
      onNext={() => navigation.navigate('Onboarding02')}
      onSkip={() => navigation.replace('Login')}
    />
  );
};

export default Onboarding01;

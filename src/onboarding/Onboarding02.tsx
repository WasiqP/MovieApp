import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App.tsx';
import OnboardingCard from '../components/OnboardingCard';
import Onboarding2Svg from '../../assets/images/onboarding2.svg';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding02'>;

const Onboarding02: React.FC<Props> = ({ navigation }) => {
  return (
    <OnboardingCard
      Illustration={Onboarding2Svg}
      title="Adaptive HD Quality"
      description="Enjoy crisp HD, auto-adjusted for your connection. Fast seeks, no buffering—perfect for movie marathons."
      step={2}
      total={3}
      onNext={() => navigation.navigate('Onboarding03')}
      onSkip={() => navigation.replace('Login')}
    />
  );
};

export default Onboarding02;

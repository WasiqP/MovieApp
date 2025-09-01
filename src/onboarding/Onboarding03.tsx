import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App.tsx';
import OnboardingCard from '../components/OnboardingCard';
import Onboarding3Svg from '../../assets/images/onboarding3.svg';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding03'>;

const Onboarding03: React.FC<Props> = ({ navigation }) => {
  return (
    <OnboardingCard
      Illustration={Onboarding3Svg}
      title="Curated For Otakus"
      description="AI-powered recommendations, seasonal charts & watchlists so you discover new favorites instantly."
      step={3}
      total={3}
  onNext={() => navigation.replace('GetStarted')}
      nextLabel="Get Started"
    />
  );
};

export default Onboarding03;

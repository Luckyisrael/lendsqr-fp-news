import { StackNavigationProp } from '@react-navigation/stack';
import { moderateScale } from 'lib/ResponsiveSize';

import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

import { Text, Screen, Button } from '../../lib';
import { colors } from 'constants/theme';

interface OnboardingScreenProps {
  navigation: StackNavigationProp<any, 'Onboarding'>;
}

interface CarouselItem {
  image: any;
  header: string;
  description: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const carouselItems: CarouselItem[] = [
    {
      image: require('../../assets/icon.png'),
      header: `Stay Connect.${'\n'}Everywhere, Anytime!`,
      description:
        'welcome to PFNews your ultimate destination for breaking news, exclusive stories and tailored content.',
    },
    {
      image: require('../../assets/icon.png'),
      header: `Become a savvy${'\n'}Global Citizen.`,
      description: 'Discover tailored news that align with your interest and preferences',
    },
    {
      image: require('../../assets/icon.png'),
      header: `Enhance your${'\n'}News Journey Now.`,
      description: 'youre not welcomed to the app',
    },
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / SCREEN_WIDTH);
    setActiveIndex(newIndex);
  };

  const handleContinue = () => {
    if (activeIndex < carouselItems.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (activeIndex + 1) * SCREEN_WIDTH,
        animated: true,
      });
    } else {
      console.log('Onboarding completed');
    }
  };

  const handleComplete = () => {
    navigation.replace('SignUp');
  };

  return (
    <Screen safeAreaEdges={['top', 'bottom']} contentContainerStyle={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {carouselItems.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text family="bold" size={40}>
              {item.header}
            </Text>
            <Text family="light" size={16}>
              {item.description}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {carouselItems.map((_, index) => (
          <View
            key={index}
            style={[styles.paginationDot, index === activeIndex && styles.paginationDotActive]}
          />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button label="Skip" onPress={handleComplete} length="47%" variant="secondary" />
        <Button
          label={activeIndex === carouselItems.length - 1 ? 'Get Started' : 'Continue'}
          onPress={activeIndex === carouselItems.length - 1 ? handleComplete : handleContinue}
          length="47%"
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.8,
    resizeMode: 'contain',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 8,
  },
  paginationDotActive: {
    backgroundColor: colors.theme.secondary100,
    width: moderateScale(10),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(18),
    marginTop: moderateScale(18),
    marginBottom: moderateScale(18),
  },
});

export default OnboardingScreen;

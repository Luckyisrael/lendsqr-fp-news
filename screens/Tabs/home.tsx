import { Ionicons } from '@expo/vector-icons';
import CategorizedNewsComponent from 'components/categorizedNewsComponent';
import NewsItem from 'components/newsItem';
import { fontSize } from 'constants/theme';
import { trackScreenPerformance } from 'helpers/firebaseConfig';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { Screen, Text } from 'lib';
import { moderateScale } from 'lib/ResponsiveSize';
import React, { useRef, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import { fetchNewsAsync } from 'redux/newsSlice';
import { Article } from 'types';

const logo = require('../../assets/icon.png');
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH * 0.8;

const newsItems = [
  {
    id: '1',
    title: 'Breaking News 1',
    details: 'This is the first news item with some details about the story.',
    imageUrl: 'https://via.placeholder.com/400x500',
  },
  {
    id: '2',
    title: 'Tech Update',
    details: 'Latest developments in the world of technology and innovation.',
    imageUrl: 'https://via.placeholder.com/400x500',
  },
  {
    id: '3',
    title: 'Sports Highlight',
    details: 'Exciting results from recent sports events and tournaments.',
    imageUrl: 'https://via.placeholder.com/400x500',
  },
  // Add more items as needed
];

const HomeScreen: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const dispatch = useAppDispatch();
  const { articles, status, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    const stopTracking = trackScreenPerformance('SomeScreen');
    return stopTracking;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      scrollX.setValue(0);
      Animated.timing(scrollX, {
        toValue: newsItems.length * ITEM_WIDTH,
        duration: 20000,
        useNativeDriver: true,
      }).start();
    }, 21000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNewsAsync());
    }
  }, [status, dispatch]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    scrollX.setValue(scrollPosition);
  };

  if (status === 'loading') {
    console.log('Loading');
  }

  if (status === 'failed') {
    console.log('failed', status);
  }

  return (
    <Screen safeAreaEdges={['top']} contentContainerStyle={styles.container} preset="scroll">
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={logo} resizeMode="contain" style={styles.image} />
          <Text size={fontSize.small} family="bold">
            PF News
          </Text>
        </View>
        <Ionicons name="invert-mode" size={24} color="black" />
      </View>
      <View style={styles.content}>
        <View style={styles.latestNews}>
          <View style={styles.newsHeader}>
            <Text family="bold" size={fontSize.large}>
              Latest News
            </Text>
            <TouchableOpacity>
              <Text>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={styles.scrollViewContent}>
            {newsItems.map((item, index) => {
              const inputRange = [
                (index - 1) * ITEM_WIDTH,
                index * ITEM_WIDTH,
                (index + 1) * ITEM_WIDTH,
              ];
              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1, 0.8],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  key={item.id}
                  style={[styles.itemContainer, { transform: [{ scale }] }]}>
                  <NewsItem title={item.title} details={item.details} imageUrl={item.imageUrl} />
                </Animated.View>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.categorizedNews}>{/* <CategorizedNewsComponent /> */}</View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(24),
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  image: {
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: 50,
  },
  content: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: (SCREEN_WIDTH - ITEM_WIDTH) / 2,
  },
  itemContainer: {
    width: ITEM_WIDTH,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(24),
  },
  latestNews: {
    flex: 1,
  },
  categorizedNews: {
    flex: 2,
  },
});

export default HomeScreen;

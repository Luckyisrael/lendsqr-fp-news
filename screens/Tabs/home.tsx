import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CategorizedNewsComponent from 'components/categorizedNewsComponent';
import NewsItem from 'components/newsItem';
import { fontSize } from 'constants/theme';
import { trackScreenPerformance } from 'helpers/firebaseConfig';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { Screen, Text } from 'lib';
import { moderateScale, verticalScale } from 'lib/ResponsiveSize';
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
  ActivityIndicator,
} from 'react-native';
import { fetchNewsAsync } from 'redux/newsSlice';

const logo = require('../../assets/icon.png');
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH * 0.8;

const HomeScreen: React.FC = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { articles, status, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    const stopTracking = trackScreenPerformance('HomeScreen');
    return stopTracking;
  }, []);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNewsAsync());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      scrollX.setValue(0);
      Animated.timing(scrollX, {
        toValue: articles.length * ITEM_WIDTH,
        duration: 20000,
        useNativeDriver: true,
      }).start();
    }, 21000);

    return () => clearInterval(timer);
  }, [articles]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    scrollX.setValue(scrollPosition);
  };

  const filteredArticles = articles.filter((article) => article.urlToImage);

  const navigateToNewsDetail = (article) => {
    navigation.navigate('NewsDetail', { article });
  };
  if (status === 'loading') {
    return(
      <ActivityIndicator size='large' />
    )
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
            {filteredArticles.map((item, index) => {
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
                  key={item.url}
                  style={[styles.itemContainer, { transform: [{ scale }] }]}>
                  <TouchableOpacity onPress={() => navigateToNewsDetail(item)}>
                    <NewsItem title={item.title} url={item.url} urlToImage={item.urlToImage} />
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.categorizedNews}>
          <CategorizedNewsComponent />
        </View>
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
    height: verticalScale(300)
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

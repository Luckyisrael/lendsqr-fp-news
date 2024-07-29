import { useNavigation } from '@react-navigation/native';
import { colors } from 'constants/theme';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { Text } from 'lib';
import { moderateScale } from 'lib/ResponsiveSize';
import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { fetchNewsAsync } from 'redux/newsSlice';
import { Article } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH * 0.45; 
const ITEM_HEIGHT = ITEM_WIDTH * 1.2;

interface NewsItem {
  id: string;
  title: string;
  details: string;
  imageUrl: string;
  category: string;
}

const categories = ['Lendsqr', 'Health', 'Technology', 'Finance', 'Space'];

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Lendsqr Expands Operations',
    details: 'Lendsqr announces expansion into new markets.',
    imageUrl: 'https://via.placeholder.com/400x500',
    category: 'Lendsqr',
  },
  {
    id: '2',
    title: 'Lendsqr Expands Operations',
    details: 'Lendsqr announces expansion into new markets.',
    imageUrl: 'https://via.placeholder.com/400x500',
    category: 'Lendsqr',
  },
  {
    id: '3',
    title: 'Lendsqr Expands Operations',
    details: 'Lendsqr announces expansion into new markets.',
    imageUrl: 'https://via.placeholder.com/400x500',
    category: 'Lendsqr',
  },
  {
    id: '4',
    title: 'New Health Guidelines',
    details: 'WHO releases new health guidelines for pandemic prevention.',
    imageUrl: 'https://via.placeholder.com/400x500',
    category: 'Health',
  },
  {
    id: '5',
    title: 'New Health Guidelines',
    details: 'WHO releases new health guidelines for pandemic prevention.',
    imageUrl: 'https://via.placeholder.com/400x500',
    category: 'Health',
  },
  {
    id: '6',
    title: 'New Health Guidelines',
    details: 'WHO releases new health guidelines for pandemic prevention.',
    imageUrl: 'https://via.placeholder.com/400x500',
    category: 'Health',
  },
  {
    id: '7',
    title: 'New Health Guidelines',
    details: 'WHO releases new health guidelines for pandemic prevention.',
    imageUrl: 'https://via.placeholder.com/400x500',
    category: 'Health',
  },
  // Add more items for each category...
];

const CategorizedNewsComponent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { articles, status, error } = useAppSelector((state) => state.news);

  const filteredNews = newsItems.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNewsAsync());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  console.log('Articles: ', articles)


  const renderNewsItem = (item: NewsItem) => (
    <TouchableOpacity
      key={item.id}
      style={styles.newsItem}
      onPress={() => navigation.navigate('NewsDetail', { ariticles: item })}>
      <ImageBackground
        source={{ uri: item.imageUrl }}
        style={styles.image}
        imageStyle={styles.imageStyle}>
        <View style={styles.overlay}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.details} numberOfLines={2}>
              {item.details}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category)}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView contentContainerStyle={styles.newsContainer} showsVerticalScrollIndicator={false}>
        {filteredNews.map(renderNewsItem)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  categoriesContainer: {
    flexGrow: 0,
    marginBottom: 10,
    marginLeft: moderateScale(24),
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedCategory: {
    backgroundColor: colors.theme.secondary200,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  newsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginHorizontal: moderateScale(18),
    paddingBottom: moderateScale(40),
    paddingTop: moderateScale(10),
  },
  newsItem: {
    width: '100%',
    height: moderateScale(150),
    marginBottom: 15,
  },
  image: {
    flex: 1,
    justifyContent: 'space-between',
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageStyle: {
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  detailsContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  details: {
    color: 'white',
    fontSize: 12,
  },
});

export default CategorizedNewsComponent;

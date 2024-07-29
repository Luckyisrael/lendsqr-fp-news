import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { colors } from 'constants/theme';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { Text } from 'lib';
import { moderateScale } from 'lib/ResponsiveSize';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { fetchNewsAsync } from 'redux/newsSlice';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH * 0.45; 
const ITEM_HEIGHT = ITEM_WIDTH * 1.2;

interface Article {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

const CategorizedNewsComponent: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState('All');
  const [sources, setSources] = useState<string[]>(['All']);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { articles, status, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNewsAsync());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (articles.length > 0) {
      const articlesWithImages = articles.filter(article => article.urlToImage);
      const uniqueSources = ['All', ...new Set(articlesWithImages.map(article => article.source.name))];
      setSources(uniqueSources);
    }
  }, [articles]);

  const filteredNews = selectedSource === 'All'
    ? articles.filter(item => item.urlToImage)
    : articles.filter(item => item.source.name === selectedSource && item.urlToImage);

  if (status === 'loading') {
    return <ActivityIndicator size='large' />;
  }

  if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }

  const renderNewsItem = (item: Article) => (
    <TouchableOpacity
      key={item.url}
      style={styles.newsItem}
      onPress={() => navigation.navigate('NewsDetail', { article: item })}>
      <ImageBackground
        source={{ uri: item.urlToImage }} 
        style={styles.image}
        imageStyle={styles.imageStyle}>
        <View style={styles.overlay}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.details} numberOfLines={2}>
              {item.description}
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
        {sources.map((source) => (
          <TouchableOpacity
            key={source}
            style={[
              styles.categoryButton,
              selectedSource === source && styles.selectedCategory,
            ]}
            onPress={() => setSelectedSource(source)}>
            <Text
              style={[
                styles.categoryText,
                selectedSource === source && styles.selectedCategoryText,
              ]}>
              {source}
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

export default CategorizedNewsComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
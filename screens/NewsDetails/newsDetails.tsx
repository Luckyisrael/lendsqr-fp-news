import { RouteProp } from '@react-navigation/native';
import { trackScreenPerformance } from 'helpers/firebaseConfig';
import { ParallaxScrollView, Text } from 'lib';
import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

interface NewsItem {
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

type NewsDetailScreenProps = {
  route: RouteProp<{ NewsDetail: { article: NewsItem } }, 'NewsDetail'>;
};

const NewsDetailScreen = ({ route }: NewsDetailScreenProps) => {
  const { article } = route.params;

  useEffect(() => {
    const stopTracking = trackScreenPerformance('NewsDetailScreen');
    return stopTracking;
  }, []);

  if (!article) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: Article data not found</Text>
      </View>
    );
  }
  console.log('Articla: ', article.content)

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        article.urlToImage ? (
          <Image source={{ uri: article.urlToImage }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.placeholderImage]}>
            <Text style={styles.placeholderText}>No Image Available</Text>
          </View>
        )
      }>
      <View style={styles.content}>
        <Text style={styles.title}>{article.title || 'No Title'}</Text>
        <Text style={styles.author}>{article.author || 'Unknown Author'}</Text>
        <Text style={styles.date}>
          {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'No Date'}
        </Text>
        <Text style={styles.description}>{article.description || 'No Description'}</Text>
        <Text style={styles.fullContent}>{article.content || 'No Content'}</Text>
      </View>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  placeholderImage: {
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 15,
  },
  fullContent: {
    fontSize: 16,
    lineHeight: 22,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default NewsDetailScreen;

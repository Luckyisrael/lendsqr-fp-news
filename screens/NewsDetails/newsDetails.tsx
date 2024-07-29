import { RouteProp } from '@react-navigation/native';
import { ParallaxScrollView, Text } from 'lib';
import React, { useEffect} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { trackScreenPerformance } from 'helpers/firebaseConfig';

interface NewsItem {
  id: string;
  title: string;
  details: string;
  imageUrl: string;
  category: string;
}

type NewsDetailScreenProps = {
  route: RouteProp<{ NewsDetail: { item: NewsItem } }, 'NewsDetail'>;
};

const NewsDetailScreen = ({ route }: NewsDetailScreenProps) => {
  const { item } = route.params;
   useEffect(() => {
    const stopTracking = trackScreenPerformance('SomeScreen');
    return stopTracking;
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Image source={{ uri: item.imageUrl }} style={styles.image} />}>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.details}>{item.details}</Text>
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 10,
  },
  details: {
    fontSize: 18,
    lineHeight: 24,
  },
});

export default NewsDetailScreen;

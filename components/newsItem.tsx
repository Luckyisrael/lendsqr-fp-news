import React from 'react';
import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'lib';
import { fontSize } from 'constants/theme';

interface NewsItemProps {
  title: string;
  details: string;
  imageUrl: string;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 1.2;

const NewsItem = ({ title, details, imageUrl }: NewsItemProps) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <View style={styles.titleContainer}>
            <Text family='bold' size={fontSize.extraLarge} style={styles.title}>{title}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.details} numberOfLines={2} family='light' size={fontSize.medium} >
              {details}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '60%',
    marginHorizontal: 10,
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
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  detailsContainer: {
    padding: 10,
  },
  details: {
    color: 'white'
  },
});

export default NewsItem;
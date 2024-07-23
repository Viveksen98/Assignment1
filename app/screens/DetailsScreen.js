// screens/DetailsScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DetailsScreen = ({ route }) => {
  const { movie } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.image.original }} style={styles.image} />
      <Text style={styles.title}>{movie.name}</Text>
      <Text style={styles.summary}>{movie.summary.replace(/<[^>]*>?/gm, '')}</Text>
      {/* Add more movie details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  summary: {
    fontSize: 16,
  },
});

export default DetailsScreen;

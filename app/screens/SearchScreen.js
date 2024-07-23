// screens/SearchScreen.js
import React, { useState } from 'react';
import { View, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = () => {
    axios.get(`https://api.tvmaze.com/search/shows?q=${search}`)
      .then(response => setMovies(response.data))
      .catch(error => console.error(error));
  };

  const renderMovie = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { movie: item.show })}>
      <View style={styles.movieContainer}>
        <Image source={{ uri: item.show.image.medium }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.show.name}</Text>
          <Text style={styles.summary}>{item.show.summary.replace(/<[^>]*>?/gm, '')}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a movie..."
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={item => item.show.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
  },
  movieContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 150,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  summary: {
    fontSize: 14,
  },
});

export default SearchScreen;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import HomeAi from './Components/HomeAi'

const App = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const languages = ['HTML', 'CSS', 'Python', 'Ruby', 'JavaScript', 'Java', 'Swift', 'PHP', 'Angular', 'C++', 'React', 'Vue',];
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Code Genius</Text>
      <ScrollView contentContainerStyle={styles.suggestedContainer}>
        <View style={styles.cardRow}>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>Summary</Text>
            <Text style={styles.cardSubText}>Summarize the code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>Code Snippets</Text>
            <Text style={styles.cardSubText}>HTML, CSS, Python, etc</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardRow}>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>Algorithm analysis</Text>
            <Text style={styles.cardSubText}>Effective Algorithm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>Generate document</Text>
            <Text style={styles.cardSubText}>Generate documentation for code</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardRow}>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>Project Ideas</Text>
            <Text style={styles.cardSubText}>Explore new ideas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>Promotion</Text>
            <Text style={styles.cardSubText}>Draft an email</Text>
          </TouchableOpacity>
        </View>


        {/* Popular language */}

        <View style={styles.searchContainer}>
          <Text style={styles.popularSearchesTitle}>Popular searches</Text>

          <View style={styles.languageContainer}>
            {languages.map((language, index) => (
              <TouchableOpacity key={index} style={styles.languageButton}>
                <Text style={styles.languageText}>{language}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.languageContainer}>
            {/* Add more language buttons here */}
          </View>
        </View>

        <View style={styles.explainContainer}>
          <Text style={styles.explainText}>Explain & Clarify</Text>
          <View style={styles.explainBox}>
            <Text style={styles.explainQuestion}></Text>
            <Image source={{ uri: 'https://example.com/flashlight-icon.png' }} style={styles.flashlightIcon} />
          </View>
        </View>

        {/* <View style={styles.homeAi}>
        </View> */}

      </ScrollView>

      {/* <Text>hi</Text> */}
      <View style={styles.HomeAi}>
        <HomeAi />
      </View>
      {/* <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search code snippets"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={'#000'}
          
          />
          <TouchableOpacity>
          <Text style={styles.backArrow}>🔎</Text>
          </TouchableOpacity>
          </View> */}


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#333',
    paddingHorizontal: 5,
  },
  header: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  suggestedContainer: {
    alignItems: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  card: {
    width: '48%',
    backgroundColor: '#444',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  cardSubText: {
    fontSize: 12,
    color: 'lightgrey',
  },
  explainContainer: {
    marginTop: 20,
  },
  explainText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  explainBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    borderRadius: 10,
    padding: 10,
  },
  explainQuestion: {
    flex: 1,
    color: 'white',
  },
  flashlightIcon: {
    width: 20,
    height: 20,
  },
  searchContainer: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#D5C7BC',
    marginTop: 20
  },

  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backArrow: {
    fontSize: 24,
    color: '#000',
    paddingRight: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#D5C7BC'
  },
  languageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  languageButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  languageText: {
    color: '#000',
  },
  popularSearchesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },

  HomeAi: {
    // // width:400,
    // borderRadius:20,
    // width:'auto',
    // // bottom:0,


  }
});

export default App;

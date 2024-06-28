import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import HomeAi from './Components/HomeAi';
import Summary from './Components/Summery';
const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentScreen, setCurrentScreen] = useState<'home' | 'summary'>('home');

  const languages: string[] = ['HTML', 'CSS', 'Python', 'Ruby', 'JavaScript', 'Java', 'Swift', 'PHP', 'Angular', 'C++', 'React', 'Vue'];

  const renderHomeScreen = () => (
    <View style={styles.container}>
      <Text style={styles.header}>Code Genius</Text>
      <ScrollView contentContainerStyle={styles.suggestedContainer}>
        <View style={styles.cardRow}>
          <TouchableOpacity style={styles.card} onPress={() => setCurrentScreen('summary')}>
            <Text style={styles.cardText}>Summary</Text>
            <Text style={styles.cardSubText}>Summarize the code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} >
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
      </ScrollView>

      <View style={styles.HomeAi}>
        <HomeAi />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {currentScreen === 'home' ? renderHomeScreen() : <Summary onBack={() => setCurrentScreen('home')} />}
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
  searchContainer: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#D5C7BC',
    marginTop: 20,
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
    // Your styles for the HomeAi component
  },
});

export default App;

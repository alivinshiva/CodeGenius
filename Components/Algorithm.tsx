import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, ActivityIndicator, Platform, Keyboard, TouchableWithoutFeedback, SafeAreaView } from 'react-native';

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

interface codeProps {
  onBack: () => void;
}

const Algorithm: React.FC<codeProps> = ({ onBack }) => {
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash-001',
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [
          {
            role: 'user',
            parts: [
              {
                text: `By acting as a professional coder/programmer, answer ${searchQuery}`,
              },
            ],
          },
        ],
      });

      const result = await chatSession.sendMessage('Generate response');
      const generatedResponse = await result.response.text();
      setResponse(generatedResponse);
    } catch (err) {
      setError('Error generating response. Please try again.');
      console.error('Error generating response:', err);
    }
    setLoading(false);
  };

  const handleBack = () => {
    setResponse('');
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
              <View style={styles.circleButton}>
                <Text style={styles.backButtonText}>{'<<'}</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.header}>Code Snippets</Text>
          </View>
          {/* <Text style={styles.content}>This is the summary page where you can summarize your code.</Text> */}
          {response && (
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>Clear</Text>
            </TouchableOpacity>
          )}

          <ScrollView contentContainerStyle={styles.scrollViewContainer}>

            <View style={styles.response}>
              {loading && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#000000" />
                  <Text style={styles.loadingText}>Loading...</Text>
                </View>
              )}
              {error && <Text style={styles.errorText}>{error}</Text>}
              {response && (
                <TouchableOpacity>

                  <View style={styles.responseContainer}>
                    <Text style={styles.responseText}>{response}</Text>
                  </View>
                </TouchableOpacity>

              )}
            </View>
          </ScrollView>

          <View style={styles.searchSectionContainer}>
            <View style={styles.searchSection}>
              <TextInput
                style={styles.searchInput}
                placeholder="Summarize your code"
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#000"
              />
              <TouchableOpacity onPress={handleSearch}>
                <Text style={styles.searchArrow}>{">>"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: 'white',
  },
  circleButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  response: {
    flex: 1,
    borderRadius: 20,
    padding: 10,
  },
  responseContainer: {
    marginTop: 10,
    padding: 5,
    borderRadius: 20,
  },
  responseText: {
    fontSize: 16,
    color: 'white',
  },
  loadingText: {
    fontSize: 18,
    color: 'black',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    marginTop: 20,
    fontSize: 18,
    color: 'red',
  },
  searchSectionContainer: {
    marginBottom: 5,
    paddingHorizontal:5
    // backgroundColor: 'white',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D5C7BC',
    borderRadius: 20,
    // bottom:45
    // padding: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
  },
  searchArrow: {
    fontSize: 24,
    color: '#000',
    paddingRight: 10,
  },
  backButton: {
    // backgroundColor:"black"
  },
  backButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default Algorithm;

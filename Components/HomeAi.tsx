import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const HomeAi = () => {
    // const {
    //     GoogleGenerativeAI,
    //     HarmCategory,
    //     HarmBlockThreshold,
    //   } = require("@google/generative-ai");
    const apiKey = ""
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

    const [searchQuery, setSearchQuery] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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
        <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.container}>
                    {response && (
                        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                            <Text style={styles.backButtonText}>Back</Text>
                        </TouchableOpacity>
                    )}
                    <ScrollView style={styles.response}>
                        {loading && <Text style={styles.loadingText}>Loading...</Text>}
                        {error && <Text style={styles.errorText}>{error}</Text>}
                        {response && (
                            <View style={styles.responseContainer}>
                                <Text style={styles.responseText}>{response}</Text>
                            </View>

                        )}
                        {/* {response && (
                            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                                <Text style={styles.backButtonText}>Back</Text>
                            </TouchableOpacity>
                        )} */}
                    </ScrollView>
                    <View style={styles.searchSection}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search code snippets"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholderTextColor="#000"
                        />
                        <TouchableOpacity onPress={handleSearch}>
                            <Text style={styles.searchArrow}>🔎</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>


    );
};


const styles = StyleSheet.create({
    wrapper: {
        // flex: 1,
        marginBottom: 30,
        paddingBottom: 13,

    },
    container: {
        // flexGrow: 1,
        // justifyContent: 'space-between',
        // padding: 20,
        // backgroundColor: '#fff',
        // marginBottom:10
    },
    scrollView: {
        flexGrow: 1,
        borderRadius: 20

    },
    response: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: '#D5C7BC',
        // padding: 10,
        marginBottom: 10,
    },
    responseContainer: {
        marginTop: 10,
        padding: 5,
        backgroundColor: '#D5C7BC',
        borderRadius: 20,
    },
    responseText: {

        fontSize: 16,
        color: 'black',
    },
    loadingText: {
        fontSize: 18,
        color: 'black',
    },
    errorText: {
        marginTop: 20,
        fontSize: 18,
        color: 'red',
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        // padding: 10,
        // backgroundColor: '#fff',
        // borderTopWidth: 1,
        // borderTopColor: '#ccc',

    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#D5C7BC',
    },
    searchArrow: {
        fontSize: 24,
        color: '#000',
        paddingRight: 10,
    },
    backButton: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default HomeAi;

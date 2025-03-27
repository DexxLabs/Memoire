import { FlatList, StatusBar, StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { color } from '../assets/data/colors';
import { f } from '../assets/data/fonts';

const MainScreen = () => {
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={color.bg} />
      

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.noteItem} >
            <Text style={styles.noteTitle}>{item.title || 'Untitled'}</Text>
            <Text style={styles.noteContent} numberOfLines={2}>{item.content}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<>
        <View style={{backgroundColor:color.bg,padding:20,alignItems: 'center'}}>
      <Text style={styles.headerText}>MEMOIRE</Text>
      </View>
        </>

        }
        extraData={notes}
      />

      <TouchableOpacity onPress={()=>{navigation.navigate("Note", {title : 'New Note', content : ''})}} style={styles.newButton}>
        <Image style={styles.plusButton} source={require('../assets/images/plus.png')} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg,
    paddingHorizontal: 12,
  },
  headerText: {
    fontFamily: f.black,
    fontSize: 16,
    color: color.text2,
    letterSpacing: 4,

  },
  noteItem: {
    backgroundColor: '#363737',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  noteContent: {
    fontSize: 14,
    color: 'white',
  },
  plusButton: {
    width: 15,
    height: 15,
  },
  newButton: {
    backgroundColor: color.accent,
    borderRadius: 10,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
});

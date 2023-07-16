import React, { useEffect, useState } from 'react';
import { View, Text, Alert, Button, Image, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';


const ProfilePage = ({ navigation, route }) => {

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const access_token = await AsyncStorage.getItem("access_token");
        const userResponse = await axios.post('http://192.168.100.30:5001/my-api-de05b/us-central1/gitGithubProfile', {
          access_token: access_token
        });
        if (userResponse.status === 200) {
          setUserInfo(userResponse.data);
        }
      } catch (error) {
        Alert.alert("error", error.message)
      }
    };

    fetchUserInfo();
  }, []);


  return (
    <ScrollView>
    <View style={styles.background}>
      {userInfo ? (
        <>
          <View style={styles.bb}>
            <View style={styles.container}>
                <Image style={styles.avatar} source={{ uri: userInfo.avatar_url }} />
            </View>
            <Text style={styles.username}>{userInfo.login}</Text>
          </View>
          <Text style={styles.name}><Text style={styles.bold}>Name:  </Text>{userInfo.name}</Text>
          <Text style={styles.name}><Text style={styles.bold}>Bio:  </Text>{userInfo.bio}</Text>
          <Text style={styles.name}><Text style={styles.bold}>Company:  </Text>{userInfo.company}</Text>
          <Text style={styles.name}><Text style={styles.bold}>Location:  </Text>{userInfo.location}</Text>
          <Text style={styles.name}  key={userInfo.id}><Text style={styles.bold}>Repositories:  </Text>{userInfo.public_repos}</Text>
          <Text style={styles.name}><Text style={styles.bold}>Contributions:  </Text>{userInfo.contributions}</Text>
          <View style={styles.button}>
            <View style={styles.star}>
              <Button 
              title='Starred' color='#DD7B88'
              onPress={()=>{
                navigation.navigate('Star');
              }}/>
            </View>
          </View>
        </>
      ) : (
        <Text style={styles.name}>Loading user information...</Text>
      )}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create ({
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    //borderColor: '#000000',
    //borderWidth:3,
  },
  username: {
    fontSize: 30,
    fontWeight: 'bold',
    color:'#DD7B88',
    paddingLeft:65,
    paddingBottom:5,
  },
  name: {
    fontSize: 16,
    color:'#FFB5A7',
    padding:10,
  },
  
  button: {
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 10,
    paddingTop:30,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:10,
    paddingTop:10,

  },
  background:{
    backgroundColor: '#F8EDEB',
    paddingBottom:50,
  },
  star:{
    backgroundColor:'#FFFFFF',
    padding:10,
  },
  bold:{
    fontSize: 18,
    fontWeight: 'bold',
    color:'#DD7B88',
  },
  bb:{
    backgroundColor:'#FCD5CE'
  }
});

export default ProfilePage;
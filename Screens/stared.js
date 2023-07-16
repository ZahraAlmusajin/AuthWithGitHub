import React, { useEffect, useState } from 'react';
import { View, Alert, Text , StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

export default function StarredScreen() {

    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                /* 1. get access token from async storage */
                const access_token = await AsyncStorage.getItem('access_token');

                /* 2. call github api with token to get the starred repo */
                const response = await axios.post('http://192.168.100.30:5001/my-api-de05b/us-central1/gitGithubStarredRepos', {
                    access_token: access_token
                });

                if (response.status === 200) {
                    /* 3. update state for repo and state for loading */
                    const starredRepos = response.data;
                    setRepos(starredRepos);
                    setLoading(false);
                }
            } catch (error) {
                Alert.alert(error);
            }
        }
        fetchRepos()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Starred repositories are:</Text>
            </View>
            <View >
                {repos.length>0?(
                    repos.map(repo =>(
                        <Text style={styles.star} key={repo.id}>{repo.name}</Text>
                    ))
                ):(
                    <Text style={styles.star}>Loading user information...</Text>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8EDEB',
      padding:20,
      paddingTop:50

    },
    star:{
        fontSize: 18,
        color:'#FFB5A7',
        paddingTop:10,
        
    },
    title:{
        fontSize: 20,
        fontWeight:'bold',
        color:'#DD7B88'
    },
    box:{
        backgroundColor: '#F9DCC4',
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 10,
        padding: 10
    }
});
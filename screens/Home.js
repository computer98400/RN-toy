import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Text, Button, Image} from 'react-native';
import { useSelector, useStore } from 'react-redux';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import { positionContain } from '../reducer';
export default function Home({ navigation }) {
  const position = useSelector((state) => state.posreducer );
  const [markers, setMarkers] = useState([]);
  const [temp, setTemp] = useState(null);
  const markerRef = useRef();
  const store = useStore();
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(store.getState().userreducer);

    axios.get('http://k6c102.p.ssafy.io:8080/v1/message/11/fetchUncheckedMesaages')
      .then(json => {
        let received = [];
        // console.log("markers test : ",json);
        json.data.map((single) => {
          received.push(single);
        });
        setMarkers(received);
      })
      .catch(err => {
        console.log(err);
      })
    
    
    
    Geolocation.getCurrentPosition(
      position => {
        store.dispatch(positionContain(position.coords.latitude, position.coords.longitude))
      },
     error => {
        // See error code charts below.
        console.log(error.code, error.message);
      }, 
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  useEffect(() => {
    console.log(user);
  },[user])

  useEffect(() => {
    //마커 확인용.
    markers.map((single, idx) => {
      // console.log("idx : ",idx," ",single.latitude," ", single.longitude);
    })
  }, [markers])
  function clicktest(e, id) {
    console.log(id);
  }

  return (
    <View style={styles.allcontainer}>
          <View style={styles.headcontainer}>
        <Image style={styles.imgstyle} source={{ uri: user ? user.profileUrl : ``}} />
        <Text style={{marginTop: 5,alignSelf: 'center'}}>{ user? user.nickname : `로그인 처리가 안됫습니다.`}</Text>
      </View>

      <View style={styles.mapcontainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: position.lat,
            longitude: position.lng,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showsUserLocation={true}
          followsUserLocation={ true}
        >
          {markers.map((single, idx) => {
            //제약 시간 - 현재 시간을 표시
            return <Marker ref={markerRef} key={idx} onPress={(e) => { clicktest(e.currentTarget, single.messageId) }} title={`제목 : ${single.title}` } description={`${new Date()}, ${Math.abs(Math.floor((new Date() - new Date(single.dueTime[0], single.dueTime[1]-1,single.dueTime[2],single.dueTime[3],single.dueTime[4],single.dueTime[5]))/3600))}시간 후에 볼 수 있습니다.`} icon={single.type == 0 ? secret : null} coordinate={{ latitude: single.latitude, longitude: single.longitude }}><Image source={{uri:single.senderProfileUrl}} style={{height: 35, width:35 ,borderRadius:100}} /></Marker>
          })}
          </MapView>
      </View>
      <View style={styles.messageContainer}>
        {markers.length != 0 ? <Text style={{alignSelf:'center', marginTop:5}}>확인 안한 메세지가 {markers.length }개 있습니다</Text> : <Text style={{alignSelf:'center', marginTop:5}}>메세지를 기다리는 중이에요</Text> }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    allcontainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    },
    mapcontainer: {
      height: 300,
      width: 350,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: 30
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    btnContainer: {
      marginTop: 30,
    },
    headcontainer: {
      alignSelf: 'center',
      marginTop: 30,
      marginBottom: 30,
    },
    messageContainer: {
      position:'absolute',
      borderRadius: 20,
      width: 220,
      height: 30,
      top: 150,
      backgroundColor: '#FDE1E3'
    },
    imgstyle: {
      width: 80,
      height: 80,
      borderRadius: 100,
    },
    newmessage: {
      position: 'absolute',
      bottom: 300,
    }
  });
  
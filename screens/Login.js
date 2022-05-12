import React, {useState} from 'react';
import { TouchableOpacity,Image, View,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import KakaoSDK from '@actbase/react-kakaosdk';
import axios from 'axios';
import { useStore } from 'react-redux';
import { userContain } from '../reducer';

export default function Login({ navigation }) {
  const store = useStore();

    const Login = async () => {
        try {
          await KakaoSDK.init('066f28139628e8b5440363889440f7be');
          const tokens = await KakaoSDK.login();
          const profile = await KakaoSDK.getProfile();
          // axios
          //   .post(
          //     'http://k6c102.p.ssafy.io:8080/v1/member/v1/member/authentication',
          //     {
          //       accessToken: tokens.access_token,
          //       kakaoId: profile.id,
          //     },
          //   )
          //   .then(res => {
          //     console.log(res);
          //   })
          //   .catch(err => {
          //     console.log(err);
          //   });
          axios
            .get(
              `http://k6c102.p.ssafy.io:8080/v1/oauth/login?token=${tokens.access_token}`,
            )
            .then(res => {
              store.dispatch(userContain(res.data.memberId,res.data.authMember.imageUrl,res.data.authMember.kakaoId,res.data.authMember.nickName));
              if (res.data.firstCheck) {
                navigation.navigate('signin', {
                  properties: profile.properties,
                  id: res.data.authMember.kakaoId,
                });
              }
              AsyncStorage.setItem('user', JSON.stringify(res));
              navigation.navigate('home');
            })
            .catch(err =>
              console.log(err));
        } catch (e) {
          console.log(e);
        }
      };
    
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={Login}>
            <Image source={require('../assets/images/kakao_login.png')} />
          </TouchableOpacity>
        </View>
      );
}
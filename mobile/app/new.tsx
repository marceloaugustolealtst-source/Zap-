import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';

export default function New(){
 const [id,setId]=useState('');
 const open=()=>{const value=id.trim().toUpperCase();if(!/^VC-\d{6}$/.test(value)){Alert.alert('Invalid Viet Chat ID','Enter a valid ID such as VC-123456.');return;}router.push({pathname:'/chat',params:{id:value}})};
 return <View style={s.root}><Text style={s.title}>New chat</Text><Text style={s.sub}>Enter a Viet Chat ID to start a direct conversation.</Text><TextInput style={s.input} value={id} onChangeText={setId} placeholder="VC-123456" placeholderTextColor="#8696a0" autoCapitalize="characters" autoCorrect={false}/><Pressable style={s.button} onPress={open}><Text style={s.buttonText}>Open chat</Text></Pressable></View>
}
const s=StyleSheet.create({root:{flex:1,backgroundColor:'#0b141a',padding:22},title:{color:'#fff',fontSize:28,fontWeight:'700',marginTop:35},sub:{color:'#8696a0',fontSize:15,lineHeight:22,marginTop:10},input:{marginTop:28,height:54,borderRadius:12,backgroundColor:'#202c33',color:'#fff',paddingHorizontal:16,fontSize:16},button:{marginTop:14,height:52,borderRadius:12,backgroundColor:'#229ed9',alignItems:'center',justifyContent:'center'},buttonText:{color:'#fff',fontWeight:'700',fontSize:16}});

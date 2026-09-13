import { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { getSavedProfile, saveProfile } from '../lib/profile';

export default function Register(){
  const [name,setName]=useState(''); const [busy,setBusy]=useState(false);
  useEffect(()=>{ getSavedProfile().then(p=>{if(p) router.replace('/');}); },[]);
  async function create(){ if(!name.trim()) return; setBusy(true); const profile={id:globalThis.crypto?.randomUUID?.() ?? `local-${Date.now()}`,zapId:`VC-${Math.floor(100000+Math.random()*900000)}`,displayName:name.trim()}; await saveProfile(profile); router.replace('/'); }
  return <View style={s.root}><Text style={s.logo}>Viet Chat</Text><Text style={s.title}>Create your profile</Text><Text style={s.sub}>Choose your name once. Your profile stays on this device.</Text><TextInput style={s.input} value={name} onChangeText={setName} placeholder="Your name" placeholderTextColor="#8696a0" maxLength={60}/><Pressable disabled={!name.trim()||busy} style={[s.button,(!name.trim()||busy)&&s.disabled]} onPress={create}>{busy?<ActivityIndicator color="#fff"/>:<Text style={s.buttonText}>Continue</Text>}</Pressable></View>
}
const s=StyleSheet.create({root:{flex:1,backgroundColor:'#0b141a',padding:24,justifyContent:'center'},logo:{color:'#229ed9',fontSize:34,fontWeight:'800',marginBottom:40},title:{color:'#fff',fontSize:28,fontWeight:'700'},sub:{color:'#8696a0',fontSize:15,lineHeight:22,marginTop:10},input:{marginTop:28,height:56,borderRadius:14,backgroundColor:'#202c33',color:'#fff',paddingHorizontal:16,fontSize:16},button:{marginTop:14,height:54,borderRadius:14,backgroundColor:'#229ed9',alignItems:'center',justifyContent:'center'},disabled:{opacity:.5},buttonText:{color:'#fff',fontWeight:'700',fontSize:16}});

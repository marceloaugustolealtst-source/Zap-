import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = 'viet_chat_profile_v1';
export type LocalProfile = { id: string; zapId: string; displayName: string; avatarUrl?: string };

export async function getSavedProfile(): Promise<LocalProfile | null> {
  const raw = await AsyncStorage.getItem(PROFILE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function saveProfile(profile: LocalProfile) {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export async function clearProfile() {
  await AsyncStorage.removeItem(PROFILE_KEY);
}

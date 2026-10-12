import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_PROFILE } from './data';

const KEY = 'my_name_is_profile_v1';
const Ctx = createContext(null);
export const useProfile = () => useContext(Ctx);

export function ProfileProvider({ children }) {
  const [profile, setProfileState] = useState(DEFAULT_PROFILE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) setProfileState({ ...DEFAULT_PROFILE, ...JSON.parse(raw) });
      } catch (e) {
        // fall back to defaults
      }
      setLoaded(true);
    })();
  }, []);

  const saveProfile = async (patch) => {
    const next = { ...profile, ...patch };
    setProfileState(next);
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(next));
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <Ctx.Provider value={{ profile, saveProfile, loaded }}>{children}</Ctx.Provider>
  );
}
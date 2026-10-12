import React from 'react';
import { Image, Text, View } from 'react-native';
import { colors } from '../theme';

export default function Avatar({ uri, name, size = 110 }) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{ width: size, height: size, borderRadius: size / 2, borderWidth: 3, borderColor: colors.gold }}
      />
    );
  }
  return (
    <View style={{
      width: size, height: size, borderRadius: size / 2, backgroundColor: colors.pink,
      alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: colors.gold,
    }}>
      <Text style={{ color: colors.white, fontSize: size / 3, fontWeight: '800' }}>{initials}</Text>
    </View>
  );
}
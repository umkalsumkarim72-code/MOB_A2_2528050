import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../theme';

export default function Badge({ text, tone = 'ok' }) {
  const bg = tone === 'ok' ? '#E8F5E9' : colors.goldLight;
  const fg = tone === 'ok' ? colors.success : colors.brown;
  return (
    <View style={{ backgroundColor: bg, alignSelf: 'flex-start', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4, marginTop: 6 }}>
      <Text style={{ color: fg, fontSize: 11, fontWeight: '700' }}>{text}</Text>
    </View>
  );
}
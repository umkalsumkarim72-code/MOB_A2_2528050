import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../theme';

export default function SkillChip({ name, level }) {
  return (
    <View style={{
      backgroundColor: colors.goldLight, borderRadius: 20, paddingVertical: 8,
      paddingHorizontal: 14, marginRight: 8, marginBottom: 8, borderWidth: 1, borderColor: colors.gold,
    }}>
      <Text style={{ color: colors.brown, fontWeight: '700' }}>{name}</Text>
      {level ? <Text style={{ color: colors.brownLight, fontSize: 11 }}>{level}</Text> : null}
    </View>
  );
}
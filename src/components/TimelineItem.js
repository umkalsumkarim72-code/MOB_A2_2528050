import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../theme';

export default function TimelineItem({ year, title, place, last }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ alignItems: 'center', marginRight: 12 }}>
        <View style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: colors.pink }} />
        {!last && <View style={{ width: 2, flex: 1, backgroundColor: colors.gold, marginVertical: 2 }} />}
      </View>
      <View style={{ flex: 1, paddingBottom: 18 }}>
        <Text style={{ color: colors.pink, fontWeight: '700', fontSize: 12 }}>{year}</Text>
        <Text style={{ color: colors.brown, fontWeight: '700', fontSize: 15 }}>{title}</Text>
        <Text style={{ color: colors.brownLight }}>{place}</Text>
      </View>
    </View>
  );
}
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { PROJECTS } from '../data';
import { colors, card } from '../theme';

export default function ProjectsScreen({ navigation }) {
  return (
    <FlatList
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: 16 }}
      data={PROJECTS}
      keyExtractor={p => p.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={card} onPress={() => navigation.navigate('ProjectDetails', { id: item.id })}>
          <Text style={{ color: colors.brown, fontSize: 18, fontWeight: '800' }}>{item.title}</Text>
          <Text style={{ color: colors.brownLight, marginTop: 6 }} numberOfLines={2}>{item.problem}</Text>
          <Text style={{ color: colors.pink, fontWeight: '700', marginTop: 8 }}>{item.tech.join(' · ')}</Text>
          <Text style={{ color: colors.gold, fontWeight: '700', marginTop: 8 }}>View details →</Text>
        </TouchableOpacity>
      )}
    />
  );
}
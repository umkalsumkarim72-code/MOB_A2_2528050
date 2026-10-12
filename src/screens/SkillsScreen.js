import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import SkillChip from '../components/SkillChip';
import TimelineItem from '../components/TimelineItem';
import { SKILLS, TIMELINE } from '../data';
import { colors, card } from '../theme';

export default function SkillsScreen() {
  return (
    <ScrollView style={{ backgroundColor: colors.bg }} contentContainerStyle={{ padding: 16 }}>
      <View style={card}>
        <Text style={{ color: colors.brown, fontSize: 18, fontWeight: '800', marginBottom: 12 }}>Skills</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {SKILLS.map(sk => <SkillChip key={sk.name} {...sk} />)}
        </View>
      </View>
      <View style={card}>
        <Text style={{ color: colors.brown, fontSize: 18, fontWeight: '800', marginBottom: 12 }}>Education & training</Text>
        {TIMELINE.map((t, i) => (
          <TimelineItem key={t.title} {...t} last={i === TIMELINE.length - 1} />
        ))}
      </View>
    </ScrollView>
  );
}
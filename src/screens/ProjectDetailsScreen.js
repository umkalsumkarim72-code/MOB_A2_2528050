import React from 'react';
import { Alert, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Badge from '../components/Badge';
import SkillChip from '../components/SkillChip';
import { PROJECTS } from '../data';
import { colors, card } from '../theme';

const Section = ({ label, children }) => (
  <View style={{ marginBottom: 14 }}>
    <Text style={{ color: colors.gold, fontWeight: '800', fontSize: 12, textTransform: 'uppercase' }}>{label}</Text>
    {children}
  </View>
);

export default function ProjectDetailsScreen({ route }) {
  const project = PROJECTS.find(p => p.id === route.params.id);
  if (!project) return <Text style={{ padding: 20 }}>Project not found.</Text>;

  const openLink = async () => {
    try {
      await Linking.openURL(project.link);
    } catch (e) {
      Alert.alert('No connection', 'This link needs an internet connection.');
    }
  };

  return (
    <ScrollView style={{ backgroundColor: colors.bg }} contentContainerStyle={{ padding: 16 }}>
      <View style={card}>
        <Text style={{ color: colors.brown, fontSize: 22, fontWeight: '800', marginBottom: 14 }}>{project.title}</Text>
        <Section label="Problem">
          <Text style={{ color: colors.brown, fontSize: 15, lineHeight: 22 }}>{project.problem}</Text>
        </Section>
        <Section label="My contribution">
          <Text style={{ color: colors.brown, fontSize: 15, lineHeight: 22 }}>{project.contribution}</Text>
        </Section>
        <Section label="Technology used">
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 6 }}>
            {project.tech.map(t => <SkillChip key={t} name={t} />)}
          </View>
        </Section>
        {project.link ? (
          <TouchableOpacity onPress={openLink} style={{ backgroundColor: colors.pink, padding: 12, borderRadius: 12, alignItems: 'center' }}>
            <Text style={{ color: colors.white, fontWeight: '700' }}>Open repository (online)</Text>
            <Badge text="Requires internet connection" tone="warn" />
          </TouchableOpacity>
        ) : null}
      </View>
    </ScrollView>
  );
}
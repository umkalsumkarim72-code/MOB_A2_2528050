import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import Avatar from '../components/Avatar';
import Badge from '../components/Badge';
import { useProfile } from '../ProfileContext';
import { STUDENT_NAME, VERIFICATION_CODE } from '../data';
import { colors, card } from '../theme';

export default function HomeScreen() {
  const { profile } = useProfile();
  return (
    <ScrollView style={{ backgroundColor: colors.bg }} contentContainerStyle={{ padding: 16 }}>
      <Text style={s.intro}>My name is {STUDENT_NAME}.</Text>

      <View style={[card, { alignItems: 'center' }]}>
        <Avatar uri={profile.imageUri} name={STUDENT_NAME} />
        <Text style={s.headline}>{profile.headline}</Text>
        <View style={s.status}>
          <Text style={s.statusText}>{profile.availability}</Text>
        </View>
        <Badge text="Works fully offline" />
      </View>

      <View style={card}>
        <Text style={s.label}>About me</Text>
        <Text style={s.bio}>{profile.bio}</Text>
        <Text style={[s.label, { marginTop: 12 }]}>Primary skill</Text>
        <Text style={s.bio}>{profile.primarySkill}</Text>
      </View>

      <View style={[card, { backgroundColor: colors.goldLight, borderColor: colors.gold }]}>
        <Text style={s.label}>Verification code</Text>
        <Text style={s.code}>{VERIFICATION_CODE}</Text>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  intro: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.brown,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  headline: { fontSize: 15, color: colors.pink, fontWeight: '700', marginTop: 12, textAlign: 'center' },
  status: { backgroundColor: colors.pinkLight, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12, marginTop: 10 },
  statusText: { color: colors.pink, fontWeight: '700', fontSize: 12 },
  label: { color: colors.gold, fontWeight: '800', fontSize: 12, textTransform: 'uppercase', marginBottom: 4 },
  bio: { color: colors.brown, fontSize: 15, lineHeight: 22 },
  code: { fontSize: 26, fontWeight: '900', color: colors.brown, letterSpacing: 2 },
});
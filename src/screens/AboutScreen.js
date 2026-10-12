import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { APP_NAME, APP_VERSION, REG_NUMBER, STUDENT_NAME, VERIFICATION_CODE } from '../data';
import { colors, card } from '../theme';

const Row = ({ k, v }) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={{ color: colors.gold, fontWeight: '800', fontSize: 12, textTransform: 'uppercase' }}>{k}</Text>
    <Text style={{ color: colors.brown, fontSize: 16 }}>{v}</Text>
  </View>
);

export default function AboutScreen() {
  return (
    <ScrollView style={{ backgroundColor: colors.bg }} contentContainerStyle={{ padding: 16 }}>
      <View style={card}>
        <Row k="App name" v={APP_NAME} />
        <Row k="Student name" v={STUDENT_NAME} />
        <Row k="Registration number" v={REG_NUMBER} />
        <Row k="Verification code" v={VERIFICATION_CODE} />
        <Row k="Version" v={APP_VERSION} />
        <Row k="Institution" v="Institut d'Enseignement Supérieur de Ruhengeri (INES)" />
        <Row k="Course" v="SWE 3409 Mobile Application Development" />
      </View>
      <View style={[card, { backgroundColor: colors.goldLight, borderColor: colors.gold }]}>
        <Text style={{ color: colors.brown, fontWeight: '800', marginBottom: 6 }}>Data-use statement</Text>
        <Text style={{ color: colors.brown, lineHeight: 21 }}>
          This app stores your profile text and chosen photo only on this device using local storage.
          Nothing is uploaded or shared. The camera and gallery are used only when you choose a profile photo.
          Optional links open in your browser and need an internet connection.
        </Text>
      </View>
    </ScrollView>
  );
}
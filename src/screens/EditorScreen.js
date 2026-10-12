import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy'; // on SDK 53 or lower use: 'expo-file-system'
import Avatar from '../components/Avatar';
import { useProfile } from '../ProfileContext';
import { AVAILABILITY_OPTIONS, STUDENT_NAME } from '../data';
import { colors, card } from '../theme';

// ---------- validation ----------
function validate(v) {
  const e = {};

  const h = v.headline.trim();
  if (!h) e.headline = 'Headline is required.';
  else if (h.length < 10) e.headline = 'Headline must be at least 10 characters.';
  else if (h.length > 60) e.headline = 'Headline must be at most 60 characters.';

  const b = v.bio.trim();
  if (!b) e.bio = 'Biography is required.';
  else if (b.length < 40) e.bio = `Biography needs at least 40 characters (${b.length}/40).`;
  else if (b.length > 300) e.bio = `Biography must be at most 300 characters (${b.length}/300).`;

  const p = v.primarySkill.trim();
  if (!p) e.primarySkill = 'Primary skill is required.';
  else if (p.length < 2) e.primarySkill = 'Primary skill must be at least 2 characters.';
  else if (!/^[A-Za-z][A-Za-z0-9 .+#&/-]*$/.test(p))
    e.primarySkill = 'Skill must start with a letter and contain no special symbols.';

  if (!AVAILABILITY_OPTIONS.includes(v.availability))
    e.availability = 'Please choose an availability status.';

  return e;
}

// ---------- components defined OUTSIDE the screen (fixes the typing bug) ----------
function Field({ label, k, value, error, onChange, multiline, hint }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ color: colors.brown, fontWeight: '700', marginBottom: 4 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={t => onChange(k, t)}
        multiline={multiline}
        style={{
          borderWidth: 1.5,
          borderColor: error ? colors.error : colors.gold,
          borderRadius: 10,
          padding: 10,
          color: colors.brown,
          backgroundColor: colors.white,
          minHeight: multiline ? 100 : undefined,
          textAlignVertical: multiline ? 'top' : 'center',
        }}
      />
      {hint ? <Text style={{ color: colors.brownLight, fontSize: 11, marginTop: 2 }}>{hint}</Text> : null}
      {error ? <Text style={{ color: colors.error, fontSize: 12, marginTop: 2 }}>{error}</Text> : null}
    </View>
  );
}

function Btn({ title, onPress, outline }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        margin: 3,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: outline ? colors.white : colors.pink,
        borderWidth: 1.5,
        borderColor: colors.pink,
      }}
    >
      <Text style={{ color: outline ? colors.pink : colors.white, fontWeight: '700', fontSize: 12 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

// ---------- screen ----------
export default function EditorScreen() {
  const { profile, saveProfile } = useProfile();
  const [form, setForm] = useState({
    headline: profile.headline,
    bio: profile.bio,
    primarySkill: profile.primarySkill,
    availability: profile.availability,
  });
  const [errors, setErrors] = useState({});
  const [mediaMsg, setMediaMsg] = useState('');

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: undefined }));
  };

  const onSave = async () => {
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) return;

    const ok = await saveProfile({
      headline: form.headline.trim(),
      bio: form.bio.trim(),
      primarySkill: form.primarySkill.trim(),
      availability: form.availability,
    });
    Alert.alert(
      ok ? 'Saved' : 'Error',
      ok ? 'Your profile has been saved on this device.' : 'Could not save. Try again.'
    );
  };

  // ---------- profile media ----------
  const persistImage = async (uri) => {
    try {
      const dest = FileSystem.documentDirectory + `profile_${Date.now()}.jpg`;
      await FileSystem.copyAsync({ from: uri, to: dest });
      if (profile.imageUri) {
        await FileSystem.deleteAsync(profile.imageUri, { idempotent: true });
      }
      await saveProfile({ imageUri: dest });
      setMediaMsg('Profile photo updated.');
    } catch (e) {
      setMediaMsg('Could not save the photo. Please try again.');
    }
  };

  const pick = async (source) => {
    try {
      let result;
      if (source === 'camera') {
        const perm = await ImagePicker.requestCameraPermissionsAsync();
        if (!perm.granted) {
          setMediaMsg('Camera permission denied. You can enable it in Settings or use the gallery.');
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.7,
        });
      } else {
        const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!perm.granted) {
          setMediaMsg('Gallery permission denied. You can enable it in Settings or use the camera.');
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.7,
        });
      }

      if (result.canceled) {
        setMediaMsg('No photo selected. Your current photo was kept.');
        return;
      }
      await persistImage(result.assets[0].uri);
    } catch (e) {
      setMediaMsg('Something went wrong while opening the picker.');
    }
  };

  const remove = () => {
    Alert.alert('Remove photo?', 'This will delete your profile photo.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: async () => {
          try {
            if (profile.imageUri) await FileSystem.deleteAsync(profile.imageUri, { idempotent: true });
          } catch (e) {}
          await saveProfile({ imageUri: null });
          setMediaMsg('Profile photo removed.');
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ padding: 16 }}
      keyboardShouldPersistTaps="handled"
    >
      {/* Photo card */}
      <View style={[card, { alignItems: 'center' }]}>
        <Text style={{ color: colors.brown, fontWeight: '800', fontSize: 16, marginBottom: 10 }}>
          Profile photo
        </Text>
        <Avatar uri={profile.imageUri} name={STUDENT_NAME} />
        <View style={{ flexDirection: 'row', marginTop: 12 }}>
          <Btn title="Camera" onPress={() => pick('camera')} />
          <Btn title="Gallery" onPress={() => pick('gallery')} />
        </View>
        {profile.imageUri ? (
          <View style={{ flexDirection: 'row' }}>
            <Btn title="Replace" outline onPress={() => pick('gallery')} />
            <Btn title="Remove" outline onPress={remove} />
          </View>
        ) : null}
        {mediaMsg ? (
          <Text style={{ color: colors.brownLight, marginTop: 8, textAlign: 'center' }}>{mediaMsg}</Text>
        ) : null}
      </View>

      {/* Form card */}
      <View style={card}>
        <Text style={{ color: colors.brown, fontWeight: '800', fontSize: 16, marginBottom: 12 }}>
          Edit profile
        </Text>

        <Field
          label="Professional headline"
          k="headline"
          value={form.headline}
          error={errors.headline}
          onChange={set}
          hint="10 to 60 characters"
        />

        <Field
          label="Short biography"
          k="bio"
          value={form.bio}
          error={errors.bio}
          onChange={set}
          multiline
          hint={`40 to 300 characters (${form.bio.trim().length})`}
        />

        <Field
          label="Primary skill"
          k="primarySkill"
          value={form.primarySkill}
          error={errors.primarySkill}
          onChange={set}
        />

        <Text style={{ color: colors.brown, fontWeight: '700', marginBottom: 6 }}>Availability</Text>
        {AVAILABILITY_OPTIONS.map(o => (
          <TouchableOpacity
            key={o}
            onPress={() => set('availability', o)}
            style={{
              padding: 10,
              borderRadius: 10,
              marginBottom: 6,
              borderWidth: 1.5,
              borderColor: form.availability === o ? colors.pink : colors.pinkLight,
              backgroundColor: form.availability === o ? colors.pinkLight : colors.white,
            }}
          >
            <Text style={{ color: colors.brown, fontWeight: form.availability === o ? '800' : '500' }}>
              {o}
            </Text>
          </TouchableOpacity>
        ))}
        {errors.availability ? (
          <Text style={{ color: colors.error, fontSize: 12 }}>{errors.availability}</Text>
        ) : null}

        <TouchableOpacity
          onPress={onSave}
          style={{
            backgroundColor: colors.gold,
            padding: 14,
            borderRadius: 12,
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <Text style={{ color: colors.white, fontWeight: '800', fontSize: 15 }}>Save profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
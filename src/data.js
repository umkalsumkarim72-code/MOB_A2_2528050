// ====== EDIT THESE TWO ======
export const STUDENT_NAME = 'Umkalsum Karim';
export const REG_NUMBER = '25/28050'; // your real registration number
// ============================

export const APP_NAME = 'Umiportfolio';
export const APP_VERSION = '1.0.0';
export const VERIFICATION_CODE = `MOB-A2-${REG_NUMBER.slice(-4)}`;

export const DEFAULT_PROFILE = {
  headline: 'Software Engineering Student | Mobile App Developer',
  bio: 'Software engineering student at INES Ruhengeri who builds offline-first mobile apps with React Native and Expo. I enjoy turning everyday problems in Rwanda into simple, usable apps, and I am looking for an internship to grow as a developer.',
  primarySkill: 'React Native',
  availability: 'Open to internship',
  imageUri: null,
};

export const AVAILABILITY_OPTIONS = [
  'Open to internship',
  'Open to challenges',
  'Not available',
];

export const SKILLS = [
  { name: 'React Native', level: 'Intermediate' },
  { name: 'JavaScript (ES6+)', level: 'Intermediate' },
  { name: 'Git & GitHub', level: 'Intermediate' },
  { name: 'AsyncStorage / local data', level: 'Intermediate' },
  { name: 'UI/UX basics', level: 'Beginner' },
  { name: 'HTML & CSS', level: 'Intermediate' },
  { name: 'Networking basics', level: 'Beginner' },
  { name: 'Problem solving', level: 'Intermediate' },
];

export const TIMELINE = [
  {
    year: '2026',
    title: 'Mobile Application Development (SWE 3409)',
    place: 'INES Ruhengeri',
  },
  {
    year: '2025',
    title: 'Web development and database coursework',
    place: 'INES Ruhengeri',
  },
  {
    year: '2023 - Present',
    title: 'BSc in Software Engineering',
    place: 'INES Ruhengeri',
  },
  {
    year: '2022',
    title: 'Secondary school certificate',
    place: 'Rwanda',
  },
];

export const PROJECTS = [
  {
    id: '1',
    title: 'Campus Timetable Reminder',
    problem:
      'Students at the campus often miss lectures because timetables change and are shared on paper or in crowded group chats.',
    contribution:
      'Designed the screens, built the timetable list and add/edit forms with validation, and stored all lessons locally so the app works without internet.',
    tech: ['React Native', 'Expo', 'AsyncStorage', 'React Navigation'],
    link: null,
  },
  {
    id: '2',
    title: 'Student Expense Tracker',
    problem:
      'Many students struggle to see where their pocket money goes each month, so they run out before the month ends.',
    contribution:
      'Built the expense entry form, category totals and monthly summary, and wrote the logic that calculates the remaining balance.',
    tech: ['JavaScript', 'React Native', 'AsyncStorage'],
    link: null,
  },
  {
    id: '3',
    title: 'Personal Portfolio Website',
    problem:
      'I needed one online place where recruiters can quickly see my skills and what I have built.',
    contribution:
      'Wrote the full responsive layout in HTML and CSS, organised the sections and published it with GitHub Pages.',
    tech: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    link: null,
  },
];
// PERSONAL CONTENT: EDIT EVERYTHING IN THIS FILE WITH YOUR OWN REAL DETAILS.
// Do not invent skills or projects. Describe only what you really did.

export const STUDENT = {
  fullName: 'Umkalsum Karim',
  regNumber: 'REPLACE (e.g. 25/28050)',
  appName: 'REPLACE (e.g. UmkalsumPortfolio)',
  // MOB-A2- + last four digits of YOUR registration number
  verificationCode: 'MOB-A2-8050',
  headline: ' Software Engineering Student',
  bio: 'I am Umkalsum Karim, a Software Engineering student at INES. I am passionate about technology, problem-solving, and developing software applications that solve real-world problems. I enjoy coding, learning new programming languages, and exploring new technologies. My goal is to become a skilled software engineer and use my knowledge to create innovative, reliable, and user-friendly software solutions that make a positive impact on society..',
  availability: 'Open to internships',
  primarySkill: 'Java',
};

// level: 1 = Beginner, 2 = Basic, 3 = Intermediate, 4 = Advanced, 5 = Expert
// Be honest: the marker checks that your skills are genuine.
export const SKILLS = [
  { id: 's1', name: 'eclipse ', level: 3, note: ' java' },
  { id: 's2', name: 'visual studio code ', level: 3, note: 'editing file' },
  { id: 's3', name: 'python ', level: 2, note: 'for programming' },
  { id: 's4', name: 'HTML 4', level: 2, note: 'REPLACE: where you used it' },
  { id: 's5', name: 'C++', level: 2, note: 'REPLACE: where you used it' },
];

export const EDUCATION = [
  { id: 'e1', period: ' 2024 - 2026', title: ' programme', place: 'INES Ruhengeri' },
  { id: 'e2', period: '2026', title: ' university ', place: 'undergraduate ' },
];

// Each project needs: title, problem, your contribution, technology used.
export const PROJECTS = [
  {
    id: 'p1',
    title: 'Student Management System',
    problem: 'Schools may struggle to organize student records, update student information, and manage academic results manually',
    contribution: 'I developed a student management application that allows users to register students, update their details, search for records, and manage academic marks',
    tech: ['Java', 'MYSQL'],
  },
  {
    id: 'p2',
    title: 'Hospital Management System',
    problem: 'Hospitals may face difficulties managing patient records, appointments, and medical information using manual processes.',
    contribution: 'I designed a hospital management application to help users register patients, manage appointments, view patient records, and organize hospital information',
    tech: ['React Native', 'TypeScript'],
  },
];
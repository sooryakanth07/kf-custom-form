import { NextResponse } from 'next/server';

export async function GET() {
  const fieldValues = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    bio: 'I am a full-stack developer with 5 years of experience.',
    age: 28,
    salary: 120000,
    isActive: true,
    rating: 4,
    birthDate: new Date('1996-03-15').toISOString(),
    appointmentTime: new Date('2024-12-20T14:30:00').toISOString(),
    scoreRange: [65],
    department: 'eng',
    skills: ['js', 'react', 'ts'],
    interests: ['music', 'gaming'],
    agreeToTerms: true,
    preferredContact: 'email',
  };

  return NextResponse.json(fieldValues);
}

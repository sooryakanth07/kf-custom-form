import { NextResponse } from 'next/server';

export async function GET() {
  const fieldConfigs = [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      placeholder: 'John',
      required: true,
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Doe',
      required: true,
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'john@example.com',
      required: true,
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'textarea',
      placeholder: 'Tell us about yourself...',
      required: false,
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      required: false,
      min: 18,
      max: 100,
    },
    {
      name: 'salary',
      label: 'Annual Salary',
      type: 'currency',
      required: false,
    },
    {
      name: 'isActive',
      label: 'Active',
      type: 'yesnotoggle',
      required: false,
    },
    {
      name: 'rating',
      label: 'Rating',
      type: 'starrating',
      required: false,
    },
    {
      name: 'birthDate',
      label: 'Birth Date',
      type: 'date',
      required: false,
    },
    {
      name: 'appointmentTime',
      label: 'Appointment Date & Time',
      type: 'datetime',
      required: false,
    },
    {
      name: 'scoreRange',
      label: 'Score Range',
      type: 'rangeslider',
      min: 0,
      max: 100,
      step: 1,
      required: false,
    },
    {
      name: 'department',
      label: 'Department',
      type: 'select',
      options: [
        { label: 'Engineering', value: 'eng' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Sales', value: 'sales' },
        { label: 'HR', value: 'hr' },
      ],
      required: false,
    },
    {
      name: 'skills',
      label: 'Skills',
      type: 'multiselect',
      options: [
        { label: 'JavaScript', value: 'js' },
        { label: 'React', value: 'react' },
        { label: 'Node.js', value: 'node' },
        { label: 'Python', value: 'python' },
        { label: 'TypeScript', value: 'ts' },
      ],
      required: false,
    },
    {
      name: 'interests',
      label: 'Interests',
      type: 'checklist',
      options: [
        { label: 'Sports', value: 'sports' },
        { label: 'Music', value: 'music' },
        { label: 'Reading', value: 'reading' },
        { label: 'Gaming', value: 'gaming' },
      ],
      required: false,
    },
    {
      name: 'agreeToTerms',
      label: 'I agree to the Terms and Conditions',
      type: 'checkbox',
      required: false,
    },
    {
      name: 'preferredContact',
      label: 'Preferred Contact Method',
      type: 'radio',
      options: [
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'phone' },
        { label: 'SMS', value: 'sms' },
      ],
      required: false,
    },
  ];

  return NextResponse.json(fieldConfigs);
}

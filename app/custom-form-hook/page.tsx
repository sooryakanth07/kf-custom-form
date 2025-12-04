'use client';

import { useFormState } from '@/hooks/useFormState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FormValues {
  firstName: string;
  email: string;
  feedback: string;
}

const initialValues: FormValues = {
  firstName: '',
  email: '',
  feedback: '',
};

const validateForm = (values: FormValues) => {
  const errors: Record<string, string> = {};

  if (!values.firstName.trim()) {
    errors.firstName = 'First name is required';
  } else if (values.firstName.length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!values.feedback.trim()) {
    errors.feedback = 'Feedback is required';
  } else if (values.feedback.length < 10) {
    errors.feedback = 'Feedback must be at least 10 characters';
  }

  return errors;
};

export default function CustomFormHookPage() {
  const form = useFormState<FormValues>({
    initialValues,
    validate: validateForm,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      alert(`Success!\n\nName: ${values.firstName}\nEmail: ${values.email}\nFeedback: ${values.feedback}`);
      form.reset();
    },
  });

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 py-12 px-4 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-md">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Custom Form Hook</CardTitle>
            <CardDescription>Form with custom state management hook</CardDescription>
          </CardHeader>
          <CardContent>
            <div onSubmit={form.handleSubmit} className="space-y-6">
              {/* First Name Field */}
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={form.values.firstName}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  disabled={form.isSubmitting}
                />
                {form.touched.firstName && form.errors.firstName && (
                  <p className="text-sm text-red-500">{form.errors.firstName}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.values.email}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  disabled={form.isSubmitting}
                />
                {form.touched.email && form.errors.email && (
                  <p className="text-sm text-red-500">{form.errors.email}</p>
                )}
              </div>

              {/* Feedback Field */}
              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback</Label>
                <Textarea
                  id="feedback"
                  name="feedback"
                  placeholder="Share your feedback..."
                  value={form.values.feedback}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  disabled={form.isSubmitting}
                  className="resize-none min-h-[120px]"
                />
                {form.touched.feedback && form.errors.feedback && (
                  <p className="text-sm text-red-500">{form.errors.feedback}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={form.handleSubmit as any}
                  disabled={form.isSubmitting}
                  className="flex-1"
                >
                  {form.isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={form.reset}
                  disabled={form.isSubmitting}
                  className="flex-1"
                >
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

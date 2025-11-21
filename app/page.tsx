'use client';

import FormRenderer from '@/components/FormRenderer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const handleFormSubmit = (data: Record<string, unknown>) => {
    console.log('Form submitted with data:', data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Dynamic Form Renderer
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Renders forms dynamically based on field configuration from API
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Example Form</CardTitle>
            <CardDescription>
              Update the API URLs in the FormRenderer component to fetch your actual data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormRenderer
              onSubmit={handleFormSubmit}
            />
          </CardContent>
        </Card>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card className="border-0 shadow">
            <CardHeader>
              <CardTitle className="text-lg">Field Configuration API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Expected response format (array of field configs):</p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-auto">
{`[
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "John",
    required: true
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true
  }
]`}
              </pre>
            </CardContent>
          </Card>

          <Card className="border-0 shadow">
            <CardHeader>
              <CardTitle className="text-lg">Field Values API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Expected response format (object with field values):</p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-auto">
{`{
  "firstName": "John",
  "email": "john@example.com",
  "rating": 4
}`}
              </pre>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 dark:bg-blue-950 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
            Supported Field Types
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm text-blue-800 dark:text-blue-200">
            <div>• Text</div>
            <div>• Email</div>
            <div>• TextArea</div>
            <div>• Number</div>
            <div>• YesNoToggle</div>
            <div>• StarRating</div>
            <div>• SequenceNumber</div>
            <div>• Aggregation</div>
            <div>• Currency</div>
            <div>• Date</div>
            <div>• DateTime</div>
            <div>• RangeSlider</div>
            <div>• MultiUserSelect</div>
            <div>• SingleUserSelect</div>
            <div>• Select</div>
            <div>• MultiSelect</div>
            <div>• Checkbox</div>
            <div>• Checklist</div>
            <div>• Radio</div>
          </div>
        </div>
      </div>
    </div>
  );
}

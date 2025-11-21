# Form Renderer Documentation

## Overview

The `FormRenderer` component is a dynamic form rendering solution that creates forms based on API-provided field configurations. It supports 19+ different field types and uses React Hook Form for state management with shadcn/ui components for styling.

## Features

- **Dynamic Form Generation**: Create forms from JSON configuration
- **19+ Field Types**: Support for various input types
- **Validation**: Built-in validation for required fields and specific formats (email, etc.)
- **Responsive Layout**: Horizontal layout with wrapping (grid: 1 col on mobile, 2 on tablet, 3 on desktop)
- **Two API Endpoints**: Separate endpoints for field configuration and field values
- **Error Handling**: User-friendly error messages for both API failures and form validation

## Supported Field Types

| Type | Component | Use Case |
|------|-----------|----------|
| `text` | Input | Simple text input |
| `email` | Input | Email with validation |
| `textarea` | Textarea | Multi-line text |
| `number` | Input | Numeric input |
| `sequencenumber` | Input | Sequential number |
| `currency` | Input | Currency with $ symbol |
| `yesnotoggle` | Switch | Yes/No toggle |
| `starrating` | Custom | 5-star rating |
| `date` | DatePicker | Date selection |
| `datetime` | DatePicker | Date and time selection |
| `rangeslider` | Slider | Range slider |
| `select` | Select | Single select dropdown |
| `singleuserselect` | Select | Single user selection |
| `multiselect` | Checkbox Group | Multiple selections |
| `multiuserselect` | Checkbox Group | Multiple user selections |
| `checkbox` | Checkbox | Single checkbox |
| `checklist` | Checkbox Group | Multiple checkboxes |
| `radio` | RadioGroup | Radio button group |
| `aggregation` | Textarea | Aggregated data |

## Usage

### Basic Setup

```tsx
import FormRenderer from '@/components/FormRenderer';

export default function MyPage() {
  const handleFormSubmit = (data: Record<string, unknown>) => {
    console.log('Form submitted:', data);
  };

  return (
    <FormRenderer
      fieldsConfigUrl="/api/form-fields"
      fieldValuesUrl="/api/form-values"
      onSubmit={handleFormSubmit}
    />
  );
}
```

## API Endpoints

### Field Configuration Endpoint

**Purpose**: Returns the structure of the form fields

**URL**: Provide via `fieldsConfigUrl` prop

**Response Format**: Array of field configuration objects

```json
[
  {
    "name": "firstName",
    "label": "First Name",
    "type": "text",
    "placeholder": "John",
    "required": true
  },
  {
    "name": "email",
    "label": "Email Address",
    "type": "email",
    "required": true
  },
  {
    "name": "department",
    "label": "Department",
    "type": "select",
    "options": [
      { "label": "Engineering", "value": "eng" },
      { "label": "Marketing", "value": "marketing" }
    ],
    "required": false
  }
]
```

**Field Configuration Properties**:
- `name` (string, required): Unique field identifier
- `label` (string, required): Field display label
- `type` (string, required): Field type (see Supported Field Types)
- `placeholder` (string, optional): Placeholder text
- `required` (boolean, optional): Whether field is required (default: false)
- `options` (array, optional): For select/multiselect/radio/checklist types
  - Each option: `{ "label": string, "value": string }`
- `min` (number, optional): Minimum value for number/range fields
- `max` (number, optional): Maximum value for number/range fields
- `step` (number, optional): Step value for number/range fields
- `minDate` (string, optional): Minimum date for date fields
- `maxDate` (string, optional): Maximum date for date fields

### Field Values Endpoint

**Purpose**: Returns the initial values for the form fields

**URL**: Provide via `fieldValuesUrl` prop

**Response Format**: Object with field names as keys and their values

```json
{
  "firstName": "John",
  "email": "john@example.com",
  "department": "eng",
  "salary": 120000,
  "isActive": true,
  "rating": 4,
  "skills": ["javascript", "react"],
  "interests": ["sports", "music"],
  "agreeToTerms": true
}
```

## Component Props

```tsx
interface FormRendererProps {
  fieldsConfigUrl: string;      // URL to fetch field configuration
  fieldValuesUrl: string;       // URL to fetch initial field values
  onSubmit?: (data: Record<string, unknown>) => void;  // Optional submit handler
}
```

## Field Type Examples

### Text Input
```json
{
  "name": "firstName",
  "label": "First Name",
  "type": "text",
  "placeholder": "John",
  "required": true
}
```

### Select Dropdown
```json
{
  "name": "department",
  "label": "Department",
  "type": "select",
  "options": [
    { "label": "Engineering", "value": "eng" },
    { "label": "Marketing", "value": "marketing" },
    { "label": "Sales", "value": "sales" }
  ],
  "required": true
}
```

### Multi-Select (Checkboxes)
```json
{
  "name": "skills",
  "label": "Skills",
  "type": "multiselect",
  "options": [
    { "label": "JavaScript", "value": "js" },
    { "label": "React", "value": "react" },
    { "label": "Python", "value": "python" },
    { "label": "TypeScript", "value": "ts" }
  ],
  "required": false
}
```

### Radio Button Group
```json
{
  "name": "preferredContact",
  "label": "Preferred Contact Method",
  "type": "radio",
  "options": [
    { "label": "Email", "value": "email" },
    { "label": "Phone", "value": "phone" },
    { "label": "SMS", "value": "sms" }
  ],
  "required": true
}
```

### Number Input
```json
{
  "name": "age",
  "label": "Age",
  "type": "number",
  "min": 18,
  "max": 100,
  "step": 1,
  "required": false
}
```

### Currency Input
```json
{
  "name": "salary",
  "label": "Annual Salary",
  "type": "currency",
  "required": false
}
```

### Date Picker
```json
{
  "name": "birthDate",
  "label": "Birth Date",
  "type": "date",
  "required": false
}
```

### Date & Time Picker
```json
{
  "name": "appointmentTime",
  "label": "Appointment Date & Time",
  "type": "datetime",
  "required": false
}
```

### Range Slider
```json
{
  "name": "scoreRange",
  "label": "Score (0-100)",
  "type": "rangeslider",
  "min": 0,
  "max": 100,
  "step": 1,
  "required": false
}
```

### Star Rating
```json
{
  "name": "rating",
  "label": "Rating",
  "type": "starrating",
  "required": false
}
```

### Yes/No Toggle
```json
{
  "name": "isActive",
  "label": "Active",
  "type": "yesnotoggle",
  "required": false
}
```

### Checkbox
```json
{
  "name": "agreeToTerms",
  "label": "I agree to the Terms and Conditions",
  "type": "checkbox",
  "required": true
}
```

### Checklist
```json
{
  "name": "interests",
  "label": "Interests",
  "type": "checklist",
  "options": [
    { "label": "Sports", "value": "sports" },
    { "label": "Music", "value": "music" },
    { "label": "Reading", "value": "reading" },
    { "label": "Gaming", "value": "gaming" }
  ],
  "required": false
}
```

## Testing

The project includes mock API endpoints for testing:

- `/api/form-fields` - Returns example field configuration
- `/api/form-values` - Returns example field values

Visit `http://localhost:3000` to see the form in action.

### Running Locally

```bash
npm run dev
```

Then navigate to `http://localhost:3000` (or `https://localhost:3000` with experimental HTTPS enabled).

## Implementation Notes

### Form State Management
- Uses React Hook Form for efficient state management
- Form values are watched and updated in real-time
- Validation errors are displayed below each field

### Field Value Synchronization
- Field configuration is fetched first
- Field values are fetched and populated in the form
- If a field value doesn't exist in the API response, it defaults to empty

### Responsive Design
- Grid layout: 1 column on mobile, 2 on tablet, 3 on desktop
- All fields wrap responsively
- Submit button spans full width below the grid

### Validation
- Required field validation
- Email format validation
- Custom validation can be added per field type

## Error Handling

- **API Errors**: Displayed as user-friendly messages below the form
- **Validation Errors**: Displayed below individual fields
- **Loading State**: Shows "Loading form..." message while fetching data

## Type Safety

TypeScript types are provided for:
- `FieldConfig`: Field configuration structure
- `FormRendererProps`: Component props

## Future Enhancements

Possible additions:
- Custom validation rules
- Conditional field visibility
- Field dependencies (show/hide fields based on other field values)
- Custom field types
- File upload support
- Nested/array fields
- Form sections/tabs

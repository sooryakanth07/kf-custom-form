'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kf: any;
  }
}
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import  MultiSelect from '@/components/ui/multi-select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useForm as useKfForm } from '@/hooks/useForm';

interface UseFormReturn {
  formData: Record<string, unknown>;
  errors: Record<string, string[]>;
  loading: boolean;
  error: string | null;
  updateField: (fieldId: string, value: unknown) => Promise<boolean>;
  save: () => Promise<boolean>;
  reset: () => void;
  isDirty: boolean;
  isNewRecord: boolean;
}

interface FieldConfig {
  Id: string;
  Name: string;
  Type: string;
  Required?: boolean;
  ReadOnly?: boolean;
  Widget?: string;
  IsSystemField?: boolean;
  IsInternal?: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
  min?: number;
  max?: number;
  step?: number;
  minDate?: string;
  maxDate?: string;
  SourceFlowId?: string;
  Attributes?: Array<{ Id: string; Name: string; Type: string }>;
}

interface FormRendererProps {
  fieldsConfigUrl?: string;
  fieldValuesUrl?: string;
  onSubmit?: (data: Record<string, unknown>) => void;
}




const DatePickerField = ({
  value,
  onChange,
}: {
  value: string | Date | undefined;
  onChange: (date: Date | undefined) => void;
}) => {
  const parseDate = (val: string | Date | undefined): Date | undefined => {
    if (!val) return undefined;
    if (val instanceof Date) return val;
    try {
      return new Date(val);
    } catch {
      return undefined;
    }
  };

  const date = parseDate(value);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : 'Pick a date'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onChange}
        />
      </PopoverContent>
    </Popover>
  );
};

const DateTimePickerField = ({
  value,
  onChange,
}: {
  value: string | Date | undefined;
  onChange: (date: Date | undefined) => void;
}) => {
  const parseDate = (val: string | Date | undefined): Date | undefined => {
    if (!val) return undefined;
    if (val instanceof Date) return val;
    try {
      return new Date(val);
    } catch {
      return undefined;
    }
  };
  const date = value ? parseDate(typeof value === 'string' ? value.split(" ")[0] : value) : undefined;
  const timeString = date ? format(date, 'HH:mm') : '';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP p') : 'Pick a date and time'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onChange}
        />
        <div className="p-3 border-t">
          <Input
            type="time"
            value={timeString}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(':');
              const newDate = date ? new Date(date) : new Date();
              newDate.setHours(parseInt(hours), parseInt(minutes));
              onChange(newDate);
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

const SingleSelectField = ({
  config,
  value,
  onChange
}:{
  config: FieldConfig,
  value: string,
  onChange: (value: string) => void
}) => {

   const [options, setOptions] = useState<{label: string, value:string}[]>([])

  useEffect(() => {
(async () =>{
     let url = "dropdown";
     if (config.Type === "User") {
       url = "lookup"
     }
     const response = await window.kf.api(`/form/2/${window.kf.account._id}/Test_All_Fields_A00/PkCT9cShTOek/${config.Id}/${url}`)
     if(config.Type === "User"){
       setOptions(response.Data.map((opt:{Name:string, Email:string, _id:string}) => ({label: opt.Name, value: opt._id})))
     } else {
       setOptions(response.map((opt:string) => ({label: opt, value: opt})))
     }
})()
  }, [config.Id, config.Type])

 if (config.Widget === 'Radio') {
          return (
            <RadioGroup
              value={String(value || '')}
              onValueChange={onChange}
              disabled={config.ReadOnly}
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <RadioGroupItem value={option.value} id={`${config.Id}-${option.value}`} />
                  <Label htmlFor={`${config.Id}-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          );
        }
        return (
          <Select
            value={String(value || '')}
            onValueChange={onChange}
            disabled={config.ReadOnly}
          >
            <SelectTrigger>
              <SelectValue placeholder={config.placeholder || 'Select an option'} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
}
const UserSingleSelectField = ({
config,
  value,
  onChange
}:{
  config: FieldConfig,
  value: {Name:string, Email:string, _id:string},
  onChange: ({Name, Email, _id}:{Name:string, Email:string, _id:string}) => void
}) => {
  const [response, setResponse] = useState<{Name:string, Email:string, _id:string}[]>([])
   const [options, setOptions] = useState<{label: string, value:string}[]>([])

  useEffect(() => {
(async () =>{
     const response = await window.kf.api(`/form/2/${window.kf.account._id}/Test_All_Fields_A00/PkCT9cShTOek/${config.Id}/lookup`)
     const data:{Name:string, Email:string, _id:string}[] = response.Data
     setResponse(data)
     setOptions(() => {
      let options = data.map((opt:{Name:string, Email:string, _id:string}) => ({label: opt.Name, value: opt._id}))
      if(value && !options.find(o => o.value === value._id)){
        options = [{label: value.Name, value: value._id}, ...options]
      }
      return options
})
})()
  }, [config.Id, config.Type, value])

        return (
          <Select
            value={String(value._id || '')}
            onValueChange={(e) => onChange(response.filter(f => f._id == e)[0]) }
            disabled={config.ReadOnly}
          >
            <SelectTrigger>
              <SelectValue placeholder={config.placeholder || 'Select an option'} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
}

const MultiSelectField = ({
  value,
  onChange,
  id,

}: {
  value: string[];
  onChange: (value: string[]) => void;
  id: string;

}) => {

  const [options, setOptions] = useState<{label: string, value:string}[]>([])

  useEffect(() => {
(async () =>{
     const response = await window.kf.api(`/form/2/${window.kf.account._id}/Test_All_Fields_A00/PkCT9cShTOek/${id}/dropdown`);
     setOptions(response.map((opt:string) => ({label: opt, value: opt})))
})()
  }, [id])

  return (
     <MultiSelect
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};
const CheckboxList = ({
  value,
  onChange,
  id,

}: {
  value: string[];
  onChange: (value: string[]) => void;
  id: string;

}) => {

  const [options, setOptions] = useState<{label: string, value:string}[]>([])

  useEffect(() => {
(async () =>{
     const response = await window.kf.api(`/form/2/${window.kf.account._id}/Test_All_Fields_A00/PkCT9cShTOek/${id}/dropdown`);
     setOptions(response.map((opt:string) => ({label: opt, value: opt})))
})()
  }, [id])

  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Checkbox
            checked={value.includes(option.value)}
            onCheckedChange={(checked) => {
              if (checked) {
                onChange([...value, option.value]);
              } else {
                onChange(value.filter((v) => v !== option.value));
              }
            }}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

const UserMultiSelectField = ({
  value,
  onChange,
  id,
}: {
  value: Array<{Name:string, Email:string, _id:string}>;
  onChange: (value: Array<{Name:string, Email:string, _id:string}>) => void;
  id: string;
}) => {

  const [response, setResponse] = useState<{Name:string, Email:string, _id:string}[]>([])
  const [options, setOptions] = useState<{label: string, value:string}[]>([])


  useEffect(() => {
(async () =>{
    const response = await window.kf.api(`/form/2/${window.kf.account._id}/Test_All_Fields_A00/PkCT9cShTOek/${id}/lookup`);
    const data:{Name:string, Email:string, _id:string}[] = response.Data
    setResponse(data)
     setOptions(data.map((opt:{Name:string, Email:string, _id:string}) => ({label: opt.Name, value: opt._id})))
})()
  }, [id])

  return (
    <MultiSelect
      options={options}
      value={value.map(u => u._id)}
      onChange={(selectedNames) => {
        console.log("Selected IDs", selectedNames)
        const selectedUsers = options
          .filter((opt) => selectedNames.includes(opt.value))
          .map((opt) => {
            const user = response.find((u:{Name:string, Email:string, _id:string}) => u.Name === opt.label);
            return user ? {Name: user.Name, Email: user.Email, _id: user._id} : null;
          })
          .filter((u): u is {Name:string, Email:string, _id:string} => u !== null);
          console.log("Selected users", selectedUsers)
        onChange(selectedUsers);
      }}
    />
  );
}

export default function FormRenderer({
  fieldsConfigUrl,
  fieldValuesUrl,
  onSubmit,
}: FormRendererProps) {

  const [fieldConfigs, setFieldConfigs] = useState<FieldConfig[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    formData,
    errors,
    loading,
    error,
    updateField,
    save,
  } = useKfForm("dataform", "DF_form_A00", "PkCT9cShTOek") as UseFormReturn;

  useEffect(() => {
    const fetchFieldConfigs = async () => {
      try {
        if (typeof window.kf !== 'undefined' && window.kf?.api) {
          const configs = await window.kf.api(`/form/2/${window.kf.account._id}/Test_All_Fields_A00/fields`);
          if (configs) {
            setFieldConfigs(configs);
          }
        }
      } catch (err) {
        console.error('Failed to fetch field configuration:', err);
      }
    };

    fetchFieldConfigs();
  }, [fieldsConfigUrl, fieldValuesUrl]);

  const renderField = (config: FieldConfig) => {
    const fieldValue = formData[config.Id] as unknown;

    switch (config.Type.toLowerCase()) {
      case 'text':
        return (
          <Input
            placeholder={config.placeholder}
            type="text"
            readOnly={config.ReadOnly}
            value={fieldValue as string}
            onChange={(e) => updateField(config.Id, e.target.value)}
          />
        );

      case 'email':
        return (
          <Input
            placeholder={config.placeholder || 'name@example.com'}
            type="email"
            readOnly={config.ReadOnly}
            value={fieldValue as string}
            onChange={(e) => updateField(config.Id, e.target.value)}
          />
        );

      case 'textarea':
        return (
          <Textarea
            placeholder={config.placeholder}
            className="resize-none"
            readOnly={config.ReadOnly}
            value={fieldValue as string}
            onChange={(e) => updateField(config.Id, e.target.value)}
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            placeholder={config.placeholder}
            min={config.min}
            max={config.max}
            step={config.step || 1}
            readOnly={config.ReadOnly}
            value={fieldValue as number}
            onChange={(e) => updateField(config.Id, parseFloat(e.target.value))}
          />
        );

      case 'currency':
        return (
          <div className="relative">
            <span className="absolute left-2 top-2">$</span>
            <Input
              type="text"
              placeholder={config.placeholder || '0.00'}
              className="pl-6"
              readOnly={config.ReadOnly}
              value={fieldValue as string}
              onChange={(e) => updateField(config.Id, e.target.value)}
            />
          </div>
        );

      case 'boolean':
        return (
          <Switch
            checked={Boolean(fieldValue)}
            onCheckedChange={(checked) => updateField(config.Id, checked)}
            disabled={config.ReadOnly}
          />
        );

      case 'date':
        return (
          <DatePickerField
            value={fieldValue as string}
            onChange={(date) => updateField(config.Id, date)}
          />
        );

      case 'datetime':
        return (
          <DateTimePickerField
            value={fieldValue as string}
            onChange={(date) => updateField(config.Id, date)}
          />
        );

      case 'select':
        return (
          <SingleSelectField
            value={String(fieldValue)}
            onChange={(value) => updateField(config.Id, value)}
            config={config}
          />
        );

      case 'multiselect':
        return (
          <MultiSelectField
            value={Array.isArray(fieldValue) ? (fieldValue as string[]) : []}
            onChange={(value) => updateField(config.Id, value)}
            id={config.Id}
          />
        );

      case 'checkbox':
        return (
          <CheckboxList
            value={Array.isArray(fieldValue) ? (fieldValue as string[]) : []}
            onChange={(value) => updateField(config.Id, value)}
            id={config.Id}
          />
        );

      case 'user':
        return (
          <UserSingleSelectField
            value={fieldValue as {Name:string, Email:string, _id:string}}
            onChange={(value) => updateField(config.Id, value)}
            config={config}
          />
        );

      case 'multiuser':
        return (
          <UserMultiSelectField
            value={fieldValue as Array<{Name:string, Email:string, _id:string}>}
            onChange={(value) => updateField(config.Id, value)}
            id={config.Id}
          />
        );

      default:
        return (
          <Input
            placeholder={config.placeholder}
            type="text"
            readOnly={config.ReadOnly}
            value={fieldValue as string}
            onChange={(e) => updateField(config.Id, e.target.value)}
          />
        );
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading form...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 py-8">
        Error loading form: {error}
      </div>
    );
  }

  // Filter out system fields (starting with _) and readonly fields
  const editableFields = fieldConfigs.filter(
    (f) => !f.IsSystemField && !f.ReadOnly
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const success = await save();
      if (success && onSubmit) {
        onSubmit(formData);
      }
    } catch (err) {
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="text-red-500 py-4 mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {editableFields.map((config) => (
            <div key={config.Id} className="flex flex-col gap-2">
              <Label htmlFor={config.Id} className="font-medium">
                {config.Name}
                {config.Required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              <div className="flex-1">
                {renderField(config)}
              </div>
              {errors[config.Id] && Array.isArray(errors[config.Id]) && (
                <span className="text-sm text-red-500">
                  {errors[config.Id][0]}
                </span>
              )}
            </div>
          ))}
        </div>

        <Button type="submit" className="mt-8" disabled={isSubmitting || loading}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}

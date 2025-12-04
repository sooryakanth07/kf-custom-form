'use client';

import { useEffect, useState } from 'react';
import { kf } from '@/lib/sdk/index';
import { useForm } from 'react-hook-form';
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
import { Slider } from '@/components/ui/slider';
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

const itemID = "PkCT9cShTOek"

const getOptions = async (fieldID:string, type:string) => {

  let url = "dropdown";
  if (type === "User") {
  url = "lookup"
  }
  const options = await kf.api(`/form/2/${kf.account._id}/Test_All_Fields_A00/${itemID}/${fieldID}/${url}`)
  if(type === "User"){
    return options.Data
  }
  return options;

}


const StarRating = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={cn(
            'text-2xl transition-colors',
            star <= value ? 'text-yellow-400' : 'text-gray-300'
          )}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const RangeSlider = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}: {
  value: number[] | number;
  onChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}) => {
  const sliderValue = Array.isArray(value) ? value : [value];
  return (
    <Slider
      value={sliderValue}
      onValueChange={onChange}
      min={min}
      max={max}
      step={step}
      className="w-full"
    />
  );
};

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
  value: string;
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
console.log(value)
  const date = value && parseDate(value.split(" ")[0]);
  console.log(date)
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

     const response = await getOptions(config.Id, config.Type);
     if(config.Type === "User"){
     setOptions(response.map((opt:{Name:string, Email:string, _id:string}) => ({label: opt.Name, value: opt._id})))
    } else {
       setOptions(response.map((opt:string) => ({label: opt, value: opt})))
    }
})()
  }, [])

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

     const response:{Name:string, Email:string, _id:string}[] = await getOptions(config.Id, config.Type);
     setResponse(response)
     setOptions(() => {
      let options = response.map((opt:{Name:string, Email:string, _id:string}) => ({label: opt.Name, value: opt._id}))
      if(value && !options.find(o => o.value === value._id)){
        options = [{label: value.Name, value: value._id}, ...options]
      }
      return options
})
})()
  }, [])

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
     const response = await getOptions(id, "dropdown");
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
     const response = await getOptions(id, "dropdown");
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
    const response = await getOptions(id, "User");
    setResponse(response)
     setOptions(response.map((opt:{Name:string, Email:string, _id:string}) => ({label: opt.Name, value: opt._id})))
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

const ChecklistField = ({
  value,
  onChange,
  options,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  options: Array<{ label: string; value: string }>;
}) => {
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

export default function FormRenderer({
  fieldsConfigUrl,
  fieldValuesUrl,
  onSubmit,
}: FormRendererProps) {

  const [fieldConfigs, setFieldConfigs] = useState<FieldConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formState, setFormState] = useState<Record<string, unknown>>({});

  const setValue = (fieldId: string, value: unknown) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldId]: value,
    }));
  }

  const { register, handleSubmit, watch, formState: { errors } } =
    useForm<Record<string, unknown>>({
      defaultValues: {},
    });

const dataform = kf.app.getDataform("DF_form_A00")
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch field configuration using the provided URLs or SDK
        let configs: FieldConfig[] | null = null;
        let values: Record<string, unknown> | null = null;
        
        if (typeof kf !== 'undefined' && kf?.api) {
          // Use KF SDK - update these URLs based on your actual endpoints
          configs = await kf.api(`/form/2/${(kf as any).account._id}/Test_All_Fields_A00/fields`);
          if (!configs) {
            throw new Error('Failed to fetch field configuration');
          }

          values = await kf.api(`/form/2/${(kf as any).account._id}/Test_All_Fields_A00/PkCT9cShTOek`);
          if (!values) {
            throw new Error('Failed to fetch field values');
          }
        } else {
          throw new Error('No data source configured');
        }

        // Set default values in the form
        if (values) {
          Object.keys(values).forEach((key) => {
            setValue(key, values[key]);
            // updateFormState(key, values[key]);
          });
        }

        if (configs) {
          setFieldConfigs(configs);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fieldsConfigUrl, fieldValuesUrl]);

  // const formValues = watch();
  // const formValues = formState;

  useEffect(() => {
    console.log("Form Values Updated:", formState);
  }, [formState]);

  const renderField = (config: FieldConfig) => {
    const fieldValue = formState[config.Id] as unknown;

    switch (config.Type.toLowerCase()) {
      case 'text':
        return (
          <Input
            {...register(config.Id, {
              required: config.Required ? 'This field is required' : false,
            })}
            placeholder={config.placeholder}
            type="text"
            readOnly={config.ReadOnly}
            value={fieldValue as string}
          />
        );

      case 'email':
        return (
          <Input
            {...register(config.Id, {
              required: config.Required ? 'This field is required' : false,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
            placeholder={config.placeholder || 'name@example.com'}
            type="email"
            readOnly={config.ReadOnly}
            value={fieldValue as string}
          />
        );

      case 'textarea':
        return (
          <Textarea
            {...register(config.Id, {
              required: config.Required ? 'This field is required' : false,
            })}
            placeholder={config.placeholder}
            className="resize-none"
            readOnly={config.ReadOnly}
            value={fieldValue as string}
          />
        );

      case 'number':
        return (
          <Input
            {...register(config.Id, {
              required: config.Required ? 'This field is required' : false,
              valueAsNumber: true,
            })}
            type="number"
            placeholder={config.placeholder}
            min={config.min}
            max={config.max}
            step={config.step || 1}
            readOnly={config.ReadOnly}
            value={fieldValue as number}
          />
        );

      case 'currency':
        return (
          <div className="relative">
            <span className="absolute left-2 top-2">$</span>
            <Input
              {...register(config.Id, {
                required: config.Required ? 'This field is required' : false,
              })}
              type="text"
              placeholder={config.placeholder || '0.00'}
              className="pl-6"
              readOnly={config.ReadOnly}
              value={fieldValue as string}
            />
          </div>
        );

      case 'boolean':
        return (
          <Switch
            checked={Boolean(fieldValue)}
            onCheckedChange={(checked) => setValue(config.Id, checked)}
            disabled={config.ReadOnly}
          />
        );

      case 'date':
        return (
          <DatePickerField
            value={fieldValue as string}
            onChange={(date) => setValue(config.Id, date)}
          />
        );

      case 'datetime':
        return (
          <DateTimePickerField
            value={fieldValue as string}
            onChange={(date) => setValue(config.Id, date)}
          />
        );

      case 'select':
        // Check if it's a Radio widget
      
          return (
            <SingleSelectField
            {...register(config.Id)}
              value={String(fieldValue)}
              onChange={(value) => setValue(config.Id, value)}
              config={config}
            />
          );

      case 'multiselect':
        return (
          <MultiSelectField
          {...register(config.Id)}
            value={Array.isArray(fieldValue) ? (fieldValue as string[]) : []}
            onChange={(value) => setValue(config.Id, value)}
            id={config.Id}
          />
        );

      case 'checkbox':
        return (
          // <label className="flex items-center gap-2 cursor-pointer">
          //   <Checkbox
          //     checked={Array.isArray(fieldValue) ? fieldValue.length > 0 : Boolean(fieldValue)}
          //     onCheckedChange={(checked) => {
          //       if (checked) {
          //         setValue(config.Id, [config.Name]);
          //       } else {
          //         setValue(config.Id, []);
          //       }
          //     }}
          //     disabled={config.ReadOnly}
          //   />
          //   <span className="text-sm">{config.Name}</span>
          // </label>
          <CheckboxList
            value={Array.isArray(fieldValue) ? (fieldValue as string[]) : []}
            onChange={(value) => setValue(config.Id, value)}
            id={config.Id}
          />
        );

      case 'user':
        // Single user select
        return (
          // <Select
          //   value={typeof fieldValue === 'object' && fieldValue !== null && 'Name' in fieldValue
          //     ? (fieldValue as Record<string, string>).Name
          //     : String(fieldValue || '')}
          //   onValueChange={(value) => setValue(config.Id, value)}
          //   disabled={config.ReadOnly}
          // >
          //   <SelectTrigger>
          //     <SelectValue placeholder="Select a user" />
          //   </SelectTrigger>
          //   <SelectContent>
          //     {config.options?.map((option) => (
          //       <SelectItem key={option.value} value={option.value}>
          //         {option.label}
          //       </SelectItem>
          //     ))}
          //   </SelectContent>
          // </Select>
          <UserSingleSelectField
            value={fieldValue as {Name:string, Email:string, _id:string}}
            onChange={(value) => setValue(config.Id, value)}
            config={config}
          />
        );

      case 'multiuser':
        // Multi user select
        return (
          <UserMultiSelectField
            value={fieldValue as Array<{Name:string, Email:string, _id:string}>}
            onChange={(value) => setValue(config.Id, value)}
            id={config.Id}
          />
        );

      default:
        return (
          <Input
            {...register(config.Id)}
            placeholder={config.placeholder}
            type="text"
            readOnly={config.ReadOnly}
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

  return (
    <form onSubmit={handleSubmit(onSubmit || (() => {}))} className="w-full">
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
            {errors[config.Id] && (
              <span className="text-sm text-red-500">
                {typeof errors[config.Id]?.message === 'string'
                  ? errors[config.Id]?.message
                  : 'Invalid field'}
              </span>
            )}
          </div>
        ))}
      </div>

      <Button type="submit" className="mt-8">
        Submit
      </Button>
    </form>
  );
}

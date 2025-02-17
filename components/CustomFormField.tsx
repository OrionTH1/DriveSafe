/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { E164Number } from "libphonenumber-js/core";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Control } from "react-hook-form";
import "react-phone-number-input/style.css";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PASSWORD = "password",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

interface CustomProps {
  control: Control<any>;
  name: string;
  fieldType: FormFieldType;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  readOnly?: boolean;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    name,
    label,
    fieldType,
    iconSrc,
    iconAlt,
    placeholder,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
    readOnly,
  } = props;

  switch (fieldType) {
    case FormFieldType.INPUT: {
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              width={24}
              height={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
              readOnly
            />
          </FormControl>
        </div>
      );
    }

    case FormFieldType.TEXTAREA: {
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
            maxLength={400}
            readOnly
          />
        </FormControl>
      );
    }
    case FormFieldType.PHONE_INPUT: {
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={placeholder}
            international
            countryCallingCodeEditable
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
            readOnly
          />
        </FormControl>
      );
    }
    case FormFieldType.DATE_PICKER: {
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src={"/assets/icons/calendar.svg"}
            width={24}
            height={24}
            alt="calendar"
            className="ml-2"
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
              disabled={readOnly}
            />
          </FormControl>
        </div>
      );
    }
    case FormFieldType.SKELETON: {
      return renderSkeleton ? renderSkeleton(field) : null;
    }
    case FormFieldType.SELECT: {
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger
                className="shad-select-trigger"
                disabled={readOnly}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    }
    case FormFieldType.CHECKBOX: {
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <Label htmlFor={name} className="checkbox-label">
              {label}
            </Label>
          </div>
        </FormControl>
      );
    }

    case FormFieldType.PASSWORD: {
      return (
        <FormControl>
          <div className="flex rounded-md border border-dark-500 bg-dark-400">
            {iconSrc && (
              <Image
                src={iconSrc}
                width={24}
                height={24}
                alt={iconAlt || "icon"}
                className="ml-2"
              />
            )}
            <FormControl>
              <Input
                placeholder={placeholder}
                type="password"
                {...field}
                className="shad-input border-0"
              />
            </FormControl>
          </div>
        </FormControl>
      );
    }
    default:
      break;
  }
};

function CustomFormField(props: CustomProps) {
  const { control, name, fieldType, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
}

export default CustomFormField;

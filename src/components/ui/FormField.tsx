'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Icon } from '../icons';
import { cn } from '../../utils';

// ─── Context ───────────────────────────────────────────────
type FormFieldSize = 'sm' | 'md' | 'lg' | 'xl';

type FormFieldContextValue = {
  size: FormFieldSize;
  disabled: boolean;
};

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

const useFormFieldContext = () => {
  const ctx = useContext(FormFieldContext);
  if (!ctx) throw new Error('FormField sub-components must be used within <FormField>');
  return ctx;
};

// ─── Size styles ───────────────────────────────────────────
const TITLE_SIZE_STYLES: Record<FormFieldSize, string> = {
  sm: 'text-[14px] leading-[20px]',
  md: 'text-[16px] leading-[24px]',
  lg: 'text-[18px] leading-[26px]',
  xl: 'text-[20px] leading-[28px]',
};

// ─── Root ──────────────────────────────────────────────────
type FormFieldRootProps = {
  size?: FormFieldSize;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

const FormFieldRoot = ({
  size = 'md',
  disabled = false,
  className,
  children,
}: FormFieldRootProps) => {
  return (
    <FormFieldContext.Provider value={{ size, disabled }}>
      <div className={cn('flex flex-col gap-1.5', disabled && 'opacity-60', className)}>
        {children}
      </div>
    </FormFieldContext.Provider>
  );
};

// ─── Label ─────────────────────────────────────────────────
type FormFieldLabelProps = {
  required?: boolean;
  tooltip?: string;
  children: ReactNode;
};

const FormFieldLabel = ({ required = false, tooltip, children }: FormFieldLabelProps) => {
  const { size } = useFormFieldContext();

  return (
    <div className="flex items-center gap-0.5">
      <span className={cn('font-bold text-black', TITLE_SIZE_STYLES[size])}>
        {children}
      </span>
      {required && (
        <span className="text-[14px] font-bold leading-[20px] text-error">*</span>
      )}
      {tooltip && (
        <span
          data-tooltip-id="form-field-tooltip"
          data-tooltip-content={tooltip}
          className="ml-0.5 cursor-help"
        >
          <Icon.Notice className="text-gray-a" />
        </span>
      )}
    </div>
  );
};

// ─── Description ───────────────────────────────────────────
type FormFieldDescriptionProps = {
  children: ReactNode;
  className?: string;
};

const FormFieldDescription = ({ children, className }: FormFieldDescriptionProps) => {
  return (
    <p className={cn('text-[12px] leading-[18px] text-gray-a', className)}>{children}</p>
  );
};

// ─── Content ───────────────────────────────────────────────
type FormFieldContentProps = {
  children: ReactNode;
  className?: string;
};

const FormFieldContent = ({ children, className }: FormFieldContentProps) => {
  return <div className={cn('w-full', className)}>{children}</div>;
};

// ─── Value (읽기 전용 - List Shape) ────────────────────────
type FormFieldValueProps = {
  copyable?: boolean;
  onCopy?: () => void;
  description?: string;
  className?: string;
  children: ReactNode;
};

const FormFieldValue = ({
  copyable = false,
  onCopy,
  description,
  className,
  children,
}: FormFieldValueProps) => {
  const handleCopy = () => {
    if (onCopy) {
      onCopy();
    } else if (typeof children === 'string') {
      navigator.clipboard.writeText(children);
    }
  };

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-center gap-1 h-[50px] px-3 bg-gray-f7 rounded-[8px] w-full">
        <span className="text-[14px] leading-[20px] text-black">{children}</span>
        {copyable && (
          <button
            type="button"
            onClick={handleCopy}
            className="shrink-0 text-gray-a hover:text-black transition-colors"
          >
            <Icon.Copy />
          </button>
        )}
      </div>
      {description && (
        <p className="text-[12px] leading-[18px] text-gray-a">{description}</p>
      )}
    </div>
  );
};

// ─── Card (읽기 전용 - Card Shape) ─────────────────────────
type FormFieldCardProps = {
  copyable?: boolean;
  onCopy?: () => void;
  className?: string;
  children: ReactNode;
};

const FormFieldCard = ({
  copyable = false,
  onCopy,
  className,
  children,
}: FormFieldCardProps) => {
  const handleCopy = () => {
    if (onCopy) {
      onCopy();
    } else if (typeof children === 'string') {
      navigator.clipboard.writeText(children);
    }
  };

  return (
    <div
      className={cn(
        'flex items-center gap-1 h-[50px] px-3 border border-gray-d rounded-[8px] bg-white w-full',
        className,
      )}
    >
      <span className="text-[14px] leading-[20px] text-black">{children}</span>
      {copyable && (
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 text-gray-a hover:text-black transition-colors"
        >
          <Icon.Copy />
        </button>
      )}
    </div>
  );
};

// ─── Compound export ───────────────────────────────────────
export const FormField = Object.assign(FormFieldRoot, {
  Label: FormFieldLabel,
  Description: FormFieldDescription,
  Content: FormFieldContent,
  Value: FormFieldValue,
  Card: FormFieldCard,
});

// 하위 호환용 (deprecated)
export const FormViewValue = FormFieldValue;
export const FormViewCard = FormFieldCard;

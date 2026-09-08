import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useFormField } from "@/components/ui/form";

type FormCardHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export const FormCardHeader = ({ eyebrow, title, description }: FormCardHeaderProps) => (
  <div className="career-form-card__head">
    <span>{eyebrow}</span>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

type FormSectionProps = {
  number: string;
  title: string;
  children: ReactNode;
};

export const FormSection = ({ number, title, children }: FormSectionProps) => (
  <section className="investor-form-section" aria-labelledby={`form-section-${number}`}>
    <div className="investor-form-section__title">
      <span aria-hidden="true">{number}</span>
      <strong id={`form-section-${number}`}>{title}</strong>
    </div>
    {children}
  </section>
);

type CheckboxGridProps<TOption extends string> = {
  legend: string;
  options: readonly TOption[];
  selected: readonly TOption[];
  onChange: (values: TOption[]) => void;
  className?: string;
};

export const CheckboxGrid = <TOption extends string>({
  legend,
  options,
  selected,
  onChange,
  className = "",
}: CheckboxGridProps<TOption>) => {
  const { error, formMessageId } = useFormField();

  return (
    <fieldset
      className="career-specialties"
      aria-describedby={error ? formMessageId : undefined}
      aria-invalid={Boolean(error)}
    >
      <legend className="contact-form-label">{legend}</legend>
      <div className={`career-specialties__grid ${className}`.trim()}>
        {options.map((option) => {
          const checked = selected.includes(option);
          return (
            <label key={option}>
              <input
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(
                  event.target.checked
                    ? [...selected, option]
                    : selected.filter((value) => value !== option),
                )}
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

type ConsentControlProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
};

export const ConsentControl = ({ checked, onChange, children }: ConsentControlProps) => {
  const { error, formItemId, formMessageId } = useFormField();

  return (
    <label className="career-consent" htmlFor={formItemId}>
      <input
        id={formItemId}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        aria-describedby={error ? formMessageId : undefined}
        aria-invalid={Boolean(error)}
      />
      <span>{children}</span>
    </label>
  );
};

type FormSubmissionControlProps = {
  label: string;
  loadingLabel: string;
  isSubmitting: boolean;
  error: string | null;
};

export const FormSubmissionControl = ({
  label,
  loadingLabel,
  isSubmitting,
  error,
}: FormSubmissionControlProps) => (
  <>
    {error ? <div className="contact-error" role="alert">{error}</div> : null}
    <Button type="submit" className="contact-form-submit career-form-submit" disabled={isSubmitting} aria-busy={isSubmitting}>
      {isSubmitting ? loadingLabel : label}
    </Button>
  </>
);

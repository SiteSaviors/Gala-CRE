import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { z } from "zod";
import { submitContactForm } from "@/lib/contactForm";

const propertyInquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim(),
  company: z.string().trim(),
  message: z.string().trim().min(10, "Please share a few more details."),
  website: z.string(),
});

type PropertyInquiryValues = z.infer<typeof propertyInquirySchema>;

type PropertyInquiryFormProps = {
  propertyName: string;
  propertySlug: string;
  advisorId: string;
  advisorName: string;
  eyebrow?: string;
};

const defaultValues: PropertyInquiryValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  website: "",
};

const PropertyInquiryForm = ({
  propertyName,
  propertySlug,
  advisorId,
  advisorName,
  eyebrow,
}: PropertyInquiryFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const location = useLocation();
  const form = useForm<PropertyInquiryValues>({
    resolver: zodResolver(propertyInquirySchema),
    defaultValues,
  });

  const onSubmit = async (values: PropertyInquiryValues) => {
    setSubmitError(null);
    try {
      await submitContactForm(
        {
          ...values,
          inquiryType: "Property Inquiry",
          propertySlug,
          advisorId,
        },
        `${location.pathname}${location.search}`,
      );
      setIsSubmitted(true);
      form.reset(defaultValues);
    } catch {
      setSubmitError("We could not send your inquiry. Please try again or contact the listing advisor directly.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="gala-listing-inquiry-form gala-listing-inquiry-form--success" role="status" aria-live="polite">
        <span>Inquiry Received</span>
        <h3>Your message has been sent.</h3>
        <p>{advisorName} received your inquiry about {propertyName} and can follow up directly.</p>
        <button type="button" onClick={() => setIsSubmitted(false)}>Send another inquiry</button>
      </div>
    );
  }

  return (
    <div className="gala-listing-inquiry-form">
      <div className="gala-listing-inquiry-form__head">
        <span>{eyebrow ?? `Direct to ${advisorName}`}</span>
        <h3>Ask about this property.</h3>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="gala-listing-inquiry-form__row">
          <label>
            <span>Name</span>
            <input
              {...form.register("name")}
              autoComplete="name"
              aria-invalid={Boolean(form.formState.errors.name)}
            />
            {form.formState.errors.name ? <small>{form.formState.errors.name.message}</small> : null}
          </label>
          <label>
            <span>Email</span>
            <input
              {...form.register("email")}
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(form.formState.errors.email)}
            />
            {form.formState.errors.email ? <small>{form.formState.errors.email.message}</small> : null}
          </label>
        </div>

        <div className="gala-listing-inquiry-form__row">
          <label>
            <span>Phone <em>Optional</em></span>
            <input {...form.register("phone")} type="tel" autoComplete="tel" />
          </label>
          <label>
            <span>Company <em>Optional</em></span>
            <input {...form.register("company")} autoComplete="organization" />
          </label>
        </div>

        <label>
          <span>Message</span>
          <textarea
            {...form.register("message")}
            rows={3}
            aria-invalid={Boolean(form.formState.errors.message)}
          />
          {form.formState.errors.message ? <small>{form.formState.errors.message.message}</small> : null}
        </label>

        <label className="gala-listing-inquiry-form__honeypot" aria-hidden="true">
          <span>Website</span>
          <input {...form.register("website")} tabIndex={-1} autoComplete="off" />
        </label>

        {submitError ? <p className="gala-listing-inquiry-form__error" role="alert">{submitError}</p> : null}

        <button type="submit" className="gala-button gala-button--dark" disabled={form.formState.isSubmitting}>
          <Send size={15} aria-hidden="true" />
          {form.formState.isSubmitting ? "Sending..." : "Send Property Inquiry"}
        </button>
      </form>
    </div>
  );
};

export default PropertyInquiryForm;

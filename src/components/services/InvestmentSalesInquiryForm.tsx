import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactFormConfig } from "@/content/contact";
import { submitContactForm } from "@/lib/contactForm";

const inquirySchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name."),
  lastName: z.string().trim().min(1, "Please enter your last name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim(),
  propertyType: z.string().trim().min(1, "Please select a property type."),
  message: z.string().trim().min(10, "Please share a few more details."),
  website: z.string(),
});

type InquiryValues = z.infer<typeof inquirySchema>;

const propertyTypes = ["Industrial", "Multifamily", "Retail", "Office", "Land", "Mixed-Use", "Other"] as const;

type InvestmentSalesInquiryFormProps = {
  inquiryType?: "Investment Sales" | "Capital Markets";
  sourcePath?: string;
  messageLabel?: string;
  successBody?: string;
};

const InvestmentSalesInquiryForm = ({
  inquiryType = "Investment Sales",
  sourcePath = "/services/investment-sales#investment-sales-consultation",
  messageLabel = "Tell us about the property and your objectives",
  successBody = "A Gala CRE advisor will review your property information and follow up directly.",
}: InvestmentSalesInquiryFormProps) => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      propertyType: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = async (values: InquiryValues) => {
    setSubmitError(null);
    try {
      await submitContactForm(
        {
          name: `${values.firstName} ${values.lastName}`.trim(),
          email: values.email,
          phone: values.phone,
          company: "",
          inquiryType,
          message: `Property type: ${values.propertyType}\n\n${values.message}`,
          propertySlug: "",
          advisorId: "",
          website: values.website,
        },
        sourcePath,
      );
      setIsSubmitted(true);
      form.reset();
    } catch {
      setSubmitError(contactFormConfig.errorBody);
    }
  };

  if (isSubmitted) {
    return (
      <div className="gala-investment-narrative-form__success" role="status" aria-live="polite">
        <span>Inquiry received</span>
        <h3>Thank you for reaching out.</h3>
        <p>{successBody}</p>
        <Button type="button" onClick={() => setIsSubmitted(false)}>Send another inquiry</Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form className="gala-investment-narrative-form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="gala-investment-narrative-form__row">
          <FormField control={form.control} name="firstName" render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl><Input {...field} autoComplete="given-name" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="lastName" render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl><Input {...field} autoComplete="family-name" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <div className="gala-investment-narrative-form__row">
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl><Input {...field} type="email" autoComplete="email" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel>Phone <span>Optional</span></FormLabel>
              <FormControl><Input {...field} type="tel" autoComplete="tel" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="propertyType" render={({ field }) => (
          <FormItem>
            <FormLabel>Property type</FormLabel>
            <FormControl>
              <select {...field}>
                <option value="">Select a property type</option>
                {propertyTypes.map((type) => <option value={type} key={type}>{type}</option>)}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="message" render={({ field }) => (
          <FormItem>
            <FormLabel>{messageLabel}</FormLabel>
            <FormControl><Textarea {...field} rows={5} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="website" render={({ field }) => (
          <FormItem className="contact-honeypot" aria-hidden="true">
            <FormLabel>Website</FormLabel>
            <FormControl><Input {...field} tabIndex={-1} autoComplete="off" /></FormControl>
          </FormItem>
        )} />
        {submitError ? <div className="gala-investment-narrative-form__error" role="alert">{submitError}</div> : null}
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Sending..." : "Request a Consultation"}
          {!form.formState.isSubmitting ? <ArrowUpRight size={16} aria-hidden="true" /> : null}
        </Button>
      </form>
    </Form>
  );
};

export default InvestmentSalesInquiryForm;

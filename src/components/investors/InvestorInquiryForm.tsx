import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  CheckboxGrid,
  ConsentControl,
  FormCardHeader,
  FormSection,
  FormSubmissionControl,
} from "@/components/forms/FormFoundation";
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
import {
  exchangeStatusOptions,
  financingStatusOptions,
  investorAssetTypes,
} from "@/content/investorSourcing";
import { submitInvestorInquiry, type InvestorInquiryValues } from "@/lib/investorSourcingForm";
import { confirmedExchangeStatus, getExchangeTimelineIssues } from "@/lib/exchangeTimeline";

const investorInquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a phone number."),
  company: z.string().trim(),
  exchangeStatus: z.enum(exchangeStatusOptions),
  identificationDeadline: z.string(),
  targetLocations: z.string().trim().min(3, "Tell us where you want to acquire."),
  assetTypes: z.array(z.enum(investorAssetTypes)).min(1, "Select at least one asset type."),
  purchasePriceMin: z.string().trim().min(1, "Enter the low end of your purchase range."),
  purchasePriceMax: z.string().trim().min(1, "Enter the high end of your purchase range."),
  availableEquity: z.string().trim().min(1, "Enter the equity currently available."),
  financingStatus: z.enum(financingStatusOptions),
  acquisitionRequirements: z.string().trim().min(10, "Briefly describe the property and investment requirements that matter."),
  consent: z.boolean().refine((value) => value, "Consent is required before an inquiry can be submitted."),
  website: z.string(),
}).superRefine((values, context) => {
  getExchangeTimelineIssues(values).forEach(({ field, message }) => {
    context.addIssue({ code: z.ZodIssueCode.custom, path: [field], message });
  });
});

const InvestorInquiryForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const startedAt = useRef(new Date().toISOString());
  const location = useLocation();
  const form = useForm<InvestorInquiryValues>({
    resolver: zodResolver(investorInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      exchangeStatus: exchangeStatusOptions[0],
      identificationDeadline: "",
      targetLocations: "",
      assetTypes: [],
      purchasePriceMin: "",
      purchasePriceMax: "",
      availableEquity: "",
      financingStatus: financingStatusOptions[0],
      acquisitionRequirements: "",
      consent: false,
      website: "",
    },
  });
  const isConfirmedExchange = form.watch("exchangeStatus") === confirmedExchangeStatus;

  const onSubmit = async (values: InvestorInquiryValues) => {
    setSubmitError(null);
    try {
      await submitInvestorInquiry({
        ...values,
        identificationDeadline: values.exchangeStatus === confirmedExchangeStatus ? values.identificationDeadline : "",
      }, `${location.pathname}${location.search}`, startedAt.current);
      setIsSubmitted(true);
      form.reset();
    } catch {
      setSubmitError("We couldn’t send your acquisition brief. Your information has not been submitted.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="career-form-card career-form-success" role="status" aria-live="polite">
        <div className="contact-success-eyebrow">Acquisition brief received</div>
        <h3>Thank you for sharing your criteria.</h3>
        <p>Gala CRE will review the acquisition brief and follow up using the contact information you provided.</p>
        <Button type="button" className="contact-success-reset" onClick={() => {
          startedAt.current = new Date().toISOString();
          setIsSubmitted(false);
        }}>
          Submit another inquiry
        </Button>
      </div>
    );
  }

  return (
    <div className="career-form-card investor-form-card">
      <FormCardHeader
        eyebrow="Investor inquiry"
        title="Share your search criteria."
        description="All fields are required unless marked optional. The details below give Gala enough context to prepare for a focused property-sourcing conversation."
      />

      <Form {...form}>
        <form className="career-form" onSubmit={form.handleSubmit(onSubmit)} noValidate aria-busy={form.formState.isSubmitting}>
          <FormSection number="01" title="Contact">
            <div className="career-form-row">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem className="contact-form-item">
                  <FormLabel className="contact-form-label">Name</FormLabel>
                  <FormControl><Input {...field} className="contact-form-input" autoComplete="name" /></FormControl>
                  <FormMessage className="contact-form-message" />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem className="contact-form-item">
                  <FormLabel className="contact-form-label">Email</FormLabel>
                  <FormControl><Input {...field} type="email" className="contact-form-input" autoComplete="email" /></FormControl>
                  <FormMessage className="contact-form-message" />
                </FormItem>
              )} />
            </div>
            <div className="career-form-row">
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem className="contact-form-item">
                  <FormLabel className="contact-form-label">Phone</FormLabel>
                  <FormControl><Input {...field} type="tel" className="contact-form-input" autoComplete="tel" /></FormControl>
                  <FormMessage className="contact-form-message" />
                </FormItem>
              )} />
              <FormField control={form.control} name="company" render={({ field }) => (
                <FormItem className="contact-form-item">
                  <FormLabel className="contact-form-label">Company or ownership entity <span>Optional</span></FormLabel>
                  <FormControl><Input {...field} className="contact-form-input" autoComplete="organization" /></FormControl>
                  <FormMessage className="contact-form-message" />
                </FormItem>
              )} />
            </div>
          </FormSection>

          <FormSection number="02" title="Search criteria">
            <FormField control={form.control} name="exchangeStatus" render={({ field }) => (
              <FormItem className="contact-form-item">
                <FormLabel className="contact-form-label">Is this a 1031 exchange?</FormLabel>
                <FormControl><select {...field} className="contact-form-input contact-form-select">{exchangeStatusOptions.map((option) => <option key={option}>{option}</option>)}</select></FormControl>
                <FormMessage className="contact-form-message" />
              </FormItem>
            )} />

            {isConfirmedExchange ? (
              <FormField control={form.control} name="identificationDeadline" render={({ field }) => (
                <FormItem className="contact-form-item investor-deadline-field">
                  <FormLabel className="contact-form-label">Identification deadline</FormLabel>
                  <FormControl><Input {...field} type="date" className="contact-form-input" /></FormControl>
                  <p className="investor-form-guidance">Enter the deadline confirmed with your qualified intermediary or advisors.</p>
                  <FormMessage className="contact-form-message" />
                </FormItem>
              )} />
            ) : null}

            <FormField control={form.control} name="targetLocations" render={({ field }) => (
              <FormItem className="contact-form-item">
                <FormLabel className="contact-form-label">Target markets</FormLabel>
                <FormControl><Input {...field} className="contact-form-input" placeholder="Markets, cities, states, or radius" /></FormControl>
                <FormMessage className="contact-form-message" />
              </FormItem>
            )} />
            <FormField control={form.control} name="assetTypes" render={({ field }) => (
              <FormItem className="contact-form-item">
                <CheckboxGrid legend="Asset types" options={investorAssetTypes} selected={field.value} onChange={field.onChange} className="investor-asset-grid" />
                <FormMessage className="contact-form-message" />
              </FormItem>
            )} />
            <div className="career-form-row career-form-row--three investor-capital-row">
              <FormField control={form.control} name="purchasePriceMin" render={({ field }) => (
                <FormItem className="contact-form-item">
                  <FormLabel className="contact-form-label">Purchase-price minimum</FormLabel>
                  <FormControl><Input {...field} inputMode="decimal" className="contact-form-input" placeholder="$" /></FormControl>
                  <FormMessage className="contact-form-message" />
                </FormItem>
              )} />
              <FormField control={form.control} name="purchasePriceMax" render={({ field }) => (
                <FormItem className="contact-form-item">
                  <FormLabel className="contact-form-label">Purchase-price maximum</FormLabel>
                  <FormControl><Input {...field} inputMode="decimal" className="contact-form-input" placeholder="$" /></FormControl>
                  <FormMessage className="contact-form-message" />
                </FormItem>
              )} />
              <FormField control={form.control} name="availableEquity" render={({ field }) => (
                <FormItem className="contact-form-item">
                  <FormLabel className="contact-form-label">Available equity</FormLabel>
                  <FormControl><Input {...field} inputMode="decimal" className="contact-form-input" placeholder="$ or range" /></FormControl>
                  <FormMessage className="contact-form-message" />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="financingStatus" render={({ field }) => (
              <FormItem className="contact-form-item">
                <FormLabel className="contact-form-label">Financing status</FormLabel>
                <FormControl><select {...field} className="contact-form-input contact-form-select">{financingStatusOptions.map((option) => <option key={option}>{option}</option>)}</select></FormControl>
                <FormMessage className="contact-form-message" />
              </FormItem>
            )} />
            <FormField control={form.control} name="acquisitionRequirements" render={({ field }) => (
              <FormItem className="contact-form-item">
                <FormLabel className="contact-form-label">Brief property and investment requirements</FormLabel>
                <FormControl><Textarea {...field} rows={4} className="contact-form-input contact-form-textarea" placeholder="Occupancy, tenants, return or risk criteria, condition, access, zoning, timing, or other requirements" /></FormControl>
                <FormMessage className="contact-form-message" />
              </FormItem>
            )} />
          </FormSection>

          <FormField control={form.control} name="consent" render={({ field }) => (
            <FormItem className="contact-form-item">
              <ConsentControl checked={field.value} onChange={field.onChange}>
                I consent to Gala CRE Group using this information to evaluate my acquisition inquiry and contact me about potential opportunities.
              </ConsentControl>
              <FormMessage className="contact-form-message" />
            </FormItem>
          )} />
          <FormField control={form.control} name="website" render={({ field }) => (
            <FormItem className="contact-honeypot" aria-hidden="true"><FormLabel>Website</FormLabel><FormControl><Input {...field} tabIndex={-1} autoComplete="off" /></FormControl></FormItem>
          )} />

          <FormSubmissionControl label="Start Property Search" loadingLabel="Sending..." isSubmitting={form.formState.isSubmitting} error={submitError} />
        </form>
      </Form>
    </div>
  );
};

export default InvestorInquiryForm;

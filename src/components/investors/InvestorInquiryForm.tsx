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
  intermediaryStatusOptions,
  investorAssetTypes,
  marketInterestOptions,
  responseMethodOptions,
} from "@/content/investorSourcing";
import {
  submitInvestorInquiry,
  type InvestorInquiryValues,
} from "@/lib/investorSourcingForm";
import { getExchangeTimelineIssues } from "@/lib/exchangeTimeline";

const investorInquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a phone number."),
  company: z.string().trim(),
  exchangeStatus: z.enum(exchangeStatusOptions),
  relinquishedClosingDate: z.string(),
  identificationDeadline: z.string(),
  completionDeadline: z.string(),
  targetLocations: z.string().trim().min(3, "Tell us where you want to acquire."),
  assetTypes: z.array(z.enum(investorAssetTypes)).min(1, "Select at least one asset type."),
  purchasePriceMin: z.string().trim().min(1, "Enter the low end of your purchase range."),
  purchasePriceMax: z.string().trim().min(1, "Enter the high end of your purchase range."),
  availableEquity: z.string().trim().min(1, "Enter the equity currently available."),
  financingStatus: z.enum(financingStatusOptions),
  occupancyAndTenantProfile: z.string().trim().min(10, "Describe your occupancy and tenant preferences."),
  returnAndRiskCriteria: z.string().trim().min(10, "Describe the return or risk criteria that matter."),
  marketInterest: z.enum(marketInterestOptions),
  propertiesUnderConsideration: z.string().trim(),
  intermediaryStatus: z.enum(intermediaryStatusOptions),
  additionalRequirements: z.string().trim(),
  preferredResponseMethod: z.enum(responseMethodOptions),
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
      relinquishedClosingDate: "",
      identificationDeadline: "",
      completionDeadline: "",
      targetLocations: "",
      assetTypes: [],
      purchasePriceMin: "",
      purchasePriceMax: "",
      availableEquity: "",
      financingStatus: financingStatusOptions[0],
      occupancyAndTenantProfile: "",
      returnAndRiskCriteria: "",
      marketInterest: marketInterestOptions[0],
      propertiesUnderConsideration: "",
      intermediaryStatus: intermediaryStatusOptions[0],
      additionalRequirements: "",
      preferredResponseMethod: responseMethodOptions[0],
      consent: false,
      website: "",
    },
  });

  const onSubmit = async (values: InvestorInquiryValues) => {
    setSubmitError(null);
    try {
      await submitInvestorInquiry(values, `${location.pathname}${location.search}`, startedAt.current);
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
        <p>Gala CRE will review the acquisition brief and follow up using your preferred contact method.</p>
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
        title="Share your acquisition brief."
        description="All fields are required unless marked optional. The details give Gala enough context to begin a focused property-sourcing conversation. This is not a request for tax or legal advice."
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
            <FormField control={form.control} name="preferredResponseMethod" render={({ field }) => (
              <FormItem className="contact-form-item">
                <FormLabel className="contact-form-label">Preferred response method</FormLabel>
                <FormControl><select {...field} className="contact-form-input contact-form-select">{responseMethodOptions.map((option) => <option key={option}>{option}</option>)}</select></FormControl>
                <FormMessage className="contact-form-message" />
              </FormItem>
            )} />
          </FormSection>

          <FormSection number="02" title="Exchange timing">
            <FormField control={form.control} name="exchangeStatus" render={({ field }) => (
              <FormItem className="contact-form-item">
                <FormLabel className="contact-form-label">Is this a 1031 exchange?</FormLabel>
                <FormControl><select {...field} className="contact-form-input contact-form-select">{exchangeStatusOptions.map((option) => <option key={option}>{option}</option>)}</select></FormControl>
                <FormMessage className="contact-form-message" />
              </FormItem>
            )} />
            <p className="investor-form-guidance">If this is an exchange, enter the dates confirmed with your qualified intermediary or advisors.</p>
            <div className="career-form-row career-form-row--three investor-date-row">
              <FormField control={form.control} name="relinquishedClosingDate" render={({ field }) => (
                <FormItem className="contact-form-item">
                  <FormLabel className="contact-form-label">Relinquished-property closing</FormLabel>
                  <FormControl><Input {...field} type="date" className="contact-form-input" /></FormControl>
                  <FormMessage className="contact-form-message" />
                </FormItem>
              )} />
              <FormField control={form.control} name="identificationDeadline" render={({ field }) => (
                <FormItem className="contact-form-item">
                  <FormLabel className="contact-form-label">Identification deadline</FormLabel>
                  <FormControl><Input {...field} type="date" className="contact-form-input" /></FormControl>
                  <FormMessage className="contact-form-message" />
                </FormItem>
              )} />
              <FormField control={form.control} name="completionDeadline" render={({ field }) => (
                <FormItem className="contact-form-item">
                  <FormLabel className="contact-form-label">Exchange-completion deadline</FormLabel>
                  <FormControl><Input {...field} type="date" className="contact-form-input" /></FormControl>
                  <FormMessage className="contact-form-message" />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="intermediaryStatus" render={({ field }) => (
              <FormItem className="contact-form-item">
                <FormLabel className="contact-form-label">Qualified intermediary status</FormLabel>
                <FormControl><select {...field} className="contact-form-input contact-form-select">{intermediaryStatusOptions.map((option) => <option key={option}>{option}</option>)}</select></FormControl>
                <FormMessage className="contact-form-message" />
              </FormItem>
            )} />
          </FormSection>

          <FormSection number="03" title="Acquisition criteria">
            <FormField control={form.control} name="targetLocations" render={({ field }) => (
              <FormItem className="contact-form-item">
                <FormLabel className="contact-form-label">Target locations</FormLabel>
                <FormControl><Input {...field} className="contact-form-input" placeholder="Markets, cities, states, or radius" /></FormControl>
                <FormMessage className="contact-form-message" />
              </FormItem>
            )} />
          <FormField control={form.control} name="assetTypes" render={({ field }) => (
            <FormItem className="contact-form-item">
                <CheckboxGrid
                  legend="Asset types"
                  options={investorAssetTypes}
                  selected={field.value}
                  onChange={field.onChange}
                  className="investor-asset-grid"
                />
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
            <FormField control={form.control} name="occupancyAndTenantProfile" render={({ field }) => (
              <FormItem className="contact-form-item">
                <FormLabel className="contact-form-label">Desired occupancy and tenant profile</FormLabel>
                <FormControl><Textarea {...field} rows={3} className="contact-form-input contact-form-textarea" placeholder="Vacant or occupied, lease term, tenant quality, owner-user needs, or other preferences" /></FormControl>
                <FormMessage className="contact-form-message" />
              </FormItem>
            )} />
            <FormField control={form.control} name="returnAndRiskCriteria" render={({ field }) => (
              <FormItem className="contact-form-item">
                <FormLabel className="contact-form-label">Return or risk criteria</FormLabel>
                <FormControl><Textarea {...field} rows={3} className="contact-form-input contact-form-textarea" placeholder="Income, yield, hold period, condition, credit, vacancy, or development risk" /></FormControl>
                <FormMessage className="contact-form-message" />
              </FormItem>
            )} />
            <FormField control={form.control} name="marketInterest" render={({ field }) => (
              <FormItem className="contact-form-item">
                <FormLabel className="contact-form-label">On-market versus off-market interest</FormLabel>
                <FormControl><select {...field} className="contact-form-input contact-form-select">{marketInterestOptions.map((option) => <option key={option}>{option}</option>)}</select></FormControl>
                <FormMessage className="contact-form-message" />
              </FormItem>
            )} />
            <FormField control={form.control} name="propertiesUnderConsideration" render={({ field }) => (
              <FormItem className="contact-form-item">
                <FormLabel className="contact-form-label">Properties currently under consideration <span>Optional</span></FormLabel>
                <FormControl><Textarea {...field} rows={3} className="contact-form-input contact-form-textarea" placeholder="Addresses, listing links, or a short description" /></FormControl>
                <FormMessage className="contact-form-message" />
              </FormItem>
            )} />
            <FormField control={form.control} name="additionalRequirements" render={({ field }) => (
              <FormItem className="contact-form-item">
                <FormLabel className="contact-form-label">Additional acquisition requirements <span>Optional</span></FormLabel>
                <FormControl><Textarea {...field} rows={4} className="contact-form-input contact-form-textarea" placeholder="Access, utilities, zoning, geography, diligence, closing, or operational requirements" /></FormControl>
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

          <FormSubmissionControl
            label="Share Acquisition Criteria"
            loadingLabel="Sending..."
            isSubmitting={form.formState.isSubmitting}
            error={submitError}
          />
        </form>
      </Form>
    </div>
  );
};

export default InvestorInquiryForm;

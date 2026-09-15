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
  commercialSpecialties,
  experienceRanges,
  transactionVolumeRanges,
} from "@/content/careers";
import {
  submitAgentApplication,
  type AgentApplicationValues,
} from "@/lib/careersForm";

const optionalUrl = z.string().trim().refine(
  (value) => !value || z.string().url().safeParse(value).success,
  "Enter a complete URL beginning with https://."
);

const agentApplicationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a phone number."),
  currentBrokerage: z.string().trim(),
  cityAndMarkets: z.string().trim().min(2, "Tell us where you currently work."),
  licenseState: z.string().trim().min(2, "Enter your license state."),
  yearsExperience: z.enum(experienceRanges),
  specialties: z.array(z.enum(commercialSpecialties)).min(1, "Select at least one commercial specialty."),
  salesLeasingExperience: z.string().trim().min(20, "Briefly describe your sales and leasing experience."),
  transactionVolume: z.enum(transactionVolumeRanges),
  representativeTransactions: z.string().trim().min(20, "Share at least one representative commercial assignment."),
  existingPipeline: z.string().trim(),
  profileUrl: optionalUrl,
  whyGala: z.string().trim().min(30, "Tell us a little more about your interest in Gala CRE."),
  consent: z.boolean().refine((value) => value, "Consent is required before an application can be submitted."),
  website: z.string(),
});

const AgentApplicationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const startedAt = useRef(new Date().toISOString());
  const location = useLocation();
  const form = useForm<AgentApplicationValues>({
    resolver: zodResolver(agentApplicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      currentBrokerage: "",
      cityAndMarkets: "",
      licenseState: "",
      yearsExperience: experienceRanges[0],
      specialties: [],
      salesLeasingExperience: "",
      transactionVolume: transactionVolumeRanges[0],
      representativeTransactions: "",
      existingPipeline: "",
      profileUrl: "",
      whyGala: "",
      consent: false,
      website: "",
    },
  });

  const onSubmit = async (values: AgentApplicationValues) => {
    setSubmitError(null);
    try {
      await submitAgentApplication(values, `${location.pathname}${location.search}`, startedAt.current);
      setIsSubmitted(true);
      form.reset();
    } catch {
      setSubmitError("We couldn’t send your application. Your information has not been submitted.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="career-form-card career-form-success" role="status" aria-live="polite">
        <div className="contact-success-eyebrow">Application received</div>
        <h3>Thank you for introducing yourself.</h3>
        <p>Gala CRE will review your commercial background and follow up if there is a potential fit.</p>
        <Button type="button" className="contact-success-reset" onClick={() => {
          startedAt.current = new Date().toISOString();
          setIsSubmitted(false);
        }}>
          Submit another application
        </Button>
      </div>
    );
  }

  return (
    <div className="career-form-card">
      <FormCardHeader
        eyebrow="Join Our Team"
        title="Tell us about your commercial experience."
        description="All fields are required unless marked optional. The details help Gala understand your market, experience, and potential fit. No résumé upload is required."
      />

      <Form {...form}>
        <form className="career-form" onSubmit={form.handleSubmit(onSubmit)} noValidate aria-busy={form.formState.isSubmitting}>
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
            <FormField control={form.control} name="currentBrokerage" render={({ field }) => (
              <FormItem className="contact-form-item">
                <FormLabel className="contact-form-label">Current brokerage <span>Optional</span></FormLabel>
                <FormControl><Input {...field} className="contact-form-input" autoComplete="organization" /></FormControl>
                <FormMessage className="contact-form-message" />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="cityAndMarkets" render={({ field }) => (
            <FormItem className="contact-form-item">
              <FormLabel className="contact-form-label">City and markets served</FormLabel>
              <FormControl><Input {...field} className="contact-form-input" placeholder="Example: Raleigh-Durham, Cary, and surrounding markets" /></FormControl>
              <FormMessage className="contact-form-message" />
            </FormItem>
          )} />

          <div className="career-form-row">
            <FormField control={form.control} name="licenseState" render={({ field }) => (
              <FormItem className="contact-form-item">
                <FormLabel className="contact-form-label">License state</FormLabel>
                <FormControl><Input {...field} className="contact-form-input" autoComplete="off" /></FormControl>
                <FormMessage className="contact-form-message" />
              </FormItem>
            )} />
            <FormField control={form.control} name="yearsExperience" render={({ field }) => (
              <FormItem className="contact-form-item">
                <FormLabel className="contact-form-label">Years in real estate</FormLabel>
                <FormControl>
                  <select {...field} className="contact-form-input contact-form-select">
                    {experienceRanges.map((range) => <option value={range} key={range}>{range}</option>)}
                  </select>
                </FormControl>
                <FormMessage className="contact-form-message" />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="specialties" render={({ field }) => (
            <FormItem className="contact-form-item">
              <CheckboxGrid
                legend="Commercial specialties"
                options={commercialSpecialties}
                selected={field.value}
                onChange={field.onChange}
              />
              <FormMessage className="contact-form-message" />
            </FormItem>
          )} />

          <FormField control={form.control} name="salesLeasingExperience" render={({ field }) => (
            <FormItem className="contact-form-item">
              <FormLabel className="contact-form-label">Sales and leasing experience</FormLabel>
              <FormControl><Textarea {...field} rows={4} className="contact-form-input contact-form-textarea" /></FormControl>
              <FormMessage className="contact-form-message" />
            </FormItem>
          )} />

          <FormField control={form.control} name="transactionVolume" render={({ field }) => (
            <FormItem className="contact-form-item">
              <FormLabel className="contact-form-label">Approximate recent transaction volume</FormLabel>
              <FormControl>
                <select {...field} className="contact-form-input contact-form-select">
                  {transactionVolumeRanges.map((range) => <option value={range} key={range}>{range}</option>)}
                </select>
              </FormControl>
              <FormMessage className="contact-form-message" />
            </FormItem>
          )} />

          <FormField control={form.control} name="representativeTransactions" render={({ field }) => (
            <FormItem className="contact-form-item">
              <FormLabel className="contact-form-label">Representative past transactions</FormLabel>
              <FormControl><Textarea {...field} rows={4} className="contact-form-input contact-form-textarea" placeholder="Property type, market, transaction role, and approximate size or value" /></FormControl>
              <FormMessage className="contact-form-message" />
            </FormItem>
          )} />

          <FormField control={form.control} name="existingPipeline" render={({ field }) => (
            <FormItem className="contact-form-item">
              <FormLabel className="contact-form-label">Existing listings or business pipeline <span>Optional</span></FormLabel>
              <FormControl><Textarea {...field} rows={3} className="contact-form-input contact-form-textarea" /></FormControl>
              <FormMessage className="contact-form-message" />
            </FormItem>
          )} />

          <FormField control={form.control} name="profileUrl" render={({ field }) => (
            <FormItem className="contact-form-item">
              <FormLabel className="contact-form-label">LinkedIn, biography, or résumé URL <span>Optional</span></FormLabel>
              <FormControl><Input {...field} type="url" className="contact-form-input" placeholder="https://" autoComplete="url" /></FormControl>
              <FormMessage className="contact-form-message" />
            </FormItem>
          )} />

          <FormField control={form.control} name="whyGala" render={({ field }) => (
            <FormItem className="contact-form-item">
              <FormLabel className="contact-form-label">Why Gala CRE?</FormLabel>
              <FormControl><Textarea {...field} rows={5} className="contact-form-input contact-form-textarea" /></FormControl>
              <FormMessage className="contact-form-message" />
            </FormItem>
          )} />

          <FormField control={form.control} name="consent" render={({ field }) => (
            <FormItem className="contact-form-item">
              <ConsentControl checked={field.value} onChange={field.onChange}>
                I consent to Gala CRE Group using this information to evaluate my professional inquiry and contact me about potential opportunities.
              </ConsentControl>
              <FormMessage className="contact-form-message" />
            </FormItem>
          )} />

          <FormField control={form.control} name="website" render={({ field }) => (
            <FormItem className="contact-honeypot" aria-hidden="true">
              <FormLabel>Website</FormLabel>
              <FormControl><Input {...field} tabIndex={-1} autoComplete="off" /></FormControl>
            </FormItem>
          )} />

          <FormSubmissionControl
            label="Submit Application"
            loadingLabel="Sending..."
            isSubmitting={form.formState.isSubmitting}
            error={submitError}
          />
        </form>
      </Form>
    </div>
  );
};

export default AgentApplicationForm;

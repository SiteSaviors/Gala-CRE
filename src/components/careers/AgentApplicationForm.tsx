import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
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
import { careerStages } from "@/content/careers";
import {
  submitAgentApplication,
  type AgentApplicationValues,
} from "@/lib/careersForm";

const optionalUrl = z.string().trim().refine(
  (value) => !value || z.string().url().safeParse(value).success,
  "Enter a complete URL beginning with https://.",
);

const agentApplicationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().min(7, "Please enter a phone number."),
  currentBrokerage: z.string().trim(),
  cityAndMarkets: z.string().trim().min(2, "Tell us where you currently work."),
  careerStage: z.enum(careerStages),
  specialties: z.string().trim().min(2, "Tell us which property types you focus on."),
  experienceAndGoals: z.string().trim().min(30, "Tell us a little about your listing experience and goals."),
  profileUrl: optionalUrl,
  consent: z.boolean().refine((value) => value, "Consent is required before an inquiry can be submitted."),
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
      careerStage: careerStages[0],
      specialties: "",
      experienceAndGoals: "",
      profileUrl: "",
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
      setSubmitError("We couldn’t send your inquiry. Your information has not been submitted.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="career-form-card career-form-success" role="status" aria-live="polite">
        <div className="contact-success-eyebrow">Inquiry received</div>
        <h3>Thank you for your interest.</h3>
        <p>Gala CRE will review your real estate background and follow up directly if there is a potential fit.</p>
        <Button type="button" className="contact-success-reset" onClick={() => {
          startedAt.current = new Date().toISOString();
          setIsSubmitted(false);
        }}>
          Send another inquiry
        </Button>
      </div>
    );
  }

  return (
    <div className="career-form-card">
      <FormCardHeader
        eyebrow="Join Gala CRE"
        title="Interested in working with us?"
        description="Tell us about your real estate experience and the types of commercial properties you work with. We’ll follow up to discuss potential opportunities with Gala CRE Group."
        headingLevel={2}
      />
      <p className="career-form-card__privacy">Your information will be used to review your inquiry and contact you about potential opportunities with Gala CRE Group.</p>

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

          <div className="career-form-row">
            <FormField control={form.control} name="cityAndMarkets" render={({ field }) => (
              <FormItem className="contact-form-item">
                <FormLabel className="contact-form-label">Markets served</FormLabel>
                <FormControl><Input {...field} className="contact-form-input" placeholder="Example: Raleigh-Durham and the Research Triangle" /></FormControl>
                <FormMessage className="contact-form-message" />
              </FormItem>
            )} />
            <FormField control={form.control} name="careerStage" render={({ field }) => (
              <FormItem className="contact-form-item">
                <FormLabel className="contact-form-label">Career stage</FormLabel>
                <FormControl>
                  <select {...field} className="contact-form-input contact-form-select">
                    {careerStages.map((stage) => <option value={stage} key={stage}>{stage}</option>)}
                  </select>
                </FormControl>
                <FormMessage className="contact-form-message" />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="specialties" render={({ field }) => (
            <FormItem className="contact-form-item">
              <FormLabel className="contact-form-label">Commercial specialties</FormLabel>
              <FormControl><Input {...field} className="contact-form-input" placeholder="Example: Land, retail, and development sites" /></FormControl>
              <FormMessage className="contact-form-message" />
            </FormItem>
          )} />

          <FormField control={form.control} name="experienceAndGoals" render={({ field }) => (
            <FormItem className="contact-form-item">
              <FormLabel className="contact-form-label">Experience</FormLabel>
              <FormControl><Textarea {...field} rows={5} className="contact-form-input contact-form-textarea" placeholder="Tell us briefly about your real estate experience." /></FormControl>
              <FormMessage className="contact-form-message" />
            </FormItem>
          )} />

          <FormField control={form.control} name="profileUrl" render={({ field }) => (
            <FormItem className="contact-form-item">
              <FormLabel className="contact-form-label">LinkedIn or biography URL <span>Optional</span></FormLabel>
              <FormControl><Input {...field} type="url" className="contact-form-input" placeholder="https://" autoComplete="url" /></FormControl>
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
            label="Submit Agent Inquiry"
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

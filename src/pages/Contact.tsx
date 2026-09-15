import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { z } from "zod";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
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
import {
  contactDetails,
  contactFormConfig,
  contactHero,
  inquiryTypes,
  type InquiryType,
} from "@/content/contact";
import { propertyBySlug } from "@/content/properties";
import { teamMemberById, teamMemberIds, type TeamMemberId } from "@/content/team";
import useSiteCursor from "@/hooks/useSiteCursor";
import { submitContactForm, type ContactFormValues } from "@/lib/contactForm";

const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim(),
  company: z.string().trim(),
  inquiryType: z.enum(inquiryTypes),
  message: z.string().trim().min(10, "Please share a few more details."),
  propertySlug: z.string(),
  advisorId: z.string(),
  website: z.string(),
});

const inquiryByQuery: Partial<Record<string, InquiryType>> = {
  "landlord-representation": "Landlord Representation",
  "tenant-representation": "Tenant Representation",
  "investment-sales": "Investment Sales",
  "development-services": "Development Services",
  "capital-markets": "Capital Markets",
  "property-management": "Property Management",
  careers: "Commercial Agent Careers",
  "1031-exchange": "1031 / Replacement Property Search",
};

const dedicatedPathways: Partial<Record<InquiryType, { message: string; label: string; href: string }>> = {
  "Commercial Agent Careers": {
    message: "Commercial agents can share licensing, market, and transaction experience through the dedicated application.",
    label: "Continue to Agent Application",
    href: "/careers?source=contact",
  },
  "1031 / Replacement Property Search": {
    message: "Investors can share exchange dates, capital readiness, and acquisition criteria through the dedicated brief.",
    label: "Continue to Acquisition Brief",
    href: "/investors/1031-exchange?source=contact",
  },
};

const Contact = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const propertySlug = searchParams.get("property") ?? "";
  const selectedProperty = propertySlug ? propertyBySlug[propertySlug] : undefined;
  const requestedAdvisorId = searchParams.get("advisor");
  const advisorId = teamMemberIds.includes(requestedAdvisorId as TeamMemberId)
    ? requestedAdvisorId as TeamMemberId
    : "";
  const selectedAdvisor = advisorId ? teamMemberById[advisorId] : undefined;
  const requestedInquiry = searchParams.get("inquiry");
  const defaultInquiryType: InquiryType = propertySlug
    ? "Property Inquiry"
    : inquiryByQuery[requestedInquiry ?? ""] ?? "General Inquiry";
  useSiteCursor();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      inquiryType: defaultInquiryType,
      message: "",
      propertySlug,
      advisorId,
      website: "",
    },
  });
  const dedicatedPathway = dedicatedPathways[form.watch("inquiryType")];

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitError(null);
    try {
      await submitContactForm(values, `${location.pathname}${location.search}`);
      setIsSubmitted(true);
      form.reset();
    } catch {
      setSubmitError(contactFormConfig.errorBody);
    }
  };

  return (
    <>
      <PageMeta
        title="Talk to a Commercial Real Estate Advisor"
        description="Start a conversation with Gala CRE Group about brokerage, investment sales, development services, capital markets, or a commercial property."
      />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath="/contact" />

      <main className="contact-page" id="main-content" tabIndex={-1}>
        <section className="contact-hero">
          <div className="contact-shell">
            <div className="contact-copy">
              <div className="contact-eyebrow">{contactHero.eyebrow}</div>
              <h1 className="contact-title">{contactHero.title}</h1>
              <p className="contact-body">{contactHero.body}</p>
              <div className="contact-details" aria-label="Contact details">
                {contactDetails.map((detail) => (
                  <div key={detail.id} className="contact-detail-item">
                    <div className="contact-detail-label">{detail.label}</div>
                    <p className="contact-detail-value">{detail.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-form-card" aria-labelledby="contact-form-title">
              {isSubmitted ? (
                <div className="contact-success" role="status" aria-live="polite">
                  <div className="contact-success-eyebrow">Received</div>
                  <h2 id="contact-form-title" className="contact-form-title">{contactFormConfig.successTitle}</h2>
                  <p className="contact-form-body">{contactFormConfig.successBody}</p>
                  <Button type="button" className="contact-success-reset" onClick={() => setIsSubmitted(false)}>
                    {contactFormConfig.resetLabel}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="contact-form-head">
                    <div className="contact-form-eyebrow">Advisor Inquiry</div>
                    <h2 id="contact-form-title" className="contact-form-title">
                      {selectedProperty
                        ? `Ask about ${selectedProperty.name}`
                        : selectedAdvisor
                          ? `Contact ${selectedAdvisor.name}`
                          : contactFormConfig.title}
                    </h2>
                    <p className="contact-form-body">
                      {selectedProperty
                        ? `Tell us what you would like to evaluate at ${selectedProperty.address}, ${selectedProperty.city}, ${selectedProperty.state}. The property will be included with your inquiry.`
                        : selectedAdvisor
                          ? `Share a little about your commercial real estate needs. ${selectedAdvisor.name} will be included with your inquiry.`
                          : contactFormConfig.description}
                    </p>
                  </div>

                  <Form {...form}>
                    <form className="contact-form-grid" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                      <div className="contact-form-row">
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

                      <div className="contact-form-row">
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem className="contact-form-item">
                            <FormLabel className="contact-form-label">Phone <span>Optional</span></FormLabel>
                            <FormControl><Input {...field} type="tel" className="contact-form-input" autoComplete="tel" /></FormControl>
                            <FormMessage className="contact-form-message" />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="company" render={({ field }) => (
                          <FormItem className="contact-form-item">
                            <FormLabel className="contact-form-label">Company <span>Optional</span></FormLabel>
                            <FormControl><Input {...field} className="contact-form-input" autoComplete="organization" /></FormControl>
                            <FormMessage className="contact-form-message" />
                          </FormItem>
                        )} />
                      </div>

                      <FormField control={form.control} name="inquiryType" render={({ field }) => (
                        <FormItem className="contact-form-item">
                          <FormLabel className="contact-form-label">How can we help?</FormLabel>
                          <FormControl>
                            <select {...field} className="contact-form-input contact-form-select">
                              {inquiryTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                            </select>
                          </FormControl>
                          <FormMessage className="contact-form-message" />
                        </FormItem>
                      )} />

                      {dedicatedPathway ? (
                        <aside className="contact-form-pathway" aria-label="Recommended inquiry form">
                          <p>{dedicatedPathway.message}</p>
                          <Link to={dedicatedPathway.href}>{dedicatedPathway.label}</Link>
                        </aside>
                      ) : null}

                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem className="contact-form-item">
                          <FormLabel className="contact-form-label">What are you evaluating?</FormLabel>
                          <FormControl><Textarea {...field} rows={6} className="contact-form-input contact-form-textarea" /></FormControl>
                          <FormMessage className="contact-form-message" />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="website" render={({ field }) => (
                        <FormItem className="contact-honeypot" aria-hidden="true">
                          <FormLabel>Website</FormLabel>
                          <FormControl><Input {...field} tabIndex={-1} autoComplete="off" /></FormControl>
                        </FormItem>
                      )} />
                      <input type="hidden" {...form.register("propertySlug")} />
                      <input type="hidden" {...form.register("advisorId")} />

                      {submitError ? <div className="contact-error" role="alert">{submitError}</div> : null}
                      <Button type="submit" className="contact-form-submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Sending..." : contactFormConfig.submitLabel}
                      </Button>
                    </form>
                  </Form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter currentPath="/contact" />
    </>
  );
};

export default Contact;

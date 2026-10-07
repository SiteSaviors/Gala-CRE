import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PropertyInquiryForm from "@/components/properties/PropertyInquiryForm";
import PropertyVideo from "@/components/properties/PropertyVideo";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import {
  getPropertyInquiryHref,
  getRelatedProperties,
  type Property,
  type PropertyListingMedia,
} from "@/content/properties";
import { teamMemberById } from "@/content/team";

type CommercialListingPageProps = {
  property: Property;
};

const CommercialListingPage = ({ property }: CommercialListingPageProps) => {
  const page = property.listingPage;
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  const mediaItems = useMemo<PropertyListingMedia[]>(() => {
    if (!page) return [];

    const items: PropertyListingMedia[] = [
      {
        src: property.heroImage,
        alt: property.imageAlt ?? `${property.name} commercial property in ${property.city}, ${property.state}`,
        caption: `${property.name} · ${property.city}, ${property.state}`,
      },
      ...(page.gallery?.items ?? []),
    ];

    return items.filter((item, index) => items.findIndex((candidate) => candidate.src === item.src) === index);
  }, [page, property]);

  useEffect(() => {
    setSelectedMediaIndex(0);
  }, [property.slug]);

  if (!page) return null;

  const inquiryHref = getPropertyInquiryHref(property);
  const isClosedTransaction = property.status === "Closed";
  const inquiryLabel = isClosedTransaction ? "Discuss a Similar Property" : "Request Property Information";
  const keyFacts = page.keyFacts ?? [];
  const highlights = page.highlights ?? [];
  const advisorAssignments = property.advisorAssignments.map((assignment) => ({
    assignment,
    member: teamMemberById[assignment.advisorId],
  }));
  const primaryAdvisor = advisorAssignments[0]?.member;
  const relatedProperties = getRelatedProperties(property.slug, 2);
  const selectedMedia = mediaItems[selectedMediaIndex] ?? mediaItems[0];
  const priceOrStatus = property.priceDisplay ?? (isClosedTransaction ? "Completed transaction" : "Contact for pricing");
  const summaryFacts = keyFacts.filter((fact) => fact.value !== priceOrStatus);
  const hasClosingContent = advisorAssignments.length > 0 || Boolean(page.disclosure);
  const isChurchStreet = property.slug === "611-703-church-street";
  const opportunityImage = page.video ? undefined : mediaItems[1] ?? mediaItems[0];
  const hasOpportunityMedia = Boolean(page.video || opportunityImage);
  const opportunityMediaIntro = page.video ?? page.gallery?.intro;

  return (
    <>
      <PageMeta
        title={`${property.name} | ${property.city}, ${property.state}`}
        description={property.summary}
        image={property.heroImage}
      />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath={`/properties/${property.slug}`} />

      <main className="gala-page gala-commercial-listing gala-listing-compact" id="main-content" tabIndex={-1}>
        <section
          className={`gala-listing-compact__identity${
            property.slug === "611-703-church-street" ? " gala-listing-compact__identity--church-street" : ""
          }`}
        >
          <div className="gala-shell">
            <Link to="/properties" className="gala-back-link">
              <ArrowLeft size={16} aria-hidden="true" /> All Properties
            </Link>
            <div className="gala-commercial-listing__badges" aria-label="Listing classification">
              <span>{property.status}</span>
              <span>{isClosedTransaction ? "Sale Transaction" : property.offeringType}</span>
              <span>{property.assetType}</span>
            </div>
            <div className="gala-listing-compact__identity-grid">
              <h1>{property.name}</h1>
              <p className="gala-commercial-listing__address">
                <MapPin size={17} aria-hidden="true" />
                {property.address}, {property.city}, {property.state}
              </p>
            </div>
          </div>
        </section>

        <section className="gala-listing-compact__workspace" aria-label="Property overview">
          <div className="gala-shell gala-listing-compact__workspace-grid">
            <div
              className="gala-listing-compact__media"
              role="region"
              aria-label={page.gallery?.items.length ? `${property.name} property gallery` : `${property.name} property media`}
            >
              {selectedMedia ? (
                <figure className="gala-listing-compact__primary-image">
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.alt}
                    style={{ objectPosition: selectedMediaIndex === 0 ? property.imagePosition : undefined }}
                  />
                  <figcaption>
                    <span>{String(selectedMediaIndex + 1).padStart(2, "0")} / {String(mediaItems.length).padStart(2, "0")}</span>
                    {selectedMedia.caption}
                  </figcaption>
                </figure>
              ) : null}

              {mediaItems.length > 1 ? (
                <div className="gala-listing-compact__thumbnails" aria-label="Select a property image">
                  {mediaItems.map((item, index) => (
                    <button
                      type="button"
                      key={item.src}
                      className={selectedMediaIndex === index ? "is-active" : undefined}
                      aria-label={`View image ${index + 1} of ${mediaItems.length}: ${item.caption}`}
                      aria-pressed={selectedMediaIndex === index}
                      onClick={() => setSelectedMediaIndex(index)}
                    >
                      <img src={item.src} alt="" loading={index > 3 ? "lazy" : "eager"} />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <aside className="gala-listing-compact__summary-card" aria-label="Listing summary">
              <span className="gala-listing-compact__summary-label">
                {isClosedTransaction ? "Transaction record" : `${property.offeringType} opportunity`}
              </span>
              <strong className="gala-listing-compact__price">{priceOrStatus}</strong>
              <p>{property.summary}</p>

              {summaryFacts.length ? (
                <dl className="gala-listing-compact__facts">
                  {summaryFacts.map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              <div className="gala-listing-compact__actions">
                <Link to={isClosedTransaction ? inquiryHref : "#property-inquiry"} className="gala-button">
                  <Mail size={16} aria-hidden="true" /> {inquiryLabel}
                </Link>
                {property.externalLinks.map((listing) => (
                  <a
                    href={listing.href}
                    target="_blank"
                    rel="noreferrer"
                    className="gala-button gala-button--outline-dark"
                    key={listing.href}
                  >
                    View on {listing.label} <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                ))}
              </div>

              {advisorAssignments.length ? (
                <div className="gala-listing-compact__advisor-list">
                  <span className="gala-listing-compact__advisor-list-label">
                    {page.advisorEyebrow ?? (isClosedTransaction ? "Transaction Team" : "Listing Advisor")}
                  </span>
                  {advisorAssignments.map(({ assignment, member }) => {
                    const telephoneHref = member.phone
                      ? `tel:+1${member.phone.replace(/\D/g, "")}`
                      : undefined;
                    const emailHref = member.email ? `mailto:${member.email}` : undefined;
                    const assignmentLabel = assignment.role
                      ? `${assignment.role} · ${member.title}`
                      : member.title;

                    return (
                      <article className="gala-listing-compact__advisor" key={member.id}>
                        {member.image ? <img src={member.image} alt="" aria-hidden="true" /> : null}
                        <div>
                          <strong>{member.name}</strong>
                          <small>{assignmentLabel}{member.license ? ` · ${member.license}` : ""}</small>
                        </div>
                        <div className="gala-listing-compact__advisor-links">
                          {telephoneHref ? (
                            <a href={telephoneHref}>
                              <Phone size={16} aria-hidden="true" /> {member.phone}
                            </a>
                          ) : null}
                          {emailHref ? (
                            <a href={emailHref}>
                              <Mail size={16} aria-hidden="true" /> {member.email}
                            </a>
                          ) : null}
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : null}
            </aside>
          </div>
        </section>

        <section
          className={`gala-listing-compact__opportunity${hasOpportunityMedia ? " gala-listing-compact__opportunity--media" : ""}`}
          aria-labelledby="property-opportunity-title"
        >
          <div
            className={`gala-shell gala-listing-compact__opportunity-grid${
              hasOpportunityMedia
                ? " gala-listing-compact__opportunity-grid--media"
                : highlights.length
                  ? ""
                  : " gala-listing-compact__opportunity-grid--single"
            }`}
          >
            <div className="gala-listing-compact__opportunity-copy">
              <div className="gala-kicker gala-kicker--dark">{page.overviewEyebrow ?? "The Opportunity"}</div>
              <h2 id="property-opportunity-title">{page.headline}</h2>
              <p className="gala-lead">{page.lead}</p>
            </div>

            {page.video ? (
              <div className="gala-listing-compact__opportunity-video">
                <PropertyVideo
                  sourceUrl={page.video.sourceUrl}
                  posterImage={page.video.posterImage}
                  ariaLabel={page.video.ariaLabel}
                  orientation={page.video.orientation}
                />
              </div>
            ) : opportunityImage ? (
              <figure className="gala-listing-compact__opportunity-image">
                <img src={opportunityImage.src} alt={opportunityImage.alt} loading="lazy" />
              </figure>
            ) : null}

            {highlights.length ? (
              <div
                className={`gala-commercial-listing__highlights gala-commercial-listing__highlights--editorial gala-commercial-listing__highlights--count-${highlights.length}`}
                aria-label="Property highlights"
              >
                {highlights.map((highlight) => (
                  <div key={highlight}>
                    <Check size={17} aria-hidden="true" />
                    <p>{highlight}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {hasOpportunityMedia && opportunityMediaIntro ? (
              <div className="gala-listing-compact__opportunity-media-copy">
                <span>{opportunityMediaIntro.eyebrow}</span>
                <h3>{opportunityMediaIntro.title}</h3>
                {opportunityMediaIntro.body ? <p>{opportunityMediaIntro.body}</p> : null}
              </div>
            ) : null}
          </div>
        </section>

        {page.location ? (
          <section className="gala-listing-compact__location-media">
            <div className="gala-shell gala-listing-compact__location-media-grid gala-listing-compact__location-media-grid--single">
              <div className="gala-listing-compact__location">
                <div className="gala-listing-compact__location-map-block">
                  <div className="gala-listing-compact__map">
                    <iframe
                      title={`Map of ${property.address}`}
                      src={page.location.mapEmbedUrl}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  {page.location.mapNote ? (
                    <p className="gala-listing-compact__map-note">{page.location.mapNote}</p>
                  ) : null}
                </div>
                <div className="gala-listing-compact__location-copy">
                  <div>
                    <span>{page.location.eyebrow}</span>
                    <h2>{page.location.title}</h2>
                  </div>
                  <p>{page.location.body}</p>
                  {page.location.points.length ? (
                    <ul>{page.location.points.map((point) => <li key={point}>{point}</li>)}</ul>
                  ) : null}
                  <a href={page.location.mapHref} target="_blank" rel="noreferrer" className="gala-commercial-listing__external-link">
                    Open in Google Maps <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {hasClosingContent ? (
          <section
            className={`gala-listing-compact__close gala-listing-compact__close--${isClosedTransaction ? "closed" : "active"}`}
            id="property-inquiry"
          >
            <div className={`gala-shell gala-listing-compact__close-grid${isClosedTransaction || !primaryAdvisor ? " gala-listing-compact__close-grid--single" : ""}`}>
              <div>
                <div className="gala-kicker gala-kicker--dark">
                  {isClosedTransaction ? "Work With Gala CRE" : "Property Inquiry"}
                </div>
                <h2>
                  {isClosedTransaction
                    ? "Discuss a comparable commercial assignment."
                    : `Request details for ${property.name}.`}
                </h2>
                <p>
                  {isClosedTransaction
                    ? "Connect with Gala CRE about a similar property, disposition, or acquisition requirement."
                    : "Connect with the assigned advisor to discuss the property, available information, and next steps."}
                </p>
                {!isClosedTransaction && primaryAdvisor ? (
                  <div className="gala-listing-compact__inquiry-advisor">
                    {primaryAdvisor.image ? (
                      <img src={primaryAdvisor.image} alt={primaryAdvisor.imageAlt ?? primaryAdvisor.name} />
                    ) : null}
                    <div className="gala-listing-compact__inquiry-advisor-copy">
                      <span>Your inquiry goes directly to</span>
                      <strong>{primaryAdvisor.name}</strong>
                      <small>
                        Listing Advisor · {primaryAdvisor.title}
                        {primaryAdvisor.license ? ` · ${primaryAdvisor.license}` : ""}
                      </small>
                    </div>
                    <div className="gala-listing-compact__inquiry-advisor-links">
                      {primaryAdvisor.phone ? (
                        <a href={`tel:+1${primaryAdvisor.phone.replace(/\D/g, "")}`}>
                          <Phone size={14} aria-hidden="true" /> {primaryAdvisor.phone}
                        </a>
                      ) : null}
                      {primaryAdvisor.email ? (
                        <a href={`mailto:${primaryAdvisor.email}`}>
                          <Mail size={14} aria-hidden="true" /> {primaryAdvisor.email}
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : null}
                {isClosedTransaction || !primaryAdvisor ? (
                  <Link to={inquiryHref} className="gala-button gala-button--dark">
                    <Mail size={16} aria-hidden="true" /> {inquiryLabel}
                  </Link>
                ) : null}
              </div>
              {!isClosedTransaction && primaryAdvisor ? (
                <PropertyInquiryForm
                  propertyName={property.name}
                  propertySlug={property.slug}
                  advisorId={primaryAdvisor.id}
                  advisorName={primaryAdvisor.name}
                  eyebrow="Property Inquiry Form"
                />
              ) : null}
            </div>
            {page.disclosure ? <p className="gala-shell gala-commercial-listing__disclosure">{page.disclosure}</p> : null}
          </section>
        ) : null}

        {relatedProperties.length ? (
          <section className="gala-listing-compact__related" aria-labelledby="related-properties-title">
            <div className="gala-shell">
              <div className="gala-listing-compact__related-heading">
                <div>
                  <span>Explore More</span>
                  <h2 id="related-properties-title">Other current opportunities.</h2>
                </div>
                <Link to="/properties" className="gala-text-link">
                  View All Properties <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
              <div className="gala-listing-compact__related-grid">
                {relatedProperties.map((related) => (
                  <Link to={`/properties/${related.slug}`} key={related.slug}>
                    <img src={related.heroImage} alt="" aria-hidden="true" loading="lazy" />
                    <div>
                      <span>{related.status} · {related.assetType}</span>
                      <h3>{related.name}</h3>
                      <p>{related.city}, {related.state}</p>
                    </div>
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter currentPath={`/properties/${property.slug}`} />
    </>
  );
};

export default CommercialListingPage;

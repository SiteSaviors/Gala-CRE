import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  FileText,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import PropertyVideo from "@/components/properties/PropertyVideo";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import {
  getRelatedProperties,
  type Property,
  type PropertyListingMedia,
} from "@/content/properties";
import { teamMemberById } from "@/content/team";

type CommercialListingPageProps = {
  property: Property;
};

const DocumentAction = ({ href, external, children }: { href: string; external?: boolean; children: ReactNode }) => {
  const className = "gala-commercial-listing__document-action";
  if (external) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {children} <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link className={className} to={href}>
      {children} <ArrowRight size={15} aria-hidden="true" />
    </Link>
  );
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

  const inquiryHref = `/contact?property=${property.slug}`;
  const isClosedTransaction = property.status === "Closed";
  const inquiryLabel = isClosedTransaction ? "Discuss a Similar Property" : "Request Information";
  const publicListing = property.externalLinks[0];
  const keyFacts = page.keyFacts ?? [];
  const highlights = page.highlights ?? [];
  const informationGroups = page.information?.groups ?? [];
  const transactionConditions = page.transaction?.conditions ?? [];
  const documentItems = page.documents?.items ?? [];
  const advisorAssignments = property.advisorAssignments.map((assignment) => ({
    assignment,
    member: teamMemberById[assignment.advisorId],
  }));
  const relatedProperties = getRelatedProperties(property.slug, 2);
  const selectedMedia = mediaItems[selectedMediaIndex] ?? mediaItems[0];
  const priceOrStatus = property.priceDisplay ?? (isClosedTransaction ? "Completed transaction" : "Contact for pricing");
  const summaryFacts = keyFacts.filter((fact) => fact.value !== priceOrStatus);
  const hasAssetContent = informationGroups.length > 0 || transactionConditions.length > 0;
  const hasClosingContent = documentItems.length > 0 || advisorAssignments.length > 0 || Boolean(page.disclosure);

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
        <section className="gala-listing-compact__identity">
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
                <Link to={inquiryHref} className="gala-button">
                  <Mail size={16} aria-hidden="true" /> {inquiryLabel}
                </Link>
                {documentItems.length ? (
                  <a href="#listing-documents" className="gala-button gala-button--outline-dark">
                    <FileText size={16} aria-hidden="true" /> View Documents
                  </a>
                ) : publicListing ? (
                  <a href={publicListing.href} target="_blank" rel="noreferrer" className="gala-button gala-button--outline-dark">
                    View Listing <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                ) : null}
              </div>

              {publicListing && documentItems.length ? (
                <a href={publicListing.href} target="_blank" rel="noreferrer" className="gala-commercial-listing__external-link">
                  View on {publicListing.label} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ) : null}

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

        <section className="gala-listing-compact__opportunity">
          <div className={`gala-shell gala-listing-compact__opportunity-grid${highlights.length ? "" : " gala-listing-compact__opportunity-grid--single"}`}>
            <div>
              <div className="gala-kicker gala-kicker--dark">{page.overviewEyebrow ?? "The Opportunity"}</div>
              <h2>{page.headline}</h2>
              <p className="gala-lead">{page.lead}</p>
            </div>
            {highlights.length ? (
              <div className="gala-commercial-listing__highlights" aria-label="Property highlights">
                {highlights.map((highlight) => (
                  <div key={highlight}>
                    <Check size={17} aria-hidden="true" />
                    <p>{highlight}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {hasAssetContent ? (
          <section className="gala-listing-compact__details" aria-labelledby="property-details-title">
            <div className="gala-shell">
              <div className="gala-listing-compact__section-heading">
                <div>
                  <div className="gala-kicker gala-kicker--dark">{page.information?.intro.eyebrow ?? "Property Details"}</div>
                  <h2 id="property-details-title">{page.information?.intro.title ?? "The information that shapes the decision."}</h2>
                </div>
                {page.information?.intro.body ? <p>{page.information.intro.body}</p> : null}
              </div>

              <div className="gala-listing-compact__detail-grid">
                {informationGroups.map((group) => (
                  <article className="gala-listing-compact__detail-card" key={group.eyebrow}>
                    <span className="gala-commercial-listing__eyebrow">{group.eyebrow}</span>
                    <h3>{group.title}</h3>
                    {group.facts.length ? (
                      <dl>
                        {group.facts.map((fact) => (
                          <div key={fact.label}>
                            <dt>{fact.label}</dt>
                            <dd>{fact.value}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : <p>{group.body}</p>}
                  </article>
                ))}

                {transactionConditions.length && page.transaction ? (
                  <article className="gala-listing-compact__detail-card gala-listing-compact__detail-card--dark">
                    <span className="gala-commercial-listing__eyebrow">{page.transaction.eyebrow}</span>
                    <h3>{page.transaction.title}</h3>
                    <dl>
                      {transactionConditions.map((condition) => (
                        <div key={condition.label}>
                          <dt>{condition.label}</dt>
                          <dd>{condition.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </article>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        {page.video || page.location ? (
          <section className="gala-listing-compact__location-media">
            <div className={`gala-shell gala-listing-compact__location-media-grid${page.video && page.location ? "" : " gala-listing-compact__location-media-grid--single"}`}>
              {page.video ? (
                <div className="gala-listing-compact__video">
                  <div className="gala-listing-compact__media-heading">
                    <span>{page.video.eyebrow}</span>
                    <h2>{page.video.title}</h2>
                    {page.video.body ? <p>{page.video.body}</p> : null}
                  </div>
                  <PropertyVideo
                    sourceUrl={page.video.sourceUrl}
                    posterImage={page.video.posterImage}
                    ariaLabel={page.video.ariaLabel}
                    orientation={page.video.orientation}
                  />
                </div>
              ) : null}

              {page.location ? (
                <div className="gala-listing-compact__location">
                  <div className="gala-listing-compact__map">
                    <iframe
                      title={`Map of ${property.address}`}
                      src={page.location.mapEmbedUrl}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
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
              ) : null}
            </div>
          </section>
        ) : null}

        {hasClosingContent ? (
          <section className="gala-listing-compact__close" id="listing-documents">
            <div className={`gala-shell gala-listing-compact__close-grid${documentItems.length ? "" : " gala-listing-compact__close-grid--single"}`}>
              <div>
                <div className="gala-kicker gala-kicker--dark">
                  {page.documents?.intro.eyebrow ?? (isClosedTransaction ? "Completed Transaction" : "Property Inquiry")}
                </div>
                <h2>{page.documents?.intro.title ?? `Discuss ${property.name}.`}</h2>
                {page.documents?.intro.body ? <p>{page.documents.intro.body}</p> : null}
                <Link to={inquiryHref} className="gala-button gala-button--dark">
                  <Mail size={16} aria-hidden="true" /> {inquiryLabel}
                </Link>
              </div>

              {documentItems.length ? (
                <div className="gala-listing-compact__documents" aria-label="Property documents and records">
                  {documentItems.map((document) => (
                    <article key={document.title}>
                      <FileText size={20} aria-hidden="true" />
                      <div>
                        <h3>{document.title}</h3>
                        <p>{document.description}</p>
                        <DocumentAction href={document.href} external={document.external}>
                          {document.actionLabel}
                        </DocumentAction>
                      </div>
                    </article>
                  ))}
                </div>
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

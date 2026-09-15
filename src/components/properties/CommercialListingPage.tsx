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
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Property } from "@/content/properties";
import PropertyVideo from "@/components/properties/PropertyVideo";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
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
  if (!page) return null;

  const inquiryHref = `/contact?property=${property.slug}`;
  const isClosedTransaction = property.status === "Closed";
  const inquiryLabel = isClosedTransaction ? "Discuss a Similar Property" : "Request Information";
  const publicListing = property.externalLinks[0];
  const keyFacts = page.keyFacts ?? [];
  const highlights = page.highlights ?? [];
  const informationGroups = page.information?.groups ?? [];
  const transactionConditions = page.transaction?.conditions ?? [];
  const galleryItems = page.gallery?.items ?? [];
  const documentItems = page.documents?.items ?? [];
  const advisor = property.advisorId ? teamMemberById[property.advisorId] : undefined;
  const hasAssetContent = informationGroups.length > 0 || transactionConditions.length > 0;
  const hasDiligenceContent = documentItems.length > 0 || Boolean(advisor) || Boolean(page.disclosure);
  const telephoneHref = advisor?.phone
    ? `tel:+1${advisor.phone.replace(/\D/g, "")}`
    : undefined;
  const emailHref = advisor?.email ? `mailto:${advisor.email}` : undefined;

  return (
    <>
      <PageMeta
        title={`${property.name} | ${property.city}, ${property.state}`}
        description={property.summary}
        image={property.heroImage}
      />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath={`/properties/${property.slug}`} />

      <main className="gala-page gala-commercial-listing" id="main-content" tabIndex={-1}>
        <section className="gala-commercial-listing__hero">
          <img
            src={property.heroImage}
            alt={property.imageAlt ?? `${property.name} commercial property in ${property.city}, ${property.state}`}
            style={{ objectPosition: property.imagePosition }}
          />
          <div className="gala-commercial-listing__hero-shade"></div>
          <div className="gala-shell gala-commercial-listing__hero-content">
            <Link to="/properties" className="gala-back-link">
              <ArrowLeft size={16} aria-hidden="true" /> All Properties
            </Link>
            <div className="gala-commercial-listing__badges" aria-label="Listing classification">
              <span>{property.status}</span>
              <span>{isClosedTransaction ? "Sale Transaction" : property.offeringType}</span>
              <span>{property.assetType}</span>
            </div>
            <h1>{property.name}</h1>
            <p className="gala-commercial-listing__address">
              <MapPin size={17} aria-hidden="true" />
              {property.address}, {property.city}, {property.state}
            </p>
            <div className="gala-commercial-listing__hero-summary">
              <p>{page.headline}</p>
              <div className="gala-commercial-listing__hero-actions">
                <Link to={inquiryHref} className="gala-button">
                  <Mail size={16} aria-hidden="true" /> {inquiryLabel}
                </Link>
                {publicListing ? (
                  <a href={publicListing.href} target="_blank" rel="noreferrer" className="gala-commercial-listing__external-link">
                    View on {publicListing.label} <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {keyFacts.length ? (
          <section className="gala-commercial-listing__factbar" aria-label="Primary property facts">
            <div className="gala-shell">
              {keyFacts.map((fact) => (
                <div key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="gala-section gala-section--light gala-commercial-listing__overview">
          <div className={`gala-shell gala-commercial-listing__overview-grid${highlights.length ? "" : " gala-commercial-listing__overview-grid--single"}`}>
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

        <aside className="gala-listing-sourcing" aria-labelledby="property-sourcing-title">
          <div className="gala-shell">
            <div>
              <span>{isClosedTransaction ? "Looking for a similar opportunity?" : "Still evaluating the market?"}</span>
              <h2 id="property-sourcing-title">
                {isClosedTransaction
                  ? "Use this completed transaction as a starting point for your next search."
                  : "If this opportunity is not the right fit, define the one that is."}
              </h2>
            </div>
            <Link to={`/investors/1031-exchange?source=property-detail&property=${property.slug}`} className="gala-text-link">
              Share Your Acquisition Criteria <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </aside>

        {hasAssetContent ? (
          <section className="gala-section gala-section--silver gala-commercial-listing__asset">
            <div className="gala-shell">
              {informationGroups.length && page.information ? (
                <>
                  <div className="gala-commercial-listing__section-head">
                    <div>
                      <div className="gala-kicker gala-kicker--dark">{page.information.intro.eyebrow}</div>
                      <h2>{page.information.intro.title}</h2>
                    </div>
                    {page.information.intro.body ? <p>{page.information.intro.body}</p> : null}
                  </div>

                  <div className="gala-commercial-listing__information-grid">
                    {informationGroups.map((group) => (
                      <article key={group.eyebrow}>
                        <span className="gala-commercial-listing__eyebrow">{group.eyebrow}</span>
                        <h3>{group.title}</h3>
                        <p>{group.body}</p>
                        {group.facts.length ? (
                          <dl>
                            {group.facts.map((fact) => (
                              <div key={fact.label}>
                                <dt>{fact.label}</dt>
                                <dd>{fact.value}</dd>
                              </div>
                            ))}
                          </dl>
                        ) : null}
                      </article>
                    ))}
                  </div>
                </>
              ) : null}

              {transactionConditions.length && page.transaction ? (
                <div className="gala-commercial-listing__conditions">
                  <div className="gala-commercial-listing__conditions-heading">
                    <span className="gala-commercial-listing__eyebrow">{page.transaction.eyebrow}</span>
                    <h3>{page.transaction.title}</h3>
                  </div>
                  <dl>
                    {transactionConditions.map((condition) => (
                      <div key={condition.label}>
                        <dt>{condition.label}</dt>
                        <dd>{condition.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {galleryItems.length && page.gallery ? (
          <section className="gala-section gala-section--light gala-commercial-listing__gallery-section">
            <div className="gala-shell">
              <div className="gala-commercial-listing__section-head">
                <div>
                  <div className="gala-kicker gala-kicker--dark">{page.gallery.intro.eyebrow}</div>
                  <h2>{page.gallery.intro.title}</h2>
                </div>
                {page.gallery.intro.body ? <p>{page.gallery.intro.body}</p> : null}
              </div>
              <div className="gala-commercial-listing__gallery" role="region" aria-label={`${property.name} property gallery`} tabIndex={0}>
                {galleryItems.map((item, index) => (
                  <figure key={item.src} className={index === 0 ? "gala-commercial-listing__gallery-feature" : undefined}>
                    <img src={item.src} alt={item.alt} loading={index > 2 ? "lazy" : "eager"} />
                    <figcaption>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {item.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {page.video ? (
          <section className="gala-section gala-section--silver gala-commercial-listing__video-section">
            <div className="gala-shell">
              <div className="gala-commercial-listing__section-head">
                <div>
                  <div className="gala-kicker gala-kicker--dark">{page.video.eyebrow}</div>
                  <h2>{page.video.title}</h2>
                </div>
                {page.video.body ? <p>{page.video.body}</p> : null}
              </div>
              <PropertyVideo
                sourceUrl={page.video.sourceUrl}
                posterImage={page.video.posterImage}
                ariaLabel={page.video.ariaLabel}
                orientation={page.video.orientation}
              />
            </div>
          </section>
        ) : null}

        {page.location ? (
          <section className="gala-section gala-section--black gala-commercial-listing__location">
            <div className="gala-shell gala-commercial-listing__location-grid">
              <div className="gala-commercial-listing__map">
                <iframe
                  title={`Map of ${property.address}`}
                  src={page.location.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="gala-commercial-listing__location-copy">
                <div className="gala-kicker">{page.location.eyebrow}</div>
                <h2>{page.location.title}</h2>
                <p>{page.location.body}</p>
                {page.location.points.length ? (
                  <ul>
                    {page.location.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                ) : null}
                <a href={page.location.mapHref} target="_blank" rel="noreferrer" className="gala-commercial-listing__external-link">
                  Open in Google Maps <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>
        ) : null}

        {hasDiligenceContent ? (
          <section className="gala-section gala-section--silver gala-commercial-listing__diligence">
            <div className="gala-shell">
              {documentItems.length && page.documents ? (
                <>
                  <div className="gala-commercial-listing__section-head">
                    <div>
                      <div className="gala-kicker gala-kicker--dark">{page.documents.intro.eyebrow}</div>
                      <h2>{page.documents.intro.title}</h2>
                    </div>
                    {page.documents.intro.body ? <p>{page.documents.intro.body}</p> : null}
                  </div>
                  <div className="gala-commercial-listing__documents">
                    {documentItems.map((document) => (
                      <article key={document.title}>
                        <FileText size={24} aria-hidden="true" />
                        <h3>{document.title}</h3>
                        <p>{document.description}</p>
                        <DocumentAction href={document.href} external={document.external}>
                          {document.actionLabel}
                        </DocumentAction>
                      </article>
                    ))}
                  </div>
                </>
              ) : null}

              {advisor ? (
                <div className="gala-commercial-listing__advisor">
                  <div>
                    <span className="gala-commercial-listing__eyebrow">{page.advisorEyebrow ?? "Listing Advisor"}</span>
                    <h2>{advisor.name}</h2>
                    <p>{advisor.title}{advisor.license ? ` · ${advisor.license}` : ""}</p>
                  </div>
                  <div className="gala-commercial-listing__advisor-actions">
                    {telephoneHref ? (
                      <a href={telephoneHref} className="gala-commercial-listing__phone">
                        <Phone size={17} aria-hidden="true" /> {advisor.phone}
                      </a>
                    ) : null}
                    {emailHref ? (
                      <a href={emailHref} className="gala-commercial-listing__phone">
                        <Mail size={17} aria-hidden="true" /> {advisor.email}
                      </a>
                    ) : null}
                    <Link to={inquiryHref} className="gala-button">
                      <Mail size={16} aria-hidden="true" /> {inquiryLabel}
                    </Link>
                  </div>
                </div>
              ) : null}

              {page.disclosure ? <p className="gala-commercial-listing__disclosure">{page.disclosure}</p> : null}
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter currentPath={`/properties/${property.slug}`} />
    </>
  );
};

export default CommercialListingPage;

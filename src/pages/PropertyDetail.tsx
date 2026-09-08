import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Download,
  Mail,
  MapPin,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import CommercialListingPage from "@/components/properties/CommercialListingPage";
import PropertyCard from "@/components/properties/PropertyCard";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { getRelatedProperties, propertyBySlug } from "@/content/properties";
import useSiteCursor from "@/hooks/useSiteCursor";
import NotFound from "./NotFound";

const PropertyDetail = () => {
  const { slug } = useParams();
  const property = slug ? propertyBySlug[slug] : undefined;
  useSiteCursor();
  if (!property) return <NotFound />;
  if (property.listingPage) return <CommercialListingPage property={property} />;

  const heroFacts = [
    property.priceDisplay ? { label: "Asking Price", value: property.priceDisplay } : null,
    property.acreageDisplay ? { label: "Site Area", value: property.acreageDisplay } : null,
    property.sizeDisplay ? { label: "Building Size", value: property.sizeDisplay } : null,
    { label: "Asset Type", value: property.assetType },
    { label: "Availability", value: property.status },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact));

  const relatedProperties = getRelatedProperties(property.slug);
  const inquiryHref = `/contact?property=${property.slug}`;

  return (
    <>
      <PageMeta title={`${property.name} | ${property.city}, ${property.state}`} description={property.summary} image={property.heroImage} />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath={`/properties/${property.slug}`} />
      <main className="gala-page gala-property-page" id="main-content" tabIndex={-1}>
        <section className="gala-property-hero">
          <img
            src={property.heroImage}
            alt={`${property.name} commercial property in ${property.city}, ${property.state}`}
            style={{ objectPosition: property.imagePosition }}
          />
          <div className="gala-property-hero__shade"></div>
          <div className="gala-shell gala-property-hero__copy">
            <Link to="/properties" className="gala-back-link"><ArrowLeft size={16} /> All Properties</Link>
            <div className="gala-property-hero__status">
              <span>{property.status}</span>
              <span>{property.offeringType}</span>
              <span>{property.assetType}</span>
            </div>
            <h1>{property.name}</h1>
            <p><MapPin size={17} aria-hidden="true" /> {property.address}, {property.city}, {property.state}</p>
            <div className="gala-property-hero__actions">
              <Link to={inquiryHref} className="gala-button"><Mail size={16} /> Request Details</Link>
              {property.externalLinks[0] ? (
                <a href={property.externalLinks[0].href} target="_blank" rel="noreferrer" className="gala-property-hero__external">
                  View Full Listing <ArrowUpRight size={16} />
                </a>
              ) : null}
            </div>
          </div>
          <a className="gala-property-hero__scroll" href="#property-overview" aria-label="Continue to property overview">
            <span>Explore</span><ArrowDown size={16} />
          </a>
        </section>

        <section className="gala-property-factbar" aria-label="Property facts">
          <div className="gala-shell">
            {heroFacts.map((fact) => (
              <div key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section id="property-overview" className="gala-section gala-section--light gala-property-overview">
          <div className="gala-shell gala-property-detail">
            <article>
              <div className="gala-kicker gala-kicker--dark">Property Overview</div>
              <h2>{property.summary}</h2>
              <p className="gala-lead">{property.overview}</p>
              <div className="gala-property-highlights" aria-label="Investment highlights">
                {property.highlights.map((highlight, index) => (
                  <div key={highlight}><span>{String(index + 1).padStart(2, "0")}</span><p>{highlight}</p></div>
                ))}
              </div>
            </article>

            <aside className="gala-property-sidebar" aria-label="Offering details">
              <div className="gala-property-sidebar__heading">Offering details</div>
              {property.details.map((fact) => (
                <div className="gala-property-sidebar__fact" key={fact.label}>
                  <span>{fact.label}</span><strong>{fact.value}</strong>
                </div>
              ))}
              {property.brochurePdf ? (
                <a href={property.brochurePdf} className="gala-button" target="_blank" rel="noreferrer"><Download size={16} /> Download Brochure</a>
              ) : null}
              <Link to={inquiryHref} className="gala-button gala-button--dark"><Mail size={16} /> Request Offering Details</Link>
              {property.externalLinks.map((item) => (
                <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="gala-external-link">
                  View on {item.label} <ArrowUpRight size={15} />
                </a>
              ))}
              <p className="gala-property-sidebar__notice">
                Information is presented for discussion purposes and is subject to independent verification.
              </p>
            </aside>
          </div>
        </section>

        <section className="gala-section gala-section--silver gala-property-narrative">
          <div className="gala-shell gala-property-narrative__grid">
            <div>
              <div className="gala-kicker gala-kicker--dark">{property.opportunity.eyebrow}</div>
              <h2>{property.opportunity.title}</h2>
            </div>
            <div className="gala-property-narrative__copy">
              <p className="gala-lead">{property.opportunity.body}</p>
              <ul>
                {property.opportunity.points.map((point) => <li key={point}><Check size={17} aria-hidden="true" /> {point}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {property.gallery.length ? (
          <section className="gala-section gala-section--light gala-property-gallery-section">
            <div className="gala-shell">
              <div className="gala-property-gallery-section__head">
                <div>
                  <div className="gala-kicker gala-kicker--dark">Property &amp; Surroundings</div>
                  <h2>A closer look at the site context.</h2>
                </div>
                <p>Selected aerial views show the parcels in relation to Church Street, nearby residential communities, and surrounding uses.</p>
              </div>
              <div className="gala-property-gallery" role="region" aria-label={`${property.name} property gallery`} tabIndex={0}>
                {property.gallery.map((image, index) => (
                  <figure key={image} className={index === 0 ? "gala-property-gallery__feature" : undefined}>
                    <img loading={index > 2 ? "lazy" : "eager"} src={image} alt={`${property.name} aerial view ${index + 1}`} />
                    <figcaption>{String(index + 1).padStart(2, "0")} / {String(property.gallery.length).padStart(2, "0")}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="gala-section gala-section--black gala-property-location">
          <div className="gala-shell gala-property-location__grid">
            <div>
              <div className="gala-kicker">{property.location.eyebrow}</div>
              <h2>{property.location.title}</h2>
            </div>
            <div className="gala-property-location__body">
              <p className="gala-lead">{property.location.body}</p>
              <div className="gala-property-location__points">
                {property.location.points.map((point, index) => (
                  <div key={point}><span>{String(index + 1).padStart(2, "0")}</span><strong>{point}</strong></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="gala-section gala-section--silver gala-related-properties">
          <div className="gala-shell">
            <div className="gala-related-properties__head">
              <div>
                <div className="gala-kicker gala-kicker--dark">Continue Exploring</div>
                <h2>Other current opportunities.</h2>
              </div>
              <Link to="/properties" className="gala-text-link">View All Properties <ArrowRight size={16} /></Link>
            </div>
            <div className="gala-related-properties__grid">
              {relatedProperties.map((item) => <PropertyCard key={item.slug} property={item} />)}
            </div>
          </div>
        </section>

        <section className="gala-property-cta">
          <div className="gala-shell gala-property-cta__inner">
            <div>
              <div className="gala-kicker">Property Inquiry</div>
              <h2>Evaluate {property.name} with a Gala CRE advisor.</h2>
            </div>
            <div>
              <p>Request listing materials, discuss the opportunity, or coordinate next steps with the brokerage team.</p>
              <Link to={inquiryHref} className="gala-button">Start a Conversation <ArrowRight size={16} /></Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter currentPath={`/properties/${property.slug}`} />
    </>
  );
};

export default PropertyDetail;

import { ArrowLeft, ArrowUpRight, Download, Mail } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import { propertyBySlug } from "@/content/properties";
import useSiteCursor from "@/hooks/useSiteCursor";
import NotFound from "./NotFound";

const PropertyDetail = () => {
  const { slug } = useParams();
  const property = slug ? propertyBySlug[slug] : undefined;
  useSiteCursor();
  if (!property) return <NotFound />;

  const facts = [property.priceDisplay, property.sizeDisplay, property.acreageDisplay].filter(Boolean);

  return (
    <>
      <PageMeta title={property.name} description={property.summary} image={property.heroImage} />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath={`/properties/${property.slug}`} />
      <main className="gala-page">
        <section className="gala-property-hero">
          <img src={property.heroImage} alt={`${property.name} commercial property`} style={{ objectPosition: property.imagePosition }} />
          <div className="gala-property-hero__shade"></div>
          <div className="gala-shell gala-property-hero__copy">
            <Link to="/properties" className="gala-back-link"><ArrowLeft size={16} /> All Properties</Link>
            <div className="gala-kicker">{property.status} · {property.offeringType} · {property.assetType}</div>
            <h1>{property.name}</h1>
            <p>{property.address}, {property.city}, {property.state}</p>
          </div>
        </section>

        <section className="gala-section gala-section--light">
          <div className="gala-shell gala-property-detail">
            <article>
              <div className="gala-kicker gala-kicker--dark">Property Overview</div>
              <h2>{property.summary}</h2>
              <p className="gala-lead">{property.overview}</p>
              <div className="gala-property-highlights">
                {property.highlights.map((highlight) => <div key={highlight}>{highlight}</div>)}
              </div>
            </article>
            <aside className="gala-property-sidebar">
              {facts.map((fact) => <div key={fact}><span>Property Detail</span><strong>{fact}</strong></div>)}
              {property.brochurePdf ? <a href={property.brochurePdf} className="gala-button" target="_blank" rel="noreferrer"><Download size={16} /> Download Brochure</a> : null}
              <Link to={`/contact?property=${property.slug}`} className="gala-button gala-button--dark"><Mail size={16} /> Contact an Advisor</Link>
              {property.externalLinks.map((item) => <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="gala-external-link">View on {item.label} <ArrowUpRight size={15} /></a>)}
            </aside>
          </div>
        </section>

        {property.gallery.length ? <section className="gala-section gala-section--black"><div className="gala-shell gala-gallery">{property.gallery.map((image, index) => <img key={image} src={image} alt={`${property.name} view ${index + 1}`} />)}</div></section> : null}
      </main>
      <SiteFooter currentPath={`/properties/${property.slug}`} />
    </>
  );
};

export default PropertyDetail;

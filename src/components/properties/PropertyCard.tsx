import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Property } from "@/content/properties";

type PropertyCardProps = {
  property: Property;
};

const PropertyCard = ({ property }: PropertyCardProps) => (
  <Link to={`/properties/${property.slug}`} className="gala-property-card">
    <div className="gala-property-card__media">
      <img
        src={property.heroImage}
        alt={`${property.name} in ${property.city}, ${property.state}`}
        style={{ objectPosition: property.imagePosition }}
      />
      <span className="gala-property-card__status">{property.status}</span>
    </div>
    <div className="gala-property-card__body">
      <div className="gala-property-card__meta">
        {property.status === "Closed" ? "Recently Sold" : property.offeringType} · {property.assetType}
      </div>
      <h2>{property.name}</h2>
      <p className="gala-property-card__location">
        {property.address}, {property.city}, {property.state}
      </p>
      <div className="gala-property-card__facts">
        {property.priceDisplay ? <strong>{property.priceDisplay}</strong> : null}
        {(property.acreageDisplay ?? property.sizeDisplay) ? (
          <span>{property.acreageDisplay ?? property.sizeDisplay}</span>
        ) : null}
      </div>
      <p>{property.summary}</p>
      <span className="gala-text-link">View Property <ArrowUpRight size={16} /></span>
    </div>
  </Link>
);

export default PropertyCard;

import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from "react-leaflet";
import { divIcon, type LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Property } from "@/content/properties";

type MappedProperty = Property & {
  coordinates: NonNullable<Property["coordinates"]>;
};

type PropertyMapProps = {
  properties: Property[];
};

const propertyPin = (isClosed: boolean) => divIcon({
  className: `gala-map-pin${isClosed ? " gala-map-pin--closed" : ""}`,
  html: '<svg viewBox="0 0 36 48" aria-hidden="true"><path class="gala-map-pin__body" d="M18 1C8.61 1 1 8.61 1 18c0 12.85 17 29 17 29s17-16.15 17-29C35 8.61 27.39 1 18 1Z"/><circle class="gala-map-pin__center" cx="18" cy="18" r="7"/></svg>',
  iconSize: [36, 48],
  iconAnchor: [18, 47],
  popupAnchor: [0, -42],
  tooltipAnchor: [0, -40],
});

const MapViewport = ({ properties }: { properties: MappedProperty[] }) => {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();

    if (properties.length === 1) {
      const { latitude, longitude } = properties[0].coordinates;
      map.setView([latitude, longitude], 13);
      return;
    }

    if (properties.length > 1) {
      const bounds = properties.map(({ coordinates }) => [
        coordinates.latitude,
        coordinates.longitude,
      ]) as LatLngBoundsExpression;
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 12 });
    }
  }, [map, properties]);

  return null;
};

const PropertyMap = ({ properties }: PropertyMapProps) => {
  const mappedProperties = properties.filter(
    (property): property is MappedProperty => Boolean(property.coordinates)
  );

  if (!mappedProperties.length) {
    return (
      <div className="gala-property-map__empty" role="status">
        <strong>No mapped properties match these filters.</strong>
        <span>Switch to Grid view to review the available property records.</span>
      </div>
    );
  }

  return (
    <section className="gala-property-map" aria-label="Map of filtered properties">
      <MapContainer
        center={[35.5, -79.15]}
        zoom={7}
        scrollWheelZoom={false}
        className="gala-property-map__canvas"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapViewport properties={mappedProperties} />
        {mappedProperties.map((property) => {
          const isClosed = property.status === "Closed";

          return (
            <Marker
              key={property.slug}
              position={[property.coordinates.latitude, property.coordinates.longitude]}
              icon={propertyPin(isClosed)}
            >
              <Tooltip direction="top" opacity={1}>
                {property.name}
              </Tooltip>
              <Popup minWidth={270} maxWidth={310}>
                <article className="gala-property-map-card">
                  <img
                    src={property.heroImage}
                    alt=""
                    style={{ objectPosition: property.imagePosition }}
                  />
                  <div>
                    <span>{isClosed ? "Recently Sold" : property.offeringType} · {property.assetType}</span>
                    <h2>{property.name}</h2>
                    <p>{property.city}, {property.state}</p>
                    <div className="gala-property-map-card__facts">
                      {property.priceDisplay ? <strong>{property.priceDisplay}</strong> : null}
                      {property.acreageDisplay ?? property.sizeDisplay ? (
                        <span>{property.acreageDisplay ?? property.sizeDisplay}</span>
                      ) : null}
                    </div>
                    <Link to={`/properties/${property.slug}`}>
                      View Property <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <div className="gala-property-map__legend" aria-hidden="true">
        <span><i className="active" /> Active</span>
        <span><i /> Closed</span>
      </div>
      <p className="gala-property-map__hint">Use the map controls to zoom. Select a marker to preview a property.</p>
      <ul className="sr-only">
        {mappedProperties.map((property) => (
          <li key={property.slug}>
            <Link to={`/properties/${property.slug}`}>{property.name}, {property.city}, {property.state}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PropertyMap;

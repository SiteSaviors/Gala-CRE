import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import PropertyCard from "@/components/properties/PropertyCard";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import {
  filterProperties,
  propertyAssetTypes,
  propertyOfferingTypes,
  propertyStatuses,
  sortedProperties,
  type PropertyAssetType,
  type PropertyOfferingType,
  type PropertyStatus,
} from "@/content/properties";
import useSiteCursor from "@/hooks/useSiteCursor";

const Properties = () => {
  const [query, setQuery] = useState("");
  const [assetType, setAssetType] = useState<"All" | PropertyAssetType>("All");
  const [offeringType, setOfferingType] = useState<"All" | PropertyOfferingType>("All");
  const [status, setStatus] = useState<"All" | PropertyStatus>("All");
  useSiteCursor();

  const filtered = useMemo(
    () => filterProperties(sortedProperties, { query, assetType, offeringType, status }),
    [assetType, offeringType, query, status]
  );
  const hasFilters = query || assetType !== "All" || offeringType !== "All" || status !== "All";
  const reset = () => {
    setQuery("");
    setAssetType("All");
    setOfferingType("All");
    setStatus("All");
  };

  return (
    <>
      <PageMeta
        title="Commercial Properties"
        description="Explore commercial real estate for sale and lease across Raleigh-Durham and the Research Triangle."
      />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath="/properties" />
      <main className="gala-page">
        <section className="gala-inner-hero">
          <div className="gala-shell">
            <div className="gala-kicker">Properties</div>
            <h1>Find the right commercial opportunity.</h1>
            <p>Search active listings and explore closed transactions across the Research Triangle.</p>
          </div>
        </section>

        <section className="gala-section gala-section--light gala-properties-section">
          <div className="gala-shell">
            <div className="gala-property-toolbar" aria-label="Property filters">
              <label className="gala-search">
                <Search size={18} aria-hidden="true" />
                <span className="sr-only">Search properties</span>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by property, city, or address" />
              </label>
              <div className="gala-select-wrap"><SlidersHorizontal size={16} aria-hidden="true" />
                <select aria-label="Asset type" value={assetType} onChange={(event) => setAssetType(event.target.value as "All" | PropertyAssetType)}>
                  <option value="All">All asset types</option>
                  {propertyAssetTypes.map((item) => <option key={item}>{item}</option>)}
                </select>
              </div>
              <select aria-label="Offering type" value={offeringType} onChange={(event) => setOfferingType(event.target.value as "All" | PropertyOfferingType)}>
                <option value="All">Sale or lease</option>
                {propertyOfferingTypes.map((item) => <option key={item}>{item}</option>)}
              </select>
              <select aria-label="Property status" value={status} onChange={(event) => setStatus(event.target.value as "All" | PropertyStatus)}>
                <option value="All">All statuses</option>
                {propertyStatuses.map((item) => <option key={item}>{item}</option>)}
              </select>
              {hasFilters ? <button type="button" className="gala-filter-reset" onClick={reset}><X size={16} /> Reset</button> : null}
            </div>

            <div className="gala-results-head">
              <span>{filtered.length} {filtered.length === 1 ? "property" : "properties"}</span>
              <span>Active listings appear first</span>
            </div>

            {filtered.length ? (
              <div className="gala-property-grid">{filtered.map((property) => <PropertyCard key={property.slug} property={property} />)}</div>
            ) : (
              <div className="gala-empty-state">
                <div className="gala-kicker gala-kicker--dark">Property Intake in Progress</div>
                <h2>{hasFilters ? "No properties match those filters." : "Approved Gala listings are coming soon."}</h2>
                <p>{hasFilters ? "Reset the filters and explore the full catalog." : "The catalog is ready for the client-supplied PDFs, listing links, facts, and photography."}</p>
                {hasFilters ? <button type="button" className="gala-button" onClick={reset}>Reset Filters</button> : null}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter currentPath="/properties" />
    </>
  );
};

export default Properties;

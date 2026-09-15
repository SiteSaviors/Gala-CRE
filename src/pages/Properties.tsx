import { ArrowUpRight, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
import { teamMemberById, teamMemberIds, type TeamMemberId } from "@/content/team";
import useSiteCursor from "@/hooks/useSiteCursor";

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedAdvisorId = searchParams.get("advisor");
  const advisorId = teamMemberIds.includes(requestedAdvisorId as TeamMemberId)
    ? requestedAdvisorId as TeamMemberId
    : undefined;
  const selectedAdvisor = advisorId ? teamMemberById[advisorId] : undefined;
  const [query, setQuery] = useState("");
  const [assetType, setAssetType] = useState<"All" | PropertyAssetType>("All");
  const [offeringType, setOfferingType] = useState<"All" | PropertyOfferingType>("All");
  const [status, setStatus] = useState<"All" | PropertyStatus>(() => selectedAdvisor ? "Active" : "All");
  useSiteCursor();

  const filtered = useMemo(
    () => filterProperties(sortedProperties, { query, assetType, offeringType, status, advisorId }),
    [advisorId, assetType, offeringType, query, status]
  );
  const hasFilters = Boolean(query || advisorId || assetType !== "All" || offeringType !== "All" || status !== "All");
  const reset = () => {
    setSearchParams({}, { replace: true });
    setQuery("");
    setAssetType("All");
    setOfferingType("All");
    setStatus("All");
  };

  return (
    <>
      <PageMeta
        title="Commercial Properties"
        description="Explore current commercial real estate opportunities and selected completed transactions represented by Gala CRE Group across North Carolina."
      />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath="/properties" />
      <main className="gala-page" id="main-content" tabIndex={-1}>
        <section className="gala-inner-hero">
          <div className="gala-shell">
            <div className="gala-kicker">Properties</div>
            <h1>Find the right commercial opportunity.</h1>
            <p>Explore current opportunities and selected completed transactions represented by Gala CRE Group across North Carolina.</p>
          </div>
        </section>

        <section className="gala-section gala-section--light gala-properties-section">
          <div className="gala-shell">
            {selectedAdvisor ? (
              <div className="gala-advisor-filter" role="status">
                <div>
                  <span>Advisor portfolio</span>
                  <strong>Active listings represented by {selectedAdvisor.name}</strong>
                </div>
                <button type="button" onClick={reset}><X size={15} aria-hidden="true" /> View all properties</button>
              </div>
            ) : null}
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
                <div className="gala-kicker gala-kicker--dark">Property Search</div>
                <h2>{selectedAdvisor ? `No active listings are currently displayed for ${selectedAdvisor.name}.` : hasFilters ? "No properties match those filters." : "No properties are currently available."}</h2>
                <p>{hasFilters ? "View all properties or adjust the filters to continue exploring." : "Talk with a Gala CRE advisor about the opportunity you are looking for."}</p>
                {hasFilters ? <button type="button" className="gala-button" onClick={reset}>Reset Filters</button> : null}
              </div>
            )}

            <aside className="gala-resource-callout" aria-labelledby="replacement-property-title">
              <div>
                <span>Time-sensitive acquisition</span>
                <h2 id="replacement-property-title">Need a replacement property beyond the current listings?</h2>
                <p>Share your acquisition criteria and timeline for a more focused commercial property search.</p>
              </div>
              <Link to="/investors/1031-exchange?source=property-catalog" className="gala-text-link">
                Start a 1031 Property Search <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter currentPath="/properties" />
    </>
  );
};

export default Properties;

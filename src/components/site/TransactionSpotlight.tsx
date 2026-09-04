import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { featuredTransaction } from "@/content/transactions";

const TransactionSpotlight = () => (
  <section className="gala-transaction-section" aria-labelledby="recently-closed-title">
    <div className="gala-transaction-bridge" aria-hidden="true">
      <div className="gala-shell">
        <span>Current opportunities</span>
        <i></i>
        <ArrowDown />
        <span>Completed transaction</span>
      </div>
    </div>
    <div className="gala-shell">
      <div className="gala-transaction-section__header">
        <div>
          <div className="gala-kicker">Recently Closed</div>
          <h2 id="recently-closed-title">A recent transaction, at a glance.</h2>
        </div>
        <p>A compact look at a completed commercial sale in Morrisville.</p>
      </div>

      <div className="gala-transaction-spotlight">
        <div className="gala-transaction-spotlight__figure">
          <div className="gala-transaction-spotlight__head">
            <span className="gala-transaction-spotlight__status">{featuredTransaction.status}</span>
            <span>Transaction Snapshot</span>
          </div>
          <div className="gala-transaction-spotlight__price">
            <strong>{featuredTransaction.priceDisplay}</strong>
            <span>{featuredTransaction.priceLabel}</span>
          </div>
          <div className="gala-transaction-spotlight__facts">
            <span><small>Properties</small><strong>Two adjacent parcels</strong></span>
            <span><small>Market</small><strong>{featuredTransaction.location}</strong></span>
          </div>
        </div>
        <div className="gala-transaction-spotlight__detail">
          <div className="gala-transaction-spotlight__index">01 / Selected Closing</div>
          <h3>{featuredTransaction.headline}</h3>
          <p className="gala-transaction-spotlight__statement">Two adjacent commercial parcels, closed together.</p>
          <p className="gala-transaction-spotlight__summary">{featuredTransaction.summary}</p>
          <Link to="/contact?inquiry=investment-sales" className="gala-text-link">Discuss a Sale <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </div>
  </section>
);

export default TransactionSpotlight;

import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import PageMeta from "@/components/site/PageMeta";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import {
  getTeamMemberContactHref,
  getTeamMemberContactLabel,
  teamMembers,
} from "@/content/team";
import useSiteCursor from "@/hooks/useSiteCursor";

const Team = () => {
  useSiteCursor();

  return (
    <>
      <PageMeta
        title="Our Team"
        description="Meet the commercial real estate professionals serving clients through Gala CRE Group."
      />
      <div id="cur"></div><div id="cdot"></div>
      <SiteHeader currentPath="/team" />

      <main className="gala-page gala-team-page" id="main-content" tabIndex={-1}>
        <section className="gala-inner-hero gala-team-hero">
          <div className="gala-shell">
            <div className="gala-kicker">Gala CRE Group</div>
            <h1>Our Team</h1>
            <p>Commercial perspective, local relationships, and direct accountability from the first conversation through the next decision.</p>
          </div>
        </section>

        <section className="gala-section gala-section--light gala-team-roster">
          <div className="gala-shell">
            <div className="gala-team-roster__intro">
              <div>
                <div className="gala-kicker gala-kicker--dark">People Behind the Platform</div>
                <h2>Advice stays personal when responsibility stays clear.</h2>
              </div>
              <p>Meet the professionals connecting clients with Gala CRE’s brokerage, investment-sales, development, and capital-market capabilities.</p>
            </div>

            <div className="gala-team-grid">
              {teamMembers.map((member) => {
                const directContact = getTeamMemberContactLabel(member);
                const contactHref = getTeamMemberContactHref(member);
                const isExternalContact = contactHref.startsWith("mailto:") || contactHref.startsWith("tel:");

                return (
                  <article className="gala-team-card" key={member.id}>
                    <div className="gala-team-card__media">
                      {member.image ? (
                        <img src={member.image} alt={member.imageAlt ?? member.name} />
                      ) : (
                        <div className="gala-team-card__monogram" aria-hidden="true">
                          {member.name.split(" ").map((part) => part[0]).join("")}
                        </div>
                      )}
                    </div>
                    <div className="gala-team-card__content">
                      <span className="gala-team-card__title">{member.title}</span>
                      <h2>{member.name}</h2>
                      {member.license ? <p className="gala-team-card__license">North Carolina license {member.license.replace("NC ", "")}</p> : null}
                      <div className="gala-team-card__bio">
                        {member.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      </div>
                      {directContact ? (
                        <a className="gala-team-card__contact" href={contactHref}>
                          {member.email ? <Mail size={15} aria-hidden="true" /> : <Phone size={15} aria-hidden="true" />}
                          {directContact}
                        </a>
                      ) : null}
                      <div className="gala-team-card__actions">
                        {isExternalContact ? (
                          <a className="gala-button gala-button--dark" href={contactHref}>Contact Agent</a>
                        ) : (
                          <Link className="gala-button gala-button--dark" to={contactHref}>Contact Agent</Link>
                        )}
                        <Link className="gala-text-link" to={`/properties?advisor=${member.id}`}>
                          View Active Listings <ArrowUpRight size={16} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter currentPath="/team" />
    </>
  );
};

export default Team;

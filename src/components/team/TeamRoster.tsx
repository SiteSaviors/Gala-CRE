import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import {
  getTeamMemberContactHref,
  teamMembers,
} from "@/content/team";

const TeamRoster = () => (
  <section
    className="gala-section gala-section--light gala-team-roster"
    id="team"
    aria-labelledby="team-heading"
  >
    <div className="gala-shell">
      <div className="gala-team-roster__intro">
        <div>
          <div className="gala-kicker gala-kicker--dark">People Behind the Work</div>
          <h2 id="team-heading">Our Team</h2>
        </div>
        <p>A connected approach still depends on clear individual responsibility. Meet the professionals guiding Gala CRE clients from the first conversation through the next critical decision.</p>
      </div>

      <div className="gala-team-grid">
        {teamMembers.map((member) => {
          const contactHref = getTeamMemberContactHref(member);
          const isExternalContact = contactHref.startsWith("mailto:") || contactHref.startsWith("tel:");
          const telephoneHref = member.phone ? `tel:+1${member.phone.replace(/\D/g, "")}` : undefined;

          return (
            <article className="gala-team-card" key={member.id}>
              <div className="gala-team-card__media">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.imageAlt ?? member.name}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="gala-team-card__monogram" aria-hidden="true">
                    {member.name.split(" ").map((part) => part[0]).join("")}
                  </div>
                )}
              </div>
              <div className="gala-team-card__content">
                <span className="gala-team-card__title">{member.title}</span>
                <h3>{member.name}</h3>
                {member.license ? <p className="gala-team-card__license">North Carolina license {member.license.replace("NC ", "")}</p> : null}
                <div className="gala-team-card__bio">
                  {member.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <div className="gala-team-card__contacts">
                  {member.email ? (
                    <a className="gala-team-card__contact" href={`mailto:${member.email}`}>
                      <Mail size={15} aria-hidden="true" /> {member.email}
                    </a>
                  ) : null}
                  {telephoneHref ? (
                    <a className="gala-team-card__contact" href={telephoneHref}>
                      <Phone size={15} aria-hidden="true" /> {member.phone}
                    </a>
                  ) : null}
                </div>
                <div className="gala-team-card__actions">
                  {isExternalContact ? (
                    <a className="gala-button gala-button--dark" href={contactHref}>Contact Agent</a>
                  ) : (
                    <Link className="gala-button gala-button--dark" to={contactHref}>Contact Agent</Link>
                  )}
                  <Link className="gala-text-link" to={`/properties?advisor=${member.id}`}>
                    View Listings &amp; Transactions <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default TeamRoster;

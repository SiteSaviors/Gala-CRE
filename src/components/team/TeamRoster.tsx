import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowUpRight, Mail, Phone, Plus, X } from "lucide-react";
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
            <DialogPrimitive.Root key={member.id}>
              <article className="gala-team-card">
                <DialogPrimitive.Trigger asChild>
                  <button
                    className="gala-team-card__trigger"
                    type="button"
                    aria-label={`Open profile for ${member.name}`}
                  >
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
                    <div className="gala-team-card__summary">
                      <div>
                        <h3>{member.name}</h3>
                        <span>{member.title}</span>
                      </div>
                      <span className="gala-team-card__plus" aria-hidden="true">
                        <Plus size={28} strokeWidth={1.7} />
                      </span>
                    </div>
                  </button>
                </DialogPrimitive.Trigger>
              </article>

              <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="gala-team-dialog__overlay" />
                <DialogPrimitive.Content className="gala-team-dialog">
                  <DialogPrimitive.Close
                    className="gala-team-dialog__close"
                    aria-label={`Close profile for ${member.name}`}
                  >
                    <X size={22} aria-hidden="true" />
                  </DialogPrimitive.Close>

                  <div className="gala-team-dialog__media">
                    {member.image ? (
                      <img src={member.image} alt={member.imageAlt ?? member.name} decoding="async" />
                    ) : (
                      <div className="gala-team-card__monogram" aria-hidden="true">
                        {member.name.split(" ").map((part) => part[0]).join("")}
                      </div>
                    )}
                  </div>

                  <div className="gala-team-dialog__content">
                    <span className="gala-team-dialog__eyebrow">{member.title}</span>
                    <DialogPrimitive.Title className="gala-team-dialog__title">
                      {member.name}
                    </DialogPrimitive.Title>
                    {member.license ? (
                      <p className="gala-team-dialog__license">
                        North Carolina license {member.license.replace("NC ", "")}
                      </p>
                    ) : null}

                    <DialogPrimitive.Description asChild>
                      <div className="gala-team-dialog__bio">
                        {member.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      </div>
                    </DialogPrimitive.Description>

                    <div className="gala-team-dialog__contacts">
                      {member.email ? (
                        <a href={`mailto:${member.email}`}>
                          <Mail size={16} aria-hidden="true" /> {member.email}
                        </a>
                      ) : null}
                      {telephoneHref ? (
                        <a href={telephoneHref}>
                          <Phone size={16} aria-hidden="true" /> {member.phone}
                        </a>
                      ) : null}
                    </div>

                    <div className="gala-team-dialog__actions">
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
                </DialogPrimitive.Content>
              </DialogPrimitive.Portal>
            </DialogPrimitive.Root>
          );
        })}
      </div>
    </div>
  </section>
);

export default TeamRoster;

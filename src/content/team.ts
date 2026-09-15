import gaurangGalaPhoto from "@/assets/gala-introduction-gaurang.webp";
import leighRoachPhoto from "@/assets/team/leigh-roach.webp";

export const teamMemberIds = ["gaurang-gala", "leigh-roach", "goverdhan-vavilala"] as const;

export type TeamMemberId = (typeof teamMemberIds)[number];

export type TeamMember = {
  id: TeamMemberId;
  name: string;
  title: string;
  biography: string[];
  image?: string;
  imageAlt?: string;
  email?: string;
  phone?: string;
  license?: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "gaurang-gala",
    name: "Gaurang Gala",
    title: "CEO | BIC",
    biography: [
      "Gaurang Gala leads Gala CRE Group as CEO and Broker-in-Charge, connecting commercial brokerage decisions with the development, investment, and capital considerations that shape an opportunity.",
      "He works with owners, investors, landlords, tenants, and business operators to make complex commercial real estate decisions clearer and more coordinated.",
    ],
    image: gaurangGalaPhoto,
    imageAlt: "Gaurang Gala at a commercial development site",
    phone: "910-578-2828",
    license: "NC 283149",
  },
  {
    id: "leigh-roach",
    name: "Leigh Roach",
    title: "Agent",
    biography: [
      "Leigh Roach is a Triangle native with deep roots and connections throughout Raleigh, Cary, Apex, Morrisville, and surrounding markets. With nearly a decade of real estate experience and a strong background in sales and marketing, she brings a strategic, results-driven approach to commercial real estate.",
      "Leigh leverages her market knowledge and extensive local network to represent investors, developers, business owners, and property owners from opportunity identification through closing.",
    ],
    image: leighRoachPhoto,
    imageAlt: "Leigh Roach",
    email: "Leigh@galacregroup.com",
  },
  {
    id: "goverdhan-vavilala",
    name: "Goverdhan Vavilala",
    title: "Agent",
    biography: [
      "Goverdhan Vavilala serves clients as an agent with Gala CRE Group.",
    ],
  },
];

export const teamMemberById = Object.fromEntries(
  teamMembers.map((member) => [member.id, member]),
) as Record<TeamMemberId, TeamMember>;

export const getTeamMemberContactHref = (member: TeamMember) => {
  if (member.email) return `mailto:${member.email}`;
  if (member.phone) return `tel:+1${member.phone.replace(/\D/g, "")}`;
  return `/contact?advisor=${member.id}&source=team`;
};

export const getTeamMemberContactLabel = (member: TeamMember) => member.email ?? member.phone;

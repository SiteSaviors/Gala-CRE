import { describe, expect, it } from "vitest";
import {
  getTeamMemberContactHref,
  teamMemberById,
  teamMembers,
} from "@/content/team";

describe("team content model", () => {
  it("defines each approved team member once", () => {
    expect(teamMembers.map((member) => member.id)).toEqual([
      "gaurang-gala",
      "leigh-roach",
      "goverdhan-vavilala",
    ]);
    expect(teamMemberById["gaurang-gala"]).toMatchObject({ name: "Gaurang Gala", title: "CEO | BIC" });
    expect(teamMemberById["leigh-roach"]).toMatchObject({ name: "Leigh Roach", email: "Leigh@galacregroup.com" });
    expect(teamMemberById["goverdhan-vavilala"]).toMatchObject({ name: "Goverdhan Vavilala", title: "Agent" });
  });

  it("uses verified direct contact details and a contextual fallback", () => {
    expect(getTeamMemberContactHref(teamMemberById["gaurang-gala"])).toBe("tel:+19105782828");
    expect(getTeamMemberContactHref(teamMemberById["leigh-roach"])).toBe("mailto:Leigh@galacregroup.com");
    expect(getTeamMemberContactHref(teamMemberById["goverdhan-vavilala"])).toBe(
      "/contact?advisor=goverdhan-vavilala&source=team",
    );
  });
});

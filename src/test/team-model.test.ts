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
    expect(teamMemberById["leigh-roach"]).toMatchObject({
      name: "Leigh Roach",
      email: "leigh@galacregroup.com",
      phone: "(919) 886-9181",
    });
    expect(teamMemberById["goverdhan-vavilala"]).toMatchObject({
      name: "Dr. Goverdhan Reddy Vavilala",
      title: "Agent",
      email: "goverdhan@galacregroup.com",
      phone: "(919) 462-1494",
    });
    expect(teamMembers.every(({ image }) => Boolean(image))).toBe(true);
  });

  it("uses each member's verified direct email for the primary contact action", () => {
    expect(getTeamMemberContactHref(teamMemberById["gaurang-gala"])).toBe("mailto:gaurang@galacregroup.com");
    expect(getTeamMemberContactHref(teamMemberById["leigh-roach"])).toBe("mailto:leigh@galacregroup.com");
    expect(getTeamMemberContactHref(teamMemberById["goverdhan-vavilala"])).toBe("mailto:goverdhan@galacregroup.com");
  });
});

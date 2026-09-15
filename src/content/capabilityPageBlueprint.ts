import type {
  CapabilityPageContent,
  CapabilityPageIcon,
} from "@/content/capabilityPages";

type RelatedLink = {
  label: string;
  title: string;
  body: string;
  href: string;
};

export type CapabilityPageBlueprint = {
  path: string;
  parent: CapabilityPageContent["parent"];
  image: string;
  metadataDescription: string;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    alt: string;
    position?: string;
    primaryLabel: string;
    inquiryHref: string;
    processLabel: string;
    processId: string;
    signalLabel: string;
    signals: string[];
  };
  challenge: {
    watermark: string;
    eyebrow: string;
    headline: string;
    body: string[];
    emphasis: string;
    pressures: Array<{ number: string; title: string; body: string }>;
  };
  process: {
    eyebrow: string;
    headline: string;
    introduction: string;
    steps: Array<{ number: string; title: string; body: string }>;
  };
  deliverables: {
    eyebrow: string;
    headline: string;
    introduction: string;
    items: Array<{ icon: CapabilityPageIcon; title: string; body: string }>;
  };
  related: {
    headline: string;
    introduction: string;
    links: RelatedLink[];
  };
  cta: {
    eyebrow: string;
    headline: string;
    body: string;
  };
};

export const buildCapabilityPage = (
  blueprint: CapabilityPageBlueprint,
): CapabilityPageContent => ({
  path: blueprint.path,
  metadata: {
    title: blueprint.hero.title,
    description: blueprint.metadataDescription,
    image: blueprint.image,
  },
  parent: blueprint.parent,
  hero: {
    eyebrow: blueprint.hero.eyebrow,
    title: blueprint.hero.title,
    lead: blueprint.hero.lead,
    media: {
      src: blueprint.image,
      alt: blueprint.hero.alt,
      position: blueprint.hero.position,
    },
    actions: [
      {
        label: blueprint.hero.primaryLabel,
        href: blueprint.hero.inquiryHref,
        variant: "primary",
        icon: "arrow-up-right",
      },
      {
        label: blueprint.hero.processLabel,
        href: `#${blueprint.hero.processId}`,
        variant: "secondary",
        icon: "arrow-down",
      },
    ],
    signalLabel: blueprint.hero.signalLabel,
    signals: blueprint.hero.signals,
  },
  sections: [
    {
      type: "challenge",
      ...blueprint.challenge,
    },
    {
      type: "process",
      id: blueprint.hero.processId,
      ...blueprint.process,
    },
    {
      type: "deliverables",
      ...blueprint.deliverables,
    },
  ],
  relatedCapabilities: {
    eyebrow: "Connected Gala Capabilities",
    ...blueprint.related,
  },
  cta: {
    ...blueprint.cta,
    actions: [
      {
        label: blueprint.hero.primaryLabel,
        href: blueprint.hero.inquiryHref,
        variant: "primary",
        icon: "arrow-up-right",
      },
    ],
  },
});

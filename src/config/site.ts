export const siteConfig = {
  name: "GOLDEN FAITH",
  tagline: "Experience Faith in Motion",
  description:
    "A dynamic community where authentic faith meets everyday action.",

  contact: {
    address: `No. 56/2
    Golden Faith Int'l.,
    Golden City Subd.,
    Santa Rosa, Laguna`,
    phone: "+63 900 000 0000",
    email: "hello@goldenfaith.church",
    facebook: "https://facebook.com/goldenfaithchurch",
    instagram: "https://instagram.com/goldenfaithchurch",
    youtube: "https://youtube.com/@goldenfaithchurch",
  },

  // new — reused by the About page's visit-info panel
  serviceTimes: [
    { label: "Sundays", time: "9:00 AM & 11:00 AM" },
    { label: "Wednesdays", time: "7:00 PM" },
  ],

  // A mix of standalone links and grouped dropdowns instead of one flat
  // 8-item list. Each entry is either `{ type: "link" }` (rendered directly)
  // or `{ type: "group" }` (rendered as a dropdown/accordion of sub-links).
  // "Live" is listed here explicitly under Watch — previously it was only
  // reachable via the header's primary CTA button and had no nav entry.
  nav: [
    { type: "link", label: "Home", href: "/" },
    { type: "link", label: "About", href: "/about" },
    {
      type: "group",
      label: "Watch",
      items: [
        { label: "Sermons", href: "/sermons" },
        { label: "Live", href: "/live" },
      ],
    },
    {
      type: "group",
      label: "Get Involved",
      items: [
        { label: "Ministries", href: "/ministries" },
        { label: "Events", href: "/events" },
        { label: "Request a Prayer", href: "/prayer-requests" },
        { label: "Connect", href: "/connect" },
      ],
    },
    { type: "link", label: "Giving", href: "/giving" },
  ],

  // Defined explicitly rather than derived by slicing `nav` — a slice
  // silently drops items whenever `nav` is reordered or extended (this is
  // exactly how Giving/Connect/Request a Prayer went missing from the
  // footer). Every link here should also exist in `nav` above.
  footerNav: {
    explore: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Sermons", href: "/sermons" },
      { label: "Ministries", href: "/ministries" },
      { label: "Events", href: "/events" },
    ],
    getInvolved: [
      { label: "Request a Prayer", href: "/prayer-requests" },
      { label: "Giving", href: "/giving" },
      { label: "Connect", href: "/connect" },
    ],
  },

  primaryCta: {
    label: "Watch Live",
    href: "/live",
  },
} as const;
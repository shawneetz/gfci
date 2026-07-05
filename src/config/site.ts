export const siteConfig = {
  name: "Golden Faith",
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

  nav: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Sermons",
      href: "/sermons",
    },
    {
      label: "Ministries",
      href: "/ministries",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Prayer Requests",
      href: "/prayer-requests",
    },
    {
      label: "Giving",
      href: "/giving",
    },
    {
      label: "Connect",
      href: "/connect",
    },
  ],

  primaryCta: {
    label: "Watch Live",
    href: "/live",
  },
} as const;
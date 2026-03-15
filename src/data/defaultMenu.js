/**
 * Default menu seed data — mirrors the current hardcoded navbar.
 * "INSIGHTS" is renamed to "Resource Center".
 */
const defaultMenu = {
  groups: [
    {
      id: "products",
      label: "PRODUCTS",
      url: "",
      order: 0,
      visible: true,
      children: [
        { id: "prod-1", label: "Assembler to COBOL Conversion Tool", url: "/assembler-cobol", order: 0, visible: true, openInNewTab: false },
        { id: "prod-2", label: "Lending Solutions", url: "/lending-solutions", order: 1, visible: true, openInNewTab: false },
        { id: "prod-3", label: "Leasing System", url: "/leasing", order: 2, visible: true, openInNewTab: false },
        { id: "prod-4", label: "Safe Deposit Box management", url: "/sdb-management", order: 3, visible: true, openInNewTab: false },
        { id: "prod-5", label: "Mobile Wallet", url: "/mobile-wallet", order: 4, visible: true, openInNewTab: false },
      ],
    },
    {
      id: "services",
      label: "SERVICES",
      url: "/services",
      order: 1,
      visible: true,
      children: [],
    },
    {
      id: "industries",
      label: "INDUSTRIES",
      url: "/industries",
      order: 2,
      visible: true,
      children: [],
    },
    {
      id: "careers",
      label: "CAREERS",
      url: "",
      order: 3,
      visible: true,
      children: [
        { id: "car-1", label: "Culture", url: "/culture", order: 0, visible: true, openInNewTab: false },
        { id: "car-2", label: "Openings", url: "", order: 1, visible: true, openInNewTab: true },
      ],
    },
    {
      id: "about",
      label: "ABOUT",
      url: "/about",
      order: 4,
      visible: true,
      children: [],
    },
    {
      id: "resource-center",
      label: "Resource Center",
      url: "",
      order: 5,
      visible: true,
      children: [
        { id: "rc-1", label: "Blog", url: "/blog", order: 0, visible: true, openInNewTab: false },
        { id: "rc-2", label: "Events", url: "/events", order: 1, visible: true, openInNewTab: false },
        { id: "rc-3", label: "Privacy Policy", url: "", order: 2, visible: true, openInNewTab: true },
      ],
    },
    {
      id: "contact",
      label: "CONTACT",
      url: "/contact",
      order: 6,
      visible: true,
      children: [],
    },
  ],
};

module.exports = defaultMenu;

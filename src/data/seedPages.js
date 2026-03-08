/**
 * Seed data for all 10 default pages.
 * Each page maps to the block structure used by the page builder.
 * Images are left as empty strings — admin uploads via Gallery.
 */

function b(id, type, order, data) {
  return { id, type, order, data };
}

const homePage = {
  title: "Home",
  slug: "home",
  metaTitle: "AaraTech – Innovative Digital Solutions",
  metaDescription: "Aara Tech builds modern software and AI solutions that help businesses grow faster, work smarter, and deliver better digital experiences.",
  blocks: [
    b("home-1", "hero", 1, {
      heading: "GROW YOUR DREAM BRAND WITH OUR DEVELOPER",
      subtitle: "",
      description: "At Aara Tech, we build modern software and AI solutions that help businesses grow faster, work smarter, and deliver better digital experiences.",
      backgroundImage: "",
      buttons: [
        { label: "EXPLORE OUR SERVICES", link: "/services" },
        { label: "CONTACT", link: "/contact" },
      ],
    }),
    b("home-2", "cards_grid", 2, {
      sectionTitle: "Our Product Offerings",
      cards: [
        { title: "COBOL Conversion", description: "Modernize legacy systems into secure, cloud-native, and future-proof your business.", image: "", link: "/assembler-cobol", icon: "" },
        { title: "Digital Solutions", description: "Build intelligent digital platforms that enhance customer experience and business efficiency.", image: "", link: "/services", icon: "" },
        { title: "Mobile Wallet", description: "Secure mobile payment solutions for fast and seamless transactions.", image: "", link: "/mobile-wallet", icon: "" },
        { title: "Safe Deposit Box", description: "Smart management system ensuring secure handling of customer assets.", image: "", link: "/sdb-management", icon: "" },
        { title: "Lending Solutions", description: "End-to-end lending platforms with automation and compliance support.", image: "", link: "/lending-solutions", icon: "" },
      ],
    }),
    b("home-3", "icon_cards", 3, {
      sectionTitle: "Our Services",
      subtitle: "",
      cards: [
        { icon: "Settings", title: "IT Services Outsourcing", description: "Offshore software and application development services." },
        { icon: "User", title: "IT Strategy Consulting", description: "Helping businesses with strong IT strategies." },
        { icon: "Monitor", title: "Digital Solutions", description: "Digital transformation using modern technologies." },
        { icon: "Wrench", title: "Testing Services", description: "Quality assurance and testing for apps." },
      ],
      columns: 4,
    }),
    b("home-4", "cards_grid", 4, {
      sectionTitle: "Who We Are? — Case Study",
      cards: [
        { title: "Transforming Reinsurance Claims Management", description: "Convert Old Mainframe Assembler Programs To Modern COBOL For Easier Maintenance And Modernization.", image: "", link: "", icon: "" },
        { title: "Establishing a Modern Digital Banking Experience", description: "", image: "", link: "", icon: "" },
        { title: "Empowering Digital Identity", description: "", image: "", link: "", icon: "" },
        { title: "Embracing Phygital Banking", description: "", image: "", link: "", icon: "" },
      ],
    }),
  ],
};

const aboutPage = {
  title: "About Us",
  slug: "about",
  metaTitle: "About Us | AaraTech",
  metaDescription: "AURA Tech Pvt. Ltd. was founded with a clear vision to build reliable and innovative digital solutions for modern businesses.",
  blocks: [
    b("about-1", "split_section", 1, {
      heading: "About Us",
      content: "AURA Tech Pvt. Ltd. was founded with a clear vision to build reliable and innovative digital solutions for modern businesses. With a strong focus on quality, collaboration, and innovation, we support businesses in their digital transformation journey.",
      image: "",
      imagePosition: "right",
      button: { label: "", link: "" },
    }),
    b("about-2", "tabs_section", 2, {
      heading: "Vision & Mission",
      tabs: [
        { title: "Our Vision", content: "To be a globally trusted technology partner, delivering innovative and scalable digital solutions that empower modern businesses. We aim to help organizations adapt to changing market demands through reliable, future-ready technologies.", image: "" },
        { title: "Our Mission", content: "To create value-driven technology solutions by blending innovation with deep business expertise and customer-focused execution. We work closely with our clients to understand their unique challenges and deliver solutions that create real business impact.", image: "" },
      ],
    }),
    b("about-3", "icon_cards", 3, {
      sectionTitle: "Our Commitment",
      subtitle: "",
      cards: [
        { icon: "Lightbulb", title: "Innovation", description: "We design intelligent digital solutions using modern and emerging technologies to keep businesses ahead of the curve." },
        { icon: "Shield", title: "Quality", description: "We deliver reliable, secure, and high-quality digital solutions that businesses can trust and depend on." },
        { icon: "Users", title: "Collaboration", description: "We work closely with our clients as trusted partners, ensuring transparency, communication, and shared success." },
        { icon: "Heart", title: "Customer Success", description: "We put our customers at the center of everything we do, delivering solutions that create real value and impact." },
        { icon: "TrendingUp", title: "People & Growth", description: "We believe our people are the foundation of our success. We invest in talent, learning, and a growth-driven culture." },
      ],
      columns: 3,
    }),
    b("about-4", "team_grid", 4, {
      heading: "Management Team",
      members: [
        { name: "Balamurugan Ramanathan", role: "Chairman", image: "", bio: "Bala founded VIT Consultancy Private Limited upon his return from Singapore in 2003. He has extensive experience in IT consultancy and business leadership." },
        { name: "Ravi Tadepalli", role: "Senior Vice President", image: "", bio: "Ravi has an overall twenty two years of experience in IT Industry. He brings deep expertise in enterprise solution delivery and client management." },
        { name: "Chandra", role: "Chief Mentor", image: "", bio: "Chandra, our Chief Mentor in Strategic Consulting, specializes in banking solutions with over 25+ years of experience." },
      ],
    }),
    b("about-5", "split_section", 5, {
      heading: "Our Approach",
      content: "<p>We deliver real business outcomes with a strong focus on strategy, execution, cost efficiency, and measurable success.</p><ul><li>Simple</li><li>Scalable</li><li>Value-Driven</li><li>On-Time Delivery</li><li>Cost Efficiency</li><li>Client Partnership</li></ul>",
      image: "",
      imagePosition: "left",
      button: { label: "", link: "" },
    }),
    b("about-6", "text_block", 6, {
      content: "<h2>Business Technology Optimization (BTO)</h2><p>Our BTO Framework aligns IT Strategy, Applications, and Operations to improve efficiency, control costs, and manage risk — without disrupting daily business.</p><h3>BTO Lifecycle</h3><ol><li><strong>Strategy</strong> — Define IT goals aligned to business</li><li><strong>Design</strong> — Architect scalable solutions</li><li><strong>Build</strong> — Develop with agile best practices</li><li><strong>Deploy</strong> — Roll out with minimal disruption</li><li><strong>Operate</strong> — Maintain and monitor performance</li><li><strong>Optimize</strong> — Continuously improve and adapt</li></ol>",
    }),
    b("about-7", "text_block", 7, {
      content: "<h2>Our Delivery Model</h2><p><strong>Right resourcing for speed, scale, and cost advantage</strong></p><ul><li><strong>Onsite</strong> — Business alignment and real-time proximity</li><li><strong>Offshore</strong> — Cost-effective, scalable 24x7 delivery</li><li><strong>Offsite / Nearshore</strong> — Faster turnaround with regional efficiency</li></ul>",
    }),
    b("about-8", "cta_banner", 8, {
      heading: "What can we help you to achieve today?",
      description: "Partner with AaraTech to build secure, scalable, and enterprise-grade digital solutions.",
      buttonText: "CONTACT",
      buttonLink: "/contact",
      backgroundColor: "#1a56db",
    }),
  ],
};

const servicesPage = {
  title: "Services",
  slug: "services",
  metaTitle: "Our Services | AaraTech",
  metaDescription: "Legacy Modernization, IT Services Outsourcing, IT Strategy Consulting, Digital Solutions, and Testing Services.",
  blocks: [
    b("svc-1", "hero", 1, {
      heading: "Our Services",
      subtitle: "",
      description: "Comprehensive IT services to transform, optimize, and future-proof your business.",
      backgroundImage: "",
      buttons: [],
    }),
    b("svc-2", "tabs_section", 2, {
      heading: "What We Offer",
      tabs: [
        { title: "Legacy Modernization", content: "Transform legacy systems into modern, scalable, and cloud-ready platforms without disrupting business operations. We specialize in CoolGen/CA Gen and Assembler modernization, converting outdated codebases to maintainable COBOL and modern architectures.", image: "" },
        { title: "IT Services Outsourcing", content: "Reliable IT outsourcing services that reduce operational costs while ensuring quality and faster delivery. Our services include Application Development & Maintenance, Enterprise System Support, Portal & CRM Solutions, Quality Maintenance & Assurance, and Business Analytics.", image: "" },
        { title: "IT Strategy Consulting", content: "Align technology initiatives with your business vision through expert IT strategy and consulting. We provide Enterprise Architecture Consulting, Business Consulting, Project Management, and Quality Consulting services.", image: "" },
        { title: "Digital Solutions", content: "End-to-end digital solutions enabling automation, innovation, and measurable growth. Our expertise covers Mobility solutions, Big Data Analytics, and Cloud services to drive your digital transformation.", image: "" },
        { title: "Testing Services", content: "Comprehensive QA and testing services ensuring performance, security, and reliability. We offer Software Testing Services and Specialized Testing Services for enterprise applications.", image: "" },
      ],
    }),
    b("svc-3", "tabs_section", 3, {
      heading: "Why Choose AaraTech?",
      tabs: [
        { title: "What Makes Us Different", content: "<ul><li>Deep domain expertise in banking and financial services</li><li>Proven legacy modernization methodology</li><li>Flexible engagement models (onsite, offshore, hybrid)</li><li>Strong focus on quality and on-time delivery</li><li>Long-term partnership approach</li></ul>", image: "" },
        { title: "Why Choose Aara Tech?", content: "<ul><li>14+ years of enterprise IT experience</li><li>500+ successful project deliveries</li><li>Global presence across India, Singapore, USA, and Malaysia</li><li>Certified professionals with industry expertise</li><li>Cost-effective solutions without compromising quality</li></ul>", image: "" },
      ],
    }),
    b("svc-4", "cta_banner", 4, {
      heading: "What can we help you to achieve today?",
      description: "Let us help you transform your business with the right technology strategy.",
      buttonText: "CONTACT",
      buttonLink: "/contact",
      backgroundColor: "#1a56db",
    }),
  ],
};

const contactPage = {
  title: "Contact",
  slug: "contact",
  metaTitle: "Contact Us | AaraTech",
  metaDescription: "Partner with AARATech to build secure, scalable, and enterprise-grade digital solutions across the globe.",
  blocks: [
    b("contact-1", "hero", 1, {
      heading: "Let's Talk Business",
      subtitle: "India • Singapore • USA • Malaysia",
      description: "Partner with AARATech to build secure, scalable, and enterprise-grade digital solutions across the globe.",
      backgroundImage: "",
      buttons: [],
    }),
    b("contact-2", "contact_form", 2, {
      heading: "Send Us a Message",
      description: "We'd love to hear from you. Fill out the form and we'll get back to you shortly.",
    }),
    b("contact-3", "text_block", 3, {
      content: "<h2>Our Global Offices</h2><div><h3>India</h3><p>Unit No. 4A & 5, Ground Floor, Pinnacle Building, International Tech Park, Taramani, Chennai – 600113</p><p>Phone: +91 72999 78701</p><p>Email: info@aaratech.com</p></div><div><h3>Singapore</h3><p>100 Jalan Sultan, #03-45, Sultan Plaza, Singapore – 199001</p><p>Email: info@aaratech.com</p></div><div><h3>USA</h3><p>39555 Orchard Hill Place, Novi, MI 48375</p><p>Email: info@aaratech.com</p></div><div><h3>Malaysia</h3><p>No. 15-2-2, Medan Niaga Mutiara Cheras, Jalan Cheras, Kuala Lumpur 56100</p><p>Email: info@aaratech.com</p></div>",
    }),
  ],
};

const industriesPage = {
  title: "Industries",
  slug: "industries",
  metaTitle: "Industries We Serve | AaraTech",
  metaDescription: "Banking & Financial Services, Logistics Services, E-commerce Services, and Postal Solutions.",
  blocks: [
    b("ind-1", "hero", 1, {
      heading: "Industries We Serve",
      subtitle: "All Your Team Needs In One Place",
      description: "IT services that streamline operations, improve efficiency, and maximize business value across Banking & Financial Services, Logistics, E-commerce, and Postal Solutions.",
      backgroundImage: "",
      buttons: [],
    }),
    b("ind-2", "tabs_section", 2, {
      heading: "Industry Verticals",
      tabs: [
        { title: "Banking & Finance", content: "<p>We provide comprehensive banking technology solutions including:</p><ul><li><strong>Digital Banking</strong> — Modern digital banking platforms</li><li><strong>Risk & Compliance</strong> — Regulatory compliance solutions</li><li><strong>Payments</strong> — Payment processing and integration</li><li><strong>Data & Analytics</strong> — Business intelligence for banking</li><li><strong>Cybersecurity for BFSI</strong> — Security solutions for financial services</li></ul><h4>Key Challenges We Solve</h4><ul><li>Increasing regulatory requirements</li><li>Superior customer service demands</li><li>Managing price pressures</li></ul>", image: "" },
        { title: "Logistics Technology", content: "<p>Enabling smart logistics through technology:</p><ul><li><strong>Fleet Management</strong> — Real-time fleet monitoring and optimization</li><li><strong>Route Optimization</strong> — AI-driven route planning</li><li><strong>Warehouse Automation</strong> — Automated warehouse operations</li><li><strong>Supply Chain Visibility</strong> — End-to-end supply chain tracking</li><li><strong>Analytics & Reporting</strong> — Data-driven logistics insights</li></ul><h4>Key Challenges We Solve</h4><ul><li>High last-mile costs</li><li>Lack of real-time visibility</li><li>Inefficient warehouse operations</li></ul>", image: "" },
        { title: "E-commerce", content: "<p>Building digital commerce solutions:</p><ul><li><strong>Platform Development</strong> — Custom e-commerce platforms</li><li><strong>Payment Integration</strong> — Secure payment gateways</li><li><strong>Order Management</strong> — End-to-end order processing</li><li><strong>Customer Experience</strong> — Personalized shopping experiences</li><li><strong>Performance Optimization</strong> — High-traffic scalability</li></ul><h4>Key Challenges We Solve</h4><ul><li>Cart abandonment</li><li>Scaling during peak traffic</li><li>Payment failures</li></ul>", image: "" },
        { title: "Postal Technology", content: "<p>Modernizing postal operations with technology:</p><ul><li><strong>Digital Postal Platforms</strong> — Modern postal management systems</li><li><strong>Shipment Tracking</strong> — Real-time tracking solutions</li><li><strong>Sorting Automation</strong> — Automated sorting systems</li><li><strong>Legacy Modernization</strong> — Upgrading legacy postal systems</li><li><strong>Security & Compliance</strong> — Postal regulatory compliance</li></ul><h4>Key Challenges We Solve</h4><ul><li>Manual processes</li><li>Slow delivery cycles</li><li>Outdated infrastructure</li></ul>", image: "" },
      ],
    }),
    b("ind-3", "cta_banner", 3, {
      heading: "What can we help you to achieve today?",
      description: "Partner with AaraTech to leverage industry-specific technology solutions.",
      buttonText: "CONTACT",
      buttonLink: "/contact",
      backgroundColor: "#1a56db",
    }),
  ],
};

const lendingPage = {
  title: "Lending Solutions",
  slug: "lending-solutions",
  metaTitle: "Lending Solutions | AaraTech",
  metaDescription: "A comprehensive web-based lending and loan origination platform that supports decision-making across the entire lending lifecycle.",
  blocks: [
    b("lend-1", "hero", 1, {
      heading: "End-to-End Lending Solutions for Modern Banking",
      subtitle: "Enterprise Lending Platform",
      description: "A comprehensive web-based lending and loan origination platform that supports decision-making across the entire lending lifecycle — from prospect to closure.",
      backgroundImage: "",
      buttons: [
        { label: "REQUEST A DEMO", link: "/contact" },
        { label: "CONTACT SALES", link: "/contact" },
      ],
    }),
    b("lend-2", "stats_section", 2, {
      heading: "",
      stats: [
        { label: "Years in Banking", value: "14+" },
        { label: "Financial Institutions", value: "500+" },
        { label: "Web-Based Platform", value: "100%" },
        { label: "Core Modules", value: "6" },
      ],
    }),
    b("lend-3", "split_section", 3, {
      heading: "Simplify Every Part of Lending & Loan Management",
      content: "Our lending platform provides a complete, web-based solution covering loan origination, credit line management, accounts receivable, asset management, contract management, and financial reporting. It empowers financial institutions to automate workflows, reduce processing time, and make informed lending decisions with confidence.",
      image: "",
      imagePosition: "right",
      button: { label: "", link: "" },
    }),
    b("lend-4", "icon_cards", 4, {
      sectionTitle: "Core Modules",
      subtitle: "",
      cards: [
        { icon: "ClipboardList", title: "Loan Origination", description: "End-to-end loan processing from application to approval." },
        { icon: "BarChart3", title: "Credit Line Management", description: "Manage credit facilities and revolving credit lines." },
        { icon: "DollarSign", title: "Accounts Receivable", description: "Track and manage loan repayments and collections." },
        { icon: "Building2", title: "Asset Management", description: "Monitor and manage financed assets throughout their lifecycle." },
        { icon: "FileText", title: "Contract Management", description: "Create, manage, and track lending contracts." },
        { icon: "TrendingUp", title: "Financial Reporting", description: "Comprehensive reporting and analytics for lending operations." },
      ],
      columns: 3,
    }),
    b("lend-5", "text_block", 5, {
      content: "<h2>The Lending Lifecycle</h2><div style=\"display:flex;flex-wrap:wrap;gap:16px;justify-content:center;margin-top:24px;\"><div><strong>1. Prospect</strong><br/>Lead capture & qualification</div><div><strong>2. Assess</strong><br/>Credit evaluation & scoring</div><div><strong>3. Approve</strong><br/>Decision & authorization</div><div><strong>4. Disburse</strong><br/>Funding & contract execution</div><div><strong>5. Service</strong><br/>Repayment & asset tracking</div><div><strong>6. Close</strong><br/>Settlement & reporting</div></div>",
    }),
    b("lend-6", "tabs_section", 6, {
      heading: "Platform Features",
      tabs: [
        { title: "Loan Origination", content: "Complete loan origination workflow from application intake through underwriting, approval, and disbursement. Automated credit scoring, document management, and compliance checks streamline the entire process.", image: "" },
        { title: "Asset Management", content: "Full lifecycle asset tracking including acquisition, depreciation, maintenance, and disposal. Real-time asset valuation and comprehensive audit trails for regulatory compliance.", image: "" },
        { title: "Accounting System", content: "Integrated general ledger, accounts receivable, and accounts payable management. Automated transaction posting, reconciliation, and financial statement generation.", image: "" },
        { title: "CRM & Pipeline", content: "Lead management, opportunity tracking, and relationship management tools. Pipeline analytics and automated follow-up workflows to maximize conversion rates.", image: "" },
        { title: "Risk & Compliance", content: "Built-in risk assessment models, regulatory compliance monitoring, and automated reporting. Real-time alerts and exception management for proactive risk mitigation.", image: "" },
      ],
    }),
    b("lend-7", "icon_cards", 7, {
      sectionTitle: "Why Choose Our Lending Platform?",
      subtitle: "",
      cards: [
        { icon: "Settings", title: "Fully Parameter-Driven", description: "Configure without code changes." },
        { icon: "Monitor", title: "Browser-Based Deployment", description: "Access from any modern browser." },
        { icon: "RefreshCw", title: "Easy Legacy Integration", description: "Seamless integration with existing systems." },
        { icon: "MousePointer", title: "Intuitive Workflow UI", description: "User-friendly interface for all users." },
        { icon: "Building2", title: "14+ Years Banking Expertise", description: "Deep domain knowledge in financial services." },
        { icon: "Smartphone", title: "Scalable Architecture", description: "Grows with your business needs." },
      ],
      columns: 3,
    }),
    b("lend-8", "split_section", 8, {
      heading: "Seamless System Integration",
      content: "<ul><li><strong>Core Banking Integration</strong> — Connect with your existing core banking system</li><li><strong>Legacy Data Migration</strong> — Smooth migration from legacy platforms</li><li><strong>Third-Party Services</strong> — Integrate credit bureaus, payment gateways, and more</li><li><strong>Regulatory Reporting</strong> — Automated compliance and regulatory reporting</li></ul>",
      image: "",
      imagePosition: "left",
      button: { label: "", link: "" },
    }),
    b("lend-9", "cta_banner", 9, {
      heading: "Ready to Transform Your Lending Operations?",
      description: "Partner with Aara Tech to deploy a modern, scalable lending platform that drives efficiency and growth.",
      buttonText: "GET STARTED TODAY",
      buttonLink: "/contact",
      backgroundColor: "#1a56db",
    }),
  ],
};

const leasingPage = {
  title: "Leasing System",
  slug: "leasing",
  metaTitle: "Leasing System | AaraTech",
  metaDescription: "A web based CRM & lease/loan origination software, optimized for the Equipment Finance & Leasing Industry.",
  blocks: [
    b("lease-1", "hero", 1, {
      heading: "Leasing System",
      subtitle: "Equipment Finance • Vehicle Leasing • Industrial Machines • Corporate Loans",
      description: "A web based CRM & lease/loan origination software, optimized for the Equipment Finance & Leasing Industry. Our flagship product providing an end-to-end leasing solution.",
      backgroundImage: "",
      buttons: [{ label: "Request Demo", link: "/contact" }],
    }),
    b("lease-2", "split_section", 2, {
      heading: "Aara Tech's Leasing System",
      content: "Our flagship leasing product provides a complete end-to-end solution for equipment finance and leasing operations. It covers the entire lifecycle from lease initiation through contract preparation, asset management, receivables, and lease closure. The system is fully parameter-driven and configurable to match your specific business requirements.",
      image: "",
      imagePosition: "right",
      button: { label: "Request Demo", link: "/contact" },
    }),
    b("lease-3", "icon_cards", 3, {
      sectionTitle: "Core Modules",
      subtitle: "",
      cards: [
        { icon: "FileText", title: "Lease Initiation", description: "Complete lease application and origination workflow." },
        { icon: "Settings", title: "Contract Preparation", description: "Automated contract generation and management." },
        { icon: "Truck", title: "Asset Management", description: "Full lifecycle asset tracking and management." },
        { icon: "DollarSign", title: "Account Receivables", description: "Receivables tracking and collection management." },
        { icon: "BarChart3", title: "Reporting & MIS", description: "Comprehensive management information systems." },
        { icon: "Shield", title: "Lease Closure", description: "End-of-lease processing and settlement." },
      ],
      columns: 3,
    }),
    b("lease-4", "tabs_section", 4, {
      heading: "Platform Features",
      tabs: [
        { title: "Lease Management", content: "End-to-end lease lifecycle management from origination through termination. Automated workflows, approval chains, and configurable business rules for maximum efficiency.", image: "" },
        { title: "Accounts Receivable", content: "Complete receivables management with automated billing, payment processing, and delinquency tracking. Real-time aging reports and collection workflow automation.", image: "" },
        { title: "Asset Management", content: "Comprehensive asset tracking including acquisition, depreciation, insurance, and disposal. GPS integration and maintenance scheduling for physical assets.", image: "" },
        { title: "Reporting & MIS", content: "Extensive reporting suite with regulatory reports, management dashboards, and custom report builder. Real-time analytics and data export capabilities.", image: "" },
        { title: "CRM & Search", content: "Integrated customer relationship management with lead tracking, pipeline management, and advanced search capabilities across all records.", image: "" },
      ],
    }),
    b("lease-5", "split_section", 5, {
      heading: "Key Highlights",
      content: "<ul><li><strong>Parameter Driven & Configurable</strong> — Adapt the system to your specific business requirements</li><li><strong>Built by Industry Experts</strong> — Designed by professionals with deep leasing domain knowledge</li><li><strong>Increase Productivity & Profit</strong> — Streamline operations and improve bottom-line results</li></ul>",
      image: "",
      imagePosition: "left",
      button: { label: "", link: "" },
    }),
    b("lease-6", "icon_cards", 6, {
      sectionTitle: "Industries Served",
      subtitle: "",
      cards: [
        { icon: "Building", title: "SMEs", description: "Small and medium enterprises requiring flexible leasing solutions." },
        { icon: "Globe", title: "Large Corporations", description: "Enterprise-grade leasing operations for large organizations." },
        { icon: "Users", title: "Banks & Financial Institutions", description: "Banking and financial services companies offering leasing products." },
      ],
      columns: 3,
    }),
    b("lease-7", "tabs_section", 7, {
      heading: "Why Choose Us?",
      tabs: [
        { title: "What Makes Us Different", content: "<ul><li>Deep domain expertise in equipment finance and leasing</li><li>Fully parameter-driven — no code changes needed</li><li>Proven track record with financial institutions</li><li>Comprehensive end-to-end solution</li><li>Flexible deployment options</li></ul>", image: "" },
        { title: "Why Choose Aara Tech?", content: "<ul><li>14+ years of industry experience</li><li>Dedicated support and maintenance</li><li>Scalable architecture for growing businesses</li><li>Regular product updates and enhancements</li><li>Cost-effective pricing models</li></ul>", image: "" },
      ],
    }),
    b("lease-8", "cta_banner", 8, {
      heading: "What can we help you to achieve today?",
      description: "Partner with AaraTech to modernize your Equipment Finance and Leasing operations.",
      buttonText: "CONTACT",
      buttonLink: "/contact",
      backgroundColor: "#1a56db",
    }),
  ],
};

const sdbPage = {
  title: "SDB Management",
  slug: "sdb-management",
  metaTitle: "SecureBox – Safe Deposit Box Management | AaraTech",
  metaDescription: "An end-to-end software solution for safe deposit box systems that automates your entire safe deposit box operations.",
  blocks: [
    b("sdb-1", "hero", 1, {
      heading: "SecureBox – Safe Deposit Box Management",
      subtitle: "Banking • Jewelleries • NBFC • Financial Services",
      description: "An end-to-end software solution for safe deposit box systems that can automate your entire safe deposit box operations, from inventory setup to box rentals to delinquency follow-up.",
      backgroundImage: "",
      buttons: [{ label: "Request Demo", link: "/contact" }],
    }),
    b("sdb-2", "split_section", 2, {
      heading: "Automated Safe Deposit Box Management",
      content: "SECUREBOX is a comprehensive, web-based safe deposit box management solution designed for banks, NBFCs, and jewellery businesses. It automates the complete lifecycle of safe deposit box operations — from inventory setup and rate configuration through box rentals, access management, and delinquency follow-up. The system is fully parameter-driven, integrates with KYC/AML services, and supports 30+ API integrations.",
      image: "",
      imagePosition: "right",
      button: { label: "Request Demo", link: "/contact" },
    }),
    b("sdb-3", "icon_cards", 3, {
      sectionTitle: "Core Features",
      subtitle: "",
      cards: [
        { icon: "Package", title: "Inventory Setup", description: "Complete vault and box inventory management and configuration." },
        { icon: "DollarSign", title: "Rental Rates", description: "Flexible rate configuration with discounts and promotions." },
        { icon: "CheckCircle", title: "Box Rental & Access", description: "Streamlined rental process and secure access management." },
        { icon: "AlertTriangle", title: "Delinquency Follow-up", description: "Automated delinquency tracking and notification system." },
        { icon: "FileText", title: "Reports", description: "Comprehensive reporting and analytics dashboard." },
        { icon: "Shield", title: "Security & Audit", description: "Full audit trail and security compliance features." },
      ],
      columns: 3,
    }),
    b("sdb-4", "tabs_section", 4, {
      heading: "Feature Details",
      tabs: [
        { title: "Inventory Setup", content: "Configure vault locations, box types, sizes, and availability. Manage box numbering, status tracking, and location mapping for efficient operations.", image: "" },
        { title: "Rental Rates & Discounts", content: "Set up flexible rental rate structures with tiered pricing, seasonal discounts, and promotional offers. Automated billing and payment tracking.", image: "" },
        { title: "Box Rental & Access", content: "Streamlined rental workflow with digital agreements, key management, and access logging. Support for multiple signatories and power of attorney.", image: "" },
        { title: "Delinquency Follow-up", content: "Automated delinquency detection with configurable reminder schedules. Email, SMS, and letter notifications for overdue accounts.", image: "" },
        { title: "Reports & Audit", content: "Generate operational, financial, and compliance reports. Complete audit trail for all transactions and access events.", image: "" },
      ],
    }),
    b("sdb-5", "split_section", 5, {
      heading: "SECUREBOX Delivers",
      content: "<ul><li><strong>Complete Automation of Locker Management</strong> — End-to-end digital operations</li><li><strong>KYC, AML Checks & 30+ API Integrations</strong> — Regulatory compliance built-in</li><li><strong>Parameter Driven & Configurable</strong> — Adapt to your specific requirements</li></ul>",
      image: "",
      imagePosition: "left",
      button: { label: "", link: "" },
    }),
    b("sdb-6", "icon_cards", 6, {
      sectionTitle: "Additional Capabilities",
      subtitle: "",
      cards: [
        { icon: "Users", title: "Multiple Co-signers", description: "Support for multiple authorized signatories per box." },
        { icon: "Globe", title: "Platform Independent", description: "Access from any browser on any platform." },
        { icon: "Link", title: "Seamless Integration", description: "Integrate with your existing banking and CRM systems." },
      ],
      columns: 3,
    }),
    b("sdb-7", "tabs_section", 7, {
      heading: "Why Choose SecureBox?",
      tabs: [
        { title: "Customer Benefits", content: "<ul><li>Reduced operational costs through automation</li><li>Improved customer satisfaction with digital workflows</li><li>Enhanced security and compliance</li><li>Real-time visibility into operations</li><li>Faster onboarding and rental processing</li></ul>", image: "" },
        { title: "Why Choose SecureBox?", content: "<ul><li>Proven solution deployed across multiple institutions</li><li>Comprehensive API integration ecosystem</li><li>Dedicated support and regular updates</li><li>Scalable from single branch to enterprise-wide deployment</li><li>Cost-effective licensing models</li></ul>", image: "" },
      ],
    }),
    b("sdb-8", "cta_banner", 8, {
      heading: "What can we help you to achieve today?",
      description: "Contact us for a live demo of AaraTech's SecureBox Safe Deposit Box Management Solution.",
      buttonText: "CONTACT",
      buttonLink: "/contact",
      backgroundColor: "#1a56db",
    }),
  ],
};

const mobileWalletPage = {
  title: "Mobile Wallet",
  slug: "mobile-wallet",
  metaTitle: "Sling Wallet – Mobile Wallet Solution | AaraTech",
  metaDescription: "An end-to-end mobile wallet solution for instant and cashless fund transfer, hotel booking, airline booking, mobile recharge, and utility payments.",
  blocks: [
    b("wallet-1", "hero", 1, {
      heading: "Sling Wallet – Mobile Wallet Solution",
      subtitle: "Fund Transfer • Hotel Booking • Airline Booking • Recharge & Bills",
      description: "An end-to-end mobile wallet solution for instant and cashless fund transfer, hotel booking, airline booking, mobile recharge, and utility payments.",
      backgroundImage: "",
      buttons: [{ label: "Request Demo", link: "/contact" }],
    }),
    b("wallet-2", "split_section", 2, {
      heading: "Payments Made Easy",
      content: "Sling Wallet is a comprehensive mobile wallet solution that enables instant, cashless transactions for consumers and businesses. From peer-to-peer fund transfers to hotel and airline bookings, mobile recharges, and utility bill payments — Sling Wallet provides a unified payment experience. Available as a turnkey, OEM, or hosted solution with white-label capabilities.",
      image: "",
      imagePosition: "right",
      button: { label: "Request Demo", link: "/contact" },
    }),
    b("wallet-3", "icon_cards", 3, {
      sectionTitle: "Core Services",
      subtitle: "",
      cards: [
        { icon: "Send", title: "Send Money", description: "Instant peer-to-peer fund transfers." },
        { icon: "Users", title: "Request Money", description: "Request payments from contacts easily." },
        { icon: "Home", title: "Hotel Booking", description: "Book hotels directly through the wallet." },
        { icon: "Globe", title: "Airline Booking", description: "Book flights with integrated airline partners." },
        { icon: "Smartphone", title: "Mobile & DTH Recharge", description: "Instant mobile and DTH recharges." },
        { icon: "CreditCard", title: "Virtual Card Payments", description: "Virtual card generation for online payments." },
      ],
      columns: 3,
    }),
    b("wallet-4", "tabs_section", 4, {
      heading: "Platform Features",
      tabs: [
        { title: "Fund Transfer", content: "Send and receive money instantly with bank-grade security. Support for multiple payment methods including bank transfer, UPI, and wallet-to-wallet transfers.", image: "" },
        { title: "Hotel & Airline Booking", content: "Integrated travel booking engine with access to thousands of hotels and airlines worldwide. Real-time availability, competitive pricing, and instant booking confirmation.", image: "" },
        { title: "Recharge & Bill Payments", content: "One-stop solution for mobile recharges, DTH top-ups, and utility bill payments. Support for all major service providers with instant processing.", image: "" },
        { title: "Deployment Options", content: "Flexible deployment as Turnkey (complete ready-to-deploy solution), OEM (customizable white-label product), or Hosted (cloud-hosted managed service). Choose the model that best fits your business.", image: "" },
        { title: "Integration & Architecture", content: "Pre-integrated with major payment gateways, banking APIs, and third-party service providers. RESTful API architecture enabling easy integration with existing systems.", image: "" },
      ],
    }),
    b("wallet-5", "split_section", 5, {
      heading: "Key Benefits",
      content: "<ul><li><strong>Turnkey, OEM & Hosted Deployment</strong> — Choose your ideal deployment model</li><li><strong>White Label Solution</strong> — Brand the wallet as your own</li><li><strong>Pre-Integrated Payment Gateways</strong> — Ready-to-use payment integrations</li></ul>",
      image: "",
      imagePosition: "left",
      button: { label: "", link: "" },
    }),
    b("wallet-6", "icon_cards", 6, {
      sectionTitle: "Flexible Deployment Models",
      subtitle: "",
      cards: [
        { icon: "Zap", title: "Turnkey Solution", description: "Complete, ready-to-deploy mobile wallet platform." },
        { icon: "Ruler", title: "OEM Solution", description: "Customizable white-label product for your brand." },
        { icon: "Settings", title: "Hosted Solution", description: "Cloud-hosted, fully managed service." },
      ],
      columns: 3,
    }),
    b("wallet-7", "tabs_section", 7, {
      heading: "Why Choose Sling Wallet?",
      tabs: [
        { title: "Wallet Benefits", content: "<ul><li>Instant, secure, and cashless transactions</li><li>Unified platform for payments, bookings, and recharges</li><li>White-label ready for your brand</li><li>Pre-integrated payment gateways</li><li>Scalable from startup to enterprise</li></ul>", image: "" },
        { title: "Why Choose Sling Wallet?", content: "<ul><li>Proven mobile wallet technology</li><li>Multiple deployment options</li><li>Comprehensive API ecosystem</li><li>Dedicated support and maintenance</li><li>Regular feature updates</li></ul>", image: "" },
      ],
    }),
    b("wallet-8", "cta_banner", 8, {
      heading: "What can we help you to achieve today?",
      description: "Contact us for a live demo of AaraTech's Sling Wallet Mobile Wallet Solution.",
      buttonText: "CONTACT",
      buttonLink: "/contact",
      backgroundColor: "#1a56db",
    }),
  ],
};

const assemblerPage = {
  title: "Assembler to COBOL",
  slug: "assembler-cobol",
  metaTitle: "Assembler to COBOL Conversion Tool | AaraTech",
  metaDescription: "Modernize your Assembler code base to COBOL with our fully automated, user-friendly tool — preserving business logic while unlocking maintainability.",
  blocks: [
    b("asm-1", "hero", 1, {
      heading: "Assembler to COBOL Conversion Tool",
      subtitle: "Flagship Product",
      description: "Step into the world of seamless code conversion. Modernize your Assembler code base to COBOL with our fully automated, user-friendly tool — preserving business logic while unlocking maintainability and modern integration.",
      backgroundImage: "",
      buttons: [
        { label: "Request a Demo", link: "/contact" },
        { label: "Experience the Tool", link: "/contact" },
      ],
    }),
    b("asm-2", "icon_cards", 2, {
      sectionTitle: "Highlights",
      subtitle: "",
      cards: [
        { icon: "RefreshCw", title: "Automated Conversion", description: "95%+ auto-conversion rate with minimal manual intervention." },
        { icon: "Shield", title: "Logic Preservation", description: "Business logic is fully preserved during conversion." },
        { icon: "Zap", title: "Rapid Turnaround", description: "Fast conversion process — 500+ programs converted, 30M+ lines migrated." },
      ],
      columns: 3,
    }),
    b("asm-3", "text_block", 3, {
      content: "<h2>Key Features</h2><h3>Core Conversion Capabilities</h3><ul><li>Automated Assembler to COBOL source conversion</li><li>Macro expansion and inline code handling</li><li>DSECT and CSECT mapping</li><li>Conditional assembly support</li><li>Linkage and calling convention translation</li><li>System macro and SVC translation</li></ul><h3>Output Quality</h3><ul><li>Clean, readable COBOL output</li><li>Proper paragraph and section structure</li><li>Meaningful variable naming</li><li>Inline documentation and comments</li></ul><h3>Platform Support</h3><ul><li>IBM Mainframe (z/OS, MVS)</li><li>HLASM and Basic Assembler</li><li>Batch and CICS environments</li><li>DB2 and VSAM integration</li></ul>",
    }),
    b("asm-4", "icon_cards", 4, {
      sectionTitle: "How It Works",
      subtitle: "Our proven 6-step conversion process",
      cards: [
        { icon: "Search", title: "1. Assess", description: "Analyze source code complexity and conversion scope." },
        { icon: "FileText", title: "2. POC & Design", description: "Create proof of concept and design conversion strategy." },
        { icon: "RefreshCw", title: "3. Convert", description: "Run automated conversion with quality checks." },
        { icon: "CheckCircle", title: "4. Test & Validate", description: "Comprehensive testing and validation of converted code." },
        { icon: "Upload", title: "5. Deploy", description: "Deploy converted programs to target environment." },
        { icon: "HeadphonesIcon", title: "6. Support", description: "Ongoing support and maintenance post-deployment." },
      ],
      columns: 3,
    }),
    b("asm-5", "icon_cards", 5, {
      sectionTitle: "Benefits",
      subtitle: "",
      cards: [
        { icon: "DollarSign", title: "Reduced Maintenance Costs", description: "COBOL is easier and cheaper to maintain than Assembler." },
        { icon: "Eye", title: "Improved Code Readability", description: "Clean, structured COBOL code is easier to understand and modify." },
        { icon: "Link", title: "Modern Integration", description: "COBOL integrates easily with modern APIs and services." },
        { icon: "Shield", title: "Risk Mitigation", description: "Reduce dependency on scarce Assembler expertise." },
        { icon: "Zap", title: "Faster Development Cycles", description: "COBOL enables faster changes and feature development." },
        { icon: "Users", title: "Larger Talent Pool", description: "More developers available for COBOL than Assembler." },
      ],
      columns: 3,
    }),
    b("asm-6", "text_block", 6, {
      content: "<h2>Use Cases</h2><ul><li><strong>Banking & Financial Services</strong> — Modernize core banking Assembler programs to maintainable COBOL</li><li><strong>Insurance</strong> — Convert policy and claims processing Assembler code</li><li><strong>Government & Public Sector</strong> — Upgrade legacy government systems</li><li><strong>Telecommunications</strong> — Modernize telecom billing and operations systems</li></ul><h3>Common Migration Scenarios</h3><ul><li>Mainframe Assembler to Enterprise COBOL</li><li>HLASM macro libraries to COBOL copybooks</li><li>Assembler batch programs to COBOL batch</li><li>Assembler CICS programs to COBOL CICS</li></ul>",
    }),
    b("asm-7", "split_section", 7, {
      heading: "Why Choose Aara Tech?",
      content: "<h4>What Makes Us Different</h4><ul><li>Purpose-built conversion tool with 95%+ automation</li><li>14+ years of mainframe modernization experience</li><li>500+ programs successfully converted</li><li>30M+ lines of code migrated</li><li>Dedicated team of Assembler and COBOL experts</li></ul><h4>Why Choose Aara Tech?</h4><ul><li>Free initial assessment and 2-week POC</li><li>Proven methodology with minimal business disruption</li><li>Comprehensive testing and validation</li><li>Post-migration support and maintenance</li></ul>",
      image: "",
      imagePosition: "right",
      button: { label: "Request a Demo", link: "/contact" },
    }),
    b("asm-8", "text_block", 8, {
      content: "<h2>Assembler Instructions Glossary</h2><p>Reference guide for common Assembler instruction mnemonics used in mainframe programs.</p><p><strong>A</strong> — Add, AH — Add Halfword, AP — Add Packed, AR — Add Register</p><p><strong>B</strong> — Branch, BAL — Branch and Link, BAS — Branch and Save, BC — Branch on Condition, BCR — Branch on Condition Register, BCT — Branch on Count, BE — Branch Equal, BH — Branch High, BL — Branch Low, BNE — Branch Not Equal</p><p><strong>C</strong> — Compare, CH — Compare Halfword, CL — Compare Logical, CLC — Compare Logical Characters, CLI — Compare Logical Immediate, CLR — Compare Logical Register, CP — Compare Packed, CR — Compare Register, CVB — Convert to Binary, CVD — Convert to Decimal</p><p><strong>D</strong> — Divide, DP — Divide Packed, DR — Divide Register</p><p><strong>E</strong> — ED — Edit, EDMK — Edit and Mark, EX — Execute</p><p><strong>L</strong> — Load, LA — Load Address, LH — Load Halfword, LM — Load Multiple, LR — Load Register, LTR — Load and Test Register</p><p><strong>M</strong> — Multiply, MH — Multiply Halfword, MP — Multiply Packed, MR — Multiply Register, MVC — Move Characters, MVI — Move Immediate, MVN — Move Numeric, MVO — Move with Offset, MVZ — Move Zones</p><p><strong>N</strong> — AND, NI — AND Immediate, NR — AND Register</p><p><strong>O</strong> — OR, OI — OR Immediate, OR — OR Register</p><p><strong>P</strong> — PACK — Pack</p><p><strong>S</strong> — Subtract, SH — Subtract Halfword, SLA — Shift Left Algebraic, SLDA — Shift Left Double Algebraic, SLL — Shift Left Logical, SP — Subtract Packed, SR — Subtract Register, SRA — Shift Right Algebraic, SRL — Shift Right Logical, ST — Store, STC — Store Character, STH — Store Halfword, STM — Store Multiple</p><p><strong>T</strong> — TM — Test Under Mask, TR — Translate, TRT — Translate and Test</p><p><strong>U</strong> — UNPK — Unpack</p><p><strong>X</strong> — XR — Exclusive OR Register</p><p><strong>Z</strong> — ZAP — Zero and Add Packed</p>",
    }),
    b("asm-9", "cta_banner", 9, {
      heading: "Ready to modernize your Assembler codebase?",
      description: "Start with a free assessment and 2-week proof of concept.",
      buttonText: "REQUEST A DEMO",
      buttonLink: "/contact",
      backgroundColor: "#1a56db",
    }),
  ],
};

const allPages = [
  homePage,
  aboutPage,
  servicesPage,
  contactPage,
  industriesPage,
  lendingPage,
  leasingPage,
  sdbPage,
  mobileWalletPage,
  assemblerPage,
];

module.exports = allPages;

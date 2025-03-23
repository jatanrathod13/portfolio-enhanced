import { Icons } from "@/components/icons";
import { 
  HomeIcon, 
  NotebookIcon, 
  Database, 
  Code, 
  Laptop, 
  Brain, 
  LineChart, 
  Layers, 
  Network
} from "lucide-react";
import { Github, Twitter, Linkedin } from "lucide-react";

export const DATA = {
  name: "Jatan Rathod",
  initials: "JR",
  url: "https://jatanrathod.com",
  location: "Houston, TX",
  locationLink: "https://www.google.com/maps/place/houston",
  description:
    "Data Engineering & AI Expert crafting innovative solutions for federal agencies and Fortune 500 companies.",
  summary:
    "As a versatile data engineering expert with deep specialization in artificial intelligence, I have a proven track record of architecting robust, scalable solutions that significantly enhance operational efficiency and decision-making capabilities. My diverse experience spans multiple industries, including procurement, healthcare, education, aviation, and manufacturing, where my contributions consistently generate substantial ROI and meaningful impact. I thrive on turning complex data challenges into clear, actionable insights and intelligent systems that empower organizations to perform at their highest potential.",
  avatarUrl: "/profile.jpg",
  skills: [
    "Python",
    "Data Engineering",
    "Data Pipelines",
    "Microservices",
    "Natural Language Processing (NLP)",
    "Retrieval-Augmented Generation (RAG)",
    "Semantic Search",
    "Statistical Analysis",
    "Economic Modeling",
    "Data Visualization",
    "Machine Learning",
    "Large Language Models (LLMs)",
  ],
  skillCategories: [
    {
      title: "Data Engineering",
      icon: Database,
      skills: [
        "Data Pipelines",
        "ETL Processes",
        "Data Integration",
        "Data Warehousing",
        "Data Modeling"
      ]
    },
    {
      title: "AI & Machine Learning",
      icon: Brain,
      skills: [
        "Natural Language Processing (NLP)",
        "Large Language Models (LLMs)",
        "Retrieval-Augmented Generation (RAG)",
        "Semantic Search",
        "Machine Learning"
      ]
    },
    {
      title: "Programming",
      icon: Code,
      skills: [
        "Python",
        "SQL",
        "JavaScript",
        "TypeScript",
        "React"
      ]
    },
    {
      title: "Architecture",
      icon: Layers,
      skills: [
        "Microservices",
        "Serverless",
        "API Design",
        "Cloud Infrastructure",
        "Scalable Systems"
      ]
    },
    {
      title: "Analytics",
      icon: LineChart,
      skills: [
        "Statistical Analysis",
        "Economic Modeling",
        "Data Visualization",
        "Business Intelligence",
        "Predictive Analytics"
      ]
    }
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "contact@jatanrathod.com",
    tel: "",
    location: "Toronto, Canada",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/jatanrathod",
        icon: Github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/jatanrathod",
        icon: Linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://twitter.com/jatanrathod",
        icon: Twitter,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Optimal Solutions Group",
      href: "https://optimalsolutionsgroup.com",
      badges: [],
      location: "Remote",
      title: "Senior Data Engineer & AI Specialist",
      logoUrl: "/optimal-new.png",
      start: "Jun 2020",
      end: "Present",
      description:
        "Lead architect for complex data engineering and AI systems serving major federal agencies including the Small Business Administration (SBA), Department of Education, Centers for Medicare & Medicaid Services (CMS), and Federal Aviation Administration (FAA). Design and implement scalable ETL pipelines, real-time data processing systems, and AI-powered platforms that transform operational capabilities and drive data-informed decision making.",
    },
    {
      company: "Accenture",
      href: "https://accenture.com",
      badges: [],
      location: "Houston, TX",
      title: "Application Development Analyst",
      logoUrl: "/accenture.png",
      start: "Jun 2016",
      end: "Sep 2018",
      description:
        "Engineered enterprise-grade data solutions for Fortune 500 clients, optimizing mission-critical workflows and implementing sophisticated data pipelines. Designed and built robust ETL processes that transformed raw Enterprise Resource Planning (ERP) data into actionable business intelligence, enabling data-driven strategic decisions and measurable operational improvements.",
    },
  ],
  education: [
    {
      school: "University of Texas at Dallas",
      href: "https://utdallas.edu",
      degree: "MS in Information Technology & Management",
      logoUrl: "/logos/utd-logo-new.png",
      start: "2019",
      end: "2021",
    },
  ],
  projects: [
    {
      title: "AcquisitionAI: USDA Procurement Intelligence Platform",
      href: "https://www.acquisitionai.org",
      dates: "",
      active: true,
      description:
        "Architected and implemented an advanced AI-driven platform optimizing the USDA's procurement lifecycle. Developed robust data pipelines for ingesting, cleaning, and transforming extensive procurement datasets, laying the foundation for powerful analytics. Leveraging sophisticated NLP and machine learning methods, the platform analyzes procurement trends, identifies optimal vendors, and significantly streamlines the acquisition process—delivering substantial operational efficiencies and cost reductions.",
      technologies: [
        "Python",
        "Natural Language Processing (NLP)",
        "Machine Learning",
        "Semantic Search",
        "ETL Pipelines",
        "Government Procurement",
        "Data Analytics",
        "AI Applications",
      ],
      links: [],
      image: "",
      video: "",
      client: "Department of Agriculture (USDA)",
      clientLogo: "/logos/usda-logo.png",
    },
    {
      title: "iAccessible: Federal Website Accessibility Platform",
      href: "",
      dates: "",
      active: true,
      description:
        "Engineered an enterprise-level platform that automates comprehensive accessibility testing and remediation for federal websites, ensuring full Section 508 compliance. Implemented sophisticated microservice architectures and ETL pipelines that collect, process, and analyze accessibility data across hundreds of domains. This solution enables agencies to efficiently identify, prioritize, and resolve digital accessibility issues, significantly boosting compliance and digital inclusion.",
      technologies: [
        "Python",
        "Microservices",
        "Prefect",
        "Data Pipelines",
        "ETL",
        "Accessibility Testing",
        "Automation",
      ],
      links: [],
      image: "",
      video: "",
      client: "U.S. Department of Education & CMS",
      clientLogos: ["/logos/doe-logo.png", "/logos/cms-logo.png"],
    },
    {
      title: "HUBZone Economic Impact Study",
      href: "",
      dates: "",
      active: true,
      description:
        "Developed advanced data collection and analytical frameworks to support the SBA's HUBZone program. Created extensive ETL pipelines integrating diverse datasets to enable precise economic modeling and impact assessment. Designed complex input-output models to accurately measure job creation, economic output, and community development, directly influencing SBA policy and driving targeted community support.",
      technologies: [
        "Python",
        "Data Engineering",
        "Statistical Analysis",
        "ETL Pipelines",
        "Economic Modeling",
        "Data Visualization",
        "Policy Analysis",
      ],
      links: [],
      image: "",
      video: "",
      client: "Small Business Administration (SBA)",
      clientLogo: "/logos/sba-logo-high-quality.png",
    },
    {
      title: "WOSB Industry Representation Analysis",
      href: "",
      dates: "",
      active: true,
      description:
        "Implemented comprehensive data infrastructure to analyze a decade of federal procurement data for the SBA. Engineered scalable ETL processes for transforming and examining large-scale procurement datasets, identifying key industries where Woman-Owned Small Businesses (WOSBs) faced underrepresentation. The insights generated informed strategic policy adjustments, promoting equitable distribution of federal contracting opportunities.",
      technologies: [
        "Python",
        "Data Engineering",
        "ETL Pipelines",
        "Statistical Methods",
        "Data Mining",
        "Visualization",
        "Federal Procurement Analysis",
      ],
      links: [],
      image: "",
      video: "",
      client: "Small Business Administration (SBA)",
      clientLogo: "/logos/sba-logo-high-quality.png",
    },
    {
      title: "FAA Comments Processing & Analysis Tool",
      href: "",
      dates: "",
      active: true,
      description:
        "Built an AI-powered system to process and analyze public feedback regarding airport operations. Designed robust ETL pipelines for structured ingestion and management of unstructured textual data from numerous sources. Utilizing advanced NLP techniques, the platform efficiently classifies comments, extracts actionable insights, and identifies trends—enabling informed decision-making for improving airport operations and regulatory compliance.",
      technologies: [
        "Data Engineering",
        "ETL Pipelines",
        "Natural Language Processing (NLP)",
        "Text Classification",
        "Clustering",
        "Python",
        "AI Applications",
      ],
      links: [],
      image: "",
      video: "",
      client: "Federal Aviation Administration (FAA)",
      clientLogo: "/logos/faa-logo-hq.svg",
    },
    {
      title: "DuPont-Dow Merger SAP Migration",
      href: "",
      dates: "",
      active: true,
      description:
        "Directed a strategic SAP data migration project critical to DuPont's merger with Dow Chemical. Developed advanced ETL processes consolidating disparate SAP environments, ensuring seamless data transfer, comprehensive system harmonization, and strict data integrity. Implemented meticulous data validation frameworks, achieving zero data loss and maintaining uninterrupted operational performance during this high-stakes corporate integration.",
      technologies: [
        "SAP",
        "Data Migration",
        "ETL Pipelines",
        "Data Integration",
        "Enterprise Systems",
        "Data Validation",
        "Manufacturing",
      ],
      links: [],
      image: "",
      video: "",
      client: "DuPont",
      clientLogo: "/logos/dupont-logo.png",
    },
  ],
  hackathons: [],
} as const;

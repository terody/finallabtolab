import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Check,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  FileText,
  MessageSquare,
  Image,
  Award,
  Download,
  Star,
  Users,
  Zap,
  Eye,
  Plus,
  AlertTriangle,
  Search,
  Briefcase,
  Calendar,
  DollarSign,
  Target,
  TrendingUp,
  Shield,
  Crown,
  Sparkles,
  Upload,
  Tag,
  GraduationCap,
  Minus,
  BookOpen,
  Clock,
  Cpu,
  Beaker,
  Settings,
  Package,
} from "lucide-react";
import { UserProfile } from "src/types/user";
import { createProfile } from "../lib/profiles";

function ProfessionalSubscriptions() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showExample, setShowExample] = useState<string | null>(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [currentPlan, setCurrentPlan] = useState("");

  const userData = location.state?.userData;

  // Professional titles with dynamic addition capability
  const [professionalTitles, setProfessionalTitles] = useState([
    "Abbott Architect",
    "Applications Specialist",
    "Biorepository Specialist",
    "Blood Bank Technologist",
    "Cytogeneticist",
    "Cytotechnologist",
    "Clinical Chemist",
    "Clinical Laboratory Scientist (CLS)",
    "Clinical Laboratory Technician (CLT)",
    "Clinical Research Associate",
    "Clinical Research Coordinator",
    "Compliance Officer",
    "Environmental Laboratory Technician",
    "Field Service Engineer",
    "Food Safety Laboratory Analyst",
    "Forensic Laboratory Analyst",
    "Histotechnician",
    "Histotechnologist",
    "Hematologist",
    "Immunologist",
    "Laboratory Assistant",
    "Laboratory Automation Specialist",
    "Laboratory Data Analyst",
    "Laboratory Director",
    "Laboratory Educator",
    "Laboratory Information Systems Specialist",
    "Laboratory Manager",
    "Laboratory Procurement Specialist",
    "Laboratory Safety Officer",
    "Laboratory Sales Representative",
    "Laboratory Supervisor",
    "Laboratory Technician",
    "LIMS Administrator",
    "Medical Laboratory Scientist (MLS)",
    "Medical Laboratory Technician (MLT)",
    "Medical Technologist (MT)",
    "Method Development Scientist",
    "Microbiologist",
    "Molecular Biologist",
    "Molecular Geneticist",
    "Pathologist",
    "Phlebotomist",
    "Point of Care Coordinator",
    "Product Manager",
    "Quality Assurance Manager",
    "Quality Control Analyst",
    "Regulatory Affairs Specialist",
    "Research Laboratory Technician",
    "Research Scientist",
    "Specimen Processor",
    "Technical Writer",
    "Transfusion Medicine Specialist",
    "Validation Specialist",
    "Veterinary Laboratory Technician",
    "Other",
  ]);

  const [customTitle, setCustomTitle] = useState("");
  const [showCustomTitleInput, setShowCustomTitleInput] = useState(false);

  // Comprehensive keyword database for laboratory professionals
  const [availableKeywords, setAvailableKeywords] = useState([
    // Instruments & Equipment
    "Abbott Architect",
    "Abbott Alinity",
    "Beckman Coulter AU",
    "Beckman Coulter DxH",
    "Roche Cobas",
    "Roche Elecsys",
    "Siemens Atellica",
    "Siemens Dimension",
    "BD FACSCanto",
    "BD FACSLyric",
    "Sysmex XN-Series",
    "Sysmex XE-Series",
    "Hologic Panther",
    "Hologic Aptima",
    "GeneXpert",
    "VITEK 2",
    "VITEK MS",
    "MicroScan",
    "Phoenix",
    "Sensititre",
    "Olympus Microscopy",
    "Leica Biosystems",
    "Thermo Fisher",
    "Bio-Rad",
    "Agilent",
    "Waters HPLC",
    "Shimadzu",
    "PerkinElmer",
    "Bruker",
    "Applied Biosystems",
    "Illumina",
    "Ion Torrent",
    "PacBio",
    "Nanopore",
    "Qiagen",
    "Centrifuge",
    "Incubator",
    "Autoclave",
    "Biosafety Cabinet",
    "Fume Hood",
    "Pipettes",
    "Micropipettes",
    "Automated Pipetting",
    "Liquid Handling",
    "Spectrophotometer",
    "Fluorometer",
    "Luminometer",
    "Plate Reader",
    "PCR Thermal Cycler",
    "Real-time PCR",
    "Digital PCR",
    "Gel Electrophoresis",

    // Testing Methods & Procedures
    "Complete Blood Count",
    "CBC with Differential",
    "Reticulocyte Count",
    "ESR",
    "CRP",
    "Basic Metabolic Panel",
    "Comprehensive Metabolic Panel",
    "Liver Function Tests",
    "Lipid Panel",
    "Thyroid Function",
    "Cardiac Markers",
    "Troponin",
    "BNP",
    "CK-MB",
    "Coagulation Studies",
    "PT/INR",
    "PTT",
    "D-Dimer",
    "Fibrinogen",
    "Urinalysis",
    "Urine Microscopy",
    "Urine Culture",
    "Pregnancy Test",
    "Blood Gas Analysis",
    "Arterial Blood Gas",
    "Venous Blood Gas",
    "Co-oximetry",
    "Hemoglobin A1C",
    "Glucose Testing",
    "Glucose Tolerance Test",
    "Fructosamine",
    "Electrolyte Analysis",
    "Sodium",
    "Potassium",
    "Chloride",
    "CO2",
    "Anion Gap",
    "Protein Analysis",
    "Total Protein",
    "Albumin",
    "Protein Electrophoresis",
    "Enzyme Analysis",
    "ALT",
    "AST",
    "ALP",
    "GGT",
    "LDH",
    "Amylase",
    "Lipase",
    "Immunoassays",
    "ELISA",
    "CLIA",
    "ECLIA",
    "FPIA",
    "Turbidimetry",
    "Nephelometry",
    "Flow Cytometry",
    "Cell Counting",
    "Immunophenotyping",
    "CD Markers",

    // Microbiology
    "Blood Cultures",
    "Urine Cultures",
    "Wound Cultures",
    "Respiratory Cultures",
    "Stool Cultures",
    "CSF Analysis",
    "Body Fluid Analysis",
    "Sterility Testing",
    "Gram Staining",
    "Acid-Fast Staining",
    "Methylene Blue",
    "Congo Red",
    "Antibiotic Susceptibility",
    "AST",
    "MIC Testing",
    "E-test",
    "Disk Diffusion",
    "MRSA Testing",
    "VRE Testing",
    "ESBL Testing",
    "Carbapenemase Testing",
    "C. diff Testing",
    "Strep Testing",
    "Group B Strep",
    "Pneumococcal Antigen",
    "Legionella Antigen",
    "Influenza Testing",
    "RSV Testing",
    "COVID-19 Testing",
    "Bacterial Identification",
    "Yeast Identification",
    "Mold Identification",
    "Parasitology",
    "Ova and Parasites",
    "Malaria Testing",
    "Cryptosporidium",
    "Anaerobic Culture",
    "Mycobacterial Culture",
    "Fungal Culture",

    // Molecular Diagnostics
    "PCR",
    "RT-PCR",
    "qPCR",
    "Real-time PCR",
    "Multiplex PCR",
    "Nested PCR",
    "DNA Sequencing",
    "RNA Analysis",
    "Genotyping",
    "SNP Analysis",
    "Viral Load Testing",
    "HIV Viral Load",
    "HCV Viral Load",
    "HBV Viral Load",
    "Mutation Analysis",
    "FISH",
    "Microarray Analysis",
    "Next Generation Sequencing",
    "Pharmacogenomics",
    "Oncology Testing",
    "Liquid Biopsy",
    "ctDNA",
    "Infectious Disease Testing",
    "Respiratory Panel",
    "GI Panel",
    "Meningitis Panel",
    "STD Testing",
    "HPV Testing",
    "Chlamydia/Gonorrhea",
    "Herpes Testing",
    "Genetic Testing",
    "Hereditary Cancer",
    "Carrier Screening",
    "Prenatal Testing",
    "HLA Typing",
    "Chimerism Testing",
    "Transplant Monitoring",

    // Hematology
    "Manual Differential",
    "Automated Differential",
    "Blood Smear Review",
    "Bone Marrow Analysis",
    "Bone Marrow Biopsy",
    "Aspirate Examination",
    "Hemoglobin Electrophoresis",
    "Hemoglobin Variants",
    "Thalassemia Testing",
    "Sickle Cell Testing",
    "G6PD Testing",
    "Osmotic Fragility",
    "Iron Studies",
    "Ferritin",
    "TIBC",
    "Transferrin Saturation",
    "B12",
    "Folate",
    "Methylmalonic Acid",
    "Homocysteine",
    "Coagulation Factor Assays",
    "Factor VIII",
    "Factor IX",
    "von Willebrand",
    "Platelet Function Testing",
    "Platelet Aggregation",
    "PFA-100",
    "Thromboelastography",
    "TEG",
    "ROTEM",

    // Chemistry & Immunology
    "Spectrophotometry",
    "Ion-Selective Electrodes",
    "Potentiometry",
    "Chromatography",
    "HPLC",
    "LC-MS/MS",
    "GC-MS",
    "Mass Spectrometry",
    "Chemiluminescence",
    "Fluorescence Polarization",
    "Time-Resolved Fluorescence",
    "Hormone Testing",
    "Testosterone",
    "Estrogen",
    "Progesterone",
    "Cortisol",
    "Insulin",
    "C-Peptide",
    "Growth Hormone",
    "IGF-1",
    "Prolactin",
    "Tumor Markers",
    "PSA",
    "CEA",
    "AFP",
    "CA 19-9",
    "CA 125",
    "CA 15-3",
    "Therapeutic Drug Monitoring",
    "TDM",
    "Digoxin",
    "Phenytoin",
    "Vancomycin",
    "Toxicology",
    "Drug Screen",
    "Alcohol Testing",
    "Heavy Metals",
    "Carbon Monoxide",
    "Allergy Testing",
    "IgE Testing",
    "RAST",
    "ImmunoCAP",
    "Food Allergies",
    "Autoimmune Testing",
    "ANA",
    "Anti-dsDNA",
    "Rheumatoid Factor",
    "Anti-CCP",
    "Complement",
    "C3",
    "C4",
    "CH50",
    "Immunoglobulins",
    "IgG",
    "IgA",
    "IgM",

    // Histology & Cytology
    "Tissue Processing",
    "Embedding",
    "Sectioning",
    "Microtomy",
    "H&E Staining",
    "Special Stains",
    "Immunohistochemistry",
    "IHC",
    "In Situ Hybridization",
    "ISH",
    "Frozen Sections",
    "Rapid Diagnosis",
    "Cytology Screening",
    "Pap Smear",
    "Liquid-Based Cytology",
    "ThinPrep",
    "Fine Needle Aspiration",
    "FNA",
    "Body Fluid Cytology",
    "Immunocytochemistry",
    "Cell Block Preparation",

    // Quality Control & Compliance
    "Quality Assurance",
    "Quality Control",
    "QA/QC",
    "Proficiency Testing",
    "Method Validation",
    "Verification",
    "Linearity",
    "Precision",
    "Accuracy",
    "Reference Range",
    "Critical Values",
    "Delta Checks",
    "Panic Values",
    "Calibration",
    "Maintenance",
    "Troubleshooting",
    "Documentation",
    "CLIA Compliance",
    "CLIA Waived",
    "CLIA Moderate",
    "CLIA High Complexity",
    "CAP Accreditation",
    "CAP Inspection",
    "ISO 15189",
    "ISO 9001",
    "Laboratory Safety",
    "Infection Control",
    "Biosafety",
    "Chemical Safety",
    "Waste Management",
    "Hazardous Materials",
    "OSHA Compliance",
    "Risk Management",
    "Incident Reporting",
    "Root Cause Analysis",
    "Competency Assessment",
    "Training",
    "Continuing Education",

    // Laboratory Information Systems
    "LIMS",
    "Laboratory Information Systems",
    "LIS",
    "Electronic Health Records",
    "Epic",
    "Cerner",
    "Meditech",
    "Allscripts",
    "NextGen",
    "Sunquest",
    "SoftLab",
    "Orchard",
    "MEDITECH",
    "McKesson",
    "Data Analysis",
    "Report Generation",
    "Interface Management",
    "HL7",
    "Middleware",
    "Instrument Interfacing",
    "Barcode Scanning",
    "Result Verification",
    "Critical Result Notification",
    "Auto-verification",
    "Data Mining",
    "Analytics",
    "Dashboard Creation",
    "KPI Monitoring",

    // Specialties & Departments
    "Clinical Chemistry",
    "Hematology",
    "Microbiology",
    "Immunology",
    "Molecular Diagnostics",
    "Pathology",
    "Toxicology",
    "Blood Bank",
    "Transfusion Medicine",
    "Cytology",
    "Histology",
    "Genetics",
    "Endocrinology",
    "Oncology",
    "Infectious Disease",
    "Cardiology",
    "Nephrology",
    "Hepatology",
    "Reproductive Health",
    "Pediatrics",
    "Geriatrics",
    "Emergency Medicine",
    "Critical Care",
    "Surgery",
    "Point of Care Testing",
    "POCT",
    "Bedside Testing",
    "Rapid Testing",
    "Reference Laboratory",
    "Send-out Testing",
    "Esoteric Testing",

    // Management & Leadership
    "Laboratory Management",
    "Team Leadership",
    "Staff Supervision",
    "Budget Management",
    "Cost Control",
    "Inventory Management",
    "Vendor Relations",
    "Contract Negotiation",
    "Strategic Planning",
    "Process Improvement",
    "Lean Six Sigma",
    "Workflow Optimization",
    "Change Management",
    "Project Management",
    "Implementation",
    "Staff Development",
    "Performance Management",
    "Recruitment",
    "Policy Development",
    "Procedure Writing",
    "SOP Creation",

    // Research & Development
    "Research Design",
    "Clinical Trials",
    "Protocol Development",
    "Data Collection",
    "Statistical Analysis",
    "Publication",
    "Grant Writing",
    "IRB Approval",
    "Regulatory Submission",
    "Method Development",
    "Assay Development",
    "Validation Studies",
    "Biomarker Discovery",
    "Translational Research",
    "Bench to Bedside",

    // Education & Training
    "Clinical Training",
    "Student Supervision",
    "Internship Programs",
    "Continuing Education",
    "Professional Development",
    "Certification",
    "Competency Training",
    "Skills Assessment",
    "Knowledge Transfer",
    "Presentation Skills",
    "Teaching",
    "Mentoring",
    "Coaching",
  ]);

  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [customKeyword, setCustomKeyword] = useState("");
  const [keywordSearch, setKeywordSearch] = useState("");

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "",
    email: "",
    title: "",
    company: "",
    certifications: "",
    yearsExperience: "",
    education: "",
    specializations: [] as string[],
    currentSalary: "",
    desiredSalary: "",
    location: "",
    willingToRelocate: false,
    availabilityDate: "",
    workPreference: "",
    shiftPreference: [] as string[],
    skills: [] as string[],
    achievements: [""],
    professionalSummary: "",
    linkedinProfile: "",
    references: [""],
    keywords: [] as string[],
    resumeFile: null as File | null,

    // Additional professional fields
    languagesSpoken: [] as string[],
    publications: [""],
    presentations: [""],
    professionalMemberships: [""],
    volunteerExperience: [""],
    awards: [""],
    continuingEducation: [""],
  } as UserProfile);

  // Professional form data
  const [zprofessionalData, setProfessionalData] = useState({
    // Basic info from registration
    name: userData?.name || "",
    email: userData?.email || "",

    // Professional details
    title: "",
    company: "",
    certifications: "",
    yearsExperience: "",
    education: "",
    specializations: [] as string[],
    currentSalary: "",
    desiredSalary: "",
    location: "",
    willingToRelocate: false,
    availabilityDate: "",
    workPreference: "",
    shiftPreference: [] as string[],
    skills: [] as string[],
    achievements: [""],
    professionalSummary: "",
    linkedinProfile: "",
    references: [""],
    keywords: [] as string[],
    resumeFile: null as File | null,

    // Additional professional fields
    languagesSpoken: [] as string[],
    publications: [""],
    presentations: [""],
    professionalMemberships: [""],
    volunteerExperience: [""],
    awards: [""],
    continuingEducation: [""],
    technicalSkills: [] as string[],
    softSkills: [] as string[],
    careerObjectives: "",
    preferredWorkEnvironment: [] as string[],
    travelWillingness: "",
    securityClearance: "",
    professionalGoals: "",
  });

  const workPreferences = [
    "Full-time",
    "Part-time",
    "Contract",
    "Temporary",
    "Per Diem",
    "Remote",
    "Hybrid",
    "Travel Position",
    "Locum Tenens",
  ];

  const shiftOptions = [
    "Day Shift (7AM-3PM)",
    "Evening Shift (3PM-11PM)",
    "Night Shift (11PM-7AM)",
    "Rotating Shifts",
    "Weekend Only",
    "On-Call",
    "Flexible Hours",
    "12-Hour Shifts",
    "10-Hour Shifts",
  ];

  const specializationOptions = [
    "Automation",
    "Blood Bank",
    "Clinical Chemistry",
    "Cytology",
    "Education & Training",
    "Genetics",
    "Hematology",
    "Histology",
    "Immunology",
    "Information Systems",
    "Laboratory Management",
    "Microbiology",
    "Molecular Diagnostics",
    "Pathology",
    "Point of Care Testing",
    "Quality Assurance",
    "Regulatory Affairs",
    "Research & Development",
    "Toxicology",
  ];

  const languageOptions = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Chinese (Mandarin)",
    "Chinese (Cantonese)",
    "Japanese",
    "Korean",
    "Arabic",
    "Russian",
    "Hindi",
    "Other",
  ];

  const workEnvironmentOptions = [
    "Academic Medical Center",
    "Biotechnology Company",
    "Clinic Laboratory",
    "Forensic Laboratory",
    "Government Laboratory",
    "Hospital Laboratory",
    "Pharmaceutical Company",
    "Private Practice",
    "Public Health Laboratory",
    "Reference Laboratory",
    "Research Laboratory",
    "Veterinary Laboratory",
  ];

  const plans = [
    {
      id: "professional",
      name: "Professional",
      price: "$10",
      period: "/month",
      description: "Complete career advancement platform with premium features",
      color: "purple",
      gradient: "from-purple-50 to-purple-100",
      borderColor: "border-purple-300",
      buttonStyle: "bg-purple-600 hover:bg-purple-700 text-white",
      popular: false,
      features: [
        { name: "Basic profile with photo", included: true, icon: User },
        {
          name: "Professional title and location",
          included: true,
          icon: MapPin,
        },
        {
          name: "Basic skills and certifications",
          included: true,
          icon: Award,
        },
        { name: "Contact information display", included: true, icon: Phone },
        { name: "Job application tracking", included: true, icon: FileText },
        { name: "Basic search visibility", included: true, icon: Search },
        { name: "Up to 25 keywords", included: true, icon: Tag },
        { name: "Resume upload and storage", included: true, icon: FileText },
        {
          name: "Advanced keyword optimization (100 keywords)",
          included: true,
          icon: Target,
        },
        {
          name: "Enhanced profile with portfolio",
          included: true,
          icon: Image,
        },
        {
          name: "Direct messaging from employers",
          included: true,
          icon: MessageSquare,
        },
        {
          name: "Salary insights for your area",
          included: true,
          icon: DollarSign,
        },
        { name: "Job alerts and notifications", included: true, icon: Zap },
        { name: "Application status tracking", included: true, icon: FileText },
        { name: "Professional networking tools", included: true, icon: Users },
        {
          name: "Automatic keyword extraction from resume",
          included: true,
          icon: Sparkles,
        },
        {
          name: "Priority in search results",
          included: true,
          icon: TrendingUp,
        },
        { name: "Career coaching resources", included: true, icon: Users },
        { name: "Interview scheduling tools", included: true, icon: Calendar },
        { name: "Premium support", included: true, icon: Shield },
        { name: "Exclusive job opportunities", included: true, icon: Crown },
        { name: "Personal career consultant", included: true, icon: Sparkles },
        {
          name: "Salary negotiation assistance",
          included: true,
          icon: DollarSign,
        },
        {
          name: "Professional development courses",
          included: true,
          icon: Award,
        },
        {
          name: "Advanced analytics dashboard",
          included: true,
          icon: TrendingUp,
        },
        {
          name: "White-glove profile optimization",
          included: true,
          icon: Star,
        },
      ],
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setCurrentPlan(planId);
    setShowProfileForm(true);
  };

  const handleShowExample = (planId: string) => {
    setShowExample(planId);
  };

  const closeExample = () => {
    setShowExample(null);
  };

  const handleInputChange = (field: string, value: any) => {
    setUserProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayInputChange = (
    field: string,
    index: number,
    value: string
  ) => {
    setUserProfile((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).map(
        (item: string, i: number) => (i === index ? value : item)
      ),
    }));
  };

  const addArrayItem = (field: string) => {
    setUserProfile((prev) => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as string[]), ""],
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setUserProfile((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter(
        (_: any, i: number) => i !== index
      ),
    }));
  };

  const handleCheckboxChange = (
    field: string,
    value: string,
    checked: boolean
  ) => {
    setUserProfile((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(
            (item: string) => item !== value
          ),
    }));
  };

  const handleTitleChange = (selectedTitle: string) => {
    if (selectedTitle === "Other") {
      setShowCustomTitleInput(true);
      setUserProfile((prev) => ({ ...prev, title: "" }));
    } else {
      setShowCustomTitleInput(false);
      setCustomTitle("");
      setUserProfile((prev) => ({ ...prev, title: selectedTitle }));
    }
  };

  const handleCustomTitleSubmit = () => {
    if (
      customTitle.trim() &&
      !professionalTitles.includes(customTitle.trim())
    ) {
      const newTitles = [...professionalTitles];
      newTitles.splice(-1, 0, customTitle.trim());
      setProfessionalTitles(newTitles);
      setUserProfile((prev) => ({ ...prev, title: customTitle.trim() }));
      setShowCustomTitleInput(false);
      setCustomTitle("");
    }
  };

  // Resume upload and keyword extraction
  const handleResumeUpload = (file: File) => {
    setUserProfile((prev) => ({ ...prev, resumeFile: file }));

    // Simulate keyword extraction from resume
    // In a real application, you would use a service to parse the resume
    const extractedKeywords = [
      "Clinical Chemistry",
      "Quality Control",
      "LIMS",
      "Abbott Architect",
      "Method Validation",
      "Troubleshooting",
      "CLIA Compliance",
      "Hematology",
      "CBC with Differential",
      "Coagulation Studies",
      "Blood Gas Analysis",
      "Spectrophotometry",
      "Immunoassays",
      "ELISA",
      "Team Leadership",
      "Staff Training",
      "SOP Creation",
      "Proficiency Testing",
    ];

    // Add extracted keywords to available keywords if they don't exist
    const newKeywords = extractedKeywords.filter(
      (keyword) => !availableKeywords.includes(keyword)
    );

    if (newKeywords.length > 0) {
      setAvailableKeywords((prev) => [...prev, ...newKeywords]);
    }

    // Auto-select extracted keywords (respecting plan limits)
    const maxKeywords = getMaxKeywords();
    const currentKeywordCount = selectedKeywords.length;
    const availableSlots = maxKeywords - currentKeywordCount;

    if (availableSlots > 0) {
      const keywordsToAdd = extractedKeywords
        .filter((keyword) => !selectedKeywords.includes(keyword))
        .slice(0, availableSlots);

      const updatedSelectedKeywords = [...selectedKeywords, ...keywordsToAdd];
      setSelectedKeywords(updatedSelectedKeywords);
      setUserProfile((prev) => ({
        ...prev,
        keywords: updatedSelectedKeywords,
      }));
    }
  };

  // Get maximum keywords based on plan
  const getMaxKeywords = () => {
    switch (currentPlan) {
      case "basic":
        return 25;
      case "professional":
        return 100;
      case "premium":
        return 100;
      default:
        return 25;
    }
  };

  // Keyword management
  const addKeyword = (keyword: string) => {
    const maxKeywords = getMaxKeywords();
    if (
      selectedKeywords.length < maxKeywords &&
      !selectedKeywords.includes(keyword)
    ) {
      const updatedKeywords = [...selectedKeywords, keyword];
      setSelectedKeywords(updatedKeywords);
      setUserProfile((prev) => ({ ...prev, keywords: updatedKeywords }));
    }
  };

  const removeKeyword = (keyword: string) => {
    const updatedKeywords = selectedKeywords.filter((k) => k !== keyword);
    setSelectedKeywords(updatedKeywords);
    setUserProfile((prev) => ({ ...prev, keywords: updatedKeywords }));
  };

  const addCustomKeyword = () => {
    if (customKeyword.trim()) {
      const keyword = customKeyword.trim();
      const maxKeywords = getMaxKeywords();

      // Add to available keywords if it doesn't exist
      if (!availableKeywords.includes(keyword)) {
        setAvailableKeywords((prev) => [...prev, keyword]);
      }

      // Add to selected keywords if under limit
      if (
        selectedKeywords.length < maxKeywords &&
        !selectedKeywords.includes(keyword)
      ) {
        const updatedKeywords = [...selectedKeywords, keyword];
        setSelectedKeywords(updatedKeywords);
        setUserProfile((prev) => ({ ...prev, keywords: updatedKeywords }));
      }

      setCustomKeyword("");
    }
  };

  const filteredKeywords = availableKeywords.filter(
    (keyword) =>
      keyword.toLowerCase().includes(keywordSearch.toLowerCase()) &&
      !selectedKeywords.includes(keyword)
  );

  const handleSubmitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Professional profile submitted:", {
      plan: currentPlan,
      ...userProfile,
    });
    createProfile(userProfile).then((data) => console.log(data));
    // Here you would integrate with your payment system and backend
    navigate("/dashboard", {
      state: {
        plan: currentPlan,
        userData: { ...userData, ...userProfile, role: "professional" },
      },
    });
  };

  const renderArrayInput = (
    field: string,
    label: string,
    placeholder: string,
    values: string[]
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {values.map((value, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            value={value}
            onChange={(e) =>
              handleArrayInputChange(field, index, e.target.value)
            }
            placeholder={placeholder}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {values.length > 1 && (
            <button
              type="button"
              onClick={() => removeArrayItem(field, index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => addArrayItem(field)}
        className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add {label.slice(0, -1)}
      </button>
    </div>
  );

  const renderExample = (planId: string) => {
    const examples = {
      basic: {
        name: "Sarah Johnson",
        title: "Medical Laboratory Technician",
        location: "Orange County, CA",
        experience: "5 years",
        certifications: ["MLT (ASCP)", "Phlebotomy Certified"],
        skills: ["Hematology", "Clinical Chemistry", "Quality Control"],
        keywords: [
          "CBC",
          "Urinalysis",
          "Phlebotomy",
          "Quality Control",
          "CLIA",
        ],
        hasResume: false,
        hasPortfolio: false,
        hasMessaging: false,
        hasSalaryInsights: false,
        hasJobAlerts: false,
        searchPriority: "Standard",
        profileViews: "12 this month",
        applications: "3 pending",
        salaryRange: "$40,000 - $50,000",
        keywordLimit: "25 keywords max",
        hasCoaching: true,
        hasConsultant: true,
      },
      professional: {
        name: "Michael Chen",
        title: "Clinical Laboratory Scientist",
        location: "Los Angeles County, CA",
        experience: "8 years",
        certifications: [
          "CLS (ASCP)",
          "Molecular Biology Certified",
          "Quality Management",
        ],
        skills: [
          "Molecular Diagnostics",
          "PCR",
          "LIMS",
          "Method Validation",
          "Team Leadership",
        ],
        keywords: [
          "PCR",
          "qPCR",
          "DNA Sequencing",
          "LIMS",
          "Abbott Architect",
          "Quality Control",
          "Method Validation",
          "CLIA Compliance",
        ],
        hasResume: true,
        hasPortfolio: true,
        hasMessaging: true,
        hasSalaryInsights: true,
        hasJobAlerts: true,
        searchPriority: "Enhanced",
        profileViews: "47 this month",
        applications: "8 pending",
        salaryRange: "$65,000 - $78,000",
        jobAlerts: "5 new matches this week",
        hasCoaching: false,
        hasConsultant: false,
        keywordLimit: "100 keywords max",
      },
      premium: {
        name: "Dr. Amanda Rodriguez",
        title: "Laboratory Director",
        location: "San Diego County, CA",
        experience: "15 years",
        certifications: [
          "PhD Clinical Chemistry",
          "Laboratory Director License",
          "CAP Inspector",
          "Lean Six Sigma Black Belt",
        ],
        skills: [
          "Laboratory Management",
          "Regulatory Compliance",
          "Budget Management",
          "Staff Development",
          "Strategic Planning",
          "Automation Implementation",
        ],
        keywords: [
          "Laboratory Management",
          "CAP Accreditation",
          "CLIA Compliance",
          "Budget Management",
          "Staff Development",
          "Lean Six Sigma",
          "Strategic Planning",
          "Automation",
        ],
        hasResume: true,
        hasPortfolio: true,
        hasMessaging: true,
        hasSalaryInsights: true,
        hasJobAlerts: true,
        searchPriority: "Premium Priority",
        profileViews: "89 this month",
        applications: "12 pending",
        salaryRange: "$95,000 - $125,000",
        jobAlerts: "8 exclusive opportunities",
        hasCoaching: true,
        hasConsultant: true,
        keywordLimit: "100 keywords max",
      },
    };

    const example = examples[planId as keyof typeof examples];
    if (!example) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {planId.charAt(0).toUpperCase() + planId.slice(1)} Plan Example
              </h2>
              <button
                onClick={closeExample}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Professional Profile Example */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl overflow-hidden shadow-lg">
              {/* Profile Header */}
              <div className="relative h-32 bg-gradient-to-r from-blue-600 to-indigo-600">
                <div className="absolute -bottom-12 left-6">
                  <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="pt-16 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {example.name}
                    </h3>
                    <p className="text-lg text-blue-600 font-medium mb-2">
                      {example.title}
                    </p>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{example.location}</span>
                      <span className="mx-2">•</span>
                      <span>{example.experience} experience</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                      {example.searchPriority}
                    </div>
                    <p className="text-sm text-gray-600">
                      {example.profileViews}
                    </p>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {example.applications}
                    </div>
                    <div className="text-sm text-gray-600">Applications</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {example.profileViews.split(" ")[0]}
                    </div>
                    <div className="text-sm text-gray-600">Profile Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {/* {example.jobAlerts
                        ? example.jobAlerts.split(" ")[0]
                        : "0"} */}
                    </div>
                    <div className="text-sm text-gray-600">Job Matches</div>
                  </div>
                </div>

                {/* Keywords Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">
                      Professional Keywords:
                    </h4>
                    <span className="text-sm text-gray-500">
                      {example.keywordLimit}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {example.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                    {example.keywords.length < 8 && (
                      <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm">
                        +{planId === "basic" ? "20" : "92"} more keywords
                      </span>
                    )}
                  </div>
                </div>

                {/* Skills & Certifications */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Skills & Expertise:
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {example.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-3">
                    Certifications:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {example.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Premium Features Display */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {example.hasResume && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center text-blue-700">
                        <FileText className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">
                          Resume Available
                        </span>
                      </div>
                    </div>
                  )}

                  {example.hasPortfolio && (
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="flex items-center text-purple-700">
                        <Image className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">
                          Portfolio Showcase
                        </span>
                      </div>
                    </div>
                  )}

                  {example.hasSalaryInsights && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center text-green-700">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">
                          Salary: {example.salaryRange}
                        </span>
                      </div>
                    </div>
                  )}

                  {example.hasJobAlerts && (
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <div className="flex items-center text-yellow-700">
                        <Zap className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">
                          {/* {example.jobAlerts} */}
                        </span>
                      </div>
                    </div>
                  )}

                  {example.hasCoaching && (
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <div className="flex items-center text-indigo-700">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">
                          Career Coaching
                        </span>
                      </div>
                    </div>
                  )}

                  {example.hasConsultant && (
                    <div className="bg-pink-50 p-3 rounded-lg">
                      <div className="flex items-center text-pink-700">
                        <Crown className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">
                          Personal Consultant
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    View Full Profile
                  </button>

                  {example.hasMessaging ? (
                    <button className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </button>
                  ) : (
                    <button className="flex-1 bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-medium cursor-not-allowed">
                      Messaging (Unavailable)
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-gray-600 mb-4">
                This is how your professional profile would appear with the{" "}
                {planId} plan.
              </p>
              <button
                onClick={closeExample}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Close Example
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Get all unique features across all plans in the order they should appear
  const getAllFeatures = () => {
    const featureOrder = [
      "Basic profile with photo",
      "Professional title and location",
      "Basic skills and certifications",
      "Contact information display",
      "Job application tracking",
      "Basic search visibility",
      "Up to 25 keywords",
      "Resume upload and storage",
      "Advanced keyword optimization (100 keywords)",
      "Enhanced profile with portfolio",
      "Direct messaging from employers",
      "Salary insights for your area",
      "Job alerts and notifications",
      "Application status tracking",
      "Professional networking tools",
      "Automatic keyword extraction from resume",
      "Priority in search results",
      "Career coaching resources",
      "Interview scheduling tools",
      "Premium support",
      "Exclusive job opportunities",
      "Personal career consultant",
      "Salary negotiation assistance",
      "Professional development courses",
      "Advanced analytics dashboard",
      "White-glove profile optimization",
    ];

    return featureOrder;
  };

  if (showProfileForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Complete Your Professional Profile
              </h1>
              <p className="text-lg text-gray-600">
                Selected Plan:{" "}
                <span className="font-semibold text-blue-600">
                  {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handleSubmitProfile} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Professional Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Title *
                  </label>
                  <select
                    required
                    value={showCustomTitleInput ? "Other" : userProfile.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your title</option>
                    {professionalTitles.map((title) => (
                      <option key={title} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>

                  {showCustomTitleInput && (
                    <div className="mt-2 flex gap-2">
                      <input
                        type="text"
                        value={customTitle}
                        onChange={(e) => setCustomTitle(e.target.value)}
                        placeholder="Enter your professional title"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={handleCustomTitleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Company
                  </label>
                  <input
                    type="text"
                    value={userProfile.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience *
                  </label>
                  <select
                    required
                    value={userProfile.yearsExperience}
                    onChange={(e) =>
                      handleInputChange("yearsExperience", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select experience level</option>
                    <option value="0-1">0-1 years (Entry Level)</option>
                    <option value="2-5">2-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="11-15">11-15 years</option>
                    <option value="16-20">16-20 years</option>
                    <option value="20+">20+ years (Senior Level)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location (City, State) *
                  </label>
                  <input
                    type="text"
                    required
                    value={userProfile.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    placeholder="e.g., Orange County, CA"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education *
                  </label>
                  <select
                    required
                    value={userProfile.education}
                    onChange={(e) =>
                      handleInputChange("education", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select education level</option>
                    <option value="high-school">High School Diploma</option>
                    <option value="associate">Associate Degree</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="doctorate">Doctorate/PhD</option>
                    <option value="certificate">
                      Professional Certificate
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certifications
                  </label>
                  <input
                    type="text"
                    value={userProfile.certifications}
                    onChange={(e) =>
                      handleInputChange("certifications", e.target.value)
                    }
                    placeholder="e.g., CLS, MLS, MT (ASCP), MLT"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Separate multiple certifications with commas
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Summary *
                </label>
                <textarea
                  required
                  value={userProfile.professionalSummary}
                  onChange={(e) =>
                    handleInputChange("professionalSummary", e.target.value)
                  }
                  placeholder="Brief summary of your professional background, key skills, and career objectives..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specializations (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {specializationOptions.map((spec) => (
                    <label key={spec} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={
                          userProfile.specializations?.includes(spec) || false
                        }
                        onChange={(e) =>
                          handleCheckboxChange(
                            "specializations",
                            spec,
                            e.target.checked
                          )
                        }
                        className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{spec}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Resume Upload - only for paid plans */}
            {currentPlan !== "basic" && (
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Resume Upload
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}{" "}
                    Feature
                  </span>
                </h3>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleResumeUpload(file);
                    }}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {userProfile.resumeFile
                        ? `Uploaded: ${userProfile.resumeFile.name}`
                        : "Click to upload your resume (PDF, DOC, DOCX)"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      We'll automatically extract keywords from your resume to
                      enhance your profile
                    </p>
                  </label>
                </div>
              </div>
            )}

            {/* Keywords Section */}
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-2" />
                Professional Keywords ({selectedKeywords.length}/
                {getMaxKeywords()})
                {currentPlan !== "basic" && (
                  <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {getMaxKeywords()} Keywords Available
                  </span>
                )}
              </h3>

              <p className="text-sm text-gray-600 mb-4">
                Add keywords that describe your experience, skills, instruments,
                testing methods, and expertise. These help employers find you in
                searches. Include specific instruments, test types, software,
                and procedures you've worked with.
              </p>

              {/* Selected Keywords */}
              {selectedKeywords.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Selected Keywords:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedKeywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {keyword}
                        <button
                          type="button"
                          onClick={() => removeKeyword(keyword)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Custom Keyword */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customKeyword}
                    onChange={(e) => setCustomKeyword(e.target.value)}
                    placeholder="Add a custom keyword (e.g., Abbott Architect, PCR, LIMS, Quality Control)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addCustomKeyword())
                    }
                  />
                  <button
                    type="button"
                    onClick={addCustomKeyword}
                    disabled={selectedKeywords.length >= getMaxKeywords()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Search and Select Keywords */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={keywordSearch}
                    onChange={(e) => setKeywordSearch(e.target.value)}
                    placeholder="Search available keywords..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Available Keywords */}
              <div className="max-h-60 overflow-y-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {filteredKeywords.slice(0, 50).map((keyword) => (
                    <button
                      key={keyword}
                      type="button"
                      onClick={() => addKeyword(keyword)}
                      disabled={selectedKeywords.length >= getMaxKeywords()}
                      className="text-left px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors disabled:opacity-50"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>

              {selectedKeywords.length >= getMaxKeywords() && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    You've reached the maximum number of keywords for your plan.
                    {currentPlan === "basic" &&
                      " Upgrade to Professional or Premium for up to 100 keywords."}
                  </p>
                </div>
              )}
            </div>

            {/* Work Preferences */}
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Work Preferences
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Preference *
                  </label>
                  <select
                    required
                    value={userProfile.workPreference}
                    onChange={(e) =>
                      handleInputChange("workPreference", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select work preference</option>
                    {workPreferences.map((pref) => (
                      <option key={pref} value={pref}>
                        {pref}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability Date
                  </label>
                  <input
                    type="date"
                    value={userProfile.availabilityDate}
                    onChange={(e) =>
                      handleInputChange("availabilityDate", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Salary Range
                  </label>
                  <select
                    value={userProfile.currentSalary}
                    onChange={(e) =>
                      handleInputChange("currentSalary", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select current salary range</option>
                    <option value="30000-40000">$30,000 - $40,000</option>
                    <option value="40000-50000">$40,000 - $50,000</option>
                    <option value="50000-60000">$50,000 - $60,000</option>
                    <option value="60000-70000">$60,000 - $70,000</option>
                    <option value="70000-80000">$70,000 - $80,000</option>
                    <option value="80000-90000">$80,000 - $90,000</option>
                    <option value="90000-100000">$90,000 - $100,000</option>
                    <option value="100000+">$100,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Salary Range
                  </label>
                  <select
                    value={userProfile.desiredSalary}
                    onChange={(e) =>
                      handleInputChange("desiredSalary", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select desired salary range</option>
                    <option value="30000-40000">$30,000 - $40,000</option>
                    <option value="40000-50000">$40,000 - $50,000</option>
                    <option value="50000-60000">$50,000 - $60,000</option>
                    <option value="60000-70000">$60,000 - $70,000</option>
                    <option value="70000-80000">$70,000 - $80,000</option>
                    <option value="80000-90000">$80,000 - $90,000</option>
                    <option value="90000-100000">$90,000 - $100,000</option>
                    <option value="100000+">$100,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Willingness
                  </label>
                  <select
                    value={userProfile.travelWillingness}
                    onChange={(e) =>
                      handleInputChange("travelWillingness", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select travel preference</option>
                    <option value="none">No travel</option>
                    <option value="minimal">Minimal travel (0-10%)</option>
                    <option value="moderate">Moderate travel (10-25%)</option>
                    <option value="frequent">Frequent travel (25-50%)</option>
                    <option value="extensive">Extensive travel (50%+)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Security Clearance
                  </label>
                  <select
                    value={userProfile.securityClearance}
                    onChange={(e) =>
                      handleInputChange("securityClearance", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select clearance level</option>
                    <option value="none">No clearance</option>
                    <option value="public-trust">Public Trust</option>
                    <option value="confidential">Confidential</option>
                    <option value="secret">Secret</option>
                    <option value="top-secret">Top Secret</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={userProfile.willingToRelocate}
                    onChange={(e) =>
                      handleInputChange("willingToRelocate", e.target.checked)
                    }
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Willing to relocate for the right opportunity
                  </span>
                </label>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shift Preferences (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {shiftOptions.map((shift) => (
                    <label key={shift} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={
                          userProfile.shiftPreference?.includes(shift) || false
                        }
                        onChange={(e) =>
                          handleCheckboxChange(
                            "shiftPreference",
                            shift,
                            e.target.checked
                          )
                        }
                        className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{shift}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Work Environment (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {workEnvironmentOptions.map((env) => (
                    <label key={env} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={
                          userProfile.preferredWorkEnvironment?.includes(env) ||
                          false
                        }
                        onChange={(e) =>
                          handleCheckboxChange(
                            "preferredWorkEnvironment",
                            env,
                            e.target.checked
                          )
                        }
                        className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{env}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Professional Information */}
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Additional Professional Information
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Languages Spoken (Select all that apply)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {languageOptions.map((lang) => (
                      <label key={lang} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={
                            userProfile.languagesSpoken?.includes(lang) || false
                          }
                          onChange={(e) =>
                            handleCheckboxChange(
                              "languagesSpoken",
                              lang,
                              e.target.checked
                            )
                          }
                          className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{lang}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Career Objectives
                  </label>
                  <textarea
                    value={userProfile.careerObjectives}
                    onChange={(e) =>
                      handleInputChange("careerObjectives", e.target.value)
                    }
                    placeholder="Describe your short-term and long-term career goals..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Goals
                  </label>
                  <textarea
                    value={userProfile.professionalGoals}
                    onChange={(e) =>
                      handleInputChange("professionalGoals", e.target.value)
                    }
                    placeholder="What are you looking to achieve in your next role?"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {renderArrayInput(
                  "achievements",
                  "Key Achievements",
                  "e.g., Implemented new QC procedures that reduced errors by 25%",
                  userProfile.achievements
                )}
                {renderArrayInput(
                  "awards",
                  "Awards & Recognition",
                  "e.g., Employee of the Year 2023, Quality Excellence Award",
                  userProfile.awards
                )}
                {renderArrayInput(
                  "publications",
                  "Publications",
                  'e.g., "Improving Laboratory Efficiency" - Journal of Clinical Laboratory Science',
                  userProfile.publications
                )}
                {renderArrayInput(
                  "presentations",
                  "Presentations & Conferences",
                  'e.g., AACC Annual Meeting 2023 - "Automation in Clinical Chemistry"',
                  userProfile.presentations
                )}
                {renderArrayInput(
                  "professionalMemberships",
                  "Professional Memberships",
                  "e.g., ASCLS, AACC, CAP",
                  userProfile.professionalMemberships
                )}
                {renderArrayInput(
                  "continuingEducation",
                  "Continuing Education",
                  "e.g., Advanced Molecular Diagnostics Course 2023",
                  userProfile.continuingEducation
                )}
                {renderArrayInput(
                  "volunteerExperience",
                  "Volunteer Experience",
                  "e.g., Free Health Clinic Laboratory Services",
                  userProfile.volunteerExperience
                )}
              </div>
            </div>

            {/* References */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Professional References
              </h3>

              {renderArrayInput(
                "references",
                "Professional References",
                "Name, Title, Company, Phone/Email",
                userProfile.references
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => setShowProfileForm(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back to Plans
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Complete Registration & Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Professional Subscription Plans
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Advance your laboratory career with our professional networking
              and job search platform. Connect with employers, showcase your
              expertise, and find your next opportunity.
            </p>

            {userData && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg inline-block">
                <p className="text-blue-800">
                  Welcome,{" "}
                  <span className="font-semibold">{userData.name}</span>! Choose
                  the plan that best fits your career goals.
                </p>
              </div>
            )}

            {/* Professional Type Icons */}
            <div className="flex justify-center items-center gap-8 mt-6 text-gray-500">
              <div className="flex flex-col items-center">
                <Beaker className="w-8 h-8 mb-1" />
                <span className="text-xs">Lab Scientists</span>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-8 h-8 mb-1" />
                <span className="text-xs">Technicians</span>
              </div>
              <div className="flex flex-col items-center">
                <Settings className="w-8 h-8 mb-1" />
                <span className="text-xs">Managers</span>
              </div>
              <div className="flex flex-col items-center">
                <GraduationCap className="w-8 h-8 mb-1" />
                <span className="text-xs">Researchers</span>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="w-8 h-8 mb-1" />
                <span className="text-xs">Quality</span>
              </div>
              <div className="flex flex-col items-center">
                <Cpu className="w-8 h-8 mb-1" />
                <span className="text-xs">IT Specialists</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-gradient-to-br ${
                plan.gradient
              } rounded-2xl shadow-lg border-2 ${
                plan.borderColor
              } hover:shadow-xl transition-all duration-300 ${
                plan.popular ? "ring-4 ring-blue-200 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-6">
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {plan.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-6">
                  {plan.features.slice(0, 8).map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                          feature.included
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {feature.included ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                      </div>
                      <span
                        className={`ml-3 text-sm ${
                          feature.included ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                  {plan.features.length > 8 && (
                    <div className="text-center">
                      <span className="text-sm text-gray-500 font-medium">
                        +{plan.features.length - 8} more features
                      </span>
                    </div>
                  )}
                </div>

                {/* Example Button */}
                <div className="mb-4">
                  <button
                    onClick={() => handleShowExample(plan.id)}
                    className="w-full py-2 px-4 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Example Profile
                  </button>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${plan.buttonStyle}`}
                >
                  {plan.id === "basic" ? "Start Free" : `Choose ${plan.name}`}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Feature Comparison
            </h2>
            <p className="text-lg text-gray-600">
              See exactly what's included with each professional subscription
              tier
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Features
                    </th>
                    {plans.map((plan) => (
                      <th
                        key={plan.id}
                        className="px-6 py-4 text-center text-sm font-semibold text-gray-900"
                      >
                        <div className="flex flex-col items-center">
                          <span>{plan.name}</span>
                          <span className="font-bold text-lg mt-1">
                            {plan.price}
                            {plan.period}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {getAllFeatures().map((featureName, index) => {
                    // Find the icon for this feature from any plan that has it
                    const featureIcon =
                      plans
                        .flatMap((p) => p.features)
                        .find((f) => f.name === featureName)?.icon || FileText;

                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="flex items-center">
                            {React.createElement(featureIcon, {
                              className: "w-4 h-4 mr-2 text-gray-500",
                            })}
                            {featureName}
                          </div>
                        </td>
                        {plans.map((plan) => {
                          const feature = plan.features.find(
                            (f) => f.name === featureName
                          );
                          return (
                            <td key={plan.id} className="px-6 py-4 text-center">
                              {feature?.included ? (
                                <Check className="w-5 h-5 text-green-600 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-gray-300 mx-auto" />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Advance Your Career?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of laboratory professionals who have found their
              dream jobs through our platform. Connect with top employers,
              showcase your expertise, and take the next step in your career.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <Check className="w-4 h-4 mr-1 text-green-600" />
                Cancel anytime
              </span>
              <span className="flex items-center">
                <Check className="w-4 h-4 mr-1 text-green-600" />
                No setup fees
              </span>
              <span className="flex items-center">
                <Check className="w-4 h-4 mr-1 text-green-600" />
                Instant activation
              </span>
              <span className="flex items-center">
                <Check className="w-4 h-4 mr-1 text-green-600" />
                24/7 support
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Example Modal */}
      {showExample && renderExample(showExample)}
    </div>
  );
}

export default ProfessionalSubscriptions;

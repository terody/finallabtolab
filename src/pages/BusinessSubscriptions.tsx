import {
  AlertTriangle,
  Award,
  Beaker,
  Check,
  Cpu,
  Download,
  Eye,
  FileText,
  Globe,
  Image,
  Mail,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  Plus,
  Settings,
  Shield,
  Star,
  Truck,
  Users,
  X,
  Zap,
} from "lucide-react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import BusinessRegistrationForm from "../components/BusinessRegistrationForm";

function BusinessSubscriptions() {
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showExample, setShowExample] = useState<string | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationPlan, setRegistrationPlan] = useState("");

  // Get user data from location state if coming from registration
  const userData = location.state?.userData;

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "$9",
      period: "/month",
      description:
        "Enhanced listing with direct contact options and expanded services",
      color: "purple",
      gradient: "from-purple-50 to-purple-100",
      borderColor: "border-purple-300",
      buttonStyle: "bg-purple-600 hover:bg-purple-700 text-white",
      popular: false,
      features: [
        { name: "Business name and location", included: true, icon: MapPin },
        { name: "Basic services list", included: true, icon: FileText },
        { name: "Certifications display", included: true, icon: Award },
        { name: "Custom logo upload", included: true, icon: Image },
        {
          name: "Editable business information",
          included: true,
          icon: FileText,
        },
        { name: "View Profile access", included: true, icon: Users },
        { name: "Short paragraph description", included: true, icon: FileText },
        {
          name: "Direct messaging system",
          included: true,
          icon: MessageSquare,
        },
        { name: "Multiple licenses display", included: true, icon: Award },
        { name: "Extended services list", included: true, icon: FileText },
        { name: "Direct phone number", included: true, icon: Phone },
        { name: "Direct email address", included: true, icon: Mail },
        { name: "Contact information display", included: true, icon: Phone },
        { name: "Specific business address", included: true, icon: MapPin },
        { name: "Website link", included: false, icon: Globe },
        { name: "References section", included: false, icon: Star },
        { name: "Extended paragraph length", included: false, icon: FileText },
        { name: "Downloadable files", included: false, icon: Download },
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: "$15",
      period: "/month",
      description:
        "Complete business profile with all features and file downloads",
      color: "blue",
      gradient: "from-blue-50 to-blue-100",
      borderColor: "border-blue-300",
      buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white",
      popular: true,
      features: [
        { name: "Business name and location", included: true, icon: MapPin },
        { name: "Basic services list", included: true, icon: FileText },
        { name: "Certifications display", included: true, icon: Award },
        { name: "Custom logo upload", included: true, icon: Image },
        {
          name: "Editable business information",
          included: true,
          icon: FileText,
        },
        { name: "View Profile access", included: true, icon: Users },
        { name: "Short paragraph description", included: true, icon: FileText },
        {
          name: "Direct messaging system",
          included: true,
          icon: MessageSquare,
        },
        { name: "Multiple licenses display", included: true, icon: Award },
        { name: "Extended services list", included: true, icon: FileText },
        { name: "Direct phone number", included: true, icon: Phone },
        { name: "Direct email address", included: true, icon: Mail },
        { name: "Contact information display", included: true, icon: Phone },
        { name: "Specific business address", included: true, icon: MapPin },
        { name: "Website link", included: true, icon: Globe },
        { name: "Complete services catalog", included: true, icon: FileText },
        { name: "Full licensures display", included: true, icon: Award },
        { name: "Extended paragraph length", included: true, icon: FileText },
        { name: "References section", included: true, icon: Star },
        { name: "Downloadable files", included: true, icon: Download },
        {
          name: "Product catalogs and brochures",
          included: true,
          icon: FileText,
        },
        { name: "Priority support", included: true, icon: Zap },
        { name: "Future feature access", included: true, icon: Star },
      ],
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    // Here you would integrate with your payment system
  };

  const handleShowExample = (planId: string) => {
    setShowExample(planId);
  };

  const closeExample = () => {
    setShowExample(null);
  };

  const handleAddNewBusiness = (planId: string) => {
    setRegistrationPlan(planId);
    setShowRegistrationForm(true);
  };

  const closeRegistrationForm = () => {
    setShowRegistrationForm(false);
    setRegistrationPlan("");
  };

  const renderExample = (planId: string) => {
    const examples = {
      free: {
        title: "LabTech Solutions",
        status: "Unclaimed",
        location: "Santa Ana, CA",
        businessType: "Laboratory IT Services",
        services: [
          "LIMS Implementation",
          "Equipment Maintenance",
          "Data Management",
        ],
        certifications: ["ISO 27001", "HIPAA Compliant", "FDA Registered"],
        hasViewProfile: false,
        hasCustomLogo: false,
        hasMessaging: false,
        hasContactInfo: false,
        contactPhone: "",
        contactEmail: "",
        hasWebsite: false,
        website: "",
        description: null,
        hasDownloads: false,
        downloads: [],
        hasReferences: false,
        references: [],
        icon: Cpu,
      },
      basic: {
        title: "BioReagents Supply Co.",
        status: "Verified",
        location: "1234 Industrial Blvd, Santa Ana, CA 92705",
        businessType: "Reagent & Consumables Distributor",
        services: [
          "Clinical Chemistry Reagents",
          "Hematology Supplies",
          "Molecular Diagnostics",
          "Quality Controls",
          "Calibrators",
          "Sample Collection Tubes",
          "Pipette Tips",
          "Laboratory Plastics",
        ],
        certifications: [
          "ISO 13485",
          "FDA Registered",
          "CE Marked",
          "Good Distribution Practice",
        ],
        hasViewProfile: true,
        hasCustomLogo: true,
        hasMessaging: true,
        hasContactInfo: true,
        contactPhone: "(714) 555-0456",
        contactEmail: "sales@bioreagents.com",
        hasWebsite: false,
        website: "",
        description:
          "We are a leading distributor of high-quality laboratory reagents and consumables serving clinical laboratories, research institutions, and healthcare facilities throughout the region. Our comprehensive product portfolio includes reagents for clinical chemistry, hematology, immunology, and molecular diagnostics from top manufacturers worldwide. We maintain strict cold-chain management and quality control processes to ensure product integrity from manufacturer to your laboratory. Our experienced technical support team provides expert guidance on product selection, application protocols, and troubleshooting. We offer competitive pricing, reliable delivery schedules, and flexible ordering options to meet your laboratory's unique needs.",
        hasDownloads: false,
        downloads: [],
        hasReferences: false,
        references: [],
        icon: Package,
      },
      premium: {
        title: "Precision Lab Equipment Inc.",
        status: "Verified",
        location: "5678 Technology Dr, Santa Ana, CA 92705",
        businessType: "Laboratory Equipment & Services",
        services: [
          "Automated Analyzers",
          "Centrifuges",
          "Microscopes",
          "Pipettes",
          "Incubators",
          "Spectrophotometers",
          "Equipment Calibration",
          "Preventive Maintenance",
          "Technical Training",
          "Warranty Services",
          "Parts & Accessories",
          "Equipment Leasing",
        ],
        certifications: [
          "ISO 9001",
          "ISO 13485",
          "FDA Registered",
          "Authorized Service Provider",
        ],
        hasViewProfile: true,
        hasCustomLogo: true,
        hasMessaging: true,
        hasContactInfo: true,
        contactPhone: "(714) 555-0789",
        contactEmail: "info@precisionlabequip.com",
        hasWebsite: true,
        website: "www.precisionlabequip.com",
        description:
          "We are a full-service laboratory equipment company specializing in the sale, installation, calibration, and maintenance of analytical instruments for clinical laboratories, research facilities, and quality control laboratories. With over 25 years of experience in the industry, we have built lasting partnerships with leading manufacturers and provide comprehensive solutions for all your laboratory equipment needs. Our certified technicians offer on-site installation, training, and ongoing support to ensure optimal instrument performance and regulatory compliance. We maintain an extensive inventory of genuine parts and accessories, enabling rapid response times for service calls and minimizing laboratory downtime. Our preventive maintenance programs help extend equipment life and maintain accuracy, while our calibration services ensure compliance with regulatory requirements. We also offer flexible leasing and financing options to help laboratories acquire the latest technology while managing capital expenditures effectively.",
        hasDownloads: true,
        downloads: [
          "Product Catalog (PDF)",
          "Service Agreement Templates",
          "Calibration Certificates",
          "Training Materials",
          "Warranty Information",
        ],
        hasReferences: true,
        references: [
          "Orange County Medical Center",
          "Regional Reference Laboratory",
          "University Research Institute",
        ],
        icon: Settings,
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

            {/* Business Card Example */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl overflow-hidden shadow-lg">
              {/* Large Header Image */}
              <div className="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                {example.hasCustomLogo ? (
                  <div className="text-white text-2xl font-bold bg-black bg-opacity-20 px-6 py-3 rounded-lg">
                    Your Logo
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <Image className="w-16 h-16 mx-auto mb-2" />
                      <p className="text-lg font-medium">
                        Stock Business Photo
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {example.title}
                    </h3>
                    <div className="flex items-center mb-2">
                      {example.status === "Verified" ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <Check className="w-4 h-4 mr-1" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          Unclaimed
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-blue-600 mb-2">
                      {React.createElement(example.icon, {
                        className: "w-5 h-5 mr-2",
                      })}
                      <span className="font-medium">
                        {example.businessType}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Unclaimed Warning */}
                {example.status === "Unclaimed" && (
                  <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-yellow-800 font-medium mb-1">
                          This listing will be removed after 120 days if not
                          claimed
                        </p>
                        <p className="text-xs text-yellow-700">
                          Claim your business to maintain your listing and
                          access additional features
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{example.location}</span>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Services & Products:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {example.services.map((service, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Certifications & Compliance:
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

                {example.description && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">About:</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {example.description}
                    </p>
                  </div>
                )}

                {example.hasContactInfo && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Contact Information:
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-5 h-5 mr-3" />
                        {example.contactPhone}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Mail className="w-5 h-5 mr-3" />
                        {example.contactEmail}
                      </div>
                    </div>
                  </div>
                )}

                {example.hasWebsite && (
                  <div className="mb-6">
                    <div className="flex items-center text-blue-600">
                      <Globe className="w-5 h-5 mr-3" />
                      <a href="#" className="hover:underline">
                        {example.website}
                      </a>
                    </div>
                  </div>
                )}

                {example.hasReferences && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Client References:
                    </h4>
                    <div className="space-y-2">
                      {example.references?.map((ref, index) => (
                        <div
                          key={index}
                          className="flex items-center text-gray-600"
                        >
                          <Star className="w-5 h-5 mr-3 text-yellow-500" />
                          {ref}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {example.hasDownloads && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Downloads:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {example.downloads?.map((download, index) => (
                        <button
                          key={index}
                          className="flex items-center text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          <span className="text-sm">{download}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  {example.hasViewProfile ? (
                    <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      View Profile
                    </button>
                  ) : (
                    <button className="flex-1 bg-gray-300 text-gray-500 py-3 px-4 rounded-lg font-medium cursor-not-allowed">
                      View Profile (Unavailable)
                    </button>
                  )}

                  {example.hasMessaging ? (
                    <button className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </button>
                  ) : (
                    <button className="flex-1 border-2 border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                      Claim This Business
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-gray-600 mb-4">
                This is how your business listing would appear with the {planId}{" "}
                plan.
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
      "Business name and location",
      "Basic services list",
      "Certifications display",
      "Custom logo upload",
      "Editable business information",
      "View Profile access",
      "Short paragraph description",
      "Direct messaging system",
      "Multiple licenses display",
      "Extended services list",
      "Direct phone number",
      "Direct email address",
      "Contact information display",
      "Specific business address",
      "Website link",
      "Complete services catalog",
      "Full licensures display",
      "Extended paragraph length",
      "References section",
      "Downloadable files",
      "Product catalogs and brochures",
      "Priority support",
      "Future feature access",
    ];

    return featureOrder;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Business Subscription Plans
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join the premier directory for laboratory services, equipment
              suppliers, reagent distributors, IT solutions, and all lab-related
              businesses. Choose the perfect plan to showcase your services and
              connect with clients.
            </p>

            {userData && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg inline-block">
                <p className="text-blue-800">
                  Welcome,{" "}
                  <span className="font-semibold">{userData.name}</span>! Choose
                  the plan that best fits your business goals.
                </p>
              </div>
            )}

            {/* Business Type Icons */}
            <div className="flex justify-center items-center gap-8 mt-6 text-gray-500">
              <div className="flex flex-col items-center">
                <Beaker className="w-8 h-8 mb-1" />
                <span className="text-xs">Laboratories</span>
              </div>
              <div className="flex flex-col items-center">
                <Package className="w-8 h-8 mb-1" />
                <span className="text-xs">Suppliers</span>
              </div>
              <div className="flex flex-col items-center">
                <Settings className="w-8 h-8 mb-1" />
                <span className="text-xs">Equipment</span>
              </div>
              <div className="flex flex-col items-center">
                <Cpu className="w-8 h-8 mb-1" />
                <span className="text-xs">IT Services</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="w-8 h-8 mb-1" />
                <span className="text-xs">Distribution</span>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="w-8 h-8 mb-1" />
                <span className="text-xs">Compliance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
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
                  {plan.features.slice(0, 6).map((feature, index) => (
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
                  {plan.features.length > 6 && (
                    <div className="text-center">
                      <span className="text-sm text-gray-500 font-medium">
                        +{plan.features.length - 6} more features
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
                    View Example
                  </button>
                </div>

                {/* Add New Business Button for Paid Plans */}
                {/* {plan.id !== "free" && (
                  <div className="mb-4">
                    <button
                      onClick={() => handleAddNewBusiness(plan.name)}
                      className="w-full border-2 border-dashed border-gray-300 text-gray-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Complete Business Profile
                    </button>
                  </div>
                )} */}

                {/* CTA Button */}
                <button
                  onClick={() => handleAddNewBusiness(plan.name)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${plan.buttonStyle}`}
                  disabled={plan.id === "free"}
                >
                  {plan.id === "free"
                    ? "Current Status"
                    : `Choose ${plan.name}`}
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
              See exactly what's included with each subscription tier
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
              Ready to Claim Your Business?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join hundreds of lab-related businesses already showcasing their
              services on our platform. From laboratories and equipment
              suppliers to IT services and reagent distributors - you can
              upgrade or downgrade your subscription at any time.
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

      {/* Business Registration Form */}
      <BusinessRegistrationForm
        isOpen={showRegistrationForm}
        onClose={closeRegistrationForm}
        selectedPlan={registrationPlan}
        userData={userData}
      />
    </div>
  );
}

export default BusinessSubscriptions;

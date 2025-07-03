import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  FileText,
  Image,
  Award,
  Upload,
  Plus,
  Minus,
  Beaker,
  Package,
  Settings,
  Cpu,
  Truck,
  Shield,
  Users,
  Calendar,
  DollarSign,
  Sparkles,
  MessageSquare,
  Download,
} from "lucide-react";

interface BusinessRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
  userData?: any;
}

const BusinessRegistrationForm: React.FC<BusinessRegistrationFormProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  userData,
}) => {
  const navigate = useNavigate();
  const [businessType, setBusinessType] = useState("");
  const [customBusinessType, setCustomBusinessType] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Information from registration
    businessName: userData?.name || "",
    email: userData?.email || "",

    // Business details
    businessAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    website: "",
    description: "",

    // Services/Products
    services: [""],
    products: [""],

    // Certifications
    certifications: [""],
    licenses: [""],

    // Laboratory Specific
    labTypes: [] as string[],
    testingCapabilities: [""],
    accreditations: [""],
    sampleTypes: [""],
    turnaroundTimes: "",

    // Equipment/IT Specific
    equipmentBrands: [""],
    serviceAreas: [""],
    supportTypes: [] as string[],

    // Distribution/Supply Specific
    productCategories: [""],
    manufacturers: [""],
    deliveryAreas: [""],
    minimumOrders: "",

    // Compliance/Consulting Specific
    regulatoryExpertise: [""],
    industryExperience: "",
    consultingServices: [""],
    consultingSpecialties: [""],

    // Cleaning Services Specific
    cleaningServices: [""],
    cleaningCertifications: [""],
    cleaningAreas: [""],
    cleaningSchedules: [] as string[],

    // Additional Information
    yearsInBusiness: "",
    numberOfEmployees: "",
    operatingHours: "",
    emergencyServices: false,
    references: [""],
  });

  const businessTypes = [
    { id: "laboratory", name: "Clinical/Research Laboratory", icon: Beaker },
    { id: "equipment", name: "Equipment & Instrumentation", icon: Settings },
    { id: "supplies", name: "Reagents & Consumables", icon: Package },
    { id: "it-services", name: "Laboratory IT Services", icon: Cpu },
    { id: "distribution", name: "Distribution & Logistics", icon: Truck },
    { id: "compliance", name: "Compliance & Regulatory", icon: Shield },
    { id: "consulting", name: "Laboratory Consulting", icon: MessageSquare },
    { id: "cleaning", name: "Laboratory Cleaning Services", icon: Sparkles },
    { id: "custom", name: "Other (Specify)", icon: Plus },
  ];

  const labTypes = [
    "Clinical Chemistry",
    "Hematology",
    "Microbiology",
    "Immunology",
    "Molecular Diagnostics",
    "Pathology",
    "Toxicology",
    "Blood Bank",
    "Research & Development",
    "Quality Control",
    "Environmental Testing",
  ];

  const supportTypes = [
    "Installation",
    "Calibration",
    "Preventive Maintenance",
    "Repair Services",
    "Training",
    "Technical Support",
    "Software Updates",
    "Warranty Services",
  ];

  const consultingSpecialties = [
    "Quality Management Systems",
    "Laboratory Accreditation",
    "Method Validation",
    "Regulatory Compliance",
    "Laboratory Design",
    "Workflow Optimization",
    "Staff Training",
    "Equipment Selection",
    "Cost Reduction",
    "Automation Implementation",
  ];

  const cleaningScheduleOptions = [
    "Daily",
    "Weekly",
    "Bi-weekly",
    "Monthly",
    "Quarterly",
    "As Needed",
    "Emergency Response",
  ];

  // Get plan features to determine what fields to show
  const getPlanFeatures = () => {
    const planFeatures = {
      Basic: {
        hasWebsite: false,
        hasDownloads: false,
        hasReferences: false,
        hasExtendedDescription: false,
      },
      Premium: {
        hasWebsite: true,
        hasDownloads: true,
        hasReferences: true,
        hasExtendedDescription: true,
      },
    };

    return (
      planFeatures[selectedPlan as keyof typeof planFeatures] ||
      planFeatures["Basic"]
    );
  };

  const planFeatures = getPlanFeatures();

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayInputChange = (
    field: string,
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item: string, i: number) =>
        i === index ? value : item
      ),
    }));
  };

  const addArrayItem = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev], ""],
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter(
        (_: any, i: number) => i !== index
      ),
    }));
  };

  const handleCheckboxChange = (
    field: string,
    value: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field as keyof typeof prev], value]
        : prev[field as keyof typeof prev].filter(
            (item: string) => item !== value
          ),
    }));
  };

  const handleBusinessTypeChange = (typeId: string) => {
    setBusinessType(typeId);
    if (typeId === "custom") {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      setCustomBusinessType("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalBusinessType =
      businessType === "custom" ? customBusinessType : businessType;
    const finalData = {
      businessType: finalBusinessType,
      ...formData,
      plan: selectedPlan,
      role: "business",
    };

    console.log("Business registration submitted:", finalData);

    // Here you would integrate with your backend/payment system
    navigate("/dashboard", {
      state: {
        plan: selectedPlan,
        userData: { ...userData, ...finalData },
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
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <Minus className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => addArrayItem(field)}
        className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add {label.slice(0, -1)}
      </button>
    </div>
  );

  const renderBusinessTypeSpecificFields = () => {
    const currentType = businessType === "custom" ? "custom" : businessType;

    switch (currentType) {
      case "laboratory":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Laboratory Types
              </label>
              <div className="grid grid-cols-2 gap-2">
                {labTypes.map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.labTypes.includes(type)}
                      onChange={(e) =>
                        handleCheckboxChange("labTypes", type, e.target.checked)
                      }
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {renderArrayInput(
              "testingCapabilities",
              "Testing Capabilities",
              "e.g., Complete Blood Count, Glucose Testing",
              formData.testingCapabilities
            )}
            {renderArrayInput(
              "accreditations",
              "Accreditations",
              "e.g., CAP, CLIA, ISO 15189",
              formData.accreditations
            )}
            {renderArrayInput(
              "sampleTypes",
              "Sample Types Accepted",
              "e.g., Blood, Urine, Tissue",
              formData.sampleTypes
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Typical Turnaround Times
              </label>
              <textarea
                value={formData.turnaroundTimes}
                onChange={(e) =>
                  handleInputChange("turnaroundTimes", e.target.value)
                }
                placeholder="e.g., Routine tests: 24-48 hours, STAT results: 2-4 hours"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case "equipment":
        return (
          <div className="space-y-6">
            {renderArrayInput(
              "equipmentBrands",
              "Equipment Brands",
              "e.g., Abbott, Roche, Siemens",
              formData.equipmentBrands
            )}
            {renderArrayInput(
              "serviceAreas",
              "Service Areas",
              "e.g., Orange County, Los Angeles County",
              formData.serviceAreas
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Support Services Offered
              </label>
              <div className="grid grid-cols-2 gap-2">
                {supportTypes.map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.supportTypes.includes(type)}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "supportTypes",
                          type,
                          e.target.checked
                        )
                      }
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case "supplies":
        return (
          <div className="space-y-6">
            {renderArrayInput(
              "productCategories",
              "Product Categories",
              "e.g., Clinical Chemistry Reagents, Hematology Controls",
              formData.productCategories
            )}
            {renderArrayInput(
              "manufacturers",
              "Manufacturers Represented",
              "e.g., Beckman Coulter, Bio-Rad",
              formData.manufacturers
            )}
            {renderArrayInput(
              "deliveryAreas",
              "Delivery Areas",
              "e.g., Southern California, Nationwide",
              formData.deliveryAreas
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Order Requirements
              </label>
              <input
                type="text"
                value={formData.minimumOrders}
                onChange={(e) =>
                  handleInputChange("minimumOrders", e.target.value)
                }
                placeholder="e.g., $500 minimum order, No minimum for established accounts"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case "it-services":
        return (
          <div className="space-y-6">
            {renderArrayInput(
              "services",
              "IT Services",
              "e.g., LIMS Implementation, Network Security, Data Backup",
              formData.services
            )}
            {renderArrayInput(
              "serviceAreas",
              "Service Areas",
              "e.g., Orange County, Remote Support Available",
              formData.serviceAreas
            )}
          </div>
        );

      case "distribution":
        return (
          <div className="space-y-6">
            {renderArrayInput(
              "productCategories",
              "Distribution Categories",
              "e.g., Temperature-Controlled Products, Hazardous Materials",
              formData.productCategories
            )}
            {renderArrayInput(
              "deliveryAreas",
              "Delivery Coverage",
              "e.g., West Coast, Nationwide",
              formData.deliveryAreas
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Order Requirements
              </label>
              <input
                type="text"
                value={formData.minimumOrders}
                onChange={(e) =>
                  handleInputChange("minimumOrders", e.target.value)
                }
                placeholder="e.g., $1000 minimum, Free shipping over $500"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case "compliance":
        return (
          <div className="space-y-6">
            {renderArrayInput(
              "regulatoryExpertise",
              "Regulatory Expertise",
              "e.g., FDA, CLIA, CAP, ISO",
              formData.regulatoryExpertise
            )}
            {renderArrayInput(
              "consultingServices",
              "Compliance Services",
              "e.g., Quality System Implementation, Audit Preparation",
              formData.consultingServices
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry Experience (Years)
              </label>
              <input
                type="text"
                value={formData.industryExperience}
                onChange={(e) =>
                  handleInputChange("industryExperience", e.target.value)
                }
                placeholder="e.g., 15+ years in laboratory compliance"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case "consulting":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consulting Specialties
              </label>
              <div className="grid grid-cols-2 gap-2">
                {consultingSpecialties.map((specialty) => (
                  <label key={specialty} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.consultingSpecialties.includes(
                        specialty
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "consultingSpecialties",
                          specialty,
                          e.target.checked
                        )
                      }
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{specialty}</span>
                  </label>
                ))}
              </div>
            </div>

            {renderArrayInput(
              "consultingServices",
              "Specific Consulting Services",
              "e.g., Laboratory Setup, Process Improvement, Staff Training",
              formData.consultingServices
            )}
            {renderArrayInput(
              "serviceAreas",
              "Service Areas",
              "e.g., Orange County, Remote Consulting Available",
              formData.serviceAreas
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry Experience (Years)
              </label>
              <input
                type="text"
                value={formData.industryExperience}
                onChange={(e) =>
                  handleInputChange("industryExperience", e.target.value)
                }
                placeholder="e.g., 20+ years in laboratory operations and management"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      case "cleaning":
        return (
          <div className="space-y-6">
            {renderArrayInput(
              "cleaningServices",
              "Cleaning Services",
              "e.g., Decontamination, Biohazard Cleanup, Equipment Cleaning",
              formData.cleaningServices
            )}
            {renderArrayInput(
              "cleaningCertifications",
              "Cleaning Certifications",
              "e.g., OSHA Certified, Biohazard Training, Chemical Safety",
              formData.cleaningCertifications
            )}
            {renderArrayInput(
              "cleaningAreas",
              "Areas Serviced",
              "e.g., Clean Rooms, BSL-2 Labs, Chemical Labs",
              formData.cleaningAreas
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Cleaning Schedules
              </label>
              <div className="grid grid-cols-2 gap-2">
                {cleaningScheduleOptions.map((schedule) => (
                  <label key={schedule} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.cleaningSchedules.includes(schedule)}
                      onChange={(e) =>
                        handleCheckboxChange(
                          "cleaningSchedules",
                          schedule,
                          e.target.checked
                        )
                      }
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{schedule}</span>
                  </label>
                ))}
              </div>
            </div>

            {renderArrayInput(
              "serviceAreas",
              "Service Areas",
              "e.g., Orange County, Los Angeles County",
              formData.serviceAreas
            )}
          </div>
        );

      case "custom":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specify Your Business Type *
              </label>
              <input
                type="text"
                required
                value={customBusinessType}
                onChange={(e) => setCustomBusinessType(e.target.value)}
                placeholder="e.g., Laboratory Waste Management, Scientific Writing Services"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {renderArrayInput(
              "services",
              "Services Offered",
              "Describe your specific services",
              formData.services
            )}
            {renderArrayInput(
              "serviceAreas",
              "Service Areas",
              "e.g., Orange County, Nationwide",
              formData.serviceAreas
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Complete Your Business Profile
              </h2>
              <p className="text-gray-600 mt-1">
                Selected Plan:{" "}
                <span className="font-semibold text-blue-600">
                  {selectedPlan}
                </span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Business Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                What type of business are you? *
              </label>
              <div className="grid grid-cols-2 gap-4">
                {businessTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => handleBusinessTypeChange(type.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      businessType === type.id
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center">
                      {React.createElement(type.icon, {
                        className: "w-5 h-5 mr-3",
                      })}
                      <span className="font-medium">{type.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {businessType && (
              <>
                {/* Basic Business Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Building2 className="w-5 h-5 mr-2" />
                    Basic Business Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={(e) =>
                          handleInputChange("businessName", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    {/* Website field - only show for Premium plan */}
                    {planFeatures.hasWebsite && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Website
                          <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Premium Feature
                          </span>
                        </label>
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) =>
                            handleInputChange("website", e.target.value)
                          }
                          placeholder="https://www.yourwebsite.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.businessAddress}
                      onChange={(e) =>
                        handleInputChange("businessAddress", e.target.value)
                      }
                      placeholder="Street address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        placeholder="City"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) =>
                          handleInputChange("state", e.target.value)
                        }
                        placeholder="State"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        required
                        value={formData.zipCode}
                        onChange={(e) =>
                          handleInputChange("zipCode", e.target.value)
                        }
                        placeholder="ZIP Code"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Description *
                      {planFeatures.hasExtendedDescription && (
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Extended Length Available
                        </span>
                      )}
                    </label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="Describe your business, services, and what makes you unique..."
                      rows={planFeatures.hasExtendedDescription ? 6 : 4}
                      maxLength={
                        planFeatures.hasExtendedDescription ? undefined : 500
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {!planFeatures.hasExtendedDescription && (
                      <p className="text-xs text-gray-500 mt-1">
                        Character limit: 500 (Upgrade to Premium for unlimited
                        length)
                      </p>
                    )}
                  </div>
                </div>

                {/* Business Type Specific Fields */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {businessType === "custom"
                      ? "Custom Business"
                      : businessTypes.find((t) => t.id === businessType)
                          ?.name}{" "}
                    Specific Information
                  </h3>
                  {renderBusinessTypeSpecificFields()}
                </div>

                {/* Certifications and Licenses */}
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Certifications & Licenses
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {renderArrayInput(
                      "certifications",
                      "Certifications",
                      "e.g., ISO 9001, ISO 13485",
                      formData.certifications
                    )}
                    {renderArrayInput(
                      "licenses",
                      "Licenses",
                      "e.g., State Laboratory License, DEA Registration",
                      formData.licenses
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Additional Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years in Business
                      </label>
                      <input
                        type="text"
                        value={formData.yearsInBusiness}
                        onChange={(e) =>
                          handleInputChange("yearsInBusiness", e.target.value)
                        }
                        placeholder="e.g., 15"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Employees
                      </label>
                      <input
                        type="text"
                        value={formData.numberOfEmployees}
                        onChange={(e) =>
                          handleInputChange("numberOfEmployees", e.target.value)
                        }
                        placeholder="e.g., 25-50"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Operating Hours
                      </label>
                      <input
                        type="text"
                        value={formData.operatingHours}
                        onChange={(e) =>
                          handleInputChange("operatingHours", e.target.value)
                        }
                        placeholder="e.g., Mon-Fri 8AM-6PM"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.emergencyServices}
                        onChange={(e) =>
                          handleInputChange(
                            "emergencyServices",
                            e.target.checked
                          )
                        }
                        className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">
                        We offer emergency/after-hours services
                      </span>
                    </label>
                  </div>

                  {/* References - only show for Premium plan */}
                  {planFeatures.hasReferences && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Client References (Optional)
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Premium Feature
                        </span>
                      </label>
                      {renderArrayInput(
                        "references",
                        "Client References",
                        "e.g., Orange County Medical Center",
                        formData.references
                      )}
                    </div>
                  )}
                </div>

                {/* Downloadable Files - only show for Premium plan */}
                {planFeatures.hasDownloads && (
                  <div className="bg-yellow-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Download className="w-5 h-5 mr-2" />
                      Downloadable Files
                      <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Premium Feature
                      </span>
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Upload brochures, catalogs, certificates, and other files
                      for clients to download.
                    </p>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        File upload functionality will be available after
                        registration
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Complete Registration & Subscribe
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessRegistrationForm;

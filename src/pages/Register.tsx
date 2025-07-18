import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Beaker,
  Package,
  Settings,
  Cpu,
  Truck,
  Shield,
  MessageSquare,
  Sparkles,
  Users,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react";
import { signUp } from "../lib/auth";
import EmailConfirmationModal from "../components/EmailConfirmationModal";

export default function Register() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<"professional" | "business">(
    "professional"
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const userData = {
        ...formData,
        role: accountType,
      };

      const { data, error: signUpError } = await signUp(
        formData.email,
        formData.password
      );

      if (signUpError) {
        setError("Registration failed. Please try again.");
        setLoading(false);
        return;
      }
      setShowEmailModal(true);
      // Redirect to appropriate subscription page
      // if (accountType === "professional") {
      //   navigate("/professional-subscriptions", { state: { data } });
      // } else {
      //   navigate("/business-subscriptions", { state: { data } });
      // }
    } catch (err) {
      setError("Registration failed. Please try again.");
      setLoading(false);
    }
  };

  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
    // Optionally redirect to login page
    navigate("/login", {
      state: {
        message:
          "Please check your email and click the confirmation link to complete registration.",
      },
    });
  };

  const professionalExamples = [
    {
      icon: Beaker,
      title: "Laboratory Technician",
      description: "Clinical testing and analysis",
    },
    {
      icon: Users,
      title: "Lab Manager",
      description: "Laboratory operations oversight",
    },
    {
      icon: GraduationCap,
      title: "Research Scientist",
      description: "Scientific research and development",
    },
    {
      icon: Award,
      title: "Quality Specialist",
      description: "Compliance and quality assurance",
    },
    {
      icon: Briefcase,
      title: "Lab Director",
      description: "Strategic laboratory leadership",
    },
  ];

  const businessExamples = [
    {
      icon: Beaker,
      title: "Clinical Laboratory",
      description: "Diagnostic testing services",
    },
    {
      icon: Settings,
      title: "Equipment Supplier",
      description: "Laboratory instruments and tools",
    },
    {
      icon: Package,
      title: "Reagent Distributor",
      description: "Laboratory chemicals and supplies",
    },
    {
      icon: Cpu,
      title: "IT Services",
      description: "Laboratory information systems",
    },
    {
      icon: Truck,
      title: "Logistics Provider",
      description: "Specialized laboratory shipping",
    },
    {
      icon: Shield,
      title: "Compliance Consultant",
      description: "Regulatory guidance services",
    },
    {
      icon: MessageSquare,
      title: "Lab Consultant",
      description: "Laboratory optimization services",
    },
    {
      icon: Sparkles,
      title: "Cleaning Services",
      description: "Specialized laboratory cleaning",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Join Our Laboratory Community
          </h1>
          <p className="text-lg text-gray-600">
            Connect with laboratory professionals and businesses across the
            industry
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg max-w-md mx-auto">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Account Type Selection */}
          <div className="bg-gray-50 px-6 py-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              What type of account would you like to create?
            </h2>
            <div className="flex space-x-4 max-w-md mx-auto">
              <button
                type="button"
                onClick={() => setAccountType("professional")}
                className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all ${
                  accountType === "professional"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <User className="w-5 h-5 mr-2" />
                Professional
              </button>
              <button
                type="button"
                onClick={() => setAccountType("business")}
                className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all ${
                  accountType === "business"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <Building2 className="w-5 h-5 mr-2" />
                Business
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Registration Form */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Create Your Account
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {accountType === "professional"
                      ? "Full Name"
                      : "Business Name"}{" "}
                    *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder={
                      accountType === "professional"
                        ? "Enter your full name"
                        : "Enter your business name"
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="Enter your email address"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      placeholder="Create a password"
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Must be at least 6 characters
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>

                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign in here
                  </button>
                </p>
              </form>
            </div>

            {/* Examples Section */}
            <div className="bg-gray-50 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {accountType === "professional"
                  ? "Professional Examples"
                  : "Business Examples"}
              </h3>
              <p className="text-gray-600 mb-6">
                {accountType === "professional"
                  ? "Join laboratory professionals like:"
                  : "Join laboratory businesses like:"}
              </p>

              <div className="space-y-4">
                {(accountType === "professional"
                  ? professionalExamples
                  : businessExamples
                ).map((example, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      {React.createElement(example.icon, {
                        className: "w-5 h-5 text-blue-600",
                      })}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {example.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {example.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">What's Next?</h4>
                <p className="text-sm text-blue-700">
                  After creating your account, you'll choose a subscription plan
                  and complete your detailed profile with{" "}
                  {accountType === "professional"
                    ? "your experience, skills, and career preferences"
                    : "your business information, services, and certifications"}
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Email Confirmation Modal */}
      <EmailConfirmationModal
        isOpen={showEmailModal}
        onClose={handleCloseEmailModal}
        email={formData.email}
        accountType={accountType}
      />
    </div>
  );
}

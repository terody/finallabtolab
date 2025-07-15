import React from "react";
import { X, Mail, CheckCircle } from "lucide-react";

interface EmailConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  accountType: "professional" | "business";
}

export default function EmailConfirmationModal({
  isOpen,
  onClose,
  email,
  accountType,
}: EmailConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Registration Successful!
                </h2>
                <p className="text-sm text-gray-600">
                  Check your email to continue
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Email Icon and Message */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Please Check Your Email
            </h3>

            <p className="text-gray-600 mb-4">
              We've sent a confirmation email to:
            </p>

            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="font-medium text-gray-900">{email}</p>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Click the confirmation link in the email to verify your account
              and complete your {accountType} profile setup.
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-blue-900 mb-2">What's Next?</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Check your email inbox (and spam folder)</li>
              <li>2. Click the confirmation link</li>
              <li>3. Complete your {accountType} profile</li>
              <li>4. Choose your subscription plan</li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => window.open("mailto:", "_blank")}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Mail className="w-4 h-4 mr-2" />
              Open Email App
            </button>

            <button
              onClick={onClose}
              className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              I'll Check Later
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Didn't receive the email? Check your spam folder or{" "}
              <button className="text-blue-600 hover:text-blue-700 underline">
                resend confirmation
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

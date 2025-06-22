import React from "react";
import { X, MapPin, Mail, Phone, Globe, Building2 } from "lucide-react";
import { Lab } from "../types/lab";

interface LabProfileModalProps {
  lab: Lab;
  isOpen: boolean;
  onClose: () => void;
}

function LabProfileModal({ lab, isOpen, onClose }: LabProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative">
          <img
            src={lab.image}
            alt={lab.name}
            className="w-full h-64 object-cover rounded-t-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=2940";
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 p-2 rounded-full shadow-md transition-all duration-200 hover:shadow-lg"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg p-4">
            <h1 className="text-2xl font-bold text-gray-900">{lab.name}</h1>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{lab.location}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          {lab.description && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
              <p className="text-gray-600 leading-relaxed">{lab.description}</p>
            </div>
          )}

          {/* Contact Information */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {lab.address && (
                <div className="flex items-start space-x-3">
                  <Building2 className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">{lab.address}</p>
                  </div>
                </div>
              )}
              
              {lab.email && (
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a
                      href={`mailto:${lab.email}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {lab.email}
                    </a>
                  </div>
                </div>
              )}

              {lab.phone && (
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <a
                      href={`tel:${lab.phone}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {lab.phone}
                    </a>
                  </div>
                </div>
              )}

              {lab.website && (
                <div className="flex items-start space-x-3">
                  <Globe className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Website</p>
                    <a
                      href={lab.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Services */}
          {lab.services && lab.services.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Services</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {lab.services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-3"
                  >
                    <span className="text-blue-800 font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {lab.certifications && lab.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Certifications</h2>
              <div className="flex flex-wrap gap-3">
                {lab.certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
            {lab.email && (
              <a
                href={`mailto:${lab.email}`}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 text-center font-medium"
              >
                Contact Lab
              </a>
            )}
            {lab.website && (
              <a
                href={lab.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors duration-200 text-center font-medium"
              >
                Visit Website
              </a>
            )}
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LabProfileModal;
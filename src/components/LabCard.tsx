import React from "react";
import {
  MapPin,
  Building2,
  Mail,
  Phone,
  Globe,
  Edit,
  Flag,
} from "lucide-react";
import { Lab } from "../types/lab";
interface LabCardProps {
  lab: Lab;
  isAdmin?: boolean;
  onEdit?: (lab: Lab) => void;
  onClaim: (lab: Lab) => void;
}

function LabCard({ lab, isAdmin = false, onEdit, onClaim }: LabCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <img
          src={lab.image}
          alt={lab.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=2940";
          }}
        />
        {isAdmin && onEdit && (
          <button
            onClick={() => onEdit(lab)}
            className="absolute top-2 right-2 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 p-2 rounded-full shadow-md transition-all duration-200 hover:shadow-lg"
            title="Edit Lab"
          >
            <Edit className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {lab.name}
            </h3>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-sm">{lab.location}</span>
            </div>
            {lab.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {lab.description}
              </p>
            )}
          </div>
          <Building2 className="h-6 w-6 text-blue-600 flex-shrink-0" />
        </div>

        {lab.services && lab.services.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Services:
            </h4>
            <div className="flex flex-wrap gap-2">
              {lab.services.slice(0, 3).map((service, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {service}
                </span>
              ))}
              {lab.services.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  +{lab.services.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {lab.certifications && lab.certifications.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Certifications:
            </h4>
            <div className="flex flex-wrap gap-2">
              {lab.certifications.map((cert, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-2 mb-4">
          {lab.email && (
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
              <a
                href={`mailto:${lab.email}`}
                className="hover:text-blue-600 truncate"
              >
                {lab.email}
              </a>
            </div>
          )}
          {lab.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
              <a href={`tel:${lab.phone}`} className="hover:text-blue-600">
                {lab.phone}
              </a>
            </div>
          )}
          {lab.website && (
            <div className="flex items-center text-sm text-gray-600">
              <Globe className="h-4 w-4 mr-2 flex-shrink-0" />
              <a
                href={lab.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 truncate"
              >
                Visit Website
              </a>
            </div>
          )}
        </div>
        {false && (
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
            View Profile
          </button>
        )}

        {!lab.claimed && (
          <button
            onClick={() => onClaim(lab)}
            className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
          >
            <Flag className="h-4 w-4" />
            <span>Claim This Lab</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default LabCard;

import { useState } from 'react';
import { Search, MapPin, Filter, Building2, Phone, Mail, Globe, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LabMap from '../components/LabMap';
import { orangeCountyLabs } from '../data/orangeCountyLabs';
import type { Lab } from '../types/lab';

function Directory() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [filteredLabs, setFilteredLabs] = useState(orangeCountyLabs);
  const [showMap, setShowMap] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [labToClaim, setLabToClaim] = useState<Lab | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = orangeCountyLabs.filter(lab => 
      lab.name.toLowerCase().includes(term) ||
      lab.location.toLowerCase().includes(term) ||
      lab.services.some(service => service.toLowerCase().includes(term))
    );
    
    setFilteredLabs(filtered);
  };

  const handleClaimLab = (lab: Lab) => {
    setLabToClaim(lab);
    setShowClaimModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search labs by name, location, or services..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Filter className="h-5 w-5 text-gray-600" />
            <span>Filters</span>
          </button>
          <button 
            onClick={() => setShowMap(!showMap)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <MapPin className="h-5 w-5" />
            <span>{showMap ? 'Show List' : 'View Map'}</span>
          </button>
        </div>
      </div>

      {/* Map View */}
      {showMap && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <LabMap 
            labs={filteredLabs} 
            onLabSelect={setSelectedLab}
          />
        </div>
      )}

      {/* Lab Details Modal */}
      {selectedLab && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{selectedLab.name}</h2>
                  {!selectedLab.claimed && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-2">
                      Unclaimed
                    </span>
                  )}
                </div>
                <button 
                  onClick={() => setSelectedLab(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <img
                  src={selectedLab.image}
                  alt={selectedLab.name}
                  className="w-full h-64 object-cover rounded-lg"
                />

                <p className="text-gray-600">{selectedLab.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{selectedLab.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-2" />
                    <span>{selectedLab.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-5 w-5 mr-2" />
                    <span>{selectedLab.email}</span>
                  </div>
                  {selectedLab.website && (
                    <div className="flex items-center text-gray-600">
                      <Globe className="h-5 w-5 mr-2" />
                      <a 
                        href={selectedLab.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedLab.services.map((service, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedLab.certifications.map((cert, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {!selectedLab.claimed && (
                  <div className="border-t pt-6">
                    <p className="text-sm text-gray-600 mb-4">
                      Are you the owner or representative of this laboratory?
                    </p>
                    <button
                      onClick={() => handleClaimLab(selectedLab)}
                      className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
                    >
                      <Flag className="h-4 w-4 mr-2" />
                      Claim This Lab
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Claim Modal */}
      {showClaimModal && labToClaim && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Claim {labToClaim.name}</h3>
            <p className="text-gray-600 mb-6">
              To claim this laboratory listing, you need to register or log in to your account. During registration, make sure to check "My lab is already listed in the directory".
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowClaimModal(false);
                  setLabToClaim(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <Link
                to="/register"
                state={{ claimedLabId: labToClaim.id }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => {
                  setShowClaimModal(false);
                  setLabToClaim(null);
                }}
              >
                Register & Claim
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {!showMap && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map((lab) => (
            <div key={lab.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <img src={lab.image} alt={lab.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{lab.name}</h3>
                    {!lab.claimed && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                        Unclaimed
                      </span>
                    )}
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{lab.location}</span>
                    </div>
                  </div>
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Services:</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {lab.services.map((service, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Certifications:</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
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

                <div className="mt-6 space-y-3">
                  <button 
                    onClick={() => setSelectedLab(lab)}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    View Profile
                  </button>
                  
                  {!lab.claimed && (
                    <button
                      onClick={() => handleClaimLab(lab)}
                      className="w-full flex items-center justify-center space-x-2 border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50"
                    >
                      <Flag className="h-4 w-4" />
                      <span>Claim This Lab</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Directory;
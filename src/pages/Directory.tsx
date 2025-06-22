import React, { useState, useEffect } from "react";
import { Search, MapPin, Filter, Loader2, Shield } from "lucide-react";
import { useLabs } from "../hooks/useLabs";
import LabCard from "../components/LabCard";
import EditLabModal from "../components/EditLabModal";
import LabProfileModal from "../components/LabProfileModal";
import { Lab } from "../types/lab";
import { useAuth } from "../hooks/useAuth";

function Directory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingLab, setEditingLab] = useState<Lab | null>(null);
  const [viewingLab, setViewingLab] = useState<Lab | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const { labs, loading, error, searchLabs, refetch } = useLabs();
  const { user, profile } = useAuth();

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchLabs(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleEditLab = (lab: Lab) => {
    setEditingLab(lab);
    setIsEditModalOpen(true);
  };

  const handleViewDetails = (lab: Lab) => {
    setViewingLab(lab);
    setIsViewModalOpen(true);
  };

  const handleSaveLab = (updatedLab: Lab) => {
    // Refresh the labs list to show updated data
    refetch();
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingLab(null);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingLab(null);
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          Error loading labs: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Laboratory Directory
          </h1>

          {user?.profile?.role === "admin" && (
            <div className="ml-4 flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              <Shield className="h-4 w-4 mr-1" />
              Admin Mode
            </div>
          )}
        </div>
        <p className="mt-4 text-xl text-gray-600">
          Discover certified laboratories across the United States
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search labs by name, location, or services..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200">
            <Filter className="h-5 w-5 text-gray-600" />
            <span>Filters</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
            <MapPin className="h-5 w-5" />
            <span>View Map</span>
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading laboratories...</span>
        </div>
      )}

      {/* Results Section */}
      {!loading && (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              {labs.length} {labs.length === 1 ? "laboratory" : "laboratories"}{" "}
              found
              {searchTerm && ` for "${searchTerm}"`}
              {user?.profile?.role === "admin" && (
                <span className="ml-2 text-blue-600 font-medium">
                  (Click edit icon on cards to modify)
                </span>
              )}
            </p>
          </div>

          {labs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No laboratories found</p>
                <p className="text-sm">Try adjusting your search terms</p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {labs.map((lab) => (
                <LabCard
                  key={lab.id}
                  lab={lab}
                  isAdmin={user ? profile?.role === "admin" : false}
                  onEdit={handleEditLab}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Edit Modal */}
      {editingLab && (
        <EditLabModal
          lab={editingLab}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSave={handleSaveLab}
        />
      )}

      {/* View Details Modal */}
      {viewingLab && (
        <LabProfileModal
          lab={viewingLab}
          isOpen={isViewModalOpen}
          onClose={handleCloseViewModal}
        />
      )}
    </div>
  );
}

export default Directory;
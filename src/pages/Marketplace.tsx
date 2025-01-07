import { useState } from 'react';
import { Briefcase, Clock, X } from 'lucide-react';
import CreateListingModal from '../components/CreateListingModal';
import BidModal from '../components/BidModal';
import type { MarketplaceListing } from '../types/marketplace';

function Marketplace() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);
  const [listings, setListings] = useState<MarketplaceListing[]>([
    {
      id: '1',
      title: 'Environmental Water Testing Project',
      description: 'Looking for a certified lab to handle 500 water samples...',
      budget: '10000-15000',
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      category: 'Environmental',
      createdAt: new Date(),
      createdBy: {
        name: 'John Smith',
        email: 'john@example.com',
        company: 'Environmental Solutions Inc.'
      },
      bids: []
    }
  ]);

  const handleCreateListing = (listing: Omit<MarketplaceListing, 'id' | 'createdAt' | 'bids'>) => {
    const newListing: MarketplaceListing = {
      ...listing,
      id: Date.now().toString(),
      createdAt: new Date(),
      bids: []
    };
    setListings([newListing, ...listings]);
    setShowCreateModal(false);
  };

  const handleBid = (listingId: string, bid: any) => {
    setListings(listings.map(listing => {
      if (listing.id === listingId) {
        return {
          ...listing,
          bids: [...listing.bids, { ...bid, createdAt: new Date() }]
        };
      }
      return listing;
    }));
    setShowBidModal(false);
    setSelectedListing(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Lab Marketplace</h1>
        <p className="mt-4 text-xl text-gray-600">Find and post laboratory testing opportunities</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Latest Opportunities</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {listings.map((listing) => (
                <div key={listing.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{listing.title}</h3>
                      <p className="text-gray-600 mt-1">{listing.description}</p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Budget: ${listing.budget}
                        </span>
                      </div>
                      <div className="flex items-center mt-4 space-x-4">
                        <span className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          Posted {new Date(listing.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center text-sm text-gray-500">
                          <Briefcase className="h-4 w-4 mr-1" />
                          {listing.bids.length} bids
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedListing(listing);
                        setShowBidModal(true);
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Bid Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Post New Opportunity</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Create Listing
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <ul className="space-y-3">
              <li className="flex items-center justify-between text-gray-600 hover:text-blue-600 cursor-pointer">
                <span>Clinical Testing</span>
                <span className="text-gray-500">24</span>
              </li>
              <li className="flex items-center justify-between text-gray-600 hover:text-blue-600 cursor-pointer">
                <span>Environmental Analysis</span>
                <span className="text-gray-500">18</span>
              </li>
              <li className="flex items-center justify-between text-gray-600 hover:text-blue-600 cursor-pointer">
                <span>Food Safety</span>
                <span className="text-gray-500">12</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Create Listing Modal */}
      {showCreateModal && (
        <CreateListingModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateListing}
        />
      )}

      {/* Bid Modal */}
      {showBidModal && selectedListing && (
        <BidModal
          listing={selectedListing}
          onClose={() => {
            setShowBidModal(false);
            setSelectedListing(null);
          }}
          onSubmit={(bid) => handleBid(selectedListing.id, bid)}
        />
      )}
    </div>
  );
}

export default Marketplace;
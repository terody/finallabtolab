import { useState } from 'react';
import { X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import type { MarketplaceListing } from '../types/marketplace';

interface BidModalProps {
  listing: MarketplaceListing;
  onClose: () => void;
  onSubmit: (bid: any) => void;
}

export default function BidModal({ listing, onClose, onSubmit }: BidModalProps) {
  const [formData, setFormData] = useState({
    amount: '',
    timeframe: '',
    description: '',
    bidder: {
      name: '',
      email: '',
      company: '',
      phone: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send email to listing creator
      await emailjs.send(
        'service_ljy7ekc',
        'template_gjps04k',
        {
          to_email: listing.createdBy.email,
          from_name: formData.bidder.name,
          subject: `New Bid Received: ${listing.title}`,
          message: `
            A new bid has been submitted for your listing "${listing.title}"
            
            Bid Details:
            Amount: $${formData.amount}
            Timeframe: ${formData.timeframe}
            Description: ${formData.description}
            
            Bidder Information:
            Name: ${formData.bidder.name}
            Company: ${formData.bidder.company}
            Email: ${formData.bidder.email}
            Phone: ${formData.bidder.phone}
          `,
        }
      );

      // Send confirmation email to bidder
      await emailjs.send(
        'service_ljy7ekc',
        'template_gjps04k',
        {
          to_email: formData.bidder.email,
          from_name: 'Lab to Lab Platform',
          subject: 'Bid Submitted Successfully',
          message: `
            Your bid for "${listing.title}" has been submitted successfully.
            
            Bid Details:
            Amount: $${formData.amount}
            Timeframe: ${formData.timeframe}
            
            The listing owner will contact you if they're interested in your bid.
          `,
        }
      );

      onSubmit(formData);
    } catch (error) {
      console.error('Failed to send email notifications:', error);
      // Still submit the bid even if emails fail
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Submit Bid</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg">{listing.title}</h3>
            <p className="text-gray-600">{listing.description}</p>
            <p className="text-sm text-gray-500 mt-2">Budget Range: ${listing.budget}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Bid Amount ($)</label>
              <input
                type="number"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Timeframe</label>
              <input
                type="text"
                required
                placeholder="e.g., 2 weeks"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.timeframe}
                onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Proposal Description</label>
              <textarea
                required
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.bidder.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    bidder: { ...formData.bidder, name: e.target.value }
                  })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.bidder.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    bidder: { ...formData.bidder, email: e.target.value }
                  })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.bidder.company}
                  onChange={(e) => setFormData({
                    ...formData,
                    bidder: { ...formData.bidder, company: e.target.value }
                  })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.bidder.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    bidder: { ...formData.bidder, phone: e.target.value }
                  })}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Bid
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
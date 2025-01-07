import { useState } from 'react';
import { Search, MapPin, Filter, Briefcase, DollarSign, Clock } from 'lucide-react';
import CreateJobModal from '../components/CreateJobModal';
import type { JobPosting } from '../types/job';

const sampleJobs: JobPosting[] = [
  {
    id: '1',
    title: 'Clinical Laboratory Scientist',
    company: 'Biogene Diagnostics',
    location: 'Los Alamitos, CA',
    type: 'Full-time',
    salary: '80,000 - 100,000',
    description: 'Seeking experienced CLS for molecular diagnostics laboratory...',
    requirements: [
      'California CLS License',
      'Minimum 3 years experience',
      'Molecular testing expertise'
    ],
    benefits: [
      'Medical, dental, vision insurance',
      '401(k) with company match',
      'Paid time off'
    ],
    postedAt: new Date(),
    contact: {
      name: 'HR Department',
      email: 'hr@biogenediagnostics.com'
    }
  }
];

export default function JobBoard() {
  const [jobs, setJobs] = useState<JobPosting[]>(sampleJobs);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = jobs.filter(job => 
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term)
    );
    
    setFilteredJobs(filtered);
  };

  const handleCreateJob = (job: Omit<JobPosting, 'id' | 'postedAt'>) => {
    const newJob: JobPosting = {
      ...job,
      id: Date.now().toString(),
      postedAt: new Date()
    };
    setJobs([newJob, ...jobs]);
    setFilteredJobs([newJob, ...filteredJobs]);
    setShowCreateModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Laboratory Jobs</h1>
          <p className="mt-2 text-gray-600">Find or post laboratory positions</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Post a Job
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search jobs by title, company, or location..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Filter className="h-5 w-5 text-gray-600" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span>{job.company}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>${job.salary}/year</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {job.type}
                </span>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-600">{job.description}</p>
            </div>

            <div className="mt-4">
              <h3 className="font-medium text-gray-900">Requirements:</h3>
              <ul className="mt-2 list-disc list-inside text-gray-600">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-medium text-gray-900">Benefits:</h3>
              <ul className="mt-2 list-disc list-inside text-gray-600">
                {job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-end">
              <a
                href={`mailto:${job.contact.email}?subject=Application for ${job.title} Position`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Apply Now
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Create Job Modal */}
      {showCreateModal && (
        <CreateJobModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateJob}
        />
      )}
    </div>
  );
}
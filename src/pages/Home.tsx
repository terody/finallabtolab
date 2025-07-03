import { Search, Building2, Users } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold">
              Connecting Laboratories,
              <br />
              Empowering Innovation
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100">
              Join the premier network for laboratory professionals. Discover,
              connect, and grow with peers across the United States.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/directory"
                className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50"
              >
                Find Lab Services
              </Link>
              <Link
                to="/register"
                className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600"
              >
                List Your business
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">
            Why Join Lab to Lab?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to grow your laboratory business
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Search className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">Enhanced Visibility</h3>
            <p className="text-gray-600">
              Get discovered by potential clients and partners in your area
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Building2 className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">Business Growth</h3>
            <p className="text-gray-600">
              Access new opportunities through our marketplace and networking
              tools
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Users className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">Professional Community</h3>
            <p className="text-gray-600">
              Connect with peers, share knowledge, and stay updated with
              industry trends
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Trusted by Laboratories Nationwide
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">Active Labs</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-blue-600">50</div>
              <div className="text-gray-600">States Covered</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-blue-600">1000+</div>
              <div className="text-gray-600">Successful Connections</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-blue-600">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-blue-600 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join the Network?
          </h2>
          <p className="text-xl mb-8">
            List your business and start connecting with peers and potential
            clients today.
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-blue-50"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;

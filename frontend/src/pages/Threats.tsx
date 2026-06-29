import ThreatFeed from '../components/threats/ThreatFeed';

export default function Threats() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Threat Intelligence</h1>
          <p className="text-lg text-gray-600">
            Real-time quantum computing and cryptography threat feed. Stay informed about the latest
            security advisories and breaches.
          </p>
        </div>

        {/* Main Content */}
        <ThreatFeed />
      </div>
    </div>
  );
}

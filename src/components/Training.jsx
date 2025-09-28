import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Cloud, Key, CheckCircle, Upload, Users, FileCheck, HelpCircle, Mail, ChevronRight, ChevronDown, Settings, Download, Folder } from 'lucide-react';
import ByghtLogo from '../assets/byght-logo.svg';
import VideoSection from './VideoSection';

const Training = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // FAQ collapse states
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };



  const toggleFaq = (faqId) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img src={ByghtLogo} alt="Byght Logo" className="h-10 w-auto" />
              <div className="hidden sm:block">
                <h1 className="text-xl font-semibold text-byght-gray">Training</h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-byght-gray hover:text-red-500 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-byght-gray p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3 pt-4">
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-byght-gray hover:text-red-500 transition-colors py-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content - ISMS SmartKit Training */}
      <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to ISMS SmartKit Training
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master the fundamentals of Information Security Management Systems with our comprehensive training program designed for modern organizations.
            </p>
          </div>

          {/* Introduction Video */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Upload className="text-byght-turquoise" size={28} />
              Introduction Video
            </h2>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <VideoSection />
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <CheckCircle className="text-green-500" size={28} />
              What You'll Learn
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Core ISMS Concepts</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Understanding ISO 27001 framework</li>
                  <li>• Risk assessment methodologies</li>
                  <li>• Security controls implementation</li>
                  <li>• Continuous improvement processes</li>
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Practical Skills</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• SmartKit navigation and usage</li>
                  <li>• Document management best practices</li>
                  <li>• Compliance tracking techniques</li>
                  <li>• Team collaboration workflows</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Training Modules */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FileCheck className="text-byght-turquoise" size={28} />
              Training Modules
            </h2>
            
            <div className="space-y-8">
              {/* Module 1 */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-byght-turquoise text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">ISMS Fundamentals</h3>
                    <p className="text-gray-600 mb-4">
                      Learn the essential concepts of Information Security Management Systems, including key principles, benefits, and implementation strategies.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>📚 45 minutes</span>
                      <span>🎯 Beginner</span>
                      <span>📋 3 exercises</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 2 */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-byght-turquoise text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">SmartKit Navigation</h3>
                    <p className="text-gray-600 mb-4">
                      Master the SmartKit interface, learn to navigate through different sections, and understand the organizational structure of your ISMS documentation.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>📚 30 minutes</span>
                      <span>🎯 Beginner</span>
                      <span>📋 2 exercises</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 3 */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-byght-turquoise text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Risk Management</h3>
                    <p className="text-gray-600 mb-4">
                      Dive deep into risk assessment processes, learn to identify threats and vulnerabilities, and implement effective risk mitigation strategies.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>📚 60 minutes</span>
                      <span>🎯 Intermediate</span>
                      <span>📋 4 exercises</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Module 4 */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-byght-turquoise text-white rounded-full flex items-center justify-center font-bold text-lg">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Implementation & Monitoring</h3>
                    <p className="text-gray-600 mb-4">
                      Learn how to implement security controls, monitor compliance, and maintain continuous improvement in your ISMS processes.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>📚 50 minutes</span>
                      <span>🎯 Advanced</span>
                      <span>📋 5 exercises</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Settings className="text-byght-turquoise" size={28} />
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-blue-600" size={32} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Interactive Learning</h3>
                <p className="text-gray-600 text-sm">
                  Hands-on exercises and real-world scenarios to enhance your understanding
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileCheck className="text-green-600" size={32} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Practical Application</h3>
                <p className="text-gray-600 text-sm">
                  Apply concepts directly in your SmartKit environment with guided tutorials
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="text-purple-600" size={32} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Resource Library</h3>
                <p className="text-gray-600 text-sm">
                  Access templates, checklists, and reference materials for ongoing support
                </p>
              </div>
            </div>
          </div>

          {/* Need help? */}
          <div className="mb-8 border-t pt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Mail className="text-byght-turquoise" size={24} />
              Need help?
            </h2>
            <p className="text-gray-600">
              We're happy to help.
            </p>
            <p className="mt-3">
              <strong className="text-gray-800">📧 Contact us:</strong>{' '}
              <a href="mailto:Fragen@byght.io" className="text-byght-turquoise hover:text-byght-turquoise/80 font-medium">
                Fragen@byght.io
              </a>
            </p>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-200 mb-8"></div>

          {/* Sample Questions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <HelpCircle className="text-blue-500" size={24} />
              Sample Questions
            </h2>
            
            <div className="space-y-3">
              {/* Sample Question 1 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq('sample1')}
                  className="w-full px-5 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <h3 className="font-semibold text-gray-800">
                    Sample Question 1
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    {expandedFaq === 'sample1' ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {expandedFaq === 'sample1' && (
                  <div className="px-5 pb-4 bg-gray-50">
                    <p className="text-gray-600">
                      Sample Answer 1
                    </p>
                  </div>
                )}
              </div>

              {/* Sample Question 2 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq('sample2')}
                  className="w-full px-5 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <h3 className="font-semibold text-gray-800">
                    Sample Question 2
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    {expandedFaq === 'sample2' ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {expandedFaq === 'sample2' && (
                  <div className="px-5 pb-4 bg-gray-50">
                    <p className="text-gray-600">
                      Sample Answer 2
                    </p>
                  </div>
                )}
              </div>

              {/* Sample Question 3 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq('sample3')}
                  className="w-full px-5 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <h3 className="font-semibold text-gray-800">
                    Sample Question 3
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    {expandedFaq === 'sample3' ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {expandedFaq === 'sample3' && (
                  <div className="px-5 pb-4 bg-gray-50">
                    <p className="text-gray-600">
                      Sample Answer 3
                    </p>
                  </div>
                )}
              </div>

              {/* Sample Question 4 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq('sample4')}
                  className="w-full px-5 py-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <h3 className="font-semibold text-gray-800">
                    Sample Question 4
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    {expandedFaq === 'sample4' ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </button>
                {expandedFaq === 'sample4' && (
                  <div className="px-5 pb-4 bg-gray-50">
                    <p className="text-gray-600">
                      Sample Answer 4
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Training;

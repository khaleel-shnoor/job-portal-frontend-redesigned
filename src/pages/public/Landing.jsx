import Navbar from "../../components/Navbar";
import { Briefcase, Users, Building2, CheckCircle } from "lucide-react";
import wcu from "../../assets/hero.jpg";
import herobg from "../../assets/hero.avif";
import partner1 from "./partners/our_partners1.png";
import partner2 from "./partners/our_partners2.png";
import partner3 from "./partners/our_partners3.png";
import partner4 from "./partners/our_partners4.png";

export default function Landing() {
  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)]">

      <Navbar />

      {/* HERO (BACKGROUND IMAGE STYLE) */}
      <section className="relative h-[100vh] flex items-center justify-center text-center">
        
        {/* Background Image */}
        <img
          src={herobg}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Your Career Starts Here
          </h1>

          <p className="mt-4 text-lg text-gray-200">
            Connect with top companies and unlock opportunities that shape your future.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <a
              href="/register"
              className="px-6 py-3 bg-[var(--color-accent)] text-black font-semibold rounded-lg"
            >
              Get Started
            </a>

            <a
              href="/login"
              className="px-6 py-3 border border-white text-white rounded-lg"
            >
              Login
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-16 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">About Our Platform</h2>
        <p className="text-[var(--text-secondary)]">
          We bridge the gap between talented individuals and leading companies.
          Our platform simplifies job search and recruitment with a seamless experience.
        </p>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-6 bg-[var(--bg-secondary)]">
        <h2 className="text-3xl font-bold text-center mb-10">
          What We Provide
        </h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          
          <div className="p-6 bg-white rounded-xl shadow">
            <Briefcase className="text-[var(--color-primary)] mb-4" />
            <h3 className="font-semibold text-lg">Jobs for Everyone</h3>
            <p className="text-[var(--text-secondary)] mt-2">
              Discover jobs tailored to your skills and interests.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            <Users className="text-[var(--color-primary)] mb-4" />
            <h3 className="font-semibold text-lg">Easy Hiring</h3>
            <p className="text-[var(--text-secondary)] mt-2">
              Employers can find and hire the best talent quickly.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            <Building2 className="text-[var(--color-primary)] mb-4" />
            <h3 className="font-semibold text-lg">Trusted Companies</h3>
            <p className="text-[var(--text-secondary)] mt-2">
              Work with verified companies from various industries.
            </p>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left */}
        <div>
          <h2 className="text-3xl font-bold mb-6">
            Why Choose Us
          </h2>

          <ul className="space-y-4">
            <li className="flex gap-2 items-center">
              <CheckCircle className="text-[var(--color-primary)]" />
              Simple and fast job application process
            </li>

            <li className="flex gap-2 items-center">
              <CheckCircle className="text-[var(--color-primary)]" />
              Verified job listings
            </li>

            <li className="flex gap-2 items-center">
              <CheckCircle className="text-[var(--color-primary)]" />
              Dedicated dashboards for all roles
            </li>

            <li className="flex gap-2 items-center">
              <CheckCircle className="text-[var(--color-primary)]" />
              Seamless communication with employers
            </li>
          </ul>
        </div>

        {/* Right Image */}
        <img src={wcu} className="rounded-xl shadow" />
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center bg-[var(--color-primary)] text-white">
        <h2 className="text-3xl font-bold mb-4">
          Take the Next Step in Your Career
        </h2>

        <p className="mb-6">
          Join thousands of professionals and companies today.
        </p>

        <a
          href="/register"
          className="px-6 py-3 bg-[var(--color-accent)] text-black rounded-lg font-semibold"
        >
          Join Now
        </a>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--bg-secondary)] pt-16 pb-8 border-t border-[var(--border-color)]">
        
        {/* OUR PARTNERS */}
        <div className="max-w-7xl mx-auto px-6 mb-12 border-b border-[var(--border-color)] pb-12">
          <h3 className="text-center font-bold text-[var(--text-primary)] text-xl mb-8 uppercase tracking-wider">Our Partners</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-100 hover:opacity-100 transition-opacity duration-300">
            <img src={partner1} alt="Partner 1" className="h-12 object-contain" />
            <img src={partner2} alt="Partner 2" className="h-12 object-contain" />
            <img src={partner3} alt="Partner 3" className="h-12 object-contain" />
            <img src={partner4} alt="Partner 4" className="h-12 object-contain" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Description */}
          <div className="lg:col-span-1 bg-[var(--color-primary)] p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">Shnoor International</h2>
            <p className="text-sm text-white leading-relaxed">
              Connecting top talent with world-class companies. Your next big career move starts right here.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-[var(--text-primary)] mb-4">Other Services</h3>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Cloud Management</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Enterprise Management</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Data & Artificial-Intelligence</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Consulting-and-Staffing</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Background Verification</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Health Care</a></li>
            </ul>
          </div>

          {/* Quick Links - Candidates */}
          <div>
            <h3 className="font-bold text-[var(--text-primary)] mb-4">For Candidates</h3>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li><a href="/login" className="hover:text-[var(--color-primary)] transition-colors">Browse Jobs</a></li>
              <li><a href="/login" className="hover:text-[var(--color-primary)] transition-colors">Candidate Login</a></li>
              <li><a href="/register" className="hover:text-[var(--color-primary)] transition-colors">Create Resume</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Job Alerts</a></li>
            </ul>
          </div>

          {/* Quick Links - Employers */}
          <div>
            <h3 className="font-bold text-[var(--text-primary)] mb-4">For Employers</h3>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li><a href="/login" className="hover:text-[var(--color-primary)] transition-colors">Post a Job</a></li>
              <li><a href="/login" className="hover:text-[var(--color-primary)] transition-colors">Employer Login</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Recruiting Solutions</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold text-[var(--text-primary)] mb-4">Connect With Us</h3>
            <div className="flex gap-4 mb-6">
              
              
              <a href="https://www.linkedin.com/company/shnoor-international/" className="text-[var(--text-secondary)] hover:text-[var(--color-accent)] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              
              <a href="#" className="text-[var(--text-secondary)] hover:text-green-500 transition-colors" title="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </a>
            </div>
            <h3 className="font-bold text-[var(--text-primary)] mb-4">Contacts</h3>
            <p className="text-sm text-[var(--text-secondary)]">📧info@shnoor.com (General)</p>
            <p className="text-sm text-[var(--text-secondary)]">📧proc@shnoor.com (Sales)</p>
          </div>
        </div>

        {/* Location Section */}
        <div className="max-w-7xl mx-auto px-6 mt-12 flex flex-col items-center text-center">
          <h3 className="font-bold text-[var(--text-primary)] text-lg mb-2">Location</h3>
          <p className="text-[var(--text-secondary)] flex items-center justify-center gap-2">
            <span className="text-xl">📍</span>
            <span>10009 Mount Tabor Road, Odessa Missouri, United States.</span>
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--text-secondary)]">© {new Date().getFullYear()} Shnoor International LLC. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-[var(--text-secondary)]">
            <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
import Navbar from "../../components/Navbar";
import { Briefcase, Users, Building2, CheckCircle } from "lucide-react";
import herobg from "../../assets/hero.avif";

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
        {/* <img src="/hero.png" className="rounded-xl shadow" /> */}
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
      <footer className="py-6 text-center text-sm text-[var(--text-secondary)] border-t border-[var(--border-color)]">
        © 2026 JobPortal. All rights reserved.
      </footer>

    </div>
  );
}
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Metadata } from "next";

const faqs = [
  {
    category: "General",
    questions: [
      {
        question: "What is ITEDA Solutions?",
        answer:
          "ITEDA Solutions is an IoT technology company focused on transforming agriculture through innovative solutions. We specialize in solar-powered crop drying systems and payment integration tools for agricultural businesses.",
      },
      {
        question: "Where are you located?",
        answer:
          "We are based in Kenya and serve agricultural communities across East Africa. We also provide remote support and installation services in multiple regions.",
      },
    ],
  },
  {
    category: "Smart Solar Crop Dryer",
    questions: [
      {
        question: "How does the Smart Solar Crop Dryer work?",
        answer:
          "Our crop dryer uses solar panels to power automated ventilation and climate control systems. Sensors monitor temperature and humidity in real-time, adjusting airflow to ensure optimal drying conditions while preserving crop quality.",
      },
      {
        question: "What types of crops can be dried?",
        answer:
          "The system is versatile and can dry grains (maize, rice, wheat), fruits (mangoes, bananas), vegetables, coffee beans, herbs, and spices. Each crop type can have customized drying profiles.",
      },
      {
        question: "How much does it cost?",
        answer:
          "Pricing varies based on capacity and features. Contact our sales team for a customized quote based on your specific needs.",
      },
      {
        question: "Is installation included?",
        answer:
          "Yes, professional installation and training are included with every purchase. Our team will set up the system and train your staff on proper operation and maintenance.",
      },
    ],
  },
  {
    category: "bridGe Payment Add-on",
    questions: [
      {
        question: "What is bridGe?",
        answer:
          "bridGe is a Google Forms add-on that enables you to collect payments directly within your forms. It's perfect for agricultural businesses accepting orders, bookings, or rental payments.",
      },
      {
        question: "What payment methods are supported?",
        answer:
          "bridGe supports M-Pesa, Visa, Mastercard, bank transfers, and other local payment methods. Multi-currency support is available for international transactions.",
      },
      {
        question: "Are there transaction fees?",
        answer:
          "Yes, bridGe charges 2.5% + KES 10 per transaction. This covers payment processing, security, and platform maintenance.",
      },
      {
        question: "How do I get started with bridGe?",
        answer:
          "Simply install the add-on from the Google Workspace Marketplace, connect your payment account, and add payment fields to your forms. No coding required!",
      },
    ],
  },
  {
    category: "Support & Maintenance",
    questions: [
      {
        question: "What kind of support do you provide?",
        answer:
          "We offer email, phone, and live chat support. For hardware products, we also provide on-site maintenance and emergency repair services.",
      },
      {
        question: "Do you offer training?",
        answer:
          "Yes, comprehensive training is included with all product purchases. We also offer ongoing workshops and webinars for existing customers.",
      },
      {
        question: "What is your warranty policy?",
        answer:
          "All hardware products come with a 2-year warranty covering manufacturing defects. Extended warranty options are available for purchase.",
      },
    ],
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-black/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left transition-colors hover:text-accent"
        aria-expanded={isOpen}
      >
        <span className="pr-4 font-medium text-primary">{question}</span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pb-4 text-black/70">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold text-primary">
            Frequently Asked Questions
          </h1>
          <p className="mb-12 text-lg text-black/70">
            Find answers to common questions about our products and services.
          </p>

          <div className="space-y-12">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="mb-6 text-2xl font-bold text-primary">
                  {category.category}
                </h2>
                <div className="divide-y divide-black/10 rounded-lg border border-black/10 bg-white">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="px-6">
                      <FAQItem question={faq.question} answer={faq.answer} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-lg bg-black/5 p-8 text-center">
            <h3 className="mb-4 text-xl font-bold text-primary">
              Still have questions?
            </h3>
            <p className="mb-6 text-black/70">
              Can't find the answer you're looking for? Get in touch with our
              support team.
            </p>
            <a
              href="/#contact"
              className="inline-block rounded-md bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-black/90"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
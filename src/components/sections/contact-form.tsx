"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate form submission
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="relative bg-gradient-to-b from-white to-green-50/30 py-16 md:py-24 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl animate-pulse-slow" />
      <div className="absolute -left-20 bottom-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}} />
      
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          <div className="mb-12 text-center animate-slide-up">
            <h2 className="mb-4 text-3xl font-bold text-text md:text-4xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Get in Touch
            </h2>
            <p className="text-lg text-text-light">
              Have questions about our products? We'd love to hear from you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in animate-delay-200">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Your name"
                disabled={status === "submitting"}
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="your@email.com"
                disabled={status === "submitting"}
              />
            </div>

            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Tell us about your needs..."
                disabled={status === "submitting"}
                rows={6}
              />
            </div>

            {status === "success" && (
              <div
                className="rounded-md bg-success/10 p-4 text-sm text-success"
                role="alert"
                aria-live="polite"
              >
                Thank you! We'll get back to you soon.
              </div>
            )}

            {status === "error" && (
              <div
                className="rounded-md bg-danger/10 p-4 text-sm text-danger"
                role="alert"
                aria-live="polite"
              >
                Something went wrong. Please try again.
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={status === "submitting"}
              size="lg"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
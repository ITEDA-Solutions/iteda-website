"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, Loader2, Mail, User, Building, Phone, MessageSquare } from "lucide-react";

// Declare Turnstile on window
declare global {
  interface Window {
    turnstile?: {
      render: (element: string | HTMLElement, options: any) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [captchaWidgetId, setCaptchaWidgetId] = useState<string>("");
  const captchaRef = useRef<HTMLDivElement>(null);

  // Load Cloudflare Turnstile script
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    
    if (!siteKey) {
      console.warn('NEXT_PUBLIC_TURNSTILE_SITE_KEY not configured');
      return;
    }

    // Load Turnstile script
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.turnstile && captchaRef.current) {
        const widgetId = window.turnstile.render(captchaRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            setCaptchaToken(token);
          },
          'error-callback': () => {
            setCaptchaToken("");
          },
          theme: 'light',
        });
        setCaptchaWidgetId(widgetId);
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (window.turnstile && captchaWidgetId) {
        window.turnstile.remove(captchaWidgetId);
      }
    };
  }, []);

  // Validate field
  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.length < 2) return "Name must be at least 2 characters";
        if (value.length > 100) return "Name is too long";
        break;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email address";
        break;
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.length < 10) return "Message must be at least 10 characters";
        if (value.length > 2000) return "Message is too long (max 2000 characters)";
        break;
      case "company":
        if (value.length > 100) return "Company name is too long";
        break;
      case "phone":
        if (value.length > 20) return "Phone number is too long";
        break;
      case "subject":
        if (value.length > 200) return "Subject is too long";
        break;
    }
    return undefined;
  };

  // Handle input change with validation
  const handleChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle blur event for field validation
  const handleBlur = (name: keyof FormData) => {
    const error = validateField(name, formData[name]);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset messages
    setErrorMessage("");
    setSuccessMessage("");
    
    // Validate form
    if (!validateForm()) {
      setErrorMessage("Please fix the errors in the form");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          captchaToken: captchaToken || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setSuccessMessage(data.message || "Thank you! We'll get back to you soon.");
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          subject: "",
          message: "",
        });
        
        // Reset CAPTCHA
        if (window.turnstile && captchaWidgetId) {
          window.turnstile.reset(captchaWidgetId);
        }
        setCaptchaToken("");
        
        // Reset status after 5 seconds
        setTimeout(() => {
          setStatus("idle");
          setSuccessMessage("");
        }, 5000);
      } else {
        setStatus("error");
        
        if (response.status === 429) {
          setErrorMessage(`Too many requests. Please try again in ${data.resetIn || 60} seconds.`);
        } else if (data.details) {
          // Validation errors from server
          setErrors(data.details);
          setErrorMessage("Please fix the errors in the form");
        } else {
          setErrorMessage(data.error || "Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section id="contact" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-primary md:text-4xl">
              Get in Touch
            </h2>
            <p className="text-lg text-black/70">
              Have questions about our products? We'd love to hear from you.
              Send us a message and we'll respond within 24-48 hours.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Name Field */}
            <div>
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Name *
              </Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                placeholder="John Doe"
                disabled={status === "submitting"}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                placeholder="john@example.com"
                disabled={status === "submitting"}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Company and Phone (Optional) */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="company" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Company (Optional)
                </Label>
                <Input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  onBlur={() => handleBlur("company")}
                  placeholder="Your Company"
                  disabled={status === "submitting"}
                  className={errors.company ? "border-red-500" : ""}
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-red-500">{errors.company}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone (Optional)
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  placeholder="+254 700 000 000"
                  disabled={status === "submitting"}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Subject (Optional) */}
            <div>
              <Label htmlFor="subject" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Subject (Optional)
              </Label>
              <Input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                onBlur={() => handleBlur("subject")}
                placeholder="What can we help you with?"
                disabled={status === "submitting"}
                className={errors.subject ? "border-red-500" : ""}
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                onBlur={() => handleBlur("message")}
                placeholder="Tell us about your needs, questions, or how we can help..."
                disabled={status === "submitting"}
                rows={6}
                className={errors.message ? "border-red-500" : ""}
              />
              <div className="mt-1 flex items-center justify-between">
                {errors.message ? (
                  <p className="text-sm text-red-500">{errors.message}</p>
                ) : (
                  <p className="text-sm text-black/50">
                    {formData.message.length}/2000 characters
                  </p>
                )}
              </div>
            </div>

            {/* CAPTCHA */}
            {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
              <div ref={captchaRef} className="flex justify-center"></div>
            )}

            {/* Error Message */}
            {(status === "error" || errorMessage) && (
              <div
                className="flex items-start gap-3 rounded-lg bg-red-50 p-4 text-sm text-red-600"
                role="alert"
                aria-live="polite"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p>{errorMessage || "Something went wrong. Please try again."}</p>
              </div>
            )}

            {/* Success Message */}
            {(status === "success" || successMessage) && (
              <div
                className="flex items-start gap-3 rounded-lg bg-green-50 p-4 text-sm text-green-600"
                role="alert"
                aria-live="polite"
              >
                <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Message sent successfully!</p>
                  <p>{successMessage || "Thank you! We'll get back to you soon."}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={status === "submitting"}
              size="lg"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>

            <p className="text-center text-sm text-black/50">
              * Required fields
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

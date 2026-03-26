"use client";

import { useState } from "react";

export type Form = {
  _type: "form";
  title?: string;
  heading?: string;
  headingEn?: string;
  subheading?: string;
  subheadingEn?: string;
  text1?: string;
  text1En?: string;
  text?: string;
  textEn?: string;
  settings?: {
    contactInfo?: {
      email?: string;
    };
  };
  items?: Array<{
    type?: "email" | "message" | "phone" | "text";
    title?: string;
    titleEn?: string;
    placeholder?: string;
    placeholderEn?: string;
    _type: "formItems";
    _key: string;
  }>;
};

type FormProps = {
  block: Form;
  index: number;
  lang?: "es" | "en";
};

const translations = {
  es: {
    nameLabel: "Nombre",
    namePlaceholder: "Ingresa tu nombre",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "Ingresa tu correo",
    messageLabel: "Mensaje",
    messagePlaceholder: "Ingresa tu mensaje",
    send: "ENVIAR",
    sending: "ENVIANDO...",
    successTitle: "¡Mensaje enviado!",
    successMessage: "Hemos recibido tu mensaje y te contactaremos pronto.",
    errorTitle: "Error",
    errorMessage: "Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo.",
  },
  en: {
    nameLabel: "Name",
    namePlaceholder: "Enter your name",
    emailLabel: "Email address",
    emailPlaceholder: "Enter your email",
    messageLabel: "Message",
    messagePlaceholder: "Enter your message",
    send: "SEND",
    sending: "SENDING...",
    successTitle: "Message sent!",
    successMessage: "We've received your message and will be in touch shortly.",
    errorTitle: "Error",
    errorMessage: "There was a problem sending your message. Please try again.",
  },
};

export default function Form({ block, lang = "es" }: FormProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  if (!block) return null;

  const heading = lang === "en" && block.headingEn ? block.headingEn : block.heading;
  const subheading = lang === "en" && block.subheadingEn ? block.subheadingEn : block.subheading;
  const text1 = lang === "en" && block.text1En ? block.text1En : block.text1;
  const text = lang === "en" && block.textEn ? block.textEn : block.text;
  const t = translations[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formValues: formData }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="section w-full">
      <div className="flex-col md:grid md:grid-cols-2 md:gap-8 mx-auto w-full max-w-[1900px] px-4 py-6 md:px-8 md:py-10">
        <div className="mb-14">
          {heading && (
          <h5 className="text-primary text-sm reveal uppercase mb-4 font-medium lg:text-1xl">{heading}</h5>
          )}
          {subheading && (
          <h1 className="font-display text-primary max-w-3xl text-balance font-display text-5xl md:text-6xl lg:text-7xl mt-4 mb-4 reveal uppercase">{subheading}</h1>
          )}
          {text1 && (
          <p className="max-w-sm mb-2 md:text-1xl lg:text-2xl">{text1}</p>
          )}
          {block.settings?.contactInfo?.email && (
          <a href={`mailto:${block.settings.contactInfo.email}`} className="text-primary md:text-1xl lg:text-3xl">{block.settings.contactInfo.email}</a>
          )}
        </div>

        <div>
          {text && submitStatus !== "success" && (
            <div className="md:text-1xl lg:text-2xl">{text}</div>
          )}

          {submitStatus === "success" ? (
            <div className="mt-16 flex flex-col items-center justify-center text-center py-16 md:py-24">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"/>
                </svg>
              </div>
              <h3 className="font-display text-primary text-3xl md:text-4xl uppercase mb-4">{t.successTitle}</h3>
              <p className="text-gray-600 md:text-lg max-w-sm">{t.successMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-16 space-y-6 md:mt-16 md:space-y-8">
              <div className="flex flex-col gap-2">
                <div className="md:text-1xl lg:text-2xl font-medium uppercase">{t.nameLabel}</div>
                <input
                  type="text"
                  required
                  placeholder={t.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="md:text-1xl lg:text-2xl bg-transparent border-b"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="md:text-1xl lg:text-2xl font-medium uppercase">{t.emailLabel}</div>
                <input
                  type="email"
                  required
                  placeholder={t.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="md:text-1xl lg:text-2xl bg-transparent border-b"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="md:text-1xl lg:text-2xl font-medium uppercase">{t.messageLabel}</div>
                <textarea
                  required
                  placeholder={t.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  className="md:text-1xl lg:text-2xl bg-transparent border-b"
                />
              </div>

              {submitStatus === "error" && (
                <div className="rounded bg-red-50 p-4 text-red-800">
                  <p className="font-medium">{t.errorTitle}</p>
                  <p className="text-sm">{t.errorMessage}</p>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="send-btn text-primary mb-14 p-2 w-72 hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? t.sending : t.send}{" "}
                  <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 5.31836L12.8681 10.3184M17 5.31836L12.8681 0.318359M17 5.31836L2.5828e-07 5.31836" stroke="currentColor"/>
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

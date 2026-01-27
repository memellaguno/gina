"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

type ContactFormProps = {
  lang?: "es" | "en";
};

const translations = {
  es: {
    namePlaceholder: "Ingresa tu nombre",
    emailPlaceholder: "Ingresa tu email",
    messagePlaceholder: "Ingresa tu mensaje",
    nameLabel: "NOMBRE",
    emailLabel: "CORREO ELECTRÓNICO",
    messageLabel: "MENSAJE",
    sendButton: "ENVIAR",
    sending: "ENVIANDO...",
    successTitle: "¡Mensaje enviado!",
    successMessage: "Hemos recibido tu mensaje y te contactaremos pronto.",
    errorTitle: "Error",
    errorMessage: "Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo.",
  },
  en: {
    namePlaceholder: "Enter your name",
    emailPlaceholder: "Enter your email",
    messagePlaceholder: "Enter your message",
    nameLabel: "NAME",
    emailLabel: "EMAIL ADDRESS",
    messageLabel: "MESSAGE",
    sendButton: "SEND",
    sending: "SENDING...",
    successTitle: "Message sent!",
    successMessage: "We've received your message and will be in touch shortly.",
    errorTitle: "Error",
    errorMessage: "There was a problem sending your message. Please try again.",
  },
};

export default function ContactForm({ lang = "es" }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const t = translations[lang];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formValues: data }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block font-medium text-gray-700 mb-2 md:text-lg">
          {t.nameLabel}
        </label>
        <input
          type="text"
          id="name"
          placeholder={t.namePlaceholder}
          className="w-full border-b border-gray-300 py-2 text-lg focus:border-secondary focus:outline-none transition-colors"
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block font-medium text-gray-700 mb-2 md:text-lg">
          {t.emailLabel}
        </label>
        <input
          type="email"
          id="email"
          placeholder={t.emailPlaceholder}
          className="w-full border-b border-gray-300 py-2 text-lg focus:border-secondary focus:outline-none transition-colors"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block font-medium text-gray-700 mb-2 md:text-lg">
          {t.messageLabel}
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder={t.messagePlaceholder}
          className="w-full border-b border-gray-300 py-2 text-lg focus:border-secondary focus:outline-none transition-colors resize-none"
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {submitStatus === "success" && (
        <div className="rounded bg-green-50 p-4 text-green-800">
          <p className="font-medium">{t.successTitle}</p>
          <p className="text-sm">{t.successMessage}</p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="rounded bg-red-50 p-4 text-red-800">
          <p className="font-medium">{t.errorTitle}</p>
          <p className="text-sm">{t.errorMessage}</p>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 border border-secondary px-8 py-3 text-secondary font-medium transition-colors hover:bg-secondary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t.sending : t.sendButton}
          <svg
            width="18"
            height="11"
            viewBox="0 0 18 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 5.31836L12.8681 10.3184M17 5.31836L12.8681 0.318359M17 5.31836L2.5828e-07 5.31836"
              stroke="currentColor"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

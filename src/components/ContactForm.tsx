"use client";

import { useState } from "react";
import { AlertCircle, Check } from "lucide-react";

/* Submissions open a pre-filled WhatsApp chat rather than posting anywhere, so
   there is no backend, no storage and nothing to maintain server-side. */
const WHATSAPP_NUMBER = "60173720090"; // country code + number, digits only

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.07-.8.38-.28.3-1.05 1.02-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.47 9.47 0 0 1-4.83-1.32l-.35-.2-3.59.94.96-3.5-.23-.36a9.44 9.44 0 0 1-1.45-5.05c0-5.22 4.26-9.47 9.5-9.47 2.54 0 4.92.99 6.71 2.78a9.4 9.4 0 0 1 2.78 6.7c0 5.22-4.26 9.48-9.49 9.48zM20.5 3.49A11.82 11.82 0 0 0 12.04 0C5.5 0 .18 5.31.17 11.84c0 2.09.55 4.13 1.59 5.93L.07 24l6.37-1.67a11.9 11.9 0 0 0 5.6 1.42h.01c6.53 0 11.85-5.31 11.86-11.84a11.77 11.77 0 0 0-3.47-8.42z" />
    </svg>
  );
}

type Fields = { name: string; email: string; phone: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", email: "", phone: "", message: "" };

/* Deliberately permissive: something@something.tld, no exotic edge cases. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate({ name, email, phone, message }: Fields): Errors {
  const errors: Errors = {};

  if (!name.trim()) errors.name = "Please enter your name.";
  if (!email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL.test(email.trim())) errors.email = "That doesn't look like a valid email.";
  /* Phone is optional, but if given it should look like a phone number. */
  if (phone.trim() && !/^[\d+()\-.\s]{6,}$/.test(phone.trim()))
    errors.phone = "That doesn't look like a valid phone number.";
  if (!message.trim()) errors.message = "Please tell us how we can help.";
  else if (message.trim().length < 10) errors.message = "Please add a little more detail.";

  return errors;
}

const fieldClass =
  "w-full rounded-xl border bg-ink-deep/50 px-4 py-3 text-sm text-white placeholder:text-muted-dim transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber/40";

const labelClass =
  "mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted";

export default function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const update = (field: keyof Fields) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    /* Clear a field's error as soon as the user starts fixing it. */
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const text = `Hi OVM, my name is ${values.name}.\n\nEmail: ${values.email}\nPhone: ${values.phone}\n\nMessage:\n${values.message}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );

    setStatus("sent");
    setValues(EMPTY);
  };

  if (status === "sent") {
    return (
      <div className="flex min-h-[26rem] flex-col items-center justify-center rounded-[18px] border border-line bg-surface p-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-amber/30 bg-amber/10 text-amber">
          <Check size={28} />
        </span>
        <h3 className="mt-6 font-display text-xl font-bold tracking-[-0.02em] text-white">
          WhatsApp opened
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Your message is pre-filled in WhatsApp — press send there and our team will get
          back to you. If the tab did not open, check your pop-up blocker.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 rounded-full border border-line bg-surface-2 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-amber/55"
        >
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-[18px] border border-line bg-surface p-7 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          placeholder="Your full name"
          value={values.name}
          error={errors.name}
          onChange={update("name")}
        />
        <Field
          id="email"
          type="email"
          label="Email"
          placeholder="you@company.com"
          value={values.email}
          error={errors.email}
          onChange={update("email")}
        />
      </div>

      <div className="mt-5">
        <Field
          id="phone"
          type="tel"
          label="Phone"
          placeholder="Optional"
          value={values.phone}
          error={errors.phone}
          onChange={update("phone")}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={update("message")}
          placeholder="Tell us about your project or enquiry"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${fieldClass} resize-y ${
            errors.message ? "border-red-400/60" : "border-line focus:border-navy-300/50"
          }`}
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      <button
        type="submit"
        className="group relative mt-7 inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-amber to-amber-400 px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_10px_30px_-10px_rgba(245,148,31,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-10px_rgba(245,148,31,0.85)] sm:w-auto"
      >
        <WhatsAppIcon size={17} />
        Send via WhatsApp
      </button>

      <p className="mt-4 text-xs leading-relaxed text-muted-dim">
        Opens WhatsApp in a new tab with your details already filled in.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
}: {
  id: keyof Fields;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${fieldClass} ${
          error ? "border-red-400/60" : "border-line focus:border-navy-300/50"
        }`}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} role="alert" className="mt-2 flex items-center gap-1.5 text-xs text-red-300">
      <AlertCircle size={13} className="shrink-0" />
      {message}
    </p>
  );
}

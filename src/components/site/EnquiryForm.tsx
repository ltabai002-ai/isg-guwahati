import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  grade: z.string().trim().min(1, "Please choose an entering stage"),
  parent: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(7, "Please enter a phone number we can call").max(20),
  email: z.string().trim().email("Please enter a valid email address").max(120),
  message: z.string().trim().max(600).optional(),
});

const STAGES = [
  "Cambridge Early Years (3–6)",
  "Cambridge Primary (5–11)",
  "Cambridge Lower Secondary (11–14)",
  "Upper Secondary / IGCSE (14–16)",
  "Advanced / AS & A Level (16–19)",
  "Not sure yet",
];

export function EnquiryForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
    toast.success("Thank you — we'll call you back today.");
  };

  const field =
    "w-full rounded-md border border-border bg-card px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none";

  if (sent) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <h3 className="font-serif text-2xl text-primary">Thank you — your enquiry is with us.</h3>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          One of our admissions team will call you back the same day to arrange a campus visit at a
          time that suits your family.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor="grade" className="mb-1.5 block text-[13px] font-semibold text-primary">
          Which stage is your child entering?
        </label>
        <select id="grade" name="grade" defaultValue="" className={field}>
          <option value="" disabled>
            Choose a stage
          </option>
          {STAGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.grade && <p className="mt-1 text-xs text-destructive">{errors.grade}</p>}
      </div>

      <div>
        <label htmlFor="parent" className="mb-1.5 block text-[13px] font-semibold text-primary">
          Parent's name
        </label>
        <input id="parent" name="parent" className={field} placeholder="Your full name" />
        {errors.parent && <p className="mt-1 text-xs text-destructive">{errors.parent}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-[13px] font-semibold text-primary">
          Phone
        </label>
        <input id="phone" name="phone" type="tel" className={field} placeholder="+91" />
        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="email" className="mb-1.5 block text-[13px] font-semibold text-primary">
          Email
        </label>
        <input id="email" name="email" type="email" className={field} placeholder="you@email.com" />
        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="mb-1.5 block text-[13px] font-semibold text-primary">
          Anything you'd like us to know about your child?
        </label>
        <textarea id="message" name="message" rows={4} className={field} />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="w-full rounded-full bg-accent px-8 py-3.5 text-[15px] font-semibold text-accent-foreground transition-transform duration-200 hover:scale-[1.01] sm:w-auto"
        >
          Request a call back
        </button>
        <p className="mt-3 text-xs text-muted-foreground">
          Fees are shared on request. Sibling discounts available.
        </p>
      </div>
    </form>
  );
}

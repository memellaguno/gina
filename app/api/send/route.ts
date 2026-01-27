import { ContactEmailTemplate } from "@/components/email/ContactEmailTemplate";
import { CONTACT_EMAIL_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend only when API key is available
const getResend = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  return new Resend(process.env.RESEND_API_KEY);
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formValues } = body;

    if (!formValues) {
      return NextResponse.json(
        { error: "Form values are required" },
        { status: 400 }
      );
    }

    // Get receiver email from Sanity settings
    const { data: receiverEmail } = await sanityFetch({
      query: CONTACT_EMAIL_QUERY,
    });

    if (!receiverEmail) {
      console.error("No contact email configured in Sanity settings");
      return NextResponse.json(
        { error: "Contact email not configured" },
        { status: 500 }
      );
    }

    const resend = getResend();
    const { data, error } = await resend.emails.send({
      from: "Contact Form <forms@lazy.mx>",
      to: receiverEmail as string,
      subject: "New message from Gina Diez Barroso contact form",
      react: ContactEmailTemplate({ formValues }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

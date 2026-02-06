import * as React from "react";

interface ContactEmailTemplateProps {
  formValues: {
    name?: string;
    email?: string;
    message?: string;
    [key: string]: string | undefined;
  };
}

export const ContactEmailTemplate: React.FC<Readonly<ContactEmailTemplateProps>> = ({
  formValues,
}) => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ color: "#060F9F", borderBottom: "2px solid #060F9F", paddingBottom: "10px" }}>
        New Contact Form Submission
      </h1>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        You have received a new message from the contact form on ginadiezbarroso.com
      </p>
      <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px" }}>
        {Object.entries(formValues).map(([key, value]) => (
          <div key={key} style={{ marginBottom: "15px" }}>
            <strong style={{ color: "#060F9F", textTransform: "capitalize", display: "block" }}>
              {key}:
            </strong>
            <span style={{ color: "#333", whiteSpace: "pre-wrap" }}>{value}</span>
          </div>
        ))}
      </div>
      <p style={{ color: "#999", fontSize: "12px", marginTop: "20px" }}>
        This email was sent from the contact form at ginadiezbarroso.com
      </p>
    </div>
  );
};

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, message }: ContactEmailRequest = await req.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.error("Missing required fields:", { name: !!name, email: !!email, subject: !!subject, message: !!message });
      return new Response(
        JSON.stringify({ error: "Tous les champs obligatoires doivent être remplis" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Invalid email format:", email);
      return new Response(
        JSON.stringify({ error: "Format d'email invalide" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const smtpHost = Deno.env.get("SMTP_HOST");
    const smtpPort = parseInt(Deno.env.get("SMTP_PORT") || "587");
    const smtpUser = Deno.env.get("SMTP_USER");
    const smtpPassword = Deno.env.get("SMTP_PASSWORD");

    if (!smtpHost || !smtpUser || !smtpPassword) {
      console.error("Missing SMTP configuration");
      return new Response(
        JSON.stringify({ error: "Configuration SMTP manquante" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Connecting to SMTP server:", smtpHost, "port:", smtpPort);

    const client = new SMTPClient({
      connection: {
        hostname: smtpHost,
        port: smtpPort,
        tls: true,
        auth: {
          username: smtpUser,
          password: smtpPassword,
        },
      },
    });

    const phoneInfo = phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : "";

    const htmlContent = `
      <h2>Nouveau message de contact - Interim Online</h2>
      <hr />
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      ${phoneInfo}
      <p><strong>Sujet :</strong> ${subject}</p>
      <hr />
      <h3>Message :</h3>
      <p>${message.replace(/\n/g, "<br />")}</p>
      <hr />
      <p><em>Ce message a été envoyé depuis le formulaire de contact du site Interim Online.</em></p>
    `;

    console.log("Sending email to recrutement@interim-online.fr");

    await client.send({
      from: smtpUser,
      to: "recrutement@interim-online.fr",
      subject: `[Contact Site] ${subject}`,
      content: "auto",
      html: htmlContent,
      replyTo: email,
    });

    await client.close();

    console.log("Email sent successfully");

    return new Response(
      JSON.stringify({ success: true, message: "Email envoyé avec succès" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Erreur lors de l'envoi de l'email" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);

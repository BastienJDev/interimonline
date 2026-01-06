import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotifyRegistrationRequest {
  userType: "interimaire" | "entreprise";
  email: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userType, email, firstName, lastName, companyName }: NotifyRegistrationRequest = await req.json();

    if (!userType || !email) {
      return new Response(
        JSON.stringify({ error: "userType et email requis" }),
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

    console.log("Connecting to SMTP server for registration notification:", smtpHost);

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

    const typeLabel = userType === "entreprise" ? "Entreprise" : "Intérimaire";
    const name = userType === "entreprise" 
      ? companyName || "Non renseigné"
      : `${firstName || ""} ${lastName || ""}`.trim() || "Non renseigné";

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #E67E22; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .info-box { background: white; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #E67E22; }
          .label { font-weight: bold; color: #666; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 Nouvelle inscription</h1>
          </div>
          <div class="content">
            <h2>Un nouveau compte ${typeLabel} a été créé</h2>
            <div class="info-box">
              <p><span class="label">Type de compte :</span> ${typeLabel}</p>
              <p><span class="label">Nom :</span> ${name}</p>
              <p><span class="label">Email :</span> ${email}</p>
              <p><span class="label">Date :</span> ${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</p>
            </div>
            <p>Ce compte nécessite peut-être une validation dans le panneau d'administration.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Interim Online - Notification automatique</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await client.send({
      from: smtpUser,
      to: "recrutement@interim-online.fr",
      subject: `[Nouvelle inscription] ${typeLabel} - ${name}`,
      content: "auto",
      html: htmlContent,
    });

    await client.close();

    console.log("Registration notification sent for:", email);

    return new Response(
      JSON.stringify({ success: true, message: "Notification envoyée" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in notify-registration function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Erreur lors de l'envoi de la notification" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);

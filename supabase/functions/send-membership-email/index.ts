import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface MembershipForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  birthdate: string;
  message: string;
}

async function sendEmail(to: string, subject: string, htmlContent: string) {
  const client = new SmtpClient();

  await client.connectTLS({
    hostname: Deno.env.get("SMTP_HOST")!,
    port: parseInt(Deno.env.get("SMTP_PORT")!, 10),
    username: Deno.env.get("SMTP_USERNAME")!,
    password: Deno.env.get("SMTP_PASSWORD")!,
  });

  await client.send({
    from: "noreply@bhbv.de",
    to: to,
    subject: subject,
    content: "Diese E-Mail wird im HTML-Format angezeigt.",
    html: htmlContent,
  });

  await client.close();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: MembershipForm = await req.json();

    // E-Mail an die Organisation
    await sendEmail(
      "info@bhbv.de",
      "Neue Mitgliedsanfrage",
      `
        <h2>Neue Mitgliedsanfrage von ${formData.name}</h2>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Telefon:</strong> ${formData.phone}</p>
        <p><strong>Adresse:</strong> ${formData.address}</p>
        <p><strong>Geburtsdatum:</strong> ${formData.birthdate}</p>
        <p><strong>Nachricht:</strong> ${formData.message}</p>
      `
    );

    // Bestätigungsmail an den Antragsteller
    await sendEmail(
      formData.email,
      "Ihre Mitgliedsanfrage beim BHBV",
      `
        <h2>Vielen Dank für Ihre Anfrage, ${formData.name}!</h2>
        <p>Wir haben Ihre Mitgliedsanfrage erhalten und werden sie schnellstmöglich bearbeiten.</p>
        <p>Sie hören in Kürze von uns.</p>
        <br>
        <p>Mit freundlichen Grüßen</p>
        <p>Ihr BHBV-Team</p>
      `
    );

    return new Response(
      JSON.stringify({ message: "Anfrage erfolgreich versendet" }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error('Fehler beim E-Mail-Versand:', error);
    return new Response(
      JSON.stringify({ error: "Fehler beim Versenden der Anfrage" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Resend instance will use process.env.RESEND_API_KEY automatically if present, 
// or can be passed directly.
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, description } = body;

    // Basic Validation
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Brak wymaganych danych kontaktowych." },
        { status: 400 }
      );
    }

    // HTML Template styled in Tech Brutalism/Minimalism
    const htmlContent = `
      <div style="font-family: monospace; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff; padding: 40px; border: 1px solid #333;">
        <h1 style="color: #fff; font-size: 24px; text-transform: uppercase; margin-bottom: 20px; border-bottom: 1px solid #333; padding-bottom: 10px;">
          ## NOWY LEAD ZE STRONY
        </h1>
        
        <div style="margin-bottom: 20px; background-color: #111; padding: 20px; border-left: 4px solid #fff;">
          <p style="margin: 0 0 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Data wpłynięcia: ${new Date().toLocaleString('pl-PL')}</p>
          <p style="margin: 0 0 10px 0;"><strong>NADAWCA:</strong> ${name}</p>
          <p style="margin: 0 0 10px 0;"><strong>KONTAKT (EMAIL/TEL):</strong> ${phone}</p>
        </div>

        <h3 style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-top: 30px;">
          // TREŚĆ WIADOMOŚCI
        </h3>
        
        <div style="background-color: #111; padding: 20px; border: 1px solid #333; min-height: 100px; margin-top: 10px; font-family: sans-serif; line-height: 1.6;">
          ${description ? description.replace(/\n/g, '<br />') : '<i>Oczekuje na stół operacyjny – brak dodatkowego opisu.</i>'}
        </div>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px dashed #333; text-align: center; font-size: 10px; color: #666; letter-spacing: 1px;">
          SYSTEM NOTYFIKACJI DIGITAY | v1.0.0
        </div>
      </div>
    `;

    // Attempt to send email
    const data = await resend.emails.send({
      from: "Digitay Formularz <onboarding@resend.dev>", // Replace with a verified domain moving forward e.g hello@digitay.pl
      to: process.env.ADMIN_EMAIL || "maciej.tyra@gmail.com", // Fallback to your likely email based on path
      subject: `[NOWY LEAD] ${name} - Digitay.pl`,
      html: htmlContent,
      replyTo: phone.includes('@') ? phone : undefined,
    });

    if (data.error) {
      console.error("Resend API Error:", data.error);
      return NextResponse.json(
        { error: "Wewnętrzny błąd serwera pocztowego. Spróbuj powtórzyć akcję." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data.data?.id }, { status: 200 });

  } catch (error) {
    console.error("Form transmission fault:", error);
    return NextResponse.json(
      { error: "KRYTYCZNY BŁĄD TRANSMISJI. SERWER NIE MOŻE PRZETWORZYĆ DANYCH." },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// Zabezpieczenia uploadu
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: "Brak pliku w żądaniu." }, { status: 400 });
    }

    // Walidacje bezpieczeństwa
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Plik przekracza dozwolony limit 5MB." }, 
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Niedozwolony format pliku. Zezwolone: JPG, PNG, WEBP, GIF, SVG." }, 
        { status: 400 }
      );
    }

    // Konwersja na bufor
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Bezpieczna nazwa pliku z timestampem zapobiegająca kolizjom
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_"); // sanitize nawy
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const filename = `${uniqueSuffix}-${originalName}`;

    // Definiowanie ścieżki zapisu w /public/uploads
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const filepath = join(uploadDir, filename);

    // Silnik upewnia się czy dir istnieje (bez rzucania błędem jeśli tak)
    await mkdir(uploadDir, { recursive: true });

    // Fizyczny zapis
    await writeFile(filepath, buffer);

    // Zwrócenie relatywnej ścieżki dostępnej publicznie na frontendzie
    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({ 
      success: true, 
      url: publicUrl 
    }, { status: 200 });

  } catch (error) {
    console.error("Krytyczny błąd zapisu pliku:", error);
    return NextResponse.json(
      { error: "Błąd serwera. Nie udało się zapisać pliku na dysku." }, 
      { status: 500 }
    );
  }
}

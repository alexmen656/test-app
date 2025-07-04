# File Upload Backend Integration

## Setup

1. **PHP Backend aufsetzen:**
   ```bash
   # Auf deinem Server (z.B. shared hosting, VPS, etc.)
   # Kopiere die php-backend/ Ordner Inhalte in ein Verzeichnis auf deinem Server
   # Stelle sicher dass uploads/ Verzeichnis Schreibrechte hat
   chmod 755 uploads/
   ```

2. **Environment Variable setzen:**
   ```bash
   # In deiner .env.local Datei
   NEXT_PUBLIC_UPLOAD_API_URL=https://deine-domain.com/php-backend
   ```

## Verwendung in deiner Next.js App

### Einfacher File Upload mit Hook:

```tsx
'use client';

import { useSimpleFileUpload } from '@/hooks/useFileUpload';

function MyComponent() {
  const { upload, isUploading, error } = useSimpleFileUpload();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const url = await upload(file);
      if (url) {
        console.log('File uploaded:', url);
        // Jetzt hast du die URL und kannst sie verwenden
        // z.B. in deinem State speichern, in DB speichern, etc.
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        onChange={handleFileUpload}
        disabled={isUploading}
      />
      {isUploading && <p>Uploading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
```

### Mit der vorgefertigten Komponente:

```tsx
import { FileUploadButton } from '@/components/FileUpload';

function MyImageUpload() {
  const [imageUrl, setImageUrl] = useState<string>('');

  return (
    <div>
      <FileUploadButton
        accept="image/*"
        onUpload={(url) => {
          setImageUrl(url);
          console.log('Image uploaded:', url);
        }}
        onError={(error) => {
          console.error('Upload error:', error);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload Image
      </FileUploadButton>
      
      {imageUrl && (
        <img src={imageUrl} alt="Uploaded" className="mt-4 max-w-xs" />
      )}
    </div>
  );
}
```

### Drag & Drop Upload:

```tsx
import { DragDropUpload } from '@/components/FileUpload';

function MyDragDropUpload() {
  const [uploadedUrl, setUploadedUrl] = useState<string>('');

  return (
    <div>
      <DragDropUpload
        accept="image/*,application/pdf"
        onUpload={(url) => {
          setUploadedUrl(url);
          // URL speichern, anzeigen, etc.
        }}
        onError={(error) => {
          alert('Upload error: ' + error);
        }}
        className="w-full h-32"
      >
        <div>
          <div className="text-2xl mb-2">📤</div>
          <p>Datei hier hineinziehen oder klicken</p>
        </div>
      </DragDropUpload>
      
      {uploadedUrl && (
        <p className="mt-4">
          File uploaded: <a href={uploadedUrl} target="_blank">{uploadedUrl}</a>
        </p>
      )}
    </div>
  );
}
```

### Für App Cards (MockData Integration):

```tsx
// In deiner App Card Komponente
import { useState } from 'react';
import { useSimpleFileUpload } from '@/hooks/useFileUpload';

function AppCard({ app }: { app: App }) {
  const [newIconUrl, setNewIconUrl] = useState(app.iconUrl);
  const { upload, isUploading } = useSimpleFileUpload();

  const handleIconUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const url = await upload(file);
      if (url) {
        setNewIconUrl(url);
        // Hier könntest du die URL an dein Backend senden
        // um sie in der Datenbank zu speichern
      }
    } catch (err) {
      console.error('Icon upload failed:', err);
    }
  };

  return (
    <div className="app-card">
      <div className="relative">
        <img src={newIconUrl} alt={app.name} />
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white">Uploading...</span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleIconUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
      <h3>{app.name}</h3>
      {/* Rest of your app card */}
    </div>
  );
}
```

## API Antwort Format

Das PHP Backend gibt folgende Antwort zurück:

```json
{
  "success": true,
  "url": "https://deine-domain.com/php-backend/uploads/12345_filename.jpg",
  "filename": "12345_filename.jpg",
  "originalName": "mein-bild.jpg",
  "size": 123456,
  "mimeType": "image/jpeg"
}
```

Bei Fehlern:
```json
{
  "success": false,
  "error": "File too large. Maximum size is 50MB"
}
```

## Deployment

1. **PHP Backend:** Lade die PHP Dateien auf deinen Webserver hoch
2. **Next.js App:** Deploye wie gewohnt auf Vercel/Netlify/etc.
3. **CORS:** Das PHP Backend ist bereits für CORS konfiguriert

Die URL die zurückgegeben wird ist direkt verwendbar in deinem Frontend!

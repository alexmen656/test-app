# File Upload Integration - Setup Guide

## 🚀 Was wurde implementiert

Das File Upload System wurde erfolgreich in die "Add App" Seite (`/myapps/edit/new`) integriert!

### Features:
- ✅ **App Icon Upload** - Einzelnes Bild für App-Icon
- ✅ **Cover Image Upload** - Großes Cover-Bild für die App
- ✅ **Screenshot Upload** - Mehrere Screenshots gleichzeitig
- ✅ **Live Upload** - Files werden sofort hochgeladen beim Auswählen
- ✅ **Upload Status** - Nutzer sieht Upload-Fortschritt und Status
- ✅ **URL Integration** - Hochgeladene URLs werden automatisch ins Backend gesendet

## 🛠️ Setup Schritte

### 1. PHP Backend aufsetzen
```bash
# Upload die php-backend/ Dateien auf deinen Webserver
# Stelle sicher dass das uploads/ Verzeichnis beschreibbar ist
chmod 755 uploads/
```

### 2. Environment Variable setzen
```bash
# In .env.local
NEXT_PUBLIC_UPLOAD_API_URL=https://deine-domain.com/php-backend
```

### 3. Test die Integration
1. Gehe zu `/myapps`
2. Klicke auf "Add New App" (Plus-Button)
3. Lade Bilder hoch und teste das Form

## 📋 Wie es funktioniert

### User Experience:
1. **User wählt Bild aus** → Sofortiges Preview wird angezeigt
2. **File wird automatisch uploaded** → Upload läuft im Hintergrund
3. **Success Message** → "✅ Icon uploaded successfully"
4. **Submit Form** → URLs werden an Backend gesendet

### Technical Flow:
```
User selects file
     ↓
Preview shows immediately
     ↓
File uploads to PHP backend via `useSimpleFileUpload`
     ↓
PHP returns URL: "https://domain.com/uploads/abc123_image.jpg"
     ↓
URL saved in state: `uploadedUrls.icon = url`
     ↓
Form submission includes: `icon_url: uploadedUrls.icon`
     ↓
Backend receives complete app data with image URLs
```

## 🎯 Modified Files

### Frontend:
- `/app/myapps/detail/[id]/page.tsx` - Main integration
- `/lib/fileUpload.ts` - File upload API
- `/hooks/useFileUpload.ts` - React hooks
- `/components/FileUpload.tsx` - Upload components

### Backend:
- `/php-backend/upload.php` - File upload endpoint
- `/php-backend/files.php` - File listing endpoint
- `/php-backend/.htaccess` - Security & CORS

## ⚡ Quick Test

```bash
# Test file upload directly
curl -X POST -F "file=@test-image.jpg" https://your-domain.com/php-backend/upload.php

# Expected response:
{
  "success": true,
  "url": "https://your-domain.com/php-backend/uploads/12345_test-image.jpg",
  "filename": "12345_test-image.jpg",
  "originalName": "test-image.jpg",
  "size": 123456,
  "mimeType": "image/jpeg"
}
```

## 🔧 Customization

### Upload Size Limits
```php
// In upload.php
$maxFileSize = 50 * 1024 * 1024; // 50MB
```

### Allowed File Types
```php
// In upload.php
$allowedTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf'
];
```

### Upload Directory
```php
// In upload.php
$uploadDir = 'uploads/';
```

## 🚨 Production Checklist

- [ ] PHP Backend auf Server deployed
- [ ] Upload-Verzeichnis hat Schreibrechte
- [ ] HTTPS für sichere Uploads
- [ ] CORS korrekt konfiguriert
- [ ] Environment Variable gesetzt
- [ ] File Size Limits angepasst
- [ ] Backup-Strategie für uploads/ Verzeichnis

## 💡 Pro Tips

1. **Development**: Teste lokal mit XAMPP/MAMP
2. **Staging**: Deploy auf Test-Server zuerst
3. **Production**: CDN für bessere Performance
4. **Monitoring**: Log upload errors für debugging

Das System ist ready to go! 🎉

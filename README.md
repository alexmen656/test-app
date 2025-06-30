# BetaBay 🚀
Eine moderne Web-App für App-Testing und -Bewertung mit Slack-Authentifizierung

## Features

- **Slack OAuth**: Benutzer melden sich mit ihrem Slack-Account an
- **App-Testing**: Benutzer können Apps testen und bewerten
- **App-Einreichung**: Entwickler können ihre Apps zur Bewertung einreichen  
- **Dashboard**: Übersichtliche Darstellung aller verfügbaren Apps
- **Responsive Design**: Funktioniert auf Desktop und Mobile

## Setup

### 1. Slack App erstellen

1. Gehe zu https://api.slack.com/apps
2. Klicke auf "Create New App" → "From scratch"
3. Gib deiner App einen Namen (z.B. "BetaBay")
4. Wähle einen Workspace
5. Gehe zu "OAuth & Permissions"
6. Füge diese Redirect URL hinzu: `http://localhost:3000/auth/slack/callback`
7. Füge diese OAuth Scopes hinzu:
   - `identity.basic`
   - `identity.email`
   - `identity.avatar`
8. Kopiere "Client ID" und "Client Secret"

### 2. Environment Variables einrichten

1. Kopiere die `.env.example` Datei zu `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fülle die `.env` Datei mit deinen Slack App Credentials aus:
   ```bash
   SLACK_CLIENT_ID=deine_slack_client_id
   SLACK_CLIENT_SECRET=dein_slack_client_secret
   SLACK_REDIRECT_URI=http://localhost:3000/auth/slack/callback
   SESSION_SECRET=ein_sicherer_zufälliger_string
   PORT=3000
   ```

### 3. App starten

```bash
# Dependencies installieren (falls noch nicht gemacht)
npm install

# Entwicklungsserver starten
npm run dev

# Oder normale Ausführung
npm start
```

Die App läuft dann unter http://localhost:3000

## Verwendung

1. **Anmeldung**: Klicke auf "Mit Slack anmelden" 
2. **Dashboard**: Nach der Anmeldung siehst du das Dashboard mit verfügbaren Apps
3. **App testen**: Klicke auf eine App-Karte, um sie zu testen
4. **App einreichen**: Klicke auf "App einreichen", um deine eigene App zur Bewertung einzureichen

## Technische Details

### Backend (Node.js/Express)
- Express.js als Web-Framework
- Slack OAuth 2.0 Integration
- Session-basierte Authentifizierung
- RESTful API Endpoints

### Frontend (Vanilla JavaScript)
- Modernes ES6+ JavaScript
- Responsive CSS Grid/Flexbox Layout
- Modal-Dialoge für App-Einreichung
- Real-time Benachrichtigungen

### API Endpoints

- `GET /api/auth/slack` - Slack OAuth Weiterleitung
- `GET /auth/slack/callback` - Slack OAuth Callback
- `GET /api/user` - Aktueller Benutzer
- `POST /api/logout` - Benutzer abmelden
- `GET /api/apps` - Alle Apps abrufen
- `POST /api/apps` - Neue App einreichen

## Entwicklung

```bash
# Entwicklungsserver mit Auto-Reload
npm run dev
```

Die App unterstützt Hot-Reload während der Entwicklung.

## Lizenz

MIT

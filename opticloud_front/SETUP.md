# הוראות הרצה - OptiCloud Frontend

## שלב 1: הגדרת API URL

1. צור קובץ `.env` בתיקיית `opticloud_front` (אם עדיין לא יצרת)
2. הוסף:

```env
VITE_API_URL=http://localhost:3001/api
```

## שלב 2: התקנת Dependencies

```bash
cd OptiCloud-Client/opticloud_front
npm install
```

## שלב 3: הרצת Frontend

```bash
npm run dev
```

ה-Frontend ירוץ על: `http://localhost:5173` (או פורט אחר ש-Vite יבחר)

## בניית Production

```bash
npm run build
```

הקבצים יבנו בתיקיית `dist/`

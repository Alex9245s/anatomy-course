# קורס אנטומיה אינטראקטיבי

## הגדרה ראשונית

### 1. Supabase
1. צור פרויקט חינמי ב-[supabase.com](https://supabase.com)
2. לך ל-**SQL Editor** והרץ את הקובץ `supabase/migrations/001_init.sql`
3. העתק את ה-URL וה-ANON KEY מ-Settings → API

### 2. קובץ .env.local
צור קובץ `.env.local` בתיקייה הראשית:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### 3. הרצה מקומית
```bash
npm install
npm run dev
```
פתח [http://localhost:3000](http://localhost:3000)

### 4. הגדרת אדמין
לאחר שנרשמת, הרץ ב-Supabase SQL Editor:
```sql
update profiles set role = 'admin' where id = 'YOUR_USER_ID';
```

## מבנה הפרויקט
- `/login` `/register` — מסכי כניסה
- `/dashboard` — לוח בקרה לתלמיד
- `/course` — רשימת נושאים ושיעורים
- `/lesson/[id]` — שיעור עם תמונות
- `/quiz/[id]` — חידון אחרי שיעור
- `/test/[topicId]` — בחן נושאי
- `/exam` — מבחן מסכם
- `/admin` — פאנל ניהול למורה

## העלאה ל-Vercel
1. `git init && git add . && git commit -m "init"`
2. העלה ל-GitHub
3. חבר ב-[vercel.com](https://vercel.com) + הגדר את משתני הסביבה

# Refillon Solutions — CRM (cloud version)

Node.js + Express + PostgreSQL backend, with the same dashboard UI as the
prototype, now talking to a real database over an API.

## Deploy on Render.com (free tier)

1. **GitHub par push karo**
   - Is poore folder ko ek GitHub repo bana ke push karo
     (`refillon-crm-app`).

2. **Render par PostgreSQL banao**
   - https://render.com par account banao (GitHub se sign in).
   - Dashboard → New → **PostgreSQL** → free plan choose karo.
   - Create hone ke baad, "Internal Database URL" copy kar lo (ye env
     variable ban jayega).

3. **Render par Web Service banao**
   - Dashboard → New → **Web Service** → apna GitHub repo connect karo.
   - Build command: `npm install`
   - Start command: `npm start`
   - Environment variable add karo: `DATABASE_URL` = (step 2 ka wala URL)
   - Free plan select karke Deploy dabao.

4. **Pehli baar deploy hote hi**
   - Server khud `schema.sql` run karega aur default statuses seed ho
     jayenge (koi manual step nahi).

5. **Access**
   - Render ek public URL dega (jaise `https://refillon-crm.onrender.com`)
     — isko phone, laptop, kisi se bhi kholo, data sabme sync milega.

Note: Render ka free web service kuch der inactive rehne par "sleep" ho
jaata hai aur pehli request pe 20-30 sec lag sakta hai jaagne mein — normal
hai, paid plan pe ye nahi hota. Free Postgres database 90 din baad expire
ho jaata hai (Render ka policy) — us se pehle renew/upgrade karna hoga
agar aage bhi free rakhna hai. Railway.app bhi isi tarah ka alternative
hai agar Render pasand na aaye.

## Local testing (deploy se pehle check karne ke liye)

```bash
npm install
cp .env.example .env
# .env mein apna local ya Render DATABASE_URL daalo
npm run dev
```

Phir browser mein `http://localhost:3000` kholo.

## Structure

- `server.js` — Express API (statuses + clients)
- `schema.sql` — table definitions + default status seed
- `public/index.html` — same dashboard UI, ab API se data leta hai
- `db.js` — PostgreSQL connection pool

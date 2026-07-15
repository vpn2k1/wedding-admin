# Wedding Admin App

Project admin dùng chung cho các website thiệp cưới trong folder này. Các web public chạy riêng, còn admin chỉ có một app ở `wedding-admin-app` và dùng chung Supabase database qua cùng:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_ID`

## Chạy local

Copy `.env.example` thành `.env.local` và điền cùng thông tin Supabase với web public.

```bash
npm install
npm run dev
```

Hoặc chạy từ một project web:

```bash
npm run dev:admin
```

Mặc định admin chạy ở:

```txt
http://localhost:3001/admin
```

Admin auth dùng:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=doi-mat-khau-nay
```

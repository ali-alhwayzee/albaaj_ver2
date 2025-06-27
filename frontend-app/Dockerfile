# مرحلة البناء
FROM node:20-alpine AS build

WORKDIR /app

# نسخ ملفات الحزم
COPY package*.json ./

# تثبيت التبعيات
RUN npm install

# نسخ باقي ملفات المشروع
COPY . .

# بناء تطبيق Vite
RUN npm run build

# مرحلة الإنتاج مع Nginx
FROM nginx:stable-alpine

# نسخ ملفات البناء إلى مجلد HTML الخاص بـ Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# نسخ إعداد مخصص لـ Nginx يدعم SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# فتح المنفذ 80
EXPOSE 80

# تشغيل Nginx
CMD ["nginx", "-g", "daemon off;"]

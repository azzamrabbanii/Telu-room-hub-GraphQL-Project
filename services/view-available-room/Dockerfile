# 1. Ambil sistem operasi dasar yang sudah terpasang Node.js versi 18 (pilih versi alpine agar ringan)
FROM node:18-alpine

# 2. Tentukan folder kerja di dalam sistem Docker tempat aplikasi kita akan disimpan
WORKDIR /app

# 3. Salin file package.json dan package-lock.json terlebih dahulu untuk membaca dependency/library
COPY package*.json ./

# 4. Jalankan perintah instalasi semua library backend (seperti graphql, apollo-server, dll.)
RUN npm install

# 5. Salin seluruh sisa kode backend dari laptop kamu ke dalam folder kerja Docker
COPY . .

# 6. Buka gerbang/port 4000 di Docker agar bisa diakses dari browser/Postman laptop kamu
EXPOSE 4000

# 7. Perintah yang otomatis berjalan untuk menyalakan server backend saat container aktif
CMD ["npm", "start"]
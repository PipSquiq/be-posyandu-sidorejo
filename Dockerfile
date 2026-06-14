# 1. Gunakan Node.js resmi versi slim agar ukuran ringan
FROM node:22-slim

# 2. Install openssl karena Prisma butuh ini untuk konek ke Neon PostgreSQL
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# 3. Buat user non-root khusus untuk Hugging Face (wajib demi keamanan mereka)
RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

# 4. Tentukan folder kerja di dalam server
WORKDIR /app

# 5. Copy file package dahulu untuk menginstal dependensi
COPY --chown=user package*.json ./

# 6. Install semua dependensi (termasuk devDependencies untuk kebutuhan build)
RUN npm install

# 7. Copy seluruh sisa file project kamu ke dalam server
COPY --chown=user . .

# 8. Generate Prisma Client agar sinkron dengan database
RUN npx prisma generate

# 9. Lakukan build NestJS ke folder dist
RUN npm run build

# 10. Set port wajib Hugging Face
ENV PORT=7860
EXPOSE 7860

# 11. Jalankan aplikasi NestJS menggunakan script start:prod yang sudah kita ubah kemarin
CMD ["npm", "run", "start:prod"]
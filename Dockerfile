# 1. Gunakan Node.js resmi versi slim agar ukuran ringan
FROM node:22-slim

# 2. Install openssl karena Prisma butuh ini untuk konek ke Neon PostgreSQL
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# 3. Gunakan user 'node' bawaan (UID 1000) yang sudah disediakan oleh image Node
USER node
ENV HOME=/home/node \
    PATH=/home/node/.local/bin:$PATH

# 4. Tentukan folder kerja di dalam direktori home user node
WORKDIR /home/node/app

# 5. Copy file package dahulu untuk menginstal dependensi
COPY --chown=node package*.json ./

# 6. Install semua dependensi
RUN npm install

# 7. Copy seluruh sisa file project kamu ke dalam server
COPY --chown=node . .

# 8. Generate Prisma Client agar sinkron dengan database
RUN npx prisma generate

# 9. Lakukan build NestJS ke folder dist
RUN npm run build

# 10. Set port wajib Hugging Face
ENV PORT=7860
EXPOSE 7860

# 11. Jalankan aplikasi NestJS menggunakan script start:prod
CMD ["npm", "run", "start:prod"]
import 'dotenv/config';
import { Pool } from 'pg'; // 👈 Tambahkan impor Pool dari library 'pg'
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error('DATABASE_URL belum diset di environment.');
}

// Konfigurasi Driver Neon PostgreSQL Adapter agar tidak kosong dan error
const pool = new Pool({ connectionString: url });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- START SEEDING ---');

  // Mengambil data dari .env dengan fallback string kosong jika undefined untuk memuaskan TypeScript
  const newUsername = process.env.NEW_ADMIN_USERNAME ?? '';
  const newRawPassword = process.env.NEW_ADMIN_PASSWORD ?? '';

  // Validasi wajib: Jika FE/kamu lupa isi .env, sistem akan stop daripada merusak DB
  if (!newUsername || !newRawPassword) {
    throw new Error('❌ Gagal: NEW_ADMIN_USERNAME atau NEW_ADMIN_PASSWORD belum diisi di file .env!');
  }

  const newHashedPassword = await bcrypt.hash(newRawPassword, 10);
  
  const nik = '1234567890';
  const email = 'admin@tumbuh.com';
  const nama = 'Super Admin Ceria';

  // 1. Cek apakah admin dengan username lama ('admin') masih ada
  const oldAdmin = await prisma.user.findUnique({
    where: { username: 'admin' },
  });

  let admin;

  if (oldAdmin) {
    console.log('🔄 Menemukan admin lama, mengubah spesifikasi ke admin baru...');
    // Jika admin lama ditemukan, kita ganti username, password, dan biodatanya sekaligus
    admin = await prisma.user.update({
      where: { id: oldAdmin.id },
      data: {
        username: newUsername,
        password: newHashedPassword,
        nik,
        email,
        nama,
      },
    });
  } else {
    console.log('✨ Admin lama tidak ditemukan atau sudah diubah. Menjalankan upsert untuk keamanan...');
    // Jika sudah pernah dijalankan, dia hanya akan memastikan datanya tetap yang baru
    admin = await prisma.user.upsert({
      where: { username: newUsername },
      update: {
        password: newHashedPassword,
        nik,
        email,
        nama,
        role: 'ADMIN',
      },
      create: {
        username: newUsername,
        nik,
        nama,
        email,
        password: newHashedPassword,
        role: 'ADMIN',
      },
    });
  }

  console.log('✅ Admin User created/updated successfully:');
  console.log({
    id: admin.id,
    username: admin.username,
    role: admin.role,
  });
  
  console.log(`🚀 Silakan login di Scalar/Postman dengan:
     Identifier: ${newUsername}
     Password  : ${newRawPassword}`);
  
  console.log('--- SEEDING FINISHED ---');
}

main()
  .catch((e) => {
    console.error('❌ Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
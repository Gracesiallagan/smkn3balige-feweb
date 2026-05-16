import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfilLayout from "../layouts/ProfilLayout";
import foto from "../../../assets/images/foto.png";
import { asyncGetPrestasi, asyncGetProgramKeahlian, asyncGetMitraKerjasama } from "../states/action";

const highlights = [
  { icon: "🎓", number: "1.200+", label: "Siswa Aktif" },
  { icon: "👨‍🏫", number: "80+", label: "Tenaga Pendidik" },
  { icon: "🏆", number: "50+", label: "Prestasi Nasional" },
  { icon: "🤝", number: "20+", label: "Mitra Industri" },
];

const beritaStatis = [
  { tag: "Pengumuman", title: "Penerimaan Peserta Didik Baru 2024/2025", date: "15 Januari 2024", desc: "SMK Negeri 3 Balige membuka pendaftaran PPDB tahun ajaran 2024/2025. Kuota terbatas untuk tiga jurusan unggulan." },
  { tag: "Prestasi", title: "Juara LKS Tingkat Provinsi 2024", date: "20 Februari 2024", desc: "Siswa SMK Negeri 3 Balige meraih juara pertama pada ajang Lomba Kompetensi Siswa bidang Teknik Komputer." },
  { tag: "Kegiatan", title: "Kunjungan Industri ke PT PLN", date: "5 Maret 2024", desc: "Siswa jurusan TKJ melaksanakan kunjungan industri ke PT PLN untuk memperluas wawasan dunia kerja." },
];

export default function BerandaPage() {
  const dispatch = useDispatch();
  const prestasi = useSelector((s) => s.prestasi);
  const programKeahlian = useSelector((s) => s.programKeahlian);

  useEffect(() => {
    dispatch(asyncGetPrestasi());
    dispatch(asyncGetProgramKeahlian());
    dispatch(asyncGetMitraKerjasama());
  }, [dispatch]);

  // Preview 3 item saja untuk beranda
  const jurusanPreview = programKeahlian.slice(0, 3);

  return (
    <ProfilLayout>
      {/* HERO */}
      <section className="smk-beranda-hero">
        <div className="smk-beranda-hero-inner">
          <div className="smk-beranda-hero-text">
            <span className="smk-badge">Tahun Ajaran 2024/2025</span>
            <h1>Selamat Datang di<br /><span className="smk-hero-highlight">SMK Negeri 3 Balige</span></h1>
            <p>
              Sekolah vokasi terbaik yang berkomitmen mencetak generasi unggul,
              berkarakter, dan siap menghadapi dunia industri global.
            </p>
            <div className="smk-beranda-cta">
              <NavLink to="/profil" className="smk-btn-primary">Profil Sekolah</NavLink>
              <NavLink to="/portofolio" className="smk-btn-secondary">Lihat Portofolio</NavLink>
            </div>
          </div>
          <div className="smk-beranda-hero-img">
            <img src={foto} alt="SMK Negeri 3 Balige" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="smk-beranda-stats">
        <div className="smk-container">
          <div className="smk-stats-grid">
            {highlights.map((item, idx) => (
              <div className="smk-stat-card" key={idx}>
                <span className="smk-stat-icon">{item.icon}</span>
                <strong className="smk-stat-number">{item.number}</strong>
                <span className="smk-stat-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BERITA TERBARU — statis (belum ada model berita di backend) */}
      <section className="smk-section smk-bg-cream">
        <div className="smk-container smk-center">
          <h2 className="smk-section-title smk-title-center">Berita &amp; Pengumuman Terbaru</h2>
          <div className="smk-beranda-news-grid">
            {beritaStatis.map((item, idx) => (
              <div className="smk-news-card" key={idx}>
                <span className="smk-news-tag">{item.tag}</span>
                <h3 className="smk-news-title">{item.title}</h3>
                <span className="smk-news-date">{item.date}</span>
                <p className="smk-news-desc">{item.desc}</p>
                <NavLink to="/berita" className="smk-news-link">Baca Selengkapnya →</NavLink>
              </div>
            ))}
          </div>
          <NavLink to="/berita" className="smk-btn-primary smk-btn-center">Lihat Semua Berita</NavLink>
        </div>
      </section>

      {/* PROGRAM KEAHLIAN dari API */}
      <section className="smk-section">
        <div className="smk-container smk-center">
          <h2 className="smk-section-title smk-title-center">Program Keahlian Unggulan</h2>
          <div className="smk-jurusan-grid">
            {jurusanPreview.length > 0 ? (
              jurusanPreview.map((item) => (
                <div className="smk-jurusan-card" key={item.id}>
                  <div className="smk-jurusan-icon" style={{ background: "#5A82F2" }}>
                    <span>{item.icon || "🎓"}</span>
                  </div>
                  <h3 className="smk-jurusan-title">{item.nama_jurusan}</h3>
                  <p className="smk-jurusan-desc">{item.deskripsi}</p>
                </div>
              ))
            ) : (
              // Fallback statis kalau API belum ada data
              <>
                <div className="smk-jurusan-card">
                  <div className="smk-jurusan-icon" style={{ background: "#F4C430" }}>💻</div>
                  <h3 className="smk-jurusan-title">Teknik Komputer &amp; Jaringan</h3>
                  <p className="smk-jurusan-desc">Fokus pada infrastruktur jaringan dan keamanan siber.</p>
                </div>
                <div className="smk-jurusan-card">
                  <div className="smk-jurusan-icon" style={{ background: "#5A82F2" }}>🎨</div>
                  <h3 className="smk-jurusan-title">Multimedia</h3>
                  <p className="smk-jurusan-desc">Pengembangan kreatif di bidang desain dan produksi media.</p>
                </div>
                <div className="smk-jurusan-card">
                  <div className="smk-jurusan-icon" style={{ background: "#5A82F2" }}>📊</div>
                  <h3 className="smk-jurusan-title">Akuntansi</h3>
                  <p className="smk-jurusan-desc">Manajemen keuangan dan pelaporan akuntansi modern.</p>
                </div>
              </>
            )}
          </div>
          <NavLink to="/profil" className="smk-btn-primary smk-btn-center">Lihat Semua Jurusan</NavLink>
        </div>
      </section>
    </ProfilLayout>
  );
}

// src/features/admin/components/AdminComponents.jsx
// Komponen reusable untuk semua halaman admin

// 1. Ganti import apiHelper menjadi axios config kita

// src/features/admin/components/AdminComponents.jsx

import apiGateway from '../../../config/axios';

// ── Normalize path gambar (handle backslash Windows) ─────────
export function mediaUrl(filePath) {
  if (!filePath) return null;
  
  // Jika URL dari luar (misal https://google.com), tampilkan apa adanya
  if (filePath.startsWith("http")) return filePath;
  
  // Normalisasi backslash (untuk Windows) menjadi slash (/)
  const normalized = filePath.replace(/\\/g, "/");
  
  // Ambil baseURL dari config Axios (contoh: http://localhost:6766/api)
  // Kita hilangkan tulisan '/api'-nya
  const base = apiGateway.defaults.baseURL.replace("/api", ""); 
  
  // Gabungkan ke alamat Gateway milik Service Profile!
  // Hasil akhirnya: http://localhost:6766/api/profile/struktur-organisasi/struktur-123.png
  // *Sesuaikan "/api/profile/" jika routing file statis Nginx-mu berbeda
  return `${base}/api/profile/${normalized.replace(/^\//, "")}`;
}

// ── Stat Card ─────────────────────────────────────────────────
export function AdminStatCard({ icon, value, label, color = "blue" }) {
  return (
    <div className="smk-admin-stat-card">
      <div className={`smk-admin-stat-icon smk-admin-stat-${color}`}>{icon}</div>
      <div className="smk-admin-stat-info">
        <strong className="smk-admin-stat-val">{value ?? "—"}</strong>
        <span className="smk-admin-stat-lbl">{label}</span>
      </div>
    </div>
  );
}

// ── Data Card wrapper ─────────────────────────────────────────
export function AdminCard({ title, subtitle, onAdd, addLabel = "+ Tambah", children }) {
  return (
    <div className="smk-admin-card">
      <div className="smk-admin-card-header">
        <div>
          <div className="smk-admin-card-title">{title}</div>
          {subtitle && <div className="smk-admin-card-sub">{subtitle}</div>}
        </div>
        {onAdd && (
          <button className="smk-btn-primary smk-admin-btn-sm" onClick={onAdd}>
            {addLabel}
          </button>
        )}
      </div>
      <div className="smk-admin-card-body">{children}</div>
    </div>
  );
}

// ── Table ─────────────────────────────────────────────────────
export function AdminTable({ columns, children, loading, empty }) {
  return (
    <div className="smk-admin-table-wrap">
      <table className="smk-admin-table">
        <thead>
          <tr>
            {columns.map((c) => <th key={c}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="smk-admin-table-state">
                <span className="smk-admin-spinner" /> Memuat data...
              </td>
            </tr>
          ) : empty ? (
            <tr>
              <td colSpan={columns.length} className="smk-admin-table-state">
                📭 Belum ada data
              </td>
            </tr>
          ) : children}
        </tbody>
      </table>
    </div>
  );
}

// ── Thumbnail gambar ──────────────────────────────────────────
export function AdminThumb({ src, fallback = "🖼️" }) {
  if (!src) return <div className="smk-admin-thumb">{fallback}</div>;
  return (
    <div className="smk-admin-thumb">
      <img
        src={src}
        alt=""
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
      <span style={{ display: "none" }}>{fallback}</span>
    </div>
  );
}

// ── Badge tingkat ──────────────────────────────────────────────
export function TingkatBadge({ tingkat }) {
  const map = {
    internasional: ["smk-admin-badge-gold",   "🌍 Internasional"],
    nasional:      ["smk-admin-badge-silver",  "🇮🇩 Nasional"],
    provinsi:      ["smk-admin-badge-bronze",  "📍 Provinsi"],
    kabupaten:     ["smk-admin-badge-blue",    "🏘 Kabupaten"],
  };
  const [cls, label] = map[tingkat?.toLowerCase()] ?? ["smk-admin-badge-blue", tingkat];
  return <span className={`smk-admin-badge ${cls}`}>{label}</span>;
}

// ── Upload area ───────────────────────────────────────────────
export function UploadArea({ id, onFile, preview, label = "Klik untuk pilih gambar" }) {
  return (
    <div className="smk-form-group">
      <label htmlFor={id} className="smk-upload-area">
        <div style={{ fontSize: 28, marginBottom: 8 }}>🖼️</div>
        <div>
          <span style={{ color: "var(--blue)", fontWeight: 600 }}>{label}</span>
          {" "}atau drag & drop
        </div>
        <div style={{ fontSize: 11, marginTop: 4, color: "var(--text-gray)" }}>
          PNG, JPG, WEBP — Maks 5MB
        </div>
        <input
          type="file"
          id={id}
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => onFile && onFile(e.target.files[0])}
        />
      </label>
      {preview && (
        <div className="smk-admin-upload-preview">
          <img src={preview} alt="preview" />
        </div>
      )}
    </div>
  );
}

// ── Modal wrapper ──────────────────────────────────────────────
export function AdminModal({ open, onClose, title, children, onSubmit, submitting }) {
  if (!open) return null;
  return (
    <div className="smk-modal-overlay" onClick={onClose}>
      <div
        className="smk-modal smk-admin-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="smk-modal-header">
          <h3>{title}</h3>
          <button className="smk-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="smk-modal-body">{children}</div>
        <div className="smk-modal-footer">
          <button className="smk-btn-cancel" onClick={onClose} disabled={submitting}>
            Batal
          </button>
          <button className="smk-btn-primary" onClick={onSubmit} disabled={submitting}>
            {submitting ? (
              <><span className="smk-admin-spinner smk-admin-spinner-sm" /> Menyimpan...</>
            ) : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Aksi button group ──────────────────────────────────────────
export function ActionButtons({ onEdit, onDelete }) {
  return (
    <div className="smk-admin-actions">
      <button className="smk-admin-btn-edit" onClick={onEdit}>✏️ Edit</button>
      <button className="smk-admin-btn-delete" onClick={onDelete}>🗑️ Hapus</button>
    </div>
  );
}
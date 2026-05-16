import apiGateway from '../../../config/axios';

const PREFIX = '/profile';

// ── SEJARAH & IDENTITAS ──────────────────────────────────────
async function getSejarahIdentitas() {
  const res = await apiGateway.get(`${PREFIX}/sejarah-identitas`);
  return res.data;
}
async function postSejarahIdentitas(tahun_berdiri, deskripsi) {
  const res = await apiGateway.post(`${PREFIX}/sejarah-identitas`, { tahun_berdiri, deskripsi });
  return res.data;
}
async function putSejarahIdentitas(id, tahun_berdiri, deskripsi) {
  const res = await apiGateway.put(`${PREFIX}/sejarah-identitas/${id}`, { tahun_berdiri, deskripsi });
  return res.data;
}
async function deleteSejarahIdentitas(id) {
  const res = await apiGateway.delete(`${PREFIX}/sejarah-identitas/${id}`);
  return res.data;
}

// ── VISI & MISI ──────────────────────────────────────────────
async function getVisiMisi() {
  const res = await apiGateway.get(`${PREFIX}/visi-misi`);
  return res.data; 
}
async function postVisiMisi(tipe, deskripsi) {
  const res = await apiGateway.post(`${PREFIX}/visi-misi`, { tipe, deskripsi });
  return res.data;
}
async function putVisiMisi(id, tipe, deskripsi) {
  const res = await apiGateway.put(`${PREFIX}/visi-misi/${id}`, { tipe, deskripsi });
  return res.data;
}
async function deleteVisiMisi(id) {
  const res = await apiGateway.delete(`${PREFIX}/visi-misi/${id}`);
  return res.data;
}

// ── STRUKTUR ORGANISASI (upload file: field "gambar") ────────
async function getStrukturOrganisasi() {
  const res = await apiGateway.get(`${PREFIX}/struktur-organisasi`);
  return res.data;
}
async function postStrukturOrganisasi(gambarFile) {
  const fd = new FormData(); 
  fd.append("gambar", gambarFile);
  const res = await apiGateway.post(`${PREFIX}/struktur-organisasi`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
}
async function putStrukturOrganisasi(id, gambarFile) {
  const fd = new FormData(); 
  fd.append("gambar", gambarFile);
  const res = await apiGateway.put(`${PREFIX}/struktur-organisasi/${id}`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
}
async function deleteStrukturOrganisasi(id) {
  const res = await apiGateway.delete(`${PREFIX}/struktur-organisasi/${id}`);
  return res.data;
}

// ── FASILITAS (upload file: field "foto") ────────────────────
async function getFasilitas() {
  const res = await apiGateway.get(`${PREFIX}/fasilitas`);
  return res.data;
}
async function postFasilitas(nama_fasilitas, deskripsi, fotoFile) {
  const fd = new FormData();
  fd.append("nama_fasilitas", nama_fasilitas);
  if (deskripsi) fd.append("deskripsi", deskripsi);
  if (fotoFile) fd.append("foto", fotoFile);
  
  const res = await apiGateway.post(`${PREFIX}/fasilitas`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
}
async function putFasilitas(id, nama_fasilitas, deskripsi, fotoFile) {
  const fd = new FormData();
  if (nama_fasilitas) fd.append("nama_fasilitas", nama_fasilitas);
  if (deskripsi) fd.append("deskripsi", deskripsi);
  if (fotoFile) fd.append("foto", fotoFile);
  
  const res = await apiGateway.put(`${PREFIX}/fasilitas/${id}`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
}
async function deleteFasilitas(id) {
  const res = await apiGateway.delete(`${PREFIX}/fasilitas/${id}`);
  return res.data;
}

// ── PRESTASI (JSON) ──────────────────────────────────────────
async function getPrestasi() {
  const res = await apiGateway.get(`${PREFIX}/prestasi`);
  return res.data;
}
async function postPrestasi(judul, tingkat, tahun, keterangan) {
  const res = await apiGateway.post(`${PREFIX}/prestasi`, { judul, tingkat, tahun, keterangan });
  return res.data;
}
async function putPrestasi(id, judul, tingkat, tahun, keterangan) {
  const res = await apiGateway.put(`${PREFIX}/prestasi/${id}`, { judul, tingkat, tahun, keterangan });
  return res.data;
}
async function deletePrestasi(id) {
  const res = await apiGateway.delete(`${PREFIX}/prestasi/${id}`);
  return res.data;
}

// ── PROGRAM KEAHLIAN (JSON, icon = string emoji/url) ─────────
async function getProgramKeahlian() {
  const res = await apiGateway.get(`${PREFIX}/program-keahlian`);
  return res.data;
}
async function postProgramKeahlian(nama_jurusan, deskripsi, icon) {
  const res = await apiGateway.post(`${PREFIX}/program-keahlian`, { nama_jurusan, deskripsi, icon });
  return res.data;
}
async function putProgramKeahlian(id, nama_jurusan, deskripsi, icon) {
  const res = await apiGateway.put(`${PREFIX}/program-keahlian/${id}`, { nama_jurusan, deskripsi, icon });
  return res.data;
}
async function deleteProgramKeahlian(id) {
  const res = await apiGateway.delete(`${PREFIX}/program-keahlian/${id}`);
  return res.data;
}

// ── MITRA KERJASAMA (upload file: field "logo") ──────────────
async function getMitraKerjasama() {
  const res = await apiGateway.get(`${PREFIX}/mitra-kerjasama`);
  return res.data;
}
async function postMitraKerjasama(nama_mitra, deskripsi, logoFile) {
  const fd = new FormData();
  fd.append("nama_mitra", nama_mitra);
  if (deskripsi) fd.append("deskripsi", deskripsi);
  if (logoFile) fd.append("logo", logoFile);
  
  const res = await apiGateway.post(`${PREFIX}/mitra-kerjasama`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
}
async function putMitraKerjasama(id, nama_mitra, deskripsi, logoFile) {
  const fd = new FormData();
  if (nama_mitra) fd.append("nama_mitra", nama_mitra);
  if (deskripsi) fd.append("deskripsi", deskripsi);
  if (logoFile) fd.append("logo", logoFile);
  
  const res = await apiGateway.put(`${PREFIX}/mitra-kerjasama/${id}`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
}
async function deleteMitraKerjasama(id) {
  const res = await apiGateway.delete(`${PREFIX}/mitra-kerjasama/${id}`);
  return res.data;
}

const profilApi = {
  getSejarahIdentitas, postSejarahIdentitas, putSejarahIdentitas, deleteSejarahIdentitas,
  getVisiMisi, postVisiMisi, putVisiMisi, deleteVisiMisi,
  getStrukturOrganisasi, postStrukturOrganisasi, putStrukturOrganisasi, deleteStrukturOrganisasi,
  getFasilitas, postFasilitas, putFasilitas, deleteFasilitas,
  getPrestasi, postPrestasi, putPrestasi, deletePrestasi,
  getProgramKeahlian, postProgramKeahlian, putProgramKeahlian, deleteProgramKeahlian,
  getMitraKerjasama, postMitraKerjasama, putMitraKerjasama, deleteMitraKerjasama,
};

export default profilApi;
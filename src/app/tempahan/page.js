import TrackingForm from '../../components/TrackingForm';
import { Sparkles, HelpCircle, Clock, CheckCircle2, FileCheck, PhoneCall } from 'lucide-react';

export const metadata = {
  title: 'Borang Tempahan Media | UKOM IPGKTHO',
  description: 'Borang permohonan liputan media, fotografi, video montaj, siaran langsung dan rekaan grafik IPG Kampus Tun Hussein Onn.',
};

export default function TempahanPage() {
  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header Title Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Unit Komunikasi Korporat IPGKTHO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Borang Tempahan Liputan Media
          </h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
            Sila lengkapkan butiran program anda di bawah. ID Penjejak (<span className="font-semibold text-slate-700">Tracking ID</span>) akan dijana secara automatik untuk rujukan rasmi permohonan anda.
          </p>
        </div>

        {/* Centered Tracking Form Component */}
        <div className="flex justify-center">
          <div className="w-full">
            <TrackingForm />
          </div>
        </div>

        {/* Quick FAQ / Guidelines Section */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2.5 text-slate-900 pb-3 border-b border-slate-100">
            <HelpCircle className="w-5 h-5 text-brand-600" />
            <h3 className="font-bold text-base sm:text-lg">Panduan & Soalan Lazim Tempahan Media</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-600" />
                Tempoh Penghantaran
              </h4>
              <p className="leading-relaxed text-slate-600">
                Borang permohonan hendaklah dihantar sekurang-kurangnya <strong>3 hari bekerja</strong> sebelum tarikh majlis/program berlangsung.
              </p>
            </div>

            <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Semakan Status Permohonan
              </h4>
              <p className="leading-relaxed text-slate-600">
                Gunakan Tracking ID yang dijana untuk menyemak status peruntukan jurugambar dan kelulusan di halaman <strong>Semak Status</strong>.
              </p>
            </div>

            <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-purple-600" />
                Penyerahan Bahan Media
              </h4>
              <p className="leading-relaxed text-slate-600">
                Foto dan video resolusi penuh akan dimuat naik ke folder arkib Google Drive rasmi selepas selesai majlis.
              </p>
            </div>

            <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-sky-600" />
                Bantuan & Pertanyaan Khas
              </h4>
              <p className="leading-relaxed text-slate-600">
                Sebarang pertanyaan lanjut boleh diajukan terus kepada Unit Komunikasi Korporat di talian <strong>07-456 7890 (Ext. 214)</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
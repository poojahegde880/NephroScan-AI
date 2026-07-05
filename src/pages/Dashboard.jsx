import { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Search, Users, Activity, CheckCircle2, Gauge, Calendar, Download, Filter,
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import Card, { CardHeader } from '../components/ui/Card'
import Input from '../components/ui/Input'
import Badge from '../components/ui/Badge'
import { EmptyState } from '../components/ui/EmptyState'
import { SkeletonCard, SkeletonRow } from '../components/ui/Skeleton'
import { generatePDF } from "../utils/pdfReport";
import { Link, useNavigate } from "react-router-dom";

const MOCK_PATIENTS = [
  { id: 'P-1042', name: 'Asha Rao', date: '2026-06-28', prediction: 'CKD', confidence: 91.4, risk: 'High' },
  { id: 'P-1041', name: 'Karan Mehta', date: '2026-06-27', prediction: 'Normal', confidence: 88.2, risk: 'Low' },
  { id: 'P-1040', name: 'Fatima Sheikh', date: '2026-06-27', prediction: 'CKD', confidence: 76.5, risk: 'Moderate' },
  { id: 'P-1039', name: 'Rohan Iyer', date: '2026-06-25', prediction: 'Normal', confidence: 94.1, risk: 'Low' },
  { id: 'P-1038', name: 'Priya Nair', date: '2026-06-24', prediction: 'CKD', confidence: 83.7, risk: 'High' },
  { id: 'P-1037', name: 'Vikram Singh', date: '2026-06-22', prediction: 'Normal', confidence: 90.0, risk: 'Low' },
  { id: 'P-1036', name: 'Meera Pillai', date: '2026-06-20', prediction: 'CKD', confidence: 69.3, risk: 'Moderate' },
]




const RISK_BADGE = { High: 'danger', Moderate: 'warning', Low: 'success' }

export default function Dashboard() {
 const [search, setSearch] = useState("");
const [dateFilter, setDateFilter] = useState("");

const [patients, setPatients] = useState([]);

const [loading, setLoading] = useState(true);
useEffect(() => {
  fetch("http://127.0.0.1:5000/api/patients")
    .then((res) => res.json())
    .then((data) => {
      setPatients(data);
      console.log("Patients:", data);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}, []);

  const filtered = useMemo(() => {
  return patients.filter((p) => {
    const matchesSearch =
      !search ||
      p.patient_name.toLowerCase().includes(search.toLowerCase()) ||
      p.report_id.toLowerCase().includes(search.toLowerCase());

    const matchesDate =
      !dateFilter ||
      p.created_at.substring(0, 10) === dateFilter;

    return matchesSearch && matchesDate;
  });
}, [patients, search, dateFilter]);

  const total = patients.length;

const ckdCount = patients.filter(
  (p) =>
    p.prediction === "CKD" ||
    p.prediction === "Chronic"
).length;

const normalCount = total - ckdCount;

const avgConfidence =
  total > 0
    ? (
        patients.reduce(
          (sum, p) => sum + Number(p.confidence),
          0
        ) / total
      ).toFixed(1)
    : 0;
  

    const TREND_DATA = [
  { day: "Mon", CKD: 0, Normal: 0 },
  { day: "Tue", CKD: 0, Normal: 0 },
  { day: "Wed", CKD: 0, Normal: 0 },
  { day: "Thu", CKD: 0, Normal: 0 },
  { day: "Fri", CKD: 0, Normal: 0 },
  { day: "Sat", CKD: 0, Normal: 0 },
  { day: "Sun", CKD: 0, Normal: 0 },
];

patients.forEach((p) => {
  const date = new Date(p.created_at);

  const day = date.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const row = TREND_DATA.find((d) => d.day === day);

  if (!row) return;

  if (
    p.prediction === "CKD" ||
    p.prediction === "Chronic"
  ) {
    row.CKD++;
  } else {
    row.Normal++;
  }
});
  const stats = [
    { icon: Users, label: 'Total Patients', value: total, tint: 'text-blue-600 bg-blue-50' },
    { icon: Activity, label: 'CKD Cases', value: ckdCount, tint: 'text-red-600 bg-red-50' },
    { icon: CheckCircle2, label: 'Normal Cases', value: normalCount, tint: 'text-green-600 bg-green-50' },
    { icon: Gauge, label: 'Avg. Confidence', value: `${avgConfidence}%`, tint: 'text-teal-600 bg-teal-50' },
  ]
  const DIST_DATA = [
  {
    name: "CKD",
    value: ckdCount,
    color: "#dc2626",
  },
  {
    name: "Normal",
    value: normalCount,
    color: "#16a34a",
  },
];
const downloadPatientPDF = async (p) => {
  await generatePDF({
    patient: {
      name: p.patient_name,
      age: p.age,
      gender: p.gender,
      bloodPressure: p.blood_pressure,
      creatinine: p.creatinine,
      hemoglobin: p.hemoglobin,
      albumin: p.albumin,
      sugar: p.sugar,
    },

    result: {
      prediction:
        p.prediction === "Chronic" ? "CKD" : p.prediction,
      confidence: Number(p.confidence),
    },

    image: `http://127.0.0.1:5000/uploads/${p.original_image}`,
    gradcam: `http://127.0.0.1:5000/uploads/${p.gradcam_image}`,
    fileName: p.original_image,
  });
};

  return (
    <div className="container-page py-8 sm:py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-950 sm:text-3xl">Patient History Dashboard</h1>
          <p className="mt-1.5 text-sm text-ink-500">Review past predictions, trends, and outcomes.</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : stats.map((s) => (
              <Card key={s.label}>
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${s.tint}`}>
                  <s.icon size={19} />
                </div>
                <p className="font-mono text-2xl font-bold text-ink-900">{s.value}</p>
                <p className="mt-1 text-xs font-medium text-ink-500">{s.label}</p>
              </Card>
            ))}
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader title="Weekly Prediction Trend" subtitle="CKD vs Normal predictions over the past 7 days" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TREND_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eaeef2" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#647c93' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#647c93' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #eaeef2', fontSize: 12 }} />
                <Bar
  dataKey="CKD"
  name="CKD"
  fill="#dc2626"
  radius={[6, 6, 0, 0]}
/>

<Bar
  dataKey="Normal"
  name="Normal"
  fill="#159e91"
  radius={[6, 6, 0, 0]}
/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Prediction Distribution" subtitle="All-time share" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={DIST_DATA} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {DIST_DATA.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #eaeef2', fontSize: 12 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card padded={false} className="mt-6 overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-ink-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-semibold text-ink-900">Prediction History</h3>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patient or ID…"
                className="h-10 w-full rounded-xl border border-ink-200 bg-white pl-9 pr-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-100 sm:w-56"
              />
            </div>
            <div className="relative">
              <Calendar size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="h-10 w-full rounded-xl border border-ink-200 bg-white pl-9 pr-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-100 sm:w-44"
              />
            </div>
          </div>
        </div>

        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Filter}
            title="No matching records"
            description="Try a different search term or clear the date filter."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-ink-400">
                  <th className="px-5 py-3 font-medium">Patient</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Prediction</th>
                  <th className="px-5 py-3 font-medium">Confidence</th>
                  <th className="px-5 py-3 font-medium">Risk</th>
                  <th className="px-5 py-3 font-medium text-right">Report</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-ink-50 last:border-0 hover:bg-ink-50/60"
                  >
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-ink-900">
  <Link
  to={`/patient/${p.id}`}
  state={{ patient: p }}
  className="font-semibold text-ink-900 hover:text-teal-600 hover:underline"
>
  {p.patient_name}
</Link>
</p>
                      <p className="text-xs text-ink-400">
  {p.report_id}
</p>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs text-ink-600">
  {new Date(p.created_at).toLocaleDateString()}
</td>
                    <td className="px-5 py-3.5">
                      <Badge variant={p.prediction === 'CKD' ? 'danger' : 'success'}>{p.prediction}</Badge>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-ink-700">{Number(p.confidence).toFixed(2)}%</td>
                    <td className="px-5 py-3.5">
                      <Badge variant={RISK_BADGE[p.risk_level]}>
  {p.risk_level}
</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-teal-700 hover:bg-teal-50"
                        onClick={() => downloadPatientPDF(p)}
                      >
                        <Download size={13} /> PDF
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}

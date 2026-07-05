import { useLocation, Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Cake,
  Activity,
  Gauge,
  Droplet,
  FlaskConical,
  Sparkles,
  ScanLine,
  ImageIcon,
} from "lucide-react";

export default function PatientDetails() {
  const { state } = useLocation();

  const patient = state?.patient;

  if (!patient) {
    return (
      <div className="container-page py-10">
        <h2 className="text-xl font-semibold text-slate-700">
          Patient not found.
        </h2>
      </div>
    );
  }

  const isCKD = patient.prediction === "Chronic" || patient.prediction === "CKD";

  return (
    <div className="container-page py-10">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="mt-6 flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-slate-900">
          {patient.patient_name}
        </h1>
        <p className="text-slate-500">
          Patient record and diagnostic scan overview
        </p>
      </div>

      {/* Top Cards */}
      <div className="mt-8 grid gap-5 md:grid-cols-5">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
            <Cake className="h-5 w-5 text-blue-500" />
          </div>
          <p className="mt-4 text-2xl font-bold text-slate-900">
            {patient.age}
          </p>
          <p className="text-sm text-slate-500">Age</p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50">
            <User className="h-5 w-5 text-teal-600" />
          </div>
          <p className="text-3xl font-bold">
  {patient.gender?.charAt(0).toUpperCase() + patient.gender?.slice(1)}
</p>
          <p className="text-sm text-slate-500">Gender</p>
        </div>

        <div
          className={`rounded-2xl border border-slate-100 bg-white p-5 shadow-sm`}
        >
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${
              isCKD ? "bg-red-50" : "bg-green-50"
            }`}
          >
            <Activity
              className={`h-5 w-5 ${isCKD ? "text-red-500" : "text-green-600"}`}
            />
          </div>
          <span
  className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${
    patient.prediction === "Normal"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700"
  }`}
>
  {patient.prediction === "Chronic" ? "CKD" : patient.prediction}
</span>
          <p className="text-sm text-slate-500">Prediction</p>
        </div>
         {/* Confidence */}
  <div className="rounded-2xl border bg-white p-6 shadow-sm">
    <h3 className="text-gray-500 font-medium">Confidence</h3>
    <p className="mt-4 text-3xl font-bold">
      {patient.confidence}%
    </p>
  </div>
  <div className="rounded-2xl border bg-white p-6 shadow-sm">
  <h3 className="text-gray-500 font-medium">
    Risk
  </h3>

  <span
    className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
      patient.risk_level === "Low"
        ? "bg-green-100 text-green-700"
        : patient.risk_level === "Medium"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {patient.risk_level}
  </span>
</div>
      </div>
     
      

      {/* Clinical Parameters */}
      <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-teal-600" />
          <h2 className="text-xl font-semibold text-slate-900">
            Clinical Parameters
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-slate-500">
              <Gauge className="h-4 w-4" />
              <p className="text-sm">Blood Pressure</p>
            </div>
            <p className="mt-2 text-xl font-semibold text-slate-900">
              {patient.blood_pressure}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-slate-500">
              <Droplet className="h-4 w-4" />
              <p className="text-sm">Creatinine</p>
            </div>
            <p className="mt-2 text-xl font-semibold text-slate-900">
              {patient.creatinine}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-slate-500">
              <Activity className="h-4 w-4" />
              <p className="text-sm">Hemoglobin</p>
            </div>
            <p className="mt-2 text-xl font-semibold text-slate-900">
              {patient.hemoglobin}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-slate-500">
              <Sparkles className="h-4 w-4" />
              <p className="text-sm">Albumin</p>
            </div>
            <p className="mt-2 text-xl font-semibold text-slate-900">
              {patient.albumin}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-slate-500">
              <FlaskConical className="h-4 w-4" />
              <p className="text-sm">Sugar</p>
            </div>
            <p className="mt-2 text-xl font-semibold text-slate-900">
              {patient.sugar}
            </p>
          </div>
        </div>
      </div>

      {/* Scan Images */}
      <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-teal-600" />
          <h2 className="text-xl font-semibold text-slate-900">
            Scan Images
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <div className="mb-3 flex items-center gap-2 text-slate-700">
              <ScanLine className="h-4 w-4 text-slate-400" />
              <h3 className="text-base font-semibold">Original CT Scan</h3>
            </div>
            <img
              src={`http://127.0.0.1:5000/uploads/${patient.original_image}`}
              alt="Original CT"
              className="w-full rounded-xl border border-slate-100 shadow-sm"
            />
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2 text-slate-700">
              <Sparkles className="h-4 w-4 text-slate-400" />
              <h3 className="text-base font-semibold">Grad-CAM Heatmap</h3>
            </div>
            <img
              src={`http://127.0.0.1:5000/uploads/${patient.gradcam_image}`}
              alt="GradCAM"
              className="w-full rounded-xl border border-slate-100 shadow-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
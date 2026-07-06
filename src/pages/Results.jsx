import { generatePDF } from "../utils/pdfReport";
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Download, RefreshCcw, AlertTriangle, CheckCircle2, Activity,
  Droplet, Gauge, FlaskConical, HeartPulse, User,
} from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
// import { downloadReport } from '../api/endpoints'

// Placeholder result — a real app would receive this from the predict API response.


export default function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const reportRef = useRef(null)
  const {
  patient,
  fileName,
  image,
  gradcam,
  result,
} = location.state || {}

  if (!patient) {
    return (
      <div className="container-page py-14">
        <EmptyState
          icon={Activity}
          title="No result to display"
          description="Run a new analysis to see prediction results here."
          action={
            <Button as={Link} to="/predict" icon={RefreshCcw}>
              Start a new analysis
            </Button>
          }
        />
      </div>
    )
  }

 const isCKD = ["CKD", "Chronic"].includes(result?.prediction);
 const riskVariant = isCKD ? "danger" : "success"
  const clinicalFields = [
    { icon: HeartPulse, label: 'Blood Pressure', value: `${patient.bloodPressure} mmHg` },
    { icon: FlaskConical, label: 'Creatinine', value: `${patient.creatinine} mg/dL` },
    { icon: Droplet, label: 'Hemoglobin', value: `${patient.hemoglobin} g/dL` },
    { icon: Gauge, label: 'Albumin', value: `${patient.albumin} g/dL` },
    { icon: Activity, label: 'Sugar', value: `${patient.sugar} mg/dL` },
  ]
// const downloadPDF = () => {
//   generatePDF({
//     patient,
//     result,
//     image,
//   });
// };
const downloadPDF = () => {



generatePDF({
  patient,
  result,
  image,
  gradcam,
  fileName,
});

};


  return (
    <div
  ref={reportRef}
  className="container-page py-8 sm:py-10"
       
>
  <div className="mb-8 rounded-xl border border-teal-200 bg-gradient-to-r from-teal-600 to-emerald-600 p-6 text-white shadow-lg">

  <h1 className="text-3xl font-bold">
    NephroScan AI
  </h1>

  <p className="mt-1 opacity-90">
    Explainable Chronic Kidney Disease Detection Report
  </p>

  <div className="mt-5 grid grid-cols-2 gap-4 text-sm">

    <div>
      <b>Report ID</b><br />
      CKD-{Date.now()}
    </div>

    <div>
      <b>Date</b><br />
      {new Date().toLocaleDateString()}
    </div>

    <div>
      <b>Time</b><br />
      {new Date().toLocaleTimeString()}
    </div>

    <div>
      <b>AI Model</b><br />
      CNN + Grad-CAM
    </div>

  </div>

</div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-950 sm:text-3xl">Analysis Results</h1>
          <p className="mt-1.5 text-sm text-ink-500">Patient: <span className="font-medium text-ink-700">{patient.name}</span></p>
        </div>
        <div className="flex gap-3">
          
        <Button
  variant="secondary"
  icon={Download}
  onClick={downloadPDF}
>
  Download PDF
</Button>
          <Button as={Link} to="/predict" icon={RefreshCcw} variant="outline">
            Predict Another
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Scan + Grad-CAM */}
        <div className="lg:col-span-2">
          <Card padded={false} className="overflow-hidden">
            <div className="border-b border-ink-100 px-5 py-4">
              <p className="text-sm font-semibold text-ink-900">Uploaded CT Scan</p>
              <p className="text-xs text-ink-400">{fileName || 'scan.png'}</p>
            </div>

            <div className="relative aspect-square bg-black">
              <img
                src={image}
                alt="CT Scan"
                className="h-full w-full object-contain"
                
                onError={(e) => {
                  
                
                }}
              />
            </div>

            <div className="border-t border-ink-100 px-5 py-3">
              <p className="text-xs font-medium text-ink-500">
                Grad-CAM overlay shown below
              </p>
            </div>

            <div className="relative aspect-square bg-black">
              <img
                src={gradcam}
                alt="Grad-CAM"
                className="h-full w-full object-contain"
              />

              <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-[10px] font-mono text-teal-300">
                AI Attention Map (Grad-CAM)
              </span>
            </div>
          </Card>
        </div>

        {/* Prediction summary */}
        <div className="space-y-6 lg:col-span-3">
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-full ${isCKD ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                  {isCKD ? <AlertTriangle size={26} /> : <CheckCircle2 size={26} />}
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-ink-400">Prediction</p>
                  <p className={`font-display text-2xl font-bold ${isCKD ? 'text-red-600' : 'text-green-600'}`}>
                    {result.prediction}
                  </p>
                </div>
              </div>
              <Badge variant={riskVariant}>
  {isCKD ? "High" : "Low"} Risk
</Badge>
            </div>

         <div className="mt-6 space-y-5">

  {/* Confidence */}
  <div>
    <div className="mb-2 flex items-center justify-between text-sm">
      <span className="font-medium text-ink-600">
        Confidence Score
      </span>

      <span className="font-bold text-ink-900">
        {result.confidence.toFixed(2)}%
      </span>
    </div>

    <div className="h-2.5 overflow-hidden rounded-full bg-ink-100">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${result.confidence}%` }}
        transition={{ duration: 0.8 }}
        className={`h-full rounded-full ${
          isCKD ? "bg-red-500" : "bg-green-500"
        }`}
      />
    </div>
  </div>

  {/* AI Summary */}
  <div className="grid grid-cols-2 gap-4 rounded-xl bg-ink-50 p-4">

    <div>
      <p className="text-xs text-ink-500">
        Risk Level
      </p>

      <p className="font-semibold">
        {isCKD ? "High" : "Low"}
      </p>
    </div>

    <div>
      <p className="text-xs text-ink-500">
        AI Model
      </p>

      <p className="font-semibold">
        CNN
      </p>
    </div>

    <div>
      <p className="text-xs text-ink-500">
        Attention Map
      </p>

      <p className="font-semibold text-green-600">
        Generated
      </p>
    </div>

    <div>
      <p className="text-xs text-ink-500">
        Status
      </p>

      <p className="font-semibold text-green-600">
        Completed
      </p>
    </div>

  </div>

</div>
          </Card>

          <Card>
  <CardHeader
    icon={Activity}
    title="AI Explanation"
    subtitle="Grad-CAM based rationale for this prediction"
  />

  <div className="space-y-3 text-sm leading-relaxed text-ink-600">

  <p>
    The AI model analyzed the uploaded CT scan and generated an
    attention map using <b>Grad-CAM</b> to identify the regions that
    contributed most to its prediction.
  </p>

  <p>
    <b>Prediction:</b> {result.prediction}
  </p>

  <p>
    <b>Confidence:</b> {result.confidence.toFixed(2)}%
  </p>

  <p>
    {isCKD
      ? "The model detected imaging patterns that may be associated with Chronic Kidney Disease. Clinical evaluation by a nephrologist is recommended."
      : "The model did not detect significant imaging features commonly associated with Chronic Kidney Disease. Clinical correlation is still recommended."}
  </p>

  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700">
    <b>Disclaimer:</b> This prediction is generated by an AI model for educational
    and research purposes. It should assist clinicians and must not replace
    professional medical diagnosis.
  </div>

</div>
</Card>

          <Card>
            <CardHeader icon={User} title="Patient Information" />
            <div className="mb-5 grid grid-cols-2 gap-4 rounded-xl bg-teal-50 p-4">

  <div>
    <p className="text-xs text-gray-500">Patient</p>
    <p className="font-semibold">{patient.name}</p>
  </div>

  <div>
    <p className="text-xs text-gray-500">Age</p>
    <p className="font-semibold">{patient.age}</p>
  </div>

  <div>
    <p className="text-xs text-gray-500">Gender</p>
    <p className="font-semibold">{patient.gender}</p>
  </div>

  <div>
    <p className="text-xs text-gray-500">Prediction</p>
    <p className="font-semibold">
      {result.prediction}
    </p>
  </div>

</div>
            <div className="grid gap-3 sm:grid-cols-2">
              {clinicalFields.map((f) => (
                <div key={f.label} className="flex items-center gap-3 rounded-xl border border-ink-100 bg-ink-50/60 px-4 py-3">
                  <f.icon size={16} className="text-teal-600" />
                  <div>
                    <p className="text-xs text-ink-500">{f.label}</p>
                    <p className="font-mono text-sm font-semibold text-ink-900">{f.value}</p>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-3 rounded-xl border border-ink-100 bg-ink-50/60 px-4 py-3">
                <User size={16} className="text-teal-600" />
                <div>
                  <p className="text-xs text-ink-500">Age / Gender</p>
                  <p className="font-mono text-sm font-semibold text-ink-900">{patient.age} · {patient.gender}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-10 border-t pt-6 text-center text-sm text-gray-500">

  <p>
    Generated by <b>NephroScan AI v1.0</b>
  </p>

  <p className="mt-2">
    Explainable Artificial Intelligence for Chronic Kidney Disease Detection
  </p>

  <p className="mt-2">
    © 2026 NephroScan AI
  </p>

</div>
    </div>
  )
}

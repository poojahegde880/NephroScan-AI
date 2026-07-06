import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, ScanLine, ClipboardList, Sparkles } from 'lucide-react'
import Card, { CardHeader } from '../components/ui/Card'
import FileUpload from '../components/ui/FileUpload'
import Input from '../components/ui/Input'
import { Select } from '../components/ui/Input'
import Button from '../components/ui/Button'
import ProgressLoader from '../components/ui/ProgressLoader'
import { useToast } from '../context/ToastContext'
// import { uploadScan, predictCKD } from '../api/endpoints'
import { predictCKD } from '../api/endpoints'

const PIPELINE_STEPS = [
  { label: 'Uploading' },
  { label: 'AI Analysis' },
  { label: 'Grad-CAM' },
  { label: 'Clinical Check' },
  { label: 'Finalizing' },
]

const initialForm = {
  name: '',
  age: '',
  gender: '',
  bloodPressure: '',
  creatinine: '',
  hemoglobin: '',
  albumin: '',
  sugar: '',
}

export default function Prediction() {
  const [file, setFile] = useState(null)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(0)
  const navigate = useNavigate()
  const { notify } = useToast()

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!file) next.file = 'A CT scan image is required.'
    if (!form.name.trim()) next.name = 'Patient name is required.'
    if (!form.age || form.age <= 0) next.age = 'Enter a valid age.'
    if (!form.gender) next.gender = 'Select a gender.'
    if (!form.bloodPressure) next.bloodPressure = 'Required.'
    if (!form.creatinine) next.creatinine = 'Required.'
    if (!form.hemoglobin) next.hemoglobin = 'Required.'
    if (!form.albumin) next.albumin = 'Required.'
    if (!form.sugar) next.sugar = 'Required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

const runPrediction = async () => {
  if (!validate()) {
    notify("Please fix the highlighted fields.", "error")
    return
  }

  try {
    setLoading(true)

   const formData = new FormData();

formData.append("image", file);

formData.append("name", form.name);
formData.append("age", form.age);
formData.append("gender", form.gender);

formData.append("bloodPressure", form.bloodPressure);
formData.append("creatinine", form.creatinine);
formData.append("hemoglobin", form.hemoglobin);
formData.append("albumin", form.albumin);
formData.append("sugar", form.sugar);

    const result = await predictCKD(formData)
    console.log(result);
    const BACKEND = "https://nephroscan-ai-production.up.railway.app";

const gradcamUrl = `${BACKEND}/uploads/${result.gradcam}`;

    notify("Prediction completed!", "success")

  navigate("/results", {
  state: {
    patient: form,
    fileName: result.image,
    image: `${BACKEND}/uploads/${result.image}`,
    gradcam: `${BACKEND}/uploads/${result.gradcam}`,
    result,
  },
})
  } catch (err) {
    notify(err.message, "error")
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="container-page py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ink-950 sm:text-3xl">New CKD Analysis</h1>
        <p className="mt-1.5 text-sm text-ink-500">
          Upload a CT scan and enter clinical values to run the multi-modal prediction pipeline.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader icon={ScanLine} title="CT Scan Upload" subtitle="Axial slice, DICOM export as PNG/JPG" />
            <FileUpload file={file} onFileSelect={setFile} onClear={() => setFile(null)} />
            {errors.file && <p className="mt-2 text-xs font-medium text-red-600">{errors.file}</p>}
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader icon={ClipboardList} title="Clinical Information" subtitle="Structured biomarkers used for multi-modal fusion" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Patient Name"
                placeholder="e.g. Asha Rao"
                value={form.name}
                onChange={update('name')}
                error={errors.name}
                wrapperClassName="sm:col-span-2"
              />
              <Input
                label="Age"
                type="number"
                placeholder="e.g. 54"
                unit="yrs"
                value={form.age}
                onChange={update('age')}
                error={errors.age}
              />
              <Select
                label="Gender"
                value={form.gender}
                onChange={update('gender')}
                error={errors.gender}
                options={[
                  { value: 'female', label: 'Female' },
                  { value: 'male', label: 'Male' },
                  { value: 'other', label: 'Other' },
                ]}
              />
              <Input
                label="Blood Pressure"
                placeholder="e.g. 80"
                unit="mmHg"
                value={form.bloodPressure}
                onChange={update('bloodPressure')}
                error={errors.bloodPressure}
              />
              <Input
                label="Creatinine"
                placeholder="e.g. 1.2"
                unit="mg/dL"
                value={form.creatinine}
                onChange={update('creatinine')}
                error={errors.creatinine}
              />
              <Input
                label="Hemoglobin"
                placeholder="e.g. 13.5"
                unit="g/dL"
                value={form.hemoglobin}
                onChange={update('hemoglobin')}
                error={errors.hemoglobin}
              />
              <Input
                label="Albumin"
                placeholder="e.g. 4.0"
                unit="g/dL"
                value={form.albumin}
                onChange={update('albumin')}
                error={errors.albumin}
              />
              <Input
                label="Sugar"
                placeholder="e.g. 90"
                unit="mg/dL"
                value={form.sugar}
                onChange={update('sugar')}
                error={errors.sugar}
              />
            </div>
          </Card>

          <Card className="mt-6">
            {loading ? (
              <div className="py-2">
                <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-teal-700">
                  <Sparkles size={16} className="animate-pulseSoft" />
                  Running multi-modal inference…
                </div>
                <ProgressLoader steps={PIPELINE_STEPS} activeIndex={step} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <p className="text-sm text-ink-500">
                  Predictions typically complete in under 30 seconds.
                </p>
                <Button size="lg" icon={User} onClick={runPrediction} className="w-full sm:w-auto">
                  Predict
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

import apiClient from './client'

/**
 * All functions below are placeholders describing the contract the backend
 * is expected to fulfil. No backend logic is implemented here — swap the
 * body of each function for a real request when the inference service
 * is ready. Shapes are documented so UI code never needs to change.
 */

// POST /scans — upload a CT image, returns { scanId, previewUrl }
export async function uploadScan(file, onUploadProgress) {
  const formData = new FormData()
  formData.append('scan', file)
  return apiClient.post('/scans', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
  })
}

// POST /predictions — run multi-modal inference
// payload: { scanId, patient: { name, age, gender, bloodPressure, creatinine, hemoglobin, albumin, sugar } }
// response: { prediction: 'CKD' | 'Normal', confidence, riskLevel, gradCamUrl, explanation }
export async function predictCKD(formData) {
  const response = await apiClient.post(
    "/api/predict",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )

  return response.data
}

// GET /patients/history — filterable prediction history
// params: { search, dateFrom, dateTo, page, pageSize }
export async function getPatientHistory(params) {
  return apiClient.get('/patients/history', { params })
}

// GET /patients/stats — dashboard summary statistics
export async function getDashboardStats() {
  return apiClient.get('/patients/stats')
}

// GET /reports/:predictionId — returns a PDF blob
export async function downloadReport(predictionId) {
  return apiClient.get(`/reports/${predictionId}`, { responseType: 'blob' })
}

// POST /contact — submit contact form
export async function submitContactForm(payload) {
  return apiClient.post('/contact', payload)
}

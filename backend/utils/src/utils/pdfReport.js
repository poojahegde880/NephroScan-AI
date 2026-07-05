import jsPDF from "jspdf";

export const generatePDF = ({
  patient,
  result,
}) => {

  const pdf = new jsPDF("p", "mm", "a4");

  // Header
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);
  pdf.text("NephroScan AI", 20, 20);

  pdf.setFontSize(13);
  pdf.setFont("helvetica", "normal");

  pdf.text(
    "Explainable Chronic Kidney Disease Detection Report",
    20,
    30
  );

  pdf.line(20, 35, 190, 35);

  // Patient Details
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);

  pdf.text("Patient Information", 20, 50);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);

  pdf.text(`Name : ${patient.name}`, 20, 60);
  pdf.text(`Age : ${patient.age}`, 20, 68);
  pdf.text(`Gender : ${patient.gender}`, 20, 76);

  // Prediction
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);

  pdf.text("Prediction", 20, 95);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);

  pdf.text(
    `Prediction : ${result.prediction}`,
    20,
    105
  );

  pdf.text(
    `Confidence : ${result.confidence.toFixed(2)}%`,
    20,
    113
  );

  pdf.save(`${patient.name}_CKD_Report.pdf`);

};
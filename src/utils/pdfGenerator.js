import jsPDF from "jspdf";

export const generateReportPDF = (report, patient) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.text("LAUDO MÉDICO", 105, 30, { align: "center" });

  // Patient info
  doc.setFontSize(12);
  doc.text("DADOS DO PACIENTE", 20, 50);
  doc.setFontSize(10);
  doc.text(`Nome: ${patient.name}`, 20, 60);
  doc.text(`CPF: ${patient.cpf}`, 20, 70);
  doc.text(`Data de Nascimento: ${patient.birthDate}`, 20, 80);
  doc.text(`Telefone: ${patient.phone}`, 20, 90);

  // Report info
  doc.setFontSize(12);
  doc.text("DADOS DO EXAME", 20, 110);
  doc.setFontSize(10);
  doc.text(`Tipo: ${report.type}`, 20, 120);
  doc.text(`Título: ${report.title}`, 20, 130);
  doc.text(`Data: ${report.createdAt}`, 20, 140);

  // Content
  doc.setFontSize(12);
  doc.text("RESULTADO", 20, 160);
  doc.setFontSize(10);

  const splitContent = doc.splitTextToSize(report.content, 170);
  doc.text(splitContent, 20, 170);

  let yPosition = 170 + splitContent.length * 5;

  // Diagnosis
  if (report.diagnosis) {
    doc.setFontSize(12);
    doc.text("DIAGNÓSTICO", 20, yPosition + 10);
    doc.setFontSize(10);
    const splitDiagnosis = doc.splitTextToSize(report.diagnosis, 170);
    doc.text(splitDiagnosis, 20, yPosition + 20);
    yPosition += 20 + splitDiagnosis.length * 5;
  }

  // Observations
  if (report.observations) {
    doc.setFontSize(12);
    doc.text("OBSERVAÇÕES", 20, yPosition + 10);
    doc.setFontSize(10);
    const splitObservations = doc.splitTextToSize(report.observations, 170);
    doc.text(splitObservations, 20, yPosition + 20);
    yPosition += 20 + splitObservations.length * 5;
  }

  // Signature
  if (report.signature) {
    doc.addImage(report.signature, "PNG", 20, yPosition + 20, 80, 30);
    doc.text("Assinatura Digital", 20, yPosition + 55);
    doc.text(`Assinado em: ${report.signedAt}`, 20, yPosition + 65);
  }

  // Footer
  doc.setFontSize(8);
  doc.text("Este documento foi gerado digitalmente", 105, 280, { align: "center" });

  // Save
  doc.save(`Laudo_${patient.name}_${report.createdAt}.pdf`);
};
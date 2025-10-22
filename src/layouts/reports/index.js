import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import ReportModal from "./components/ReportModal";
import SignatureModal from "./components/SignatureModal";
import { generateReportPDF } from "utils/pdfGenerator";

function Reports() {
  const [reports, setReports] = useState([]);
  const [patients, setPatients] = useState([]);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [openSignatureModal, setOpenSignatureModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const savedReports = localStorage.getItem("reports");
    const savedPatients = localStorage.getItem("patients");
    
    if (savedReports) setReports(JSON.parse(savedReports));
    if (savedPatients) setPatients(JSON.parse(savedPatients));
  }, []);

  const saveReports = (newReports) => {
    setReports(newReports);
    localStorage.setItem("reports", JSON.stringify(newReports));
  };

  const handleAddReport = (reportData) => {
    const newReport = {
      id: Date.now(),
      ...reportData,
      status: "Pendente",
      createdAt: new Date().toLocaleDateString("pt-BR"),
      signed: false
    };
    const updatedReports = [...reports, newReport];
    saveReports(updatedReports);
    setOpenReportModal(false);
  };

  const handleSignReport = (signature) => {
    const updatedReports = reports.map(r => 
      r.id === selectedReport.id 
        ? { ...r, signature, signed: true, status: "Assinado", signedAt: new Date().toLocaleDateString("pt-BR") }
        : r
    );
    saveReports(updatedReports);
    setOpenSignatureModal(false);
    setSelectedReport(null);
  };

  const getPatientName = (patientId) => {
    const patient = patients.find(p => p.id === parseInt(patientId));
    return patient ? patient.name : "Paciente não encontrado";
  };

  const handleGeneratePDF = (report) => {
    const patient = patients.find(p => p.id === parseInt(report.patientId));
    if (patient) {
      generateReportPDF(report, patient);
    } else {
      alert("Paciente não encontrado");
    }
  };

  const columns = [
    { Header: "Paciente", accessor: "patientName", width: "25%" },
    { Header: "Tipo", accessor: "type", width: "15%" },
    { Header: "Status", accessor: "status", width: "10%" },
    { Header: "Data Criação", accessor: "createdAt", width: "15%" },
    { Header: "Data Assinatura", accessor: "signedAt", width: "15%" },
    {
      Header: "Ações",
      accessor: "actions",
      width: "20%",
      Cell: ({ row }) => (
        <MDBox display="flex" gap={1}>
          <MDButton variant="text" color="info" size="small">
            Ver
          </MDButton>
          {!row.original.signed && (
            <MDButton
              variant="text"
              color="success"
              size="small"
              onClick={() => {
                setSelectedReport(row.original);
                setOpenSignatureModal(true);
              }}
            >
              Assinar
            </MDButton>
          )}
          <MDButton 
            variant="text" 
            color="warning" 
            size="small"
            onClick={() => handleGeneratePDF(row.original)}
          >
            PDF
          </MDButton>
        </MDBox>
      )
    }
  ];

  const tableData = reports.map(report => ({
    ...report,
    patientName: getPatientName(report.patientId)
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="success"
                borderRadius="lg"
                coloredShadow="success"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Gestão de Laudos
                </MDTypography>
                <MDButton
                  variant="contained"
                  color="white"
                  onClick={() => setOpenReportModal(true)}
                >
                  Novo Laudo
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows: tableData }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      
      <ReportModal
        open={openReportModal}
        onClose={() => setOpenReportModal(false)}
        onSave={handleAddReport}
        patients={patients}
      />
      
      <SignatureModal
        open={openSignatureModal}
        onClose={() => {
          setOpenSignatureModal(false);
          setSelectedReport(null);
        }}
        onSave={handleSignReport}
        report={selectedReport}
      />
    </DashboardLayout>
  );
}

export default Reports;
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
import BillingModal from "./components/BillingModal";

function BillingWhatsApp() {
  const [billings, setBillings] = useState([]);
  const [patients, setPatients] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const savedBillings = localStorage.getItem("billings");
    const savedPatients = localStorage.getItem("patients");
    
    if (savedBillings) setBillings(JSON.parse(savedBillings));
    if (savedPatients) setPatients(JSON.parse(savedPatients));
  }, []);

  const saveBillings = (newBillings) => {
    setBillings(newBillings);
    localStorage.setItem("billings", JSON.stringify(newBillings));
  };

  const handleAddBilling = (billingData) => {
    const newBilling = {
      id: Date.now(),
      ...billingData,
      status: "Pendente",
      createdAt: new Date().toLocaleDateString("pt-BR")
    };
    const updatedBillings = [...billings, newBilling];
    saveBillings(updatedBillings);
    setOpenModal(false);
  };

  const handleSendWhatsApp = (billing) => {
    const patient = patients.find(p => p.id === parseInt(billing.patientId));
    if (!patient || !patient.phone) {
      alert("Paciente não encontrado ou sem telefone cadastrado");
      return;
    }

    const message = `Olá ${patient.name}! 

Segue a cobrança referente ao(s) serviço(s) médico(s):

📋 *Descrição:* ${billing.description}
💰 *Valor:* R$ ${billing.amount}
📅 *Vencimento:* ${billing.dueDate}

Para pagamento, entre em contato conosco.

Atenciosamente,
Clínica Médica`;

    const phone = patient.phone.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, "_blank");
    
    // Atualizar status para enviado
    const updatedBillings = billings.map(b => 
      b.id === billing.id ? { ...b, status: "Enviado", sentAt: new Date().toLocaleDateString("pt-BR") } : b
    );
    saveBillings(updatedBillings);
  };

  const getPatientName = (patientId) => {
    const patient = patients.find(p => p.id === parseInt(patientId));
    return patient ? patient.name : "Paciente não encontrado";
  };

  const columns = [
    { Header: "Paciente", accessor: "patientName", width: "25%" },
    { Header: "Descrição", accessor: "description", width: "25%" },
    { Header: "Valor", accessor: "formattedAmount", width: "10%" },
    { Header: "Vencimento", accessor: "dueDate", width: "15%" },
    { Header: "Status", accessor: "status", width: "10%" },
    {
      Header: "Ações",
      accessor: "actions",
      width: "15%",
      Cell: ({ row }) => (
        <MDBox display="flex" gap={1}>
          <MDButton
            variant="text"
            color="success"
            size="small"
            onClick={() => handleSendWhatsApp(row.original)}
            disabled={row.original.status === "Enviado"}
          >
            {row.original.status === "Enviado" ? "Enviado" : "WhatsApp"}
          </MDButton>
        </MDBox>
      )
    }
  ];

  const tableData = billings.map(billing => ({
    ...billing,
    patientName: getPatientName(billing.patientId),
    formattedAmount: `R$ ${billing.amount}`
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
                bgColor="warning"
                borderRadius="lg"
                coloredShadow="warning"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Cobrança via WhatsApp
                </MDTypography>
                <MDButton
                  variant="contained"
                  color="white"
                  onClick={() => setOpenModal(true)}
                >
                  Nova Cobrança
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
      
      <BillingModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleAddBilling}
        patients={patients}
      />
    </DashboardLayout>
  );
}

export default BillingWhatsApp;
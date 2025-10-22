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
import ScheduleModal from "./components/ScheduleModal";
import { Chip } from "@mui/material";

function Schedule() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const savedAppointments = localStorage.getItem("appointments");
    const savedPatients = localStorage.getItem("patients");
    
    if (savedAppointments) setAppointments(JSON.parse(savedAppointments));
    if (savedPatients) setPatients(JSON.parse(savedPatients));
    
    // Check for delays
    checkDelays();
  }, []);

  const checkDelays = () => {
    const now = new Date();
    const updated = appointments.map(apt => {
      const aptTime = new Date(`${apt.date} ${apt.time}`);
      if (aptTime < now && apt.status === "Agendado") {
        return { ...apt, status: "Atrasado" };
      }
      return apt;
    });
    if (JSON.stringify(updated) !== JSON.stringify(appointments)) {
      setAppointments(updated);
      localStorage.setItem("appointments", JSON.stringify(updated));
    }
  };

  const handleAddAppointment = (data) => {
    const newAppointment = {
      id: Date.now(),
      ...data,
      status: "Agendado",
      createdAt: new Date().toLocaleDateString("pt-BR")
    };
    const updated = [...appointments, newAppointment];
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
    setOpenModal(false);
  };

  const handleStatusChange = (id, status) => {
    const updated = appointments.map(apt => 
      apt.id === id ? { ...apt, status } : apt
    );
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const getPatientName = (patientId) => {
    const patient = patients.find(p => p.id === parseInt(patientId));
    return patient ? patient.name : "Paciente não encontrado";
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Agendado": return "info";
      case "Confirmado": return "success";
      case "Atrasado": return "error";
      case "Cancelado": return "secondary";
      case "Concluído": return "primary";
      default: return "info";
    }
  };

  const columns = [
    { Header: "Paciente", accessor: "patientName", width: "25%" },
    { Header: "Data", accessor: "date", width: "15%" },
    { Header: "Horário", accessor: "time", width: "10%" },
    { Header: "Tipo", accessor: "type", width: "15%" },
    { 
      Header: "Status", 
      accessor: "status", 
      width: "15%",
      Cell: ({ row }) => (
        <Chip 
          label={row.original.status} 
          color={getStatusColor(row.original.status)}
          size="small"
        />
      )
    },
    {
      Header: "Ações",
      accessor: "actions",
      width: "20%",
      Cell: ({ row }) => (
        <MDBox display="flex" gap={1}>
          <MDButton
            variant="text"
            color="success"
            size="small"
            onClick={() => handleStatusChange(row.original.id, "Confirmado")}
          >
            Confirmar
          </MDButton>
          <MDButton
            variant="text"
            color="primary"
            size="small"
            onClick={() => handleStatusChange(row.original.id, "Concluído")}
          >
            Concluir
          </MDButton>
          <MDButton
            variant="text"
            color="error"
            size="small"
            onClick={() => handleStatusChange(row.original.id, "Cancelado")}
          >
            Cancelar
          </MDButton>
        </MDBox>
      )
    }
  ];

  const tableData = appointments.map(apt => ({
    ...apt,
    patientName: getPatientName(apt.patientId)
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
                bgColor="primary"
                borderRadius="lg"
                coloredShadow="primary"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Agenda Médica
                </MDTypography>
                <MDButton
                  variant="contained"
                  color="white"
                  onClick={() => setOpenModal(true)}
                >
                  Nova Consulta
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
      
      <ScheduleModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleAddAppointment}
        patients={patients}
      />
    </DashboardLayout>
  );
}

export default Schedule;
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
import PatientModal from "./components/PatientModal";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const savedPatients = localStorage.getItem("patients");
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    }
  }, []);

  const savePatients = (newPatients) => {
    setPatients(newPatients);
    localStorage.setItem("patients", JSON.stringify(newPatients));
  };

  const handleAddPatient = (patientData) => {
    const newPatient = {
      id: Date.now(),
      ...patientData,
      createdAt: new Date().toLocaleDateString("pt-BR")
    };
    const updatedPatients = [...patients, newPatient];
    savePatients(updatedPatients);
    setOpenModal(false);
  };

  const handleEditPatient = (patientData) => {
    const updatedPatients = patients.map(p => 
      p.id === selectedPatient.id ? { ...p, ...patientData } : p
    );
    savePatients(updatedPatients);
    setOpenModal(false);
    setSelectedPatient(null);
  };

  const handleDeletePatient = (id) => {
    const updatedPatients = patients.filter(p => p.id !== id);
    savePatients(updatedPatients);
  };

  const columns = [
    { Header: "Nome", accessor: "name", width: "25%" },
    { Header: "CPF", accessor: "cpf", width: "15%" },
    { Header: "Telefone", accessor: "phone", width: "15%" },
    { Header: "Email", accessor: "email", width: "20%" },
    { Header: "Data Cadastro", accessor: "createdAt", width: "15%" },
    {
      Header: "Ações",
      accessor: "actions",
      width: "10%",
      Cell: ({ row }) => (
        <MDBox display="flex" gap={1}>
          <MDButton
            variant="text"
            color="info"
            size="small"
            onClick={() => {
              setSelectedPatient(row.original);
              setOpenModal(true);
            }}
          >
            Editar
          </MDButton>
          <MDButton
            variant="text"
            color="error"
            size="small"
            onClick={() => handleDeletePatient(row.original.id)}
          >
            Excluir
          </MDButton>
        </MDBox>
      )
    }
  ];

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
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Gestão de Pacientes
                </MDTypography>
                <MDButton
                  variant="contained"
                  color="white"
                  onClick={() => {
                    setSelectedPatient(null);
                    setOpenModal(true);
                  }}
                >
                  Novo Paciente
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows: patients }}
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
      <PatientModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedPatient(null);
        }}
        onSave={selectedPatient ? handleEditPatient : handleAddPatient}
        patient={selectedPatient}
      />
    </DashboardLayout>
  );
}

export default Patients;
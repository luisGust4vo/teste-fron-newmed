import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Tabs, Tab, Box } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import PatientSelector from "./components/PatientSelector";
import MedicalHistory from "./components/MedicalHistory";
import Prescriptions from "./components/Prescriptions";
import ExamResults from "./components/ExamResults";

function MedicalRecords() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [medicalData, setMedicalData] = useState({
    history: [],
    prescriptions: [],
    exams: []
  });

  useEffect(() => {
    const savedPatients = localStorage.getItem("patients");
    if (savedPatients) setPatients(JSON.parse(savedPatients));
  }, []);

  useEffect(() => {
    if (selectedPatient) {
      const savedData = localStorage.getItem(`medical_${selectedPatient.id}`);
      if (savedData) {
        setMedicalData(JSON.parse(savedData));
      } else {
        setMedicalData({ history: [], prescriptions: [], exams: [] });
      }
    }
  }, [selectedPatient]);

  const saveMedicalData = (data) => {
    if (selectedPatient) {
      setMedicalData(data);
      localStorage.setItem(`medical_${selectedPatient.id}`, JSON.stringify(data));
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
                bgColor="dark"
                borderRadius="lg"
                coloredShadow="dark"
              >
                <MDTypography variant="h6" color="white">
                  Prontuário Eletrônico
                </MDTypography>
              </MDBox>
              
              <MDBox p={3}>
                <PatientSelector
                  patients={patients}
                  selectedPatient={selectedPatient}
                  onSelectPatient={setSelectedPatient}
                />
                
                {selectedPatient && (
                  <Box sx={{ mt: 3 }}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                      <Tab label="Histórico Médico" />
                      <Tab label="Prescrições" />
                      <Tab label="Exames" />
                    </Tabs>
                    
                    <Box sx={{ mt: 2 }}>
                      {tabValue === 0 && (
                        <MedicalHistory
                          patient={selectedPatient}
                          history={medicalData.history}
                          onSave={(history) => saveMedicalData({...medicalData, history})}
                        />
                      )}
                      {tabValue === 1 && (
                        <Prescriptions
                          patient={selectedPatient}
                          prescriptions={medicalData.prescriptions}
                          onSave={(prescriptions) => saveMedicalData({...medicalData, prescriptions})}
                        />
                      )}
                      {tabValue === 2 && (
                        <ExamResults
                          patient={selectedPatient}
                          exams={medicalData.exams}
                          onSave={(exams) => saveMedicalData({...medicalData, exams})}
                        />
                      )}
                    </Box>
                  </Box>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MedicalRecords;
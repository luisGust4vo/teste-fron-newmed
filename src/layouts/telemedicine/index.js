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
import VideoCall from "./components/VideoCall";
import FileManager from "./components/FileManager";
import ConsultationHistory from "./components/ConsultationHistory";

function Telemedicine() {
  const [tabValue, setTabValue] = useState(0);
  const [consultations, setConsultations] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const savedConsultations = localStorage.getItem("telemedicine");
    const savedFiles = localStorage.getItem("medicalFiles");
    
    if (savedConsultations) setConsultations(JSON.parse(savedConsultations));
    if (savedFiles) setFiles(JSON.parse(savedFiles));
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const saveConsultation = (consultation) => {
    const updated = [...consultations, consultation];
    setConsultations(updated);
    localStorage.setItem("telemedicine", JSON.stringify(updated));
  };

  const saveFile = (file) => {
    const updated = [...files, file];
    setFiles(updated);
    localStorage.setItem("medicalFiles", JSON.stringify(updated));
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
                bgColor="error"
                borderRadius="lg"
                coloredShadow="error"
              >
                <MDTypography variant="h6" color="white">
                  Telemedicina
                </MDTypography>
              </MDBox>
              
              <MDBox p={3}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                  <Tab label="Videochamada" />
                  <Tab label="Arquivos Médicos" />
                  <Tab label="Histórico" />
                </Tabs>
                
                <Box sx={{ mt: 3 }}>
                  {tabValue === 0 && (
                    <VideoCall onSaveConsultation={saveConsultation} />
                  )}
                  {tabValue === 1 && (
                    <FileManager files={files} onSaveFile={saveFile} />
                  )}
                  {tabValue === 2 && (
                    <ConsultationHistory consultations={consultations} />
                  )}
                </Box>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Telemedicine;
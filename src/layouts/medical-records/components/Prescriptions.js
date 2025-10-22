import { useState } from "react";
import { Grid, TextField, Card, CardContent, IconButton } from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DrugInteractionAlert from "../../alerts/components/DrugInteractionAlert";

function Prescriptions({ patient, prescriptions, onSave }) {
  const [newPrescription, setNewPrescription] = useState({
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: ""
  });

  const handleAdd = () => {
    if (!newPrescription.medication || !newPrescription.dosage) {
      alert("Preencha medicamento e dosagem");
      return;
    }
    
    const prescription = {
      id: Date.now(),
      ...newPrescription,
      date: new Date().toLocaleDateString("pt-BR"),
      doctor: "Dr. Sistema"
    };
    
    onSave([...prescriptions, prescription]);
    setNewPrescription({
      medication: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: ""
    });
  };

  const handleDelete = (id) => {
    onSave(prescriptions.filter(p => p.id !== id));
  };

  const currentMedications = prescriptions.map(p => p.medication);

  return (
    <MDBox>
      <DrugInteractionAlert medications={currentMedications} />
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <MDTypography variant="h6" mb={2}>Nova Prescrição</MDTypography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Medicamento *"
                value={newPrescription.medication}
                onChange={(e) => setNewPrescription({...newPrescription, medication: e.target.value})}
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Dosagem *"
                value={newPrescription.dosage}
                onChange={(e) => setNewPrescription({...newPrescription, dosage: e.target.value})}
                variant="outlined"
                placeholder="Ex: 500mg"
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Frequência"
                value={newPrescription.frequency}
                onChange={(e) => setNewPrescription({...newPrescription, frequency: e.target.value})}
                variant="outlined"
                placeholder="Ex: 2x ao dia"
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Duração"
                value={newPrescription.duration}
                onChange={(e) => setNewPrescription({...newPrescription, duration: e.target.value})}
                variant="outlined"
                placeholder="Ex: 7 dias"
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <MDButton
                variant="gradient"
                color="success"
                onClick={handleAdd}
                startIcon={<Add />}
                fullWidth
                sx={{ height: "56px" }}
              >
                Adicionar
              </MDButton>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Instruções"
                multiline
                rows={2}
                value={newPrescription.instructions}
                onChange={(e) => setNewPrescription({...newPrescription, instructions: e.target.value})}
                variant="outlined"
                placeholder="Instruções especiais para o paciente"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <MDTypography variant="h6" mb={2}>Prescrições Anteriores</MDTypography>
      
      {prescriptions.map((prescription) => (
        <Card key={prescription.id} sx={{ mb: 2 }}>
          <CardContent>
            <MDBox display="flex" justifyContent="space-between" alignItems="flex-start">
              <MDBox>
                <MDTypography variant="h6">{prescription.medication}</MDTypography>
                <MDTypography variant="body2" color="text">
                  Dosagem: {prescription.dosage} | Frequência: {prescription.frequency}
                </MDTypography>
                <MDTypography variant="body2" color="text">
                  Duração: {prescription.duration} | Data: {prescription.date}
                </MDTypography>
                {prescription.instructions && (
                  <MDTypography variant="body2" color="text" sx={{ mt: 1 }}>
                    Instruções: {prescription.instructions}
                  </MDTypography>
                )}
              </MDBox>
              
              <IconButton
                color="error"
                onClick={() => handleDelete(prescription.id)}
              >
                <Delete />
              </IconButton>
            </MDBox>
          </CardContent>
        </Card>
      ))}
      
      {prescriptions.length === 0 && (
        <MDTypography variant="body2" color="text" textAlign="center" py={3}>
          Nenhuma prescrição registrada
        </MDTypography>
      )}
    </MDBox>
  );
}

export default Prescriptions;
import { useState } from "react";
import { Grid, TextField, Card, CardContent, IconButton, Chip } from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function MedicalHistory({ patient, history, onSave }) {
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    complaint: "",
    diagnosis: "",
    treatment: "",
    allergies: "",
    observations: ""
  });

  const handleAdd = () => {
    if (!newEntry.complaint) {
      alert("Preencha a queixa principal");
      return;
    }
    
    const entry = {
      id: Date.now(),
      ...newEntry,
      doctor: "Dr. Sistema"
    };
    
    onSave([...history, entry]);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      complaint: "",
      diagnosis: "",
      treatment: "",
      allergies: "",
      observations: ""
    });
  };

  const handleDelete = (id) => {
    onSave(history.filter(h => h.id !== id));
  };

  return (
    <MDBox>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <MDTypography variant="h6" mb={2}>Nova Entrada no Histórico</MDTypography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Data"
                type="date"
                value={newEntry.date}
                onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                label="Queixa Principal *"
                value={newEntry.complaint}
                onChange={(e) => setNewEntry({...newEntry, complaint: e.target.value})}
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Diagnóstico"
                value={newEntry.diagnosis}
                onChange={(e) => setNewEntry({...newEntry, diagnosis: e.target.value})}
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tratamento"
                value={newEntry.treatment}
                onChange={(e) => setNewEntry({...newEntry, treatment: e.target.value})}
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Alergias"
                value={newEntry.allergies}
                onChange={(e) => setNewEntry({...newEntry, allergies: e.target.value})}
                variant="outlined"
                placeholder="Medicamentos, alimentos, etc."
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <MDButton
                variant="gradient"
                color="dark"
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
                label="Observações"
                multiline
                rows={3}
                value={newEntry.observations}
                onChange={(e) => setNewEntry({...newEntry, observations: e.target.value})}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <MDTypography variant="h6" mb={2}>Histórico Médico</MDTypography>
      
      {history.map((entry) => (
        <Card key={entry.id} sx={{ mb: 2 }}>
          <CardContent>
            <MDBox display="flex" justifyContent="space-between" alignItems="flex-start">
              <MDBox flex={1}>
                <MDBox display="flex" alignItems="center" gap={2} mb={1}>
                  <MDTypography variant="h6">{entry.complaint}</MDTypography>
                  <Chip label={entry.date} size="small" color="primary" />
                </MDBox>
                
                {entry.diagnosis && (
                  <MDTypography variant="body2" color="text" mb={1}>
                    <strong>Diagnóstico:</strong> {entry.diagnosis}
                  </MDTypography>
                )}
                
                {entry.treatment && (
                  <MDTypography variant="body2" color="text" mb={1}>
                    <strong>Tratamento:</strong> {entry.treatment}
                  </MDTypography>
                )}
                
                {entry.allergies && (
                  <MDTypography variant="body2" color="error" mb={1}>
                    <strong>Alergias:</strong> {entry.allergies}
                  </MDTypography>
                )}
                
                {entry.observations && (
                  <MDTypography variant="body2" color="text" mb={1}>
                    <strong>Observações:</strong> {entry.observations}
                  </MDTypography>
                )}
                
                <MDTypography variant="caption" color="text">
                  Médico: {entry.doctor}
                </MDTypography>
              </MDBox>
              
              <IconButton
                color="error"
                onClick={() => handleDelete(entry.id)}
              >
                <Delete />
              </IconButton>
            </MDBox>
          </CardContent>
        </Card>
      ))}
      
      {history.length === 0 && (
        <MDTypography variant="body2" color="text" textAlign="center" py={3}>
          Nenhum histórico médico registrado
        </MDTypography>
      )}
    </MDBox>
  );
}

export default MedicalHistory;
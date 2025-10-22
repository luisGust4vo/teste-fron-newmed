import { TextField, MenuItem, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function PatientSelector({ patients, selectedPatient, onSelectPatient }) {
  return (
    <MDBox>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            select
            label="Selecionar Paciente"
            value={selectedPatient?.id || ""}
            onChange={(e) => {
              const patient = patients.find(p => p.id === parseInt(e.target.value));
              onSelectPatient(patient);
            }}
            variant="outlined"
          >
            {patients.map((patient) => (
              <MenuItem key={patient.id} value={patient.id}>
                {patient.name} - {patient.cpf}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        
        {selectedPatient && (
          <Grid item xs={12} md={6}>
            <MDBox>
              <MDTypography variant="h6">{selectedPatient.name}</MDTypography>
              <MDTypography variant="body2" color="text">
                CPF: {selectedPatient.cpf} | Telefone: {selectedPatient.phone}
              </MDTypography>
              <MDTypography variant="body2" color="text">
                Email: {selectedPatient.email}
              </MDTypography>
            </MDBox>
          </Grid>
        )}
      </Grid>
    </MDBox>
  );
}

export default PatientSelector;
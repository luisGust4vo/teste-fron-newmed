import { useState } from "react";
import { Modal, Grid, TextField, MenuItem } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

const appointmentTypes = [
  "Consulta Inicial",
  "Retorno",
  "Exame",
  "Procedimento",
  "Telemedicina"
];

function ScheduleModal({ open, onClose, onSave, patients }) {
  const [formData, setFormData] = useState({
    patientId: "",
    date: "",
    time: "",
    type: "",
    notes: ""
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = () => {
    if (!formData.patientId || !formData.date || !formData.time || !formData.type) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }
    onSave(formData);
    setFormData({
      patientId: "",
      date: "",
      time: "",
      type: "",
      notes: ""
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <MDBox
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4
        }}
      >
        <MDTypography variant="h5" mb={3}>
          Agendar Consulta
        </MDTypography>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Paciente *"
              value={formData.patientId}
              onChange={handleChange("patientId")}
              variant="outlined"
            >
              {patients.map((patient) => (
                <MenuItem key={patient.id} value={patient.id}>
                  {patient.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Data *"
              type="date"
              value={formData.date}
              onChange={handleChange("date")}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Horário *"
              type="time"
              value={formData.time}
              onChange={handleChange("time")}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Tipo de Consulta *"
              value={formData.type}
              onChange={handleChange("type")}
              variant="outlined"
            >
              {appointmentTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observações"
              multiline
              rows={3}
              value={formData.notes}
              onChange={handleChange("notes")}
              variant="outlined"
            />
          </Grid>
        </Grid>
        
        <MDBox display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <MDButton variant="outlined" color="secondary" onClick={onClose}>
            Cancelar
          </MDButton>
          <MDButton variant="gradient" color="primary" onClick={handleSubmit}>
            Agendar
          </MDButton>
        </MDBox>
      </MDBox>
    </Modal>
  );
}

export default ScheduleModal;
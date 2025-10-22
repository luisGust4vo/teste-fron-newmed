import { useState } from "react";
import { Modal, Grid, TextField, MenuItem } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

const reportTypes = [
  "Exame de Sangue",
  "Raio-X",
  "Ultrassom",
  "Ressonância Magnética",
  "Tomografia",
  "Eletrocardiograma",
  "Consulta Médica",
  "Outros"
];

function ReportModal({ open, onClose, onSave, patients }) {
  const [formData, setFormData] = useState({
    patientId: "",
    type: "",
    title: "",
    content: "",
    observations: "",
    diagnosis: ""
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = () => {
    if (!formData.patientId || !formData.type || !formData.title || !formData.content) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }
    onSave(formData);
    setFormData({
      patientId: "",
      type: "",
      title: "",
      content: "",
      observations: "",
      diagnosis: ""
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
          width: 800,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          maxHeight: "90vh",
          overflow: "auto"
        }}
      >
        <MDTypography variant="h5" mb={3}>
          Novo Laudo Médico
        </MDTypography>
        
        <Grid container spacing={2}>
          <Grid item xs={6}>
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
              select
              label="Tipo de Exame *"
              value={formData.type}
              onChange={handleChange("type")}
              variant="outlined"
            >
              {reportTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Título do Laudo *"
              value={formData.title}
              onChange={handleChange("title")}
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Conteúdo do Laudo *"
              multiline
              rows={8}
              value={formData.content}
              onChange={handleChange("content")}
              variant="outlined"
              placeholder="Descreva os resultados do exame, procedimentos realizados e achados clínicos..."
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Diagnóstico"
              multiline
              rows={3}
              value={formData.diagnosis}
              onChange={handleChange("diagnosis")}
              variant="outlined"
              placeholder="Diagnóstico médico baseado nos resultados..."
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Observações"
              multiline
              rows={3}
              value={formData.observations}
              onChange={handleChange("observations")}
              variant="outlined"
              placeholder="Observações adicionais, recomendações ou orientações..."
            />
          </Grid>
        </Grid>
        
        <MDBox display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <MDButton variant="outlined" color="secondary" onClick={onClose}>
            Cancelar
          </MDButton>
          <MDButton variant="gradient" color="success" onClick={handleSubmit}>
            Criar Laudo
          </MDButton>
        </MDBox>
      </MDBox>
    </Modal>
  );
}

export default ReportModal;
import { useState } from "react";
import { Modal, Grid, TextField, MenuItem } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function BillingModal({ open, onClose, onSave, patients }) {
  const [formData, setFormData] = useState({
    patientId: "",
    description: "",
    amount: "",
    dueDate: ""
  });

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = () => {
    if (!formData.patientId || !formData.description || !formData.amount || !formData.dueDate) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }
    onSave(formData);
    setFormData({
      patientId: "",
      description: "",
      amount: "",
      dueDate: ""
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
          Nova Cobrança
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
                  {patient.name} - {patient.phone}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descrição do Serviço *"
              value={formData.description}
              onChange={handleChange("description")}
              variant="outlined"
              placeholder="Ex: Consulta médica, Exame de sangue, etc."
            />
          </Grid>
          
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Valor (R$) *"
              type="number"
              value={formData.amount}
              onChange={handleChange("amount")}
              variant="outlined"
              inputProps={{ step: "0.01", min: "0" }}
            />
          </Grid>
          
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Data de Vencimento *"
              type="date"
              value={formData.dueDate}
              onChange={handleChange("dueDate")}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
        
        <MDBox display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <MDButton variant="outlined" color="secondary" onClick={onClose}>
            Cancelar
          </MDButton>
          <MDButton variant="gradient" color="warning" onClick={handleSubmit}>
            Criar Cobrança
          </MDButton>
        </MDBox>
      </MDBox>
    </Modal>
  );
}

export default BillingModal;
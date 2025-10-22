import { useState, useEffect } from "react";
import { Modal, Grid, TextField } from "@mui/material";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function PatientModal({ open, onClose, onSave, patient }) {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    phone: "",
    email: "",
    birthDate: "",
    address: "",
    medicalHistory: "",
  });

  useEffect(() => {
    if (patient) {
      setFormData(patient);
    } else {
      setFormData({
        name: "",
        cpf: "",
        phone: "",
        email: "",
        birthDate: "",
        address: "",
        medicalHistory: "",
      });
    }
  }, [patient]);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.cpf || !formData.phone) {
      alert("Preencha os campos obrigatórios: Nome, CPF e Telefone");
      return;
    }
    onSave(formData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <MDBox
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          maxHeight: "90vh",
          overflow: "auto"
        }}
      >
        <MDTypography variant="h5" mb={3}>
          {patient ? "Editar Paciente" : "Novo Paciente"}
        </MDTypography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome Completo *"
              value={formData.name}
              onChange={handleChange("name")}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="CPF *"
              value={formData.cpf}
              onChange={handleChange("cpf")}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Telefone *"
              value={formData.phone}
              onChange={handleChange("phone")}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Data de Nascimento"
              type="date"
              value={formData.birthDate}
              onChange={handleChange("birthDate")}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Endereço"
              value={formData.address}
              onChange={handleChange("address")}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Histórico Médico"
              multiline
              rows={4}
              value={formData.medicalHistory}
              onChange={handleChange("medicalHistory")}
              variant="outlined"
            />
          </Grid>
        </Grid>

        <MDBox display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <MDButton variant="outlined" color="secondary" onClick={onClose}>
            Cancelar
          </MDButton>
          <MDButton variant="gradient" color="info" onClick={handleSubmit}>
            Salvar
          </MDButton>
        </MDBox>
      </MDBox>
    </Modal>
  );
}

PatientModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  patient: PropTypes.object,
};

export default PatientModal;
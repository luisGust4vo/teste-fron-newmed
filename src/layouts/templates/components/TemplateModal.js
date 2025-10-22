import { useState, useEffect } from "react";
import { Modal, Grid, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

const categories = [
  "Cardiologia",
  "Oftalmologia",
  "Dermatologia",
  "Neurologia",
  "Ortopedia",
  "Pediatria",
  "Ginecologia",
  "Urologia",
  "Geral"
];

function TemplateModal({ open, onClose, onSave, template }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    content: ""
  });

  useEffect(() => {
    if (template) {
      setFormData(template);
    } else {
      setFormData({
        name: "",
        category: "",
        content: ""
      });
    }
  }, [template]);

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.category || !formData.content) {
      alert("Preencha todos os campos");
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
          width: 700,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          maxHeight: "90vh",
          overflow: "auto"
        }}
      >
        <MDTypography variant="h5" mb={3}>
          {template ? "Editar Template" : "Novo Template"}
        </MDTypography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Nome do Template *"
              value={formData.name}
              onChange={handleChange("name")}
              variant="outlined"
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              select
              label="Categoria *"
              value={formData.category}
              onChange={handleChange("category")}
              variant="outlined"
              SelectProps={{ native: true }}
            >
              <option value="">Selecione...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Conteúdo do Template *"
              multiline
              rows={15}
              value={formData.content}
              onChange={handleChange("content")}
              variant="outlined"
              placeholder="Digite o conteúdo do template aqui..."
            />
          </Grid>
        </Grid>
        
        <MDBox display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <MDButton variant="outlined" color="secondary" onClick={onClose}>
            Cancelar
          </MDButton>
          <MDButton variant="gradient" color="secondary" onClick={handleSubmit}>
            Salvar Template
          </MDButton>
        </MDBox>
      </MDBox>
    </Modal>
  );
}

export default TemplateModal;
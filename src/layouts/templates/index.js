import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import TemplateModal from "./components/TemplateModal";
import { CardContent, IconButton } from "@mui/material";
import { Edit, Delete, FileCopy } from "@mui/icons-material";

const defaultTemplates = [
  {
    id: 1,
    name: "Consulta Cardiológica",
    category: "Cardiologia",
    content: `CONSULTA CARDIOLÓGICA

QUEIXA PRINCIPAL:
[Descrever a queixa principal do paciente]

HISTÓRIA DA DOENÇA ATUAL:
[Detalhar a evolução dos sintomas]

EXAME FÍSICO:
- PA: ___/___ mmHg
- FC: ___ bpm
- Ausculta cardíaca: ___
- Ausculta pulmonar: ___

DIAGNÓSTICO:
[Diagnóstico principal]

CONDUTA:
[Prescrições e orientações]`
  },
  {
    id: 2,
    name: "Exame Oftalmológico",
    category: "Oftalmologia",
    content: `EXAME OFTALMOLÓGICO

ACUIDADE VISUAL:
- OD: ___
- OE: ___

BIOMICROSCOPIA:
- Conjuntiva: ___
- Córnea: ___
- Íris: ___

FUNDOSCOPIA:
- Papila: ___
- Mácula: ___
- Vasos: ___

DIAGNÓSTICO:
[Diagnóstico]

CONDUTA:
[Tratamento e orientações]`
  }
];

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("reportTemplates");
    if (saved) {
      setTemplates(JSON.parse(saved));
    } else {
      setTemplates(defaultTemplates);
      localStorage.setItem("reportTemplates", JSON.stringify(defaultTemplates));
    }
  }, []);

  const saveTemplates = (newTemplates) => {
    setTemplates(newTemplates);
    localStorage.setItem("reportTemplates", JSON.stringify(newTemplates));
  };

  const handleSave = (templateData) => {
    if (selectedTemplate) {
      const updated = templates.map(t => 
        t.id === selectedTemplate.id ? { ...t, ...templateData } : t
      );
      saveTemplates(updated);
    } else {
      const newTemplate = {
        id: Date.now(),
        ...templateData,
        createdAt: new Date().toLocaleDateString("pt-BR")
      };
      saveTemplates([...templates, newTemplate]);
    }
    setOpenModal(false);
    setSelectedTemplate(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja excluir este template?")) {
      saveTemplates(templates.filter(t => t.id !== id));
    }
  };

  const handleCopy = (template) => {
    navigator.clipboard.writeText(template.content);
    alert("Template copiado para a área de transferência!");
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
                bgColor="secondary"
                borderRadius="lg"
                coloredShadow="secondary"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Templates de Laudos
                </MDTypography>
                <MDButton
                  variant="contained"
                  color="white"
                  onClick={() => {
                    setSelectedTemplate(null);
                    setOpenModal(true);
                  }}
                >
                  Novo Template
                </MDButton>
              </MDBox>
              
              <MDBox p={3}>
                <Grid container spacing={3}>
                  {templates.map((template) => (
                    <Grid item xs={12} md={6} lg={4} key={template.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                            <MDBox>
                              <MDTypography variant="h6">{template.name}</MDTypography>
                              <MDTypography variant="body2" color="text">
                                {template.category}
                              </MDTypography>
                            </MDBox>
                            
                            <MDBox display="flex" gap={1}>
                              <IconButton
                                size="small"
                                color="info"
                                onClick={() => handleCopy(template)}
                              >
                                <FileCopy />
                              </IconButton>
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => {
                                  setSelectedTemplate(template);
                                  setOpenModal(true);
                                }}
                              >
                                <Edit />
                              </IconButton>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDelete(template.id)}
                              >
                                <Delete />
                              </IconButton>
                            </MDBox>
                          </MDBox>
                          
                          <MDTypography variant="body2" color="text" sx={{ 
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical"
                          }}>
                            {template.content}
                          </MDTypography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      
      <TemplateModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedTemplate(null);
        }}
        onSave={handleSave}
        template={selectedTemplate}
      />
    </DashboardLayout>
  );
}

export default Templates;
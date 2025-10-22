import { useState } from "react";
import { Grid, TextField, Card, CardContent, IconButton, Chip } from "@mui/material";
import { Delete, Add, CloudUpload } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

const examTypes = [
  "Hemograma",
  "Raio-X",
  "Ultrassom",
  "Tomografia",
  "Ressonância",
  "Eletrocardiograma",
  "Endoscopia",
  "Outros"
];

function ExamResults({ patient, exams, onSave }) {
  const [newExam, setNewExam] = useState({
    date: new Date().toISOString().split('T')[0],
    type: "",
    laboratory: "",
    results: "",
    observations: "",
    files: []
  });

  const handleAdd = () => {
    if (!newExam.type || !newExam.results) {
      alert("Preencha tipo e resultados do exame");
      return;
    }
    
    const exam = {
      id: Date.now(),
      ...newExam,
      doctor: "Dr. Sistema"
    };
    
    onSave([...exams, exam]);
    setNewExam({
      date: new Date().toISOString().split('T')[0],
      type: "",
      laboratory: "",
      results: "",
      observations: "",
      files: []
    });
  };

  const handleDelete = (id) => {
    onSave(exams.filter(e => e.id !== id));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const fileData = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    }));
    setNewExam({...newExam, files: [...newExam.files, ...fileData]});
  };

  return (
    <MDBox>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <MDTypography variant="h6" mb={2}>Novo Resultado de Exame</MDTypography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Data"
                type="date"
                value={newExam.date}
                onChange={(e) => setNewExam({...newExam, date: e.target.value})}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                select
                label="Tipo de Exame *"
                value={newExam.type}
                onChange={(e) => setNewExam({...newExam, type: e.target.value})}
                variant="outlined"
                SelectProps={{ native: true }}
              >
                <option value="">Selecione...</option>
                {examTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Laboratório/Local"
                value={newExam.laboratory}
                onChange={(e) => setNewExam({...newExam, laboratory: e.target.value})}
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Resultados *"
                multiline
                rows={4}
                value={newExam.results}
                onChange={(e) => setNewExam({...newExam, results: e.target.value})}
                variant="outlined"
                placeholder="Descreva os resultados do exame..."
              />
            </Grid>
            
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Observações"
                multiline
                rows={2}
                value={newExam.observations}
                onChange={(e) => setNewExam({...newExam, observations: e.target.value})}
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <MDBox>
                <input
                  accept="image/*,.pdf"
                  style={{ display: 'none' }}
                  id="exam-file-upload"
                  multiple
                  type="file"
                  onChange={handleFileUpload}
                />
                <label htmlFor="exam-file-upload">
                  <MDButton
                    variant="outlined"
                    color="info"
                    component="span"
                    startIcon={<CloudUpload />}
                    fullWidth
                    sx={{ height: "56px" }}
                  >
                    Anexar Arquivos
                  </MDButton>
                </label>
              </MDBox>
            </Grid>
            
            {newExam.files.length > 0 && (
              <Grid item xs={12}>
                <MDBox display="flex" gap={1} flexWrap="wrap">
                  {newExam.files.map((file, index) => (
                    <Chip
                      key={index}
                      label={file.name}
                      onDelete={() => {
                        const updatedFiles = newExam.files.filter((_, i) => i !== index);
                        setNewExam({...newExam, files: updatedFiles});
                      }}
                      color="info"
                      variant="outlined"
                    />
                  ))}
                </MDBox>
              </Grid>
            )}
            
            <Grid item xs={12}>
              <MDButton
                variant="gradient"
                color="dark"
                onClick={handleAdd}
                startIcon={<Add />}
                fullWidth
              >
                Adicionar Exame
              </MDButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <MDTypography variant="h6" mb={2}>Resultados de Exames</MDTypography>
      
      {exams.map((exam) => (
        <Card key={exam.id} sx={{ mb: 2 }}>
          <CardContent>
            <MDBox display="flex" justifyContent="space-between" alignItems="flex-start">
              <MDBox flex={1}>
                <MDBox display="flex" alignItems="center" gap={2} mb={1}>
                  <MDTypography variant="h6">{exam.type}</MDTypography>
                  <Chip label={exam.date} size="small" color="primary" />
                  {exam.laboratory && (
                    <Chip label={exam.laboratory} size="small" color="info" variant="outlined" />
                  )}
                </MDBox>
                
                <MDTypography variant="body2" color="text" mb={1}>
                  <strong>Resultados:</strong> {exam.results}
                </MDTypography>
                
                {exam.observations && (
                  <MDTypography variant="body2" color="text" mb={1}>
                    <strong>Observações:</strong> {exam.observations}
                  </MDTypography>
                )}
                
                {exam.files && exam.files.length > 0 && (
                  <MDBox mb={1}>
                    <MDTypography variant="body2" color="text" mb={1}>
                      <strong>Arquivos:</strong>
                    </MDTypography>
                    <MDBox display="flex" gap={1} flexWrap="wrap">
                      {exam.files.map((file, index) => (
                        <Chip
                          key={index}
                          label={file.name}
                          color="success"
                          variant="outlined"
                          size="small"
                          clickable
                          onClick={() => window.open(file.url, '_blank')}
                        />
                      ))}
                    </MDBox>
                  </MDBox>
                )}
                
                <MDTypography variant="caption" color="text">
                  Médico: {exam.doctor}
                </MDTypography>
              </MDBox>
              
              <IconButton
                color="error"
                onClick={() => handleDelete(exam.id)}
              >
                <Delete />
              </IconButton>
            </MDBox>
          </CardContent>
        </Card>
      ))}
      
      {exams.length === 0 && (
        <MDTypography variant="body2" color="text" textAlign="center" py={3}>
          Nenhum resultado de exame registrado
        </MDTypography>
      )}
    </MDBox>
  );
}

export default ExamResults;
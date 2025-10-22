import { useState } from "react";
import { Grid, Card, CardContent, IconButton, Chip } from "@mui/material";
import { CloudUpload, Download, Delete, Visibility } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function FileManager({ files, onSaveFile }) {
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = (uploadedFiles) => {
    Array.from(uploadedFiles).forEach(file => {
      const fileData = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        uploadDate: new Date().toLocaleDateString("pt-BR"),
        category: getFileCategory(file.type)
      };
      onSaveFile(fileData);
    });
  };

  const getFileCategory = (type) => {
    if (type.includes('image')) return 'Imagem';
    if (type.includes('pdf')) return 'PDF';
    if (type.includes('video')) return 'Vídeo';
    return 'Documento';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = e.dataTransfer.files;
    handleFileUpload(droppedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card
          sx={{
            border: dragOver ? '2px dashed #1976d2' : '2px dashed #ccc',
            backgroundColor: dragOver ? '#f5f5f5' : 'transparent',
            cursor: 'pointer'
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <CardContent>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              minHeight="200px"
            >
              <CloudUpload sx={{ fontSize: 60, color: 'grey.500', mb: 2 }} />
              <MDTypography variant="h6" color="text" mb={1}>
                Arraste arquivos aqui ou clique para selecionar
              </MDTypography>
              <MDTypography variant="body2" color="text" mb={2}>
                Suporte para imagens, PDFs, vídeos e documentos
              </MDTypography>
              
              <input
                accept="*"
                style={{ display: 'none' }}
                id="file-upload"
                multiple
                type="file"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
              <label htmlFor="file-upload">
                <MDButton
                  variant="gradient"
                  color="info"
                  component="span"
                  startIcon={<CloudUpload />}
                >
                  Selecionar Arquivos
                </MDButton>
              </label>
            </MDBox>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12}>
        <MDTypography variant="h6" mb={2}>
          Arquivos Médicos ({files.length})
        </MDTypography>
        
        <Grid container spacing={2}>
          {files.map((file) => (
            <Grid item xs={12} md={6} lg={4} key={file.id}>
              <Card variant="outlined">
                <CardContent>
                  <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <MDBox flex={1}>
                      <MDTypography variant="subtitle1" noWrap>
                        {file.name}
                      </MDTypography>
                      <MDBox display="flex" gap={1} mt={1}>
                        <Chip 
                          label={file.category} 
                          size="small" 
                          color="primary" 
                          variant="outlined" 
                        />
                        <Chip 
                          label={formatFileSize(file.size)} 
                          size="small" 
                          color="secondary" 
                          variant="outlined" 
                        />
                      </MDBox>
                      <MDTypography variant="caption" color="text" display="block" mt={1}>
                        Enviado em: {file.uploadDate}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  
                  <MDBox display="flex" justifyContent="space-between">
                    <MDBox display="flex" gap={1}>
                      <IconButton
                        size="small"
                        color="info"
                        onClick={() => window.open(file.url, '_blank')}
                      >
                        <Visibility />
                      </IconButton>
                      
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = file.url;
                          link.download = file.name;
                          link.click();
                        }}
                      >
                        <Download />
                      </IconButton>
                    </MDBox>
                    
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => {
                        if (window.confirm('Deseja excluir este arquivo?')) {
                          // Implementar exclusão
                        }
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </MDBox>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        {files.length === 0 && (
          <MDBox textAlign="center" py={4}>
            <MDTypography variant="body2" color="text">
              Nenhum arquivo enviado ainda
            </MDTypography>
          </MDBox>
        )}
      </Grid>
    </Grid>
  );
}

export default FileManager;
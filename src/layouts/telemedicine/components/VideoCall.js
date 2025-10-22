import { useState } from "react";
import { Grid, TextField, Card, CardContent } from "@mui/material";
import { VideoCall as VideoIcon, CallEnd, Mic, MicOff } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function VideoCall({ onSaveConsultation }) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [consultationNotes, setConsultationNotes] = useState("");
  const [patientId, setPatientId] = useState("");

  const startCall = () => {
    setIsCallActive(true);
    // Aqui você integraria com uma API de videochamada real (Zoom, Google Meet, etc.)
    alert("Iniciando videochamada... (Integração com API de vídeo necessária)");
  };

  const endCall = () => {
    setIsCallActive(false);
    if (consultationNotes && patientId) {
      const consultation = {
        id: Date.now(),
        patientId,
        date: new Date().toLocaleDateString("pt-BR"),
        time: new Date().toLocaleTimeString("pt-BR"),
        duration: "30 min", // Calcular duração real
        notes: consultationNotes,
        type: "Telemedicina"
      };
      onSaveConsultation(consultation);
      setConsultationNotes("");
      setPatientId("");
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <MDBox
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              minHeight="400px"
              bgcolor={isCallActive ? "success.light" : "grey.100"}
              borderRadius={2}
            >
              {isCallActive ? (
                <MDBox textAlign="center">
                  <VideoIcon sx={{ fontSize: 80, color: "white", mb: 2 }} />
                  <MDTypography variant="h5" color="white">
                    Chamada em Andamento
                  </MDTypography>
                  <MDTypography variant="body2" color="white">
                    Paciente conectado
                  </MDTypography>
                </MDBox>
              ) : (
                <MDBox textAlign="center">
                  <VideoIcon sx={{ fontSize: 80, color: "grey.500", mb: 2 }} />
                  <MDTypography variant="h5" color="text">
                    Videochamada
                  </MDTypography>
                  <MDTypography variant="body2" color="text">
                    Clique em iniciar para começar a consulta
                  </MDTypography>
                </MDBox>
              )}
            </MDBox>
            
            <MDBox display="flex" justifyContent="center" gap={2} mt={3}>
              {!isCallActive ? (
                <MDButton
                  variant="gradient"
                  color="success"
                  startIcon={<VideoIcon />}
                  onClick={startCall}
                  size="large"
                >
                  Iniciar Chamada
                </MDButton>
              ) : (
                <>
                  <MDButton
                    variant="outlined"
                    color={isMuted ? "error" : "info"}
                    startIcon={isMuted ? <MicOff /> : <Mic />}
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? "Ativar Mic" : "Silenciar"}
                  </MDButton>
                  
                  <MDButton
                    variant="gradient"
                    color="error"
                    startIcon={<CallEnd />}
                    onClick={endCall}
                  >
                    Encerrar
                  </MDButton>
                </>
              )}
            </MDBox>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <MDTypography variant="h6" mb={2}>
              Dados da Consulta
            </MDTypography>
            
            <TextField
              fullWidth
              label="ID do Paciente"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              label="Anotações da Consulta"
              multiline
              rows={8}
              value={consultationNotes}
              onChange={(e) => setConsultationNotes(e.target.value)}
              variant="outlined"
              placeholder="Registre aqui as observações da consulta..."
            />
            
            <MDBox mt={2}>
              <MDTypography variant="body2" color="text">
                Status: {isCallActive ? "Em chamada" : "Aguardando"}
              </MDTypography>
              <MDTypography variant="body2" color="text">
                Duração: {isCallActive ? "Contando..." : "00:00"}
              </MDTypography>
            </MDBox>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default VideoCall;
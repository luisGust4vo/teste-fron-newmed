import { Card, CardContent, Chip } from "@mui/material";
import { VideoCall, AccessTime, Person } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function ConsultationHistory({ consultations }) {
  return (
    <MDBox>
      <MDTypography variant="h6" mb={3}>
        Histórico de Consultas ({consultations.length})
      </MDTypography>
      
      {consultations.map((consultation) => (
        <Card key={consultation.id} sx={{ mb: 2 }}>
          <CardContent>
            <MDBox display="flex" justifyContent="space-between" alignItems="flex-start">
              <MDBox flex={1}>
                <MDBox display="flex" alignItems="center" gap={2} mb={2}>
                  <VideoCall color="primary" />
                  <MDTypography variant="h6">
                    Consulta - Paciente ID: {consultation.patientId}
                  </MDTypography>
                  <Chip 
                    label={consultation.type} 
                    color="primary" 
                    size="small" 
                  />
                </MDBox>
                
                <MDBox display="flex" alignItems="center" gap={3} mb={2}>
                  <MDBox display="flex" alignItems="center" gap={1}>
                    <AccessTime fontSize="small" color="action" />
                    <MDTypography variant="body2" color="text">
                      {consultation.date} às {consultation.time}
                    </MDTypography>
                  </MDBox>
                  
                  <MDBox display="flex" alignItems="center" gap={1}>
                    <Person fontSize="small" color="action" />
                    <MDTypography variant="body2" color="text">
                      Duração: {consultation.duration}
                    </MDTypography>
                  </MDBox>
                </MDBox>
                
                {consultation.notes && (
                  <MDBox>
                    <MDTypography variant="body2" color="text" mb={1}>
                      <strong>Anotações da Consulta:</strong>
                    </MDTypography>
                    <MDTypography variant="body2" color="text" sx={{
                      backgroundColor: 'grey.100',
                      padding: 2,
                      borderRadius: 1,
                      fontStyle: 'italic'
                    }}>
                      {consultation.notes}
                    </MDTypography>
                  </MDBox>
                )}
              </MDBox>
            </MDBox>
          </CardContent>
        </Card>
      ))}
      
      {consultations.length === 0 && (
        <MDBox textAlign="center" py={4}>
          <VideoCall sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
          <MDTypography variant="h6" color="text" mb={1}>
            Nenhuma consulta realizada
          </MDTypography>
          <MDTypography variant="body2" color="text">
            As consultas de telemedicina aparecerão aqui após serem realizadas
          </MDTypography>
        </MDBox>
      )}
    </MDBox>
  );
}

export default ConsultationHistory;
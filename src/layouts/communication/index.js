import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { TextField, List, ListItem, ListItemText, Avatar, Chip } from "@mui/material";
import { Send, Message } from "@mui/icons-material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Communication() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const savedPatients = localStorage.getItem("patients");
    if (savedPatients) setPatients(JSON.parse(savedPatients));
  }, []);

  useEffect(() => {
    if (selectedPatient) {
      const savedMessages = localStorage.getItem(`messages_${selectedPatient.id}`);
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      } else {
        setMessages([]);
      }
    }
  }, [selectedPatient]);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedPatient) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: "doctor",
      timestamp: new Date().toLocaleString("pt-BR"),
      read: false
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem(`messages_${selectedPatient.id}`, JSON.stringify(updatedMessages));
    setNewMessage("");
  };

  const getUnreadCount = (patientId) => {
    const patientMessages = JSON.parse(localStorage.getItem(`messages_${patientId}`) || "[]");
    return patientMessages.filter(m => m.sender === "patient" && !m.read).length;
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "600px", overflow: "hidden" }}>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Pacientes
                </MDTypography>
              </MDBox>
              
              <MDBox sx={{ height: "calc(100% - 80px)", overflow: "auto" }}>
                <List>
                  {patients.map((patient) => {
                    const unreadCount = getUnreadCount(patient.id);
                    return (
                      <ListItem
                        key={patient.id}
                        button
                        selected={selectedPatient?.id === patient.id}
                        onClick={() => setSelectedPatient(patient)}
                        sx={{
                          borderBottom: "1px solid #eee",
                          "&.Mui-selected": {
                            backgroundColor: "rgba(25, 118, 210, 0.08)"
                          }
                        }}
                      >
                        <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
                          {patient.name.charAt(0)}
                        </Avatar>
                        <ListItemText
                          primary={patient.name}
                          secondary={patient.phone}
                        />
                        {unreadCount > 0 && (
                          <Chip
                            label={unreadCount}
                            color="error"
                            size="small"
                          />
                        )}
                      </ListItem>
                    );
                  })}
                </List>
              </MDBox>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Card sx={{ height: "600px", display: "flex", flexDirection: "column" }}>
              {selectedPatient ? (
                <>
                  <MDBox
                    mx={2}
                    mt={-3}
                    py={3}
                    px={2}
                    variant="gradient"
                    bgColor="success"
                    borderRadius="lg"
                    coloredShadow="success"
                  >
                    <MDTypography variant="h6" color="white">
                      Chat com {selectedPatient.name}
                    </MDTypography>
                  </MDBox>
                  
                  <MDBox
                    flex={1}
                    p={2}
                    sx={{
                      overflow: "auto",
                      backgroundColor: "#f8f9fa"
                    }}
                  >
                    {messages.map((message) => (
                      <MDBox
                        key={message.id}
                        display="flex"
                        justifyContent={message.sender === "doctor" ? "flex-end" : "flex-start"}
                        mb={2}
                      >
                        <MDBox
                          maxWidth="70%"
                          p={2}
                          borderRadius={2}
                          sx={{
                            backgroundColor: message.sender === "doctor" ? "primary.main" : "white",
                            color: message.sender === "doctor" ? "white" : "text.primary",
                            boxShadow: 1
                          }}
                        >
                          <MDTypography variant="body2">
                            {message.text}
                          </MDTypography>
                          <MDTypography
                            variant="caption"
                            sx={{
                              opacity: 0.7,
                              display: "block",
                              mt: 1
                            }}
                          >
                            {message.timestamp}
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                    ))}
                    
                    {messages.length === 0 && (
                      <MDBox textAlign="center" py={4}>
                        <Message sx={{ fontSize: 60, color: "grey.400", mb: 2 }} />
                        <MDTypography variant="h6" color="text">
                          Nenhuma mensagem ainda
                        </MDTypography>
                        <MDTypography variant="body2" color="text">
                          Inicie uma conversa com o paciente
                        </MDTypography>
                      </MDBox>
                    )}
                  </MDBox>
                  
                  <MDBox p={2} sx={{ borderTop: "1px solid #eee" }}>
                    <MDBox display="flex" gap={2}>
                      <TextField
                        fullWidth
                        placeholder="Digite sua mensagem..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                        multiline
                        maxRows={3}
                        variant="outlined"
                        size="small"
                      />
                      <MDButton
                        variant="gradient"
                        color="success"
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        sx={{ minWidth: "auto", px: 2 }}
                      >
                        <Send />
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </>
              ) : (
                <MDBox
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                >
                  <Message sx={{ fontSize: 80, color: "grey.400", mb: 2 }} />
                  <MDTypography variant="h5" color="text" mb={1}>
                    Comunicação Segura
                  </MDTypography>
                  <MDTypography variant="body2" color="text" textAlign="center">
                    Selecione um paciente para iniciar uma conversa segura
                  </MDTypography>
                </MDBox>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Communication;
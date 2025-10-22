import { useRef } from "react";
import { Modal } from "@mui/material";
import SignatureCanvas from "react-signature-canvas";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function SignatureModal({ open, onClose, onSave, report }) {
  const sigCanvas = useRef();

  const handleClear = () => {
    sigCanvas.current.clear();
  };

  const handleSave = () => {
    if (sigCanvas.current.isEmpty()) {
      alert("Por favor, assine o laudo antes de salvar");
      return;
    }
    
    const signature = sigCanvas.current.toDataURL();
    onSave(signature);
  };

  if (!report) return null;

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
          p: 4
        }}
      >
        <MDTypography variant="h5" mb={2}>
          Assinatura Digital do Laudo
        </MDTypography>
        
        <MDTypography variant="body2" mb={3} color="text">
          Laudo: {report.title}
        </MDTypography>
        
        <MDBox
          sx={{
            border: "2px solid #ddd",
            borderRadius: 1,
            mb: 2
          }}
        >
          <SignatureCanvas
            ref={sigCanvas}
            canvasProps={{
              width: 550,
              height: 200,
              className: "signature-canvas"
            }}
            backgroundColor="white"
          />
        </MDBox>
        
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDButton variant="outlined" color="warning" onClick={handleClear}>
            Limpar
          </MDButton>
          
          <MDBox display="flex" gap={2}>
            <MDButton variant="outlined" color="secondary" onClick={onClose}>
              Cancelar
            </MDButton>
            <MDButton variant="gradient" color="success" onClick={handleSave}>
              Assinar Laudo
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Modal>
  );
}

export default SignatureModal;
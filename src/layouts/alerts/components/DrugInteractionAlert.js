import { useState, useEffect } from "react";
import { Alert, AlertTitle, Collapse } from "@mui/material";
import { Warning } from "@mui/icons-material";

const drugInteractions = {
  "Warfarina": ["Aspirina", "Ibuprofeno", "Amoxicilina"],
  "Aspirina": ["Warfarina", "Ibuprofeno", "Clopidogrel"],
  "Digoxina": ["Furosemida", "Espironolactona", "Amiodarona"],
  "Metformina": ["Insulina", "Glibenclamida", "Furosemida"],
  "Enalapril": ["Espironolactona", "Furosemida", "Digoxina"]
};

function DrugInteractionAlert({ medications }) {
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    const found = [];
    medications.forEach((med1, index) => {
      medications.slice(index + 1).forEach(med2 => {
        if (drugInteractions[med1]?.includes(med2) || drugInteractions[med2]?.includes(med1)) {
          found.push({ drug1: med1, drug2: med2 });
        }
      });
    });
    setInteractions(found);
  }, [medications]);

  if (interactions.length === 0) return null;

  return (
    <Collapse in={interactions.length > 0}>
      <Alert severity="warning" icon={<Warning />} sx={{ mb: 2 }}>
        <AlertTitle>Alerta de Interação Medicamentosa</AlertTitle>
        {interactions.map((interaction, index) => (
          <div key={index}>
            • Possível interação entre <strong>{interaction.drug1}</strong> e <strong>{interaction.drug2}</strong>
          </div>
        ))}
      </Alert>
    </Collapse>
  );
}

export default DrugInteractionAlert;
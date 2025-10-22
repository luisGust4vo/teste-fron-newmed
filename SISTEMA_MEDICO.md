# Sistema Médico - Dashboard

Sistema completo para gestão médica com funcionalidades de cadastro de pacientes, criação de laudos, assinatura digital e cobrança via WhatsApp.

## 🚀 Funcionalidades

### 📋 Gestão de Pacientes
- Cadastro completo de pacientes
- Edição e exclusão de registros
- Histórico médico
- Dados de contato

### 📄 Laudos Médicos
- Criação de laudos personalizados
- Múltiplos tipos de exames
- Editor de texto rico
- Diagnósticos e observações

### ✍️ Assinatura Digital
- Assinatura eletrônica de laudos
- Canvas de assinatura
- Validação de documentos
- Controle de status

### 💰 Cobrança via WhatsApp
- Criação de cobranças
- Envio automático via WhatsApp
- Controle de vencimentos
- Status de pagamento

### 📊 Dashboard Médico
- Estatísticas em tempo real
- Contadores de pacientes
- Status de laudos
- Cobranças pendentes

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **Material-UI** - Interface de usuário
- **React Signature Canvas** - Assinatura digital
- **jsPDF** - Geração de PDFs
- **LocalStorage** - Armazenamento local

## 📱 Como Usar

### 1. Cadastrar Pacientes
1. Acesse "Pacientes" no menu lateral
2. Clique em "Novo Paciente"
3. Preencha os dados obrigatórios
4. Salve o cadastro

### 2. Criar Laudos
1. Acesse "Laudos" no menu lateral
2. Clique em "Novo Laudo"
3. Selecione o paciente
4. Escolha o tipo de exame
5. Preencha o conteúdo do laudo
6. Salve o documento

### 3. Assinar Laudos
1. Na lista de laudos, clique em "Assinar"
2. Use o canvas para criar sua assinatura
3. Confirme a assinatura
4. O laudo será marcado como assinado

### 4. Gerar PDF
1. Na lista de laudos, clique em "PDF"
2. O arquivo será baixado automaticamente
3. Inclui assinatura digital se disponível

### 5. Cobrança via WhatsApp
1. Acesse "Cobrança WhatsApp"
2. Clique em "Nova Cobrança"
3. Selecione o paciente
4. Preencha valor e vencimento
5. Clique em "WhatsApp" para enviar

## 🔧 Instalação

```bash
# Instalar dependências
npm install

# Instalar dependências específicas do sistema médico
npm install @mui/x-date-pickers @mui/x-data-grid react-signature-canvas html2canvas jspdf date-fns uuid

# Iniciar o projeto
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── layouts/
│   ├── patients/           # Gestão de pacientes
│   ├── reports/           # Laudos médicos
│   └── billing-whatsapp/  # Cobrança WhatsApp
├── utils/
│   └── pdfGenerator.js    # Geração de PDFs
└── routes.js              # Rotas do sistema
```

## 💾 Armazenamento

O sistema utiliza LocalStorage para persistir dados:
- `patients` - Lista de pacientes
- `reports` - Lista de laudos
- `billings` - Lista de cobranças

## 🔒 Segurança

- Assinatura digital com timestamp
- Validação de campos obrigatórios
- Controle de status de documentos
- Geração segura de PDFs

## 📞 Integração WhatsApp

O sistema gera links do WhatsApp Web com mensagens pré-formatadas:
- Dados do paciente
- Valor da cobrança
- Data de vencimento
- Informações de contato

## 🎨 Interface

- Design responsivo
- Material Design
- Cores temáticas por funcionalidade
- Navegação intuitiva

## 📈 Dashboard

O dashboard exibe:
- Total de pacientes cadastrados
- Número de laudos criados
- Laudos assinados
- Cobranças pendentes

## 🚀 Próximas Funcionalidades

- [ ] Backup automático
- [ ] Relatórios avançados
- [ ] Integração com APIs médicas
- [ ] Notificações push
- [ ] Agenda de consultas
- [ ] Histórico de pagamentos

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
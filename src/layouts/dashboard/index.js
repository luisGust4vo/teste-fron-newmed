/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [medicalStats, setMedicalStats] = useState({
    patients: 0,
    reports: 0,
    signedReports: 0,
    pendingBillings: 0,
    appointments: 0,
    templates: 0,
    telemedicine: 0
  });

  useEffect(() => {
    const patients = JSON.parse(localStorage.getItem("patients") || "[]");
    const reports = JSON.parse(localStorage.getItem("reports") || "[]");
    const billings = JSON.parse(localStorage.getItem("billings") || "[]");
    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const templates = JSON.parse(localStorage.getItem("reportTemplates") || "[]");
    const telemedicine = JSON.parse(localStorage.getItem("telemedicine") || "[]");
    
    setMedicalStats({
      patients: patients.length,
      reports: reports.length,
      signedReports: reports.filter(r => r.signed).length,
      pendingBillings: billings.filter(b => b.status === "Pendente").length,
      appointments: appointments.length,
      templates: templates.length,
      telemedicine: telemedicine.length
    });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="people"
                title="Pacientes"
                count={medicalStats.patients}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Total cadastrados",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="description"
                title="Laudos"
                count={medicalStats.reports}
                percentage={{
                  color: "info",
                  amount: `${medicalStats.signedReports} assinados`,
                  label: "do total",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="receipt_long"
                title="Cobranças"
                count={medicalStats.pendingBillings}
                percentage={{
                  color: "warning",
                  amount: "",
                  label: "Pendentes",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="verified"
                title="Assinados"
                count={medicalStats.signedReports}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Laudos assinados",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="schedule"
                  title="Consultas"
                  count={medicalStats.appointments}
                  percentage={{
                    color: "info",
                    amount: "",
                    label: "Agendadas",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="secondary"
                  icon="content_copy"
                  title="Templates"
                  count={medicalStats.templates}
                  percentage={{
                    color: "secondary",
                    amount: "",
                    label: "Disponíveis",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="error"
                  icon="video_call"
                  title="Telemedicina"
                  count={medicalStats.telemedicine}
                  percentage={{
                    color: "error",
                    amount: "",
                    label: "Consultas online",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;

import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MainListItems, secondaryListItems } from "../ListItems";
import Deposits from "../Deposits";
import Orders from "../Orders";
import { AppBarProps } from "./types";
import Chart from "../Chart";
import BrandAPI, { brandService } from "../../apis/BrandAPI";
import { modelService } from "../../apis/ModelAPI";
import { AppBar } from "./AppBar";
import { Drawer } from "./Drawer";
import { Brand } from "../../types/Brand";
import { Model } from "../../types/Model";
import DataTable from "../DataTable";
import CustomizedDialogs from "../CustomizedDialogs";
import BrandForm from "../Forms/BrandForm";
import { format } from "date-fns";

const mdTheme = createTheme();

function DashboardContent() {
  const [brands, setBrands] = React.useState<Brand[]>([]);
  const [models, setModels] = React.useState<Model[]>();
  const [selectedBrand, setSelectedBrand] = React.useState<Brand>();
  const [open, setOpen] = React.useState(true);
  const [openAddBrand, setOpenAddBrand] = React.useState(false);
  const [brandData, setBrandData] = React.useState<Brand>({} as Brand);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    brandService.getAll().then((data: Brand[]) => {
      setBrands(data);
    });
  }, []);

  const handleSelectBrand = (brand: Brand) => {
    setSelectedBrand(brand);
  };

  const handleOpenAddBrand = () => {
    setOpenAddBrand(true);
  };

  React.useEffect(() => {
    if (selectedBrand) {
      modelService.getByBrand(selectedBrand.id).then((data: Model[]) => {
        setModels(data);
      });
    }
  }, [selectedBrand]);

  const handleDataChange = (field: string, value: string) => {
    console.log(brandData);
    setBrandData({
      ...brandData,
      [field]: value,
    });
  };

  const closeAddBrand = () => {
    setOpenAddBrand(false);
  };

  const handleSubmitModel = () => {
    if (brandData) {
      brandData.releaseDate = format(
        new Date(brandData.releaseDate),
        "yyyy-MM-dd HH:mm:ss"
      );
      brandService.add(brandData).then((response: Brand) => {
        closeAddBrand();
        setBrands([...brands, response]);
      });
    }
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Car Shop Admin
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems
              brands={brands}
              selected={selectedBrand && selectedBrand.id}
              onSelect={handleSelectBrand}
              handleOpenAddBrand={handleOpenAddBrand}
            />
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                {models && (
                  <DataTable
                    brand={selectedBrand}
                    models={models}
                    title={selectedBrand?.name}
                  />
                )}
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <CustomizedDialogs
        title="Add brand"
        open={openAddBrand}
        onClose={closeAddBrand}
        onSubmit={handleSubmitModel}
      >
        <BrandForm data={brandData} handleDataChange={handleDataChange} />
      </CustomizedDialogs>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Brand } from "../../types/Brand";
import { Avatar } from "@mui/material";

type MainListItemsProps = {
  brands: Brand[];
  selected?: number;
  handleOpenAddBrand: () => void;
  onSelect: (brand: Brand) => void;
};

export const MainListItems = ({
  selected,
  brands,
  handleOpenAddBrand,
  onSelect,
}: MainListItemsProps): JSX.Element => {
  // const urlSearchParams = new URLSearchParams(window.location.search);
  // const params = Object.fromEntries(urlSearchParams.entries());
  // console.log("params", params);
  // const [selectedBrand, setSelectedBrand] = React.useState<number | 0>(
  //   Number(params.brand)
  // );

  const handleSelectBrand = (brand: Brand) => {
    // const url = new URL(window.location.toString());
    // url.searchParams.set("brand", brandId.toString());
    // window.history.pushState(null, "", url.toString());
    onSelect(brand);
  };

  return (
    <React.Fragment>
      {brands.map((brand) => {
        const style = {
          backgroundColor: selected === brand.id ? "#8080804f" : "unset",
        };

        return (
          <ListItemButton
            key={brand.id}
            style={style}
            onClick={() => handleSelectBrand(brand)}
          >
            <Avatar src={brand.logo} alt="" sx={{ mr: "20px" }} />
            <ListItemText primary={brand.name} />
          </ListItemButton>
        );
      })}
      <ListItemButton onClick={() => handleOpenAddBrand()}>
        <ListItemText primary="Add new" />
      </ListItemButton>
    </React.Fragment>
  );
};

// export const MainListItems = (
//   <React.Fragment>
//     <ListItemButton>
//       <ListItemIcon>
//         <DashboardIcon />
//       </ListItemIcon>
//       <ListItemText primary="Dashboard" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <ShoppingCartIcon />
//       </ListItemIcon>
//       <ListItemText primary="Orders" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <PeopleIcon />
//       </ListItemIcon>
//       <ListItemText primary="Customers" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <BarChartIcon />
//       </ListItemIcon>
//       <ListItemText primary="Reports" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <LayersIcon />
//       </ListItemIcon>
//       <ListItemText primary="Integrations" />
//     </ListItemButton>
//   </React.Fragment>
// );

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);

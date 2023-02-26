import { Button, IconButton, Typography } from "@mui/material";
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridSelectionModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import { Mode } from "fs";
import * as React from "react";
import { modelService } from "../../apis/ModelAPI";
import { Brand } from "../../types/Brand";
import { Model } from "../../types/Model";
import CustomizedDialogs from "../CustomizedDialogs";
import ModelForm from "../Forms/ModelForm";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 150, sortable: false },
  {
    field: "description",
    headerName: "Description",
    width: 150,
    sortable: false,
  },
  {
    field: "price",
    headerName: "Price ($)",
    type: "number",
    width: 150,
    sortable: true,
  },
  {
    field: "releaseDate",
    headerName: "Release date",
    width: 300,
    type: "date",
    sortable: false,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

type DataTableProps = {
  title?: string;
  brand?: Brand;
  models: Model[];
};

export default function DataTable({ title, brand, models }: DataTableProps) {
  const [modelsList, setModelsList] = React.useState(models);
  const [open, setOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState<string>("");
  const [modelData, setModelData] = React.useState<Model>({} as Model);
  const [selectedModels, setSelectedModels] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (models) {
      setModelsList(models);
    }
  }, [models]);

  const onClose = () => {
    setOpen(false);
  };

  const onOpenAddModel = () => {
    setOpen(true);
    setModalTitle("Add model");
  };

  const handleDataChange = (field: string, value: string) => {
    setModelData({
      ...modelData,
      [field]: value,
    });
  };

  const handleSubmitModel = () => {
    if (modelData) {
      modelData.releaseDate = format(
        new Date(modelData.releaseDate),
        "yyyy-MM-dd HH:mm:ss"
      );
      if (brand) {
        modelData.brand = brand;
      }
      modelService.add(modelData).then((response: Model) => {
        onClose();
        setModelsList([...modelsList, response]);
        setModelData({} as Model);
      });
    }
  };

  const onOpenDeleteModel = () => {
    modelService
      .delete(selectedModels[0])
      .then((response) => console.log(response));
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div style={{ display: "flex" }}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {title ? <>{title}'s models</> : "All models"}
        </Typography>
        <>
          <Button variant="contained" onClick={onOpenDeleteModel}>
            Delete
          </Button>
          <Button variant="contained" onClick={onOpenAddModel}>
            Add
          </Button>
        </>
      </div>
      <CustomizedDialogs
        title={modalTitle}
        open={open}
        onClose={onClose}
        onSubmit={handleSubmitModel}
      >
        <ModelForm data={modelData} handleDataChange={handleDataChange} />
      </CustomizedDialogs>
      <DataGrid
        onSelectionModelChange={(
          selectionModel: GridSelectionModel,
          details: GridCallbackDetails<any>
        ) => setSelectedModels(selectionModel as number[])}
        rows={modelsList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}

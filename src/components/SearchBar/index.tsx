import { FormEvent, useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

type SearchBarType = {
  onSearch: (keyword: string) => void;
};

export const SearchBar = ({ onSearch }: SearchBarType) => {
  const [keyword, setKeyword] = useState<string>();

  return (
    <>
      <TextField
        id="search-bar"
        className="text"
        onInput={(e: any) => {
          setKeyword(e.target.value);
        }}
        label="Enter a model name"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      <IconButton
        onClick={() => keyword && onSearch(keyword)}
        aria-label="search"
      >
        <SearchIcon style={{ fill: "blue" }} />
      </IconButton>
    </>
  );
};

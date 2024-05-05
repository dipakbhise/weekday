import {
  basepayFilter,
  experienceFilter,
  locationFilter,
  remoteFilter,
  roleFilters,
} from "@/utils/mockData";
import React from "react";
import {
  Box,
  Chip,
  Divider,
  FormControl,
  ListSubheader,
  MenuItem,
  Select,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { Arrow, CloseIcon, DeleteIcon } from "@/utils/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    selectJobPostsDetails,
  setReduxCompanyName,
  setReduxSelectedBasePay,
  setReduxSelectedExperience,
  setReduxSelectedLocationOptions,
  setReduxSelectedRemoteOptions,
  setReduxSelectedRoleOptions,
} from "@/redux/slices/jobListingSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Filters = ({ filterJobPosts }) => {
  const theme = useTheme();

  //  to update the job listings data from redux store
  const dispatch = useAppDispatch();

    //  to get the job listings data from redux store
    const jobPostsDetails = useAppSelector(selectJobPostsDetails);

  const [RolesOpen, setRolesOpen] = React.useState(false);

  const [RemoteOpen, setRemoteOpen] = React.useState(false);

  const [LocationOpen, setLocationOpen] = React.useState(false);

  const [BasePayOpen, setBasePayOpen] = React.useState(false);

  const [ExperienceOpen, setExperienceOpen] = React.useState(false);


  const onOptionClick = (value, key) => {
    if (key === "role") {
      let selectedoptions = [...jobPostsDetails.ReduxSelectedRoleOptions];
      selectedoptions.push(value);
      dispatch(setReduxSelectedRoleOptions(selectedoptions));
      filterFunction(
        selectedoptions,
        jobPostsDetails.ReduxSelectedExperience,
        jobPostsDetails.ReduxSelectedRemoteOptions,
        jobPostsDetails.ReduxSelectedLocationOptions,
        jobPostsDetails.ReduxSelectedBasePay,
        jobPostsDetails.ReduxCompanyName
      );
    } else if (key === "remote") {
      let selectedoptions = [...jobPostsDetails.ReduxSelectedRemoteOptions];
      selectedoptions.push(value);
      dispatch(setReduxSelectedRemoteOptions(selectedoptions));
      filterFunction(
        jobPostsDetails.ReduxSelectedRoleOptions,
        jobPostsDetails.ReduxSelectedExperience,
        selectedoptions,
        jobPostsDetails.ReduxSelectedLocationOptions,
        jobPostsDetails.ReduxSelectedBasePay,
        jobPostsDetails.ReduxCompanyName
      );
    } else if (key === "location") {
      let selectedoptions = [...jobPostsDetails.ReduxSelectedLocationOptions];
      selectedoptions.push(value);
      dispatch(setReduxSelectedLocationOptions(selectedoptions));
      filterFunction(
        jobPostsDetails.ReduxSelectedRoleOptions,
        jobPostsDetails.ReduxSelectedExperience,
        jobPostsDetails.ReduxSelectedRemoteOptions,
        selectedoptions,
        jobPostsDetails.ReduxSelectedBasePay,
        jobPostsDetails.ReduxCompanyName
      );
    } else if (key === "basepay") {
      dispatch(setReduxSelectedBasePay(value));
      filterFunction(
        jobPostsDetails.ReduxSelectedRoleOptions,
        jobPostsDetails.ReduxSelectedExperience,
        jobPostsDetails.ReduxSelectedRemoteOptions,
        jobPostsDetails.ReduxSelectedLocationOptions,
        value,
        jobPostsDetails.ReduxCompanyName
      );
    } else if (key === "experience") {
      dispatch(setReduxSelectedExperience(value));
      filterFunction(
        jobPostsDetails.ReduxSelectedRoleOptions,
        value,
        jobPostsDetails.ReduxSelectedRemoteOptions,
        jobPostsDetails.ReduxSelectedLocationOptions,
        jobPostsDetails.ReduxSelectedBasePay,
        jobPostsDetails.ReduxCompanyName
      );
    }
  };

  const onMultiDeleteClick = (key) => {
    if (key === "role") {
      let selectedoptions = [];
      dispatch(setReduxSelectedRoleOptions(selectedoptions));
      filterFunction(
        selectedoptions,
        jobPostsDetails.ReduxSelectedExperience,
        jobPostsDetails.ReduxSelectedRemoteOptions,
        jobPostsDetails.ReduxSelectedLocationOptions,
        jobPostsDetails.ReduxSelectedBasePay,
        jobPostsDetails.ReduxCompanyName
      );
    } else if (key === "remote") {
      let selectedoptions = [];
      dispatch(setReduxSelectedRemoteOptions(selectedoptions));
      filterFunction(
        jobPostsDetails.ReduxSelectedRoleOptions,
        jobPostsDetails.ReduxSelectedExperience,
        selectedoptions,
        jobPostsDetails.ReduxSelectedLocationOptions,
        jobPostsDetails.ReduxSelectedBasePay,
        jobPostsDetails.ReduxCompanyName
      );
    } else if (key === "location") {
      let selectedoptions = [];
      dispatch(setReduxSelectedLocationOptions(selectedoptions));
      filterFunction(
        jobPostsDetails.ReduxSelectedRoleOptions,
        jobPostsDetails.ReduxSelectedExperience,
        jobPostsDetails.ReduxSelectedRemoteOptions,
        selectedoptions,
        jobPostsDetails.ReduxSelectedBasePay,
        jobPostsDetails.ReduxCompanyName
      );
    }
  };

  const onRoleDeleteChip = (index, key) => {
    if (key === "role") {
      let selectedoptions = [...jobPostsDetails.ReduxSelectedRoleOptions];
      selectedoptions.splice(index, 1);
      dispatch(setReduxSelectedRoleOptions(selectedoptions));
      filterFunction(
        selectedoptions,
        jobPostsDetails.ReduxSelectedExperience,
        jobPostsDetails.ReduxSelectedRemoteOptions,
        jobPostsDetails.ReduxSelectedLocationOptions,
        jobPostsDetails.ReduxSelectedBasePay,
        jobPostsDetails.ReduxCompanyName
      );
    } else if (key === "remote") {
      let selectedoptions = [...jobPostsDetails.ReduxSelectedRemoteOptions];
      selectedoptions.splice(index, 1);
      dispatch(setReduxSelectedRemoteOptions(selectedoptions));
      filterFunction(
        jobPostsDetails.ReduxSelectedRoleOptions,
        jobPostsDetails.ReduxSelectedExperience,
        selectedoptions,
        jobPostsDetails.ReduxSelectedLocationOptions,
        jobPostsDetails.ReduxSelectedBasePay,
        jobPostsDetails.ReduxCompanyName
      );
    } else if (key === "location") {
      let selectedoptions = [...jobPostsDetails.ReduxSelectedLocationOptions];
      selectedoptions.splice(index, 1);
      dispatch(setReduxSelectedLocationOptions(selectedoptions));
      filterFunction(
        jobPostsDetails.ReduxSelectedRoleOptions,
        jobPostsDetails.ReduxSelectedExperience,
        jobPostsDetails.ReduxSelectedRemoteOptions,
        selectedoptions,
        jobPostsDetails.ReduxSelectedBasePay,
        jobPostsDetails.ReduxCompanyName
      );
    }
  };

  const filterFunction = (
    roleFilter,
    experienceFilter,
    remoteFilter,
    locationFilter,
    basepayFilter,
    companyNameFilter
  ) => {
    const selectedFilters = {
      roleFilter: roleFilter, // Example of selected role filter
      experienceFilter: experienceFilter, // Example of selected experience filter
      remoteFilter: remoteFilter, // Example of selected remote filter
      locationFilter: locationFilter, // Example of selected location filter
      basepayFilter: basepayFilter, // Example of selected basepay filter
    };

    filterJobPosts(selectedFilters, companyNameFilter);
  };

  return (
    <>
      <div className="filter-container">
        {/* Role Filteer */}
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
             <div className="label">{jobPostsDetails.ReduxSelectedRoleOptions.length > 0 ? "Roles" :""}</div>
            <Select
              id="demo-select-small-label"
              multiple
              value={jobPostsDetails.ReduxSelectedRoleOptions}
              open={RolesOpen}
              onClose={() => setRolesOpen(false)}
              onOpen={() => setRolesOpen(true)}
              IconComponent={() => (
                <>
                  <div className="arrow" onClick={() => setRolesOpen(true)}>
                    <Arrow />
                  </div>
                </>
              )}
              renderValue={(selected) => (
                <Box display={"flex"} justifyContent={"end"}>
                  {selected.length > 0 ? (
                    selected.map((value, index) => (
                      <Stack
                        direction="row"
                        spacing={2}
                        key={index}
                        onClick={() => console.log("hi click")}
                      >
                        <Chip
                          onClick={() => console.log("hi click")}
                          size="small"
                          sx={{
                            height: "auto",
                            "& .MuiChip-label": {
                              paddingRight: "4px",
                            },
                          }}
                          onDelete={() => onRoleDeleteChip(index, "role")}
                          label={value.name}
                          variant="outlined"
                          onMouseDown={(event) => {
                            event.stopPropagation();
                          }}
                          style={{
                            marginLeft: "5px",
                            borderRadius: "2px",
                            backgroundColor: "rgb(230, 230, 230)",
                            color: "rgb(51, 51, 51)",
                            border: "none",
                            fontSize: "12px",
                            height: "21px",
                          }}
                          deleteIcon={
                            <div className="delete-icon">
                              <DeleteIcon />
                            </div>
                          }
                        />
                      </Stack>
                    ))
                  ) : (
                    <div className="placeholder">Roles</div>
                  )}
                  {selected.length > 0 && (
                    <div
                      className="close-icon"
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                      onClick={() => {
                        onMultiDeleteClick("role");
                      }}
                    >
                      <CloseIcon />
                    </div>
                  )}

                  <div className="divider">
                    <Divider
                      orientation="vertical"
                      style={{ color: "#0d0d0d" }}
                    />
                  </div>
                </Box>
              )}
              MenuProps={MenuProps}
              displayEmpty
              inputProps={{
                "aria-label": "Without label",
                "aria-placeholder": "HI",
                style: { paddingRight: "0px" },
              }}
              size="small"
              style={{ paddingRight: "0px" }}
            >
              {roleFilters.map((filter, index) => (
                <div key={index}>
                  <ListSubheader>{filter.group}</ListSubheader>

                  {filter.roles
                    .filter(
                      (role) =>
                        !jobPostsDetails.ReduxSelectedRoleOptions.some(
                          (option) => option.id === role.id
                        )
                    )
                    .map((role) => (
                      <MenuItem
                        key={role.id}
                        value={role.id}
                        style={getStyles(role.id, role.name, theme)}
                        onClick={() => onOptionClick(role, "role")}
                      >
                        {role.name}
                      </MenuItem>
                    ))}
                </div>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Remote Filteer Start*/}
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
             <div className="label">{jobPostsDetails.ReduxSelectedRemoteOptions.length > 0 ? "Remote": ""}</div>
            <Select
              id="demo-select-small-label"
              multiple
              value={jobPostsDetails.ReduxSelectedRemoteOptions}
              open={RemoteOpen}
              onClose={() => setRemoteOpen(false)}
              onOpen={() => setRemoteOpen(true)}
              IconComponent={() => (
                <>
                  <div className="arrow" onClick={() => setRemoteOpen(true)}>
                    <Arrow />
                  </div>
                </>
              )}
              renderValue={(selected) => (
                <Box display={"flex"} justifyContent={"end"}>
                  {selected.length > 0 ? (
                    selected.map((value, index) => (
                      <Stack
                        direction="row"
                        spacing={2}
                        key={index}
                        onClick={() => console.log("hi click")}
                      >
                        <Chip
                          onClick={() => console.log("hi click")}
                          size="small"
                          sx={{
                            height: "auto",
                            "& .MuiChip-label": {
                              paddingRight: "4px",
                            },
                          }}
                          onDelete={() => onRoleDeleteChip(index, "remote")}
                          label={value.name}
                          variant="outlined"
                          onMouseDown={(event) => {
                            event.stopPropagation();
                          }}
                          style={{
                            marginLeft: "5px",
                            borderRadius: "2px",
                            backgroundColor: "rgb(230, 230, 230)",
                            color: "rgb(51, 51, 51)",
                            border: "none",
                            fontSize: "12px",
                            height: "21px",
                          }}
                          deleteIcon={
                            <div className="delete-icon">
                              <DeleteIcon />
                            </div>
                          }
                        />
                      </Stack>
                    ))
                  ) : (
                    <div className="placeholder">Remote</div>
                  )}
                  {selected.length > 0 && (
                    <div
                      className="close-icon"
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                      onClick={() => {
                        onMultiDeleteClick("remote");
                      }}
                    >
                      <CloseIcon />
                    </div>
                  )}

                  <div className="divider">
                    <Divider
                      orientation="vertical"
                      style={{ color: "#0d0d0d" }}
                    />
                  </div>
                </Box>
              )}
              MenuProps={MenuProps}
              displayEmpty
              inputProps={{
                "aria-label": "Without label",
                "aria-placeholder": "HI",
                style: { paddingRight: "0px" },
              }}
              size="small"
              style={{ paddingRight: "0px" }}
            >
              <div>
                {remoteFilter
                  .filter(
                    (role) =>
                      !jobPostsDetails.ReduxSelectedRemoteOptions.some(
                        (option) => option.id === role.id
                      )
                  )
                  .map((role) => (
                    <MenuItem
                      key={role.id}
                      value={role.id}
                      style={getStyles(role.id, role.name, theme)}
                      onClick={() => onOptionClick(role, "remote")}
                    >
                      {role.name}
                    </MenuItem>
                  ))}
              </div>
            </Select>
          </FormControl>
        </div>

        {/* Locations Filteer Start*/}
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <div className="label">{jobPostsDetails.ReduxSelectedLocationOptions.length > 0 ? "Location": ""}</div>
            <Select
              id="demo-select-small-label"
              multiple
              value={jobPostsDetails.ReduxSelectedLocationOptions}
              open={LocationOpen}
              onClose={() => setLocationOpen(false)}
              onOpen={() => setLocationOpen(true)}
              IconComponent={() => (
                <>
                  <div className="arrow" onClick={() => setLocationOpen(true)}>
                    <Arrow />
                  </div>
                </>
              )}
              renderValue={(selected) => (
                <Box display={"flex"} justifyContent={"end"}>
                  {selected.length > 0 ? (
                    selected.map((value, index) => (
                      <Stack
                        direction="row"
                        spacing={2}
                        key={index}
                        onClick={() => console.log("hi click")}
                      >
                        <Chip
                          onClick={() => console.log("hi click")}
                          size="small"
                          sx={{
                            height: "auto",
                            "& .MuiChip-label": {
                              paddingRight: "4px",
                            },
                          }}
                          onDelete={() => onRoleDeleteChip(index, "location")}
                          label={value.name}
                          variant="outlined"
                          onMouseDown={(event) => {
                            event.stopPropagation();
                          }}
                          style={{
                            marginLeft: "5px",
                            borderRadius: "2px",
                            backgroundColor: "rgb(230, 230, 230)",
                            color: "rgb(51, 51, 51)",
                            border: "none",
                            fontSize: "12px",
                            height: "21px",
                          }}
                          deleteIcon={
                            <div className="delete-icon">
                              <DeleteIcon />
                            </div>
                          }
                        />
                      </Stack>
                    ))
                  ) : (
                    <div className="placeholder">Location</div>
                  )}
                  {selected.length > 0 && (
                    <div
                      className="close-icon"
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                      onClick={() => {
                        onMultiDeleteClick("location");
                      }}
                    >
                      <CloseIcon />
                    </div>
                  )}

                  <div className="divider">
                    <Divider
                      orientation="vertical"
                      style={{ color: "#0d0d0d" }}
                    />
                  </div>
                </Box>
              )}
              MenuProps={MenuProps}
              displayEmpty
              inputProps={{
                "aria-label": "Without label",
                "aria-placeholder": "HI",
                style: { paddingRight: "0px" },
              }}
              size="small"
              style={{ paddingRight: "0px" }}
            >
              <div>
                {locationFilter
                  .filter(
                    (role) =>
                      !jobPostsDetails.ReduxSelectedLocationOptions.some(
                        (option) => option.id === role.id
                      )
                  )
                  .map((role) => (
                    <MenuItem
                      key={role.id}
                      value={role.id}
                      style={getStyles(role.id, role.name, theme)}
                      onClick={() => onOptionClick(role, "location")}
                    >
                      {role.name}
                    </MenuItem>
                  ))}
              </div>
            </Select>
          </FormControl>
        </div>

        {/* Min Base Pay Filteer Start*/}
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
             <div className="label">{jobPostsDetails.ReduxSelectedBasePay.name ? "Base Pay" : ""}</div>
            <Select
              id="demo-select-small-label"
              //   multiple
              value={jobPostsDetails.ReduxSelectedBasePay}
              open={BasePayOpen}
              onClose={() => setBasePayOpen(false)}
              onOpen={() => setBasePayOpen(true)}
              IconComponent={() => (
                <>
                  <div className="arrow" onClick={() => setBasePayOpen(true)}>
                    <Arrow />
                  </div>
                </>
              )}
              renderValue={(selected) => (
                <Box display={"flex"} justifyContent={"end"}>
                  <div className="placeholder">
                    {selected.name ? selected.name : "Base Pay"}
                  </div>
                  {selected.name && (
                    <div
                      className="close-icon"
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                      onClick={() => {
                        dispatch(setReduxSelectedBasePay(""));
                        filterFunction(
                          jobPostsDetails.ReduxSelectedRoleOptions,
                          jobPostsDetails.ReduxSelectedExperience,
                          jobPostsDetails.ReduxSelectedRemoteOptions,
                          jobPostsDetails.ReduxSelectedLocationOptions,
                          "",
                          jobPostsDetails.ReduxCompanyName
                        );
                      }}
                    >
                      <CloseIcon />
                    </div>
                  )}

                  <div className="divider">
                    <Divider
                      orientation="vertical"
                      style={{ color: "#0d0d0d" }}
                    />
                  </div>
                </Box>
              )}
              MenuProps={MenuProps}
              displayEmpty
              inputProps={{
                "aria-label": "Without label",
                "aria-placeholder": "HI",
                style: { paddingRight: "0px" },
              }}
              size="small"
              style={{ paddingRight: "0px" }}
            >
              <div>
                {basepayFilter.map((role) => (
                  <MenuItem
                    key={role.id}
                    value={role.id}
                    //   style={getStyles(role.id, role.name, theme)}
                    onClick={() => onOptionClick(role, "basepay")}
                  >
                    {role.name}$
                  </MenuItem>
                ))}
              </div>
            </Select>
          </FormControl>
        </div>

        {/* Experience Filteer Start*/}
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
           <div className="label"> {jobPostsDetails.ReduxSelectedExperience.name ? "Experience": ""}</div>
            <Select
              id="demo-select-small-label"
              //   multiple
              value={jobPostsDetails.ReduxSelectedExperience}
              open={ExperienceOpen}
              onClose={() => setExperienceOpen(false)}
              onOpen={() => setExperienceOpen(true)}
              IconComponent={() => (
                <>
                  <div
                    className="arrow"
                    onClick={() => setExperienceOpen(true)}
                  >
                    <Arrow />
                  </div>
                </>
              )}
              renderValue={(selected) => (
                <Box display={"flex"} justifyContent={"end"}>
                  <div className="placeholder">
                    {selected.name ? selected.name : "Experience"}
                  </div>
                  {selected.name && (
                    <div
                      className="close-icon"
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                      onClick={() => {
                        dispatch(setReduxSelectedExperience(""));
                        filterFunction(
                          jobPostsDetails.ReduxSelectedRoleOptions,
                          "",
                          jobPostsDetails.ReduxSelectedRemoteOptions,
                          jobPostsDetails.ReduxSelectedLocationOptions,
                          jobPostsDetails.ReduxSelectedBasePay,
                          jobPostsDetails.ReduxCompanyName
                        );
                      }}
                    >
                      <CloseIcon />
                    </div>
                  )}

                  <div className="divider">
                    <Divider
                      orientation="vertical"
                      style={{ color: "#0d0d0d" }}
                    />
                  </div>
                </Box>
              )}
              MenuProps={MenuProps}
              displayEmpty
              inputProps={{
                "aria-label": "Without label",
                "aria-placeholder": "HI",
                style: { paddingRight: "0px" },
              }}
              size="small"
              style={{ paddingRight: "0px" }}
            >
              <div>
                {experienceFilter.map((role) => (
                  <MenuItem
                    key={role.id}
                    value={role.id}
                    //   style={getStyles(role.id, role.name, theme)}
                    onClick={() => onOptionClick(role, "experience")}
                  >
                    {role.name}
                  </MenuItem>
                ))}
              </div>
            </Select>
          </FormControl>
        </div>

        {/* Company Name input*/}
        <div>
         <div className="label">{jobPostsDetails.ReduxCompanyName ? "Company Name" : ""}</div>
          <TextField
            id="outlined-basic"
            className="company-name"
            placeholder="Search Company Name"
            variant="outlined"
            size="small"
            value={jobPostsDetails.ReduxCompanyName}
            onChange={(e) => {
              dispatch(setReduxCompanyName(e.target.value));
              filterFunction(
                jobPostsDetails.ReduxSelectedRoleOptions,
                jobPostsDetails.ReduxSelectedExperience,
                jobPostsDetails.ReduxSelectedRemoteOptions,
                jobPostsDetails.ReduxSelectedLocationOptions,
                jobPostsDetails.ReduxSelectedBasePay,
                e.target.value
              );
            }}
          />
        </div>
      </div>

      <style jsx>{`
        .filter-container {
          {/* margin: 20px; */}
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: start;
          width:94%;
          margin:auto;
        }
        .delete-icon {
          display: flex;
          height: 100%;
          align-items: center;
          margin: 0px;
          padding: 5px;
          width: 22px;
        }

        .delete-icon:hover {
          background: rgb(255, 189, 173);
        }
        .close-icon {
          display: flex;
          height: 100%;
          align-items: center;
          margin: 0px;

          svg {
            color: rgb(204, 204, 204);
          }
        }

        .close-icon:hover {
           {
            /* background: rgb(255, 189, 173); */
          }
          color: black;
        }
        .css-rrn746-MuiChip-label {
          padding-right: 0px !important;
        }
        .MuiSelect-select {
          padding: 0px !important;
        }

        .placeholder {
          grid-area: 1 / 1 / 2 / 3;
          color: rgb(128, 128, 128);
          margin-left: 2px;
          margin-right: 2px;
          box-sizing: border-box;
          font-size: 12px;
        }

        .divider {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          margin-right: 10px;
        }

        .arrow {
          display: flex;
          align-items: center;
          margin-right: 5px;
          padding: 0px;
          cursor: pointer;
        }
        .label{
            font-size:13px;
            min-height:15px;
        }
      `}</style>
    </>
  );
};

export default Filters;

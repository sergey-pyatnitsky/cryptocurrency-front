import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SecurityIcon from "@mui/icons-material/Security";
import {
  Container,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridRowsProp,
  ruRU,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import ErrorProps from "../../model/error";
import ResponseProps from "../../model/response";
import UserProps from "../../model/user";
import {
  API_BASE_URL,
  API_DOWNLOAD_PROFILE_IMAGE_URL,
} from "../../service/CommonService";
import UserService from "../../service/UserService";
import EditUserModal from "../user/EditUserModal";

const UsersTable = () => {
  const intl = useIntl();

  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);

  const [users, setUsers] = useState([]);
  const [currUser, setCurrUser] = useState<UserProps>({} as UserProps);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState<number>(5);

  const handleSearch = () => {
    return users.filter(
      (userInfo: UserProps) =>
        userInfo.user.username.toLowerCase().includes(search) ||
        userInfo.name.toLowerCase().includes(search) ||
        userInfo.email.toLowerCase().includes(search)
    );
  };

  const deleteUser = useCallback(
    (username: string) => () => {
      UserService.removeUser(username)
        .then(() => {
          fetchAllUsers();
          handleCloseEditModal();
        })
        .catch((err: ErrorProps) => {
          console.log(err);
          setLoading(false);
        });
    },
    []
  );

  useEffect(() => {
    if (Object.keys(currUser).length !== 0) handleOpenEditModal();
  }, [currUser]);

  const changeUserActiveStatus = useCallback(
    (username: string, active: boolean) => () => {
      UserService.activateUser(username, active)
        .then(() => {
          fetchAllUsers();
          handleCloseEditModal();
        })
        .catch((err: ErrorProps) => {
          console.log(err);
          setLoading(false);
        });
    },
    []
  );

  const editUserRole = (username: string, role: string) => {
    UserService.editUserRole(username, role)
      .then(() => {
        fetchAllUsers();
        handleCloseEditModal();
      })
      .catch((err: ErrorProps) => {
        console.log(err);
        setLoading(false);
      });
  };

  const rows: GridRowsProp = handleSearch().map((user: UserProps) => {
    return {
      id: user.user.username,
      col1: user.name,
      col2: user.email,
      col3: user.phone,
      col4: user,
    };
  });

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "col1",
        flex: 1,
        minWidth: 100,
        maxWidth: 100,
        headerName: intl.formatMessage({ id: "fullname" }),
        renderCell: (params: any) => {
          return (
            <>
              <CardMedia
                component="img"
                alt="profile image"
                image={
                  API_BASE_URL +
                  API_DOWNLOAD_PROFILE_IMAGE_URL +
                  params.row.col4.imageId
                }
              />
            </>
          );
        },
      },
      {
        field: "col2",
        flex: 1,
        headerName: intl.formatMessage({ id: "email" }),
        renderCell: (params: any) => {
          return (
            <Typography component="div" align="left">
              <Typography variant="h6" display="inline">
                {params.row.col4.name}
              </Typography>
              <Typography
                variant="body2"
                component="span"
                color="white"
                sx={{
                  backgroundColor: params.row.col4.user.active
                    ? "green"
                    : "red",
                  borderRadius: 10,
                  padding: 1,
                  marginLeft: 1,
                }}
              >
                {params.row.col4.user.active
                  ? intl.formatMessage({ id: "active" })
                  : intl.formatMessage({ id: "inactive" })}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {params.row.col4.country}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {`${intl.formatMessage({ id: "login" })}: ` +
                  params.row.col4.user.username +
                  ` (` +
                  params.row.col4.user.authority.role +
                  `)`}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {`${intl.formatMessage({ id: "email" })}: ` +
                  params.row.col4.email}
              </Typography>
            </Typography>
          );
        },
      },
      {
        field: "col3",
        flex: 1,
        headerName: intl.formatMessage({ id: "phone_number" }),
        renderCell: (params: any) => {
          return (
            <Typography component="div" align="left">
              <Typography variant="subtitle1" color="text.secondary">
                {`${intl.formatMessage({ id: "phone_number" })}: `}
                {params.row.col4.phone === null ? `-` : params.row.col4.phone}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {`${intl.formatMessage({ id: "address" })}: `}
                {params.row.col4.address === null
                  ? `-`
                  : params.row.col4.address}
              </Typography>
            </Typography>
          );
        },
      },
      {
        field: "col4",
        type: "actions",
        getActions: (params: GridRowParams) => [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.row.col4.user.username)}
          />,
          <GridActionsCellItem
            icon={<SecurityIcon />}
            label={
              params.row.col4.user.active
                ? intl.formatMessage({ id: "activate" })
                : intl.formatMessage({ id: "deactivate" })
            }
            onClick={changeUserActiveStatus(
              params.row.col4.user.username,
              params.row.col4.user.active
            )}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label={intl.formatMessage({ id: "edit_info" })}
            onClick={() => setCurrUser(params.row.col4)}
            showInMenu
          />,
        ],
      },
    ],
    [deleteUser, changeUserActiveStatus, intl]
  );

  let locale;
  localStorage.getItem("locale") == null ||
  localStorage.getItem("locale") === "ru-RU"
    ? (locale = ruRU.components.MuiDataGrid.defaultProps.localeText)
    : (locale = undefined);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = () => {
    setLoading(true);
    UserService.fetchAllUsers()
      .then((resp: ResponseProps) => {
        setUsers(resp.data);
        setLoading(false);
      })
      .catch((err: ErrorProps) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Container style={{ textAlign: "center", marginBottom: 40 }}>
      <Typography variant="h4" style={{ margin: 18, fontFamily: "Montserrat" }}>
        {intl.formatMessage({ id: "users" })}
      </Typography>
      <TextField
        label={intl.formatMessage({ id: "find_user" })}
        variant="outlined"
        style={{ marginBottom: 20, width: "100%" }}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      {loading ? (
        <LinearProgress style={{ backgroundColor: "gold" }} />
      ) : (
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          localeText={locale}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          getRowHeight={() => "auto"}
          sx={{
            boxShadow: 2,
            border: 0,
            backgroundColor: "background.paper",
            "& .MuiDataGrid-columnHeaders": {
              fontWeight: "bold",
              fontSize: 16,
              fontFamily: "Montserrat",
              color: "text.primary",
            },
            "& .MuiDataGrid-cell": {
              height: "none !important",
            },
            "& .MuiDataGrid-row": {
              height: "none !important",
            },
          }}
        />
      )}
      <EditUserModal
        handleCloseEditModal={handleCloseEditModal}
        openEditModal={openEditModal}
        currUser={currUser}
        editUserRole={editUserRole}
      />
    </Container>
  );
};

export default UsersTable;

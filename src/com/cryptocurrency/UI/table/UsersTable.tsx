import { useEffect, useState } from "react";
import {
  Container,
  TableCell,
  LinearProgress,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import axios from "axios";
import { CryptoState } from "../../context/CryptoContext";
import { CoinList, UsersList } from "../../config/api";
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import UserCard from "../user/UserCard";

interface IUserProps {
  "id": number
  "user": {
    "username": string
    "password": string
    "active": boolean
    "authority": {
      "role": string
    }
  }
  "name": string
  "email": string
  "phone": string
  "country": string
  "address": string
  "imageId": string
}

const UsersTable = () => {
  const intl = useIntl()

  const [users, setUsers] = useState<IUserProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchUsers = async () => {
    setLoading(true);
    axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token")
    const { data } = await axios.get(UsersList());

    setUsers(data);
    setLoading(false);
  };

  useEffect(
    () => {
      fetchUsers()
    }, [1]
  );

  const handleSearch = () => {
    return users.filter(
      (userInfo: IUserProps) =>
        userInfo.user.username.toLowerCase().includes(search) ||
        userInfo.user.authority.role.toLowerCase().includes(search) ||
        userInfo.name.toLowerCase().includes(search) ||
        userInfo.email.toLowerCase().includes(search)
    );
  };

  return (
    <Container style={{ textAlign: "center", marginBottom: "5%" }}>
      <>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Управление пользователями
        </Typography>
        <TextField
          label="Поиск пользователей"
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        {loading
          ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          )
          : (
            handleSearch()
              .map((row: IUserProps) => {
                return (
                  <UserCard {...row} key={row.id} />
                )
              })
          )
        }
      </>
    </Container>
  )
}

export default UsersTable;
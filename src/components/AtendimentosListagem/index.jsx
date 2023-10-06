import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableFooter,
    TablePagination
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Atendimento from "../Atendimento";
import ReactLoading from "react-loading";
import "./styles.css"

function acoesPaginacao(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const irParaPrimeiraPagina = (event) => {
        onPageChange(event, 0);
    };

    const irParaUltimaPagina = (event) => {
        onPageChange(event, page - 1);
    };

    const irParaProximaPagina = (event) => {
        onPageChange(event, page + 1);
    };

    const irParaPaginaAnterior = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
          <IconButton
            onClick={irParaPrimeiraPagina}
            disabled={page === 0}
            aria-label="first page"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
            onClick={irParaUltimaPagina}
            disabled={page === 0}
            aria-label="previous page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
          <IconButton
            onClick={irParaProximaPagina}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
          <IconButton
            onClick={irParaPaginaAnterior}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </Box>
      );
}

export default function AtendimentosListagem({ token }) {
    const [atendimentos, setAtendimentos] = useState([]);
    const [pagina, setPagina] = useState(0);
    const [itensPorPagina, setItensPorPagina] = useState(20);


    useEffect(() => {
        const fetchAtendimentos = async () => {
            try {
                const res = await axios.post("https://gsm-hmg.centralitcloud.com.br/citsmart/services/data/query", {
                    "sessionID": token,
                    "queryName": "DESAFIODEV"
                })

                console.log(res.data.result);
                setAtendimentos(res.data.result);
            } catch (err) {
                console.error("Erro ao buscar dados da API: ", err)
            }
        }
        if (token) fetchAtendimentos();
    }, [token]);

    const mudarPagina = (event, novaPagina) => {
        console.log(novaPagina)
        setPagina(novaPagina);
    };

    const mudarItensPorPagina = (event) => {
        console.log(event.target.value)
        setItensPorPagina(event.target.value);
        console.log(itensPorPagina)
        setPagina(0);
    };

    return (
        <>
            {
                atendimentos.length > 0
                    ?
                    (
                        <div className="data-display">
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '1rem' }} align="center">Atividade</TableCell>
                                            <TableCell sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '1rem' }} align="center">Usuário</TableCell>
                                            <TableCell sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '1rem' }} align="center">Contrato</TableCell>
                                            <TableCell sx={{ color: '#FFF', fontWeight: 'bold', fontSize: '1rem' }} align="center">Situação</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            (itensPorPagina > 0
                                            ?
                                            atendimentos.slice(pagina * itensPorPagina, pagina * itensPorPagina + itensPorPagina)
                                            :
                                            atendimentos).map((atendimento, index) => (
                                                <Atendimento atendimento={atendimento} key={index} />
                                            ))
                                        }
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                sx={{ color: '#FFF', alignSelf: 'center'}}
                                                rowsPerPageOptions={[20, 30, 40, 50, { label: 'All', value: -1 }]}
                                                colSpan={3}
                                                count={atendimentos.length}
                                                rowsPerPage={itensPorPagina}
                                                page={pagina}
                                                onPageChange={mudarPagina}
                                                onRowsPerPageChange={mudarItensPorPagina}
                                                labelRowsPerPage="Itens por página:"
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        </div>
                    )
                    :
                    (
                        <div className="loading">
                            <ReactLoading type="spin" color="#FFF" height={'40%'} width={'40%'} />
                            <p>Aguarde enquanto os dados são carregados...</p>
                        </div>
                    )
            }
        </>
    )
}
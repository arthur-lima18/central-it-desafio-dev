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
import PropTypes from 'prop-types';
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
            aria-label="primeira página"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton
            onClick={irParaPaginaAnterior}
            disabled={page === 0}
            aria-label="página anterior"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
          <IconButton
            onClick={irParaProximaPagina}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next página"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
          <IconButton
            onClick={irParaUltimaPagina}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="última página"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </Box>
      );
}

acoesPaginacao.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
}

export default function AtendimentosListagem({ token, setToken }) {
    const [atendimentos, setAtendimentos] = useState([]);
    const [pagina, setPagina] = useState(0);
    const [itensPorPagina, setItensPorPagina] = useState(10);


    useEffect(() => {
        const fetchAtendimentos = async () => {
            try {
                const res = await axios.post("https://gsm-hmg.centralitcloud.com.br/citsmart/services/data/query", {
                    "sessionID": token,
                    "queryName": "DESAFIODEV"
                })

                setAtendimentos(res.data.result);
            } catch (err) {
                console.error("Erro ao buscar dados da API: ", err)
            }
        }
        if (token) fetchAtendimentos();
    }, [token]);

    const logout = (event) => {
        event.preventDefault();
        setToken(null);
    }
    const mudarPagina = (event, novaPagina) => {
        event.preventDefault();
        setPagina(novaPagina);
    };

    const mudarItensPorPagina = (event) => {
        event.preventDefault();
        setItensPorPagina(event.target.value);
        setPagina(0);
    };

    return (
        <>
            {
                atendimentos.length > 0
                    ?
                    (
                        <div className="data-display">
                            <div>
                            <button className="btn btn-danger" onClick={(e) => logout(e)}>
                                Sair
                            </button>
                            </div>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }} align="left">Atividade</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }} align="center">Usuário</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }} align="center">Contrato</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }} align="center">Situação</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }} align="center">Data de Solicitação</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }} align="center">Nota</TableCell>
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
                                                sx={{ alignSelf: 'center' }}
                                                rowsPerPageOptions={[10, 20, 30, 40, 50, { label: 'Mostrar Tudo', value: -1 }]}
                                                colSpan={8}
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
                            <ReactLoading type="spin" color="#009EA9" height={'10%'} width={'10%'} />
                            <p>Aguarde enquanto os dados são carregados...</p>
                        </div>
                    )
            }
        </>
    )
}
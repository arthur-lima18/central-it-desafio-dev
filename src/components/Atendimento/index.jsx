import React, { useState } from "react";
import { 
    TableRow, 
    TableCell, 
    IconButton, 
    Collapse, 
    Box
} from "@mui/material";
import {
    KeyboardArrowUp, 
    KeyboardArrowDown 
} from "@mui/icons-material"
import "./styles.css"

export default function Atendimento({ atendimento }) {
    const [ detalhar, setDetalhar] = useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell sx={{ color: '#FFF' }}>
                    <IconButton
                        size="small"
                        onClick={() => setDetalhar(!detalhar)}
                        >
                        { detalhar ? <KeyboardArrowUp style={{ color: '#FFF' }} /> : <KeyboardArrowDown style={{ color: '#FFF' }} /> }
                    </IconButton>
                </TableCell>
                <TableCell sx={{ color: '#FFF' }} component="th" scope="atendimento">{ atendimento.Atividade }</TableCell>
                <TableCell sx={{ color: '#FFF' }} align="center">{ atendimento.Usuario }</TableCell>
                <TableCell sx={{ color: '#FFF' }} align="center">{ atendimento.Contrato }</TableCell>
                <TableCell sx={{ color: '#FFF' }} align="center">{ atendimento.situacao }</TableCell>
            </TableRow>
            <TableRow className="row">
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, color: '#FFF' }} colSpan={8}>
                    <Collapse in={detalhar} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <p>{ atendimento.Descricao }</p>
                            <p>{ atendimento.OrigemAtendimento }</p>
                            <p>{ atendimento.Responsavel }</p>
                            <p>{ atendimento.Portfolio }</p>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
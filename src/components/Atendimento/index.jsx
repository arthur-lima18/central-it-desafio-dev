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
import Moment from "moment"
import "./styles.css"

export default function Atendimento({ atendimento }) {
    const [ detalhar, setDetalhar] = useState(false);

    const formataData = (data) => {
        if(data.includes("/")) return data;
        return Moment(data).format('DD/MM/YYYY HH:mm:ss');
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell sx={{ color: '#1A1A1A' }}>
                    <IconButton
                        size="small"
                        onClick={() => setDetalhar(!detalhar)}
                        >
                        { detalhar ? <KeyboardArrowUp style={{ color: '#1A1A1A' }} /> : <KeyboardArrowDown style={{ color: '#1A1A1A' }} /> }
                    </IconButton>
                </TableCell>
                <TableCell sx={{ color: '#1A1A1A' }} component="th" scope="atendimento" align="left">{ atendimento.Atividade }</TableCell>
                <TableCell sx={{ color: '#1A1A1A' }} align="center">{ atendimento.Usuario }</TableCell>
                <TableCell sx={{ color: '#1A1A1A' }} align="center">{ atendimento.Contrato }</TableCell>
                <TableCell sx={{ color: '#1A1A1A' }} align="center">{ atendimento.situacao }</TableCell>
                <TableCell sx={{ color: '#1A1A1A' }} align="center">{ formataData(atendimento.data_solicitacao) }</TableCell>
                <TableCell sx={{ color: '#1A1A1A' }} align="center">{ atendimento.nota }</TableCell>
            </TableRow>
            <TableRow className="row">
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, color: '#1A1A1A' }} colSpan={8}>
                    <Collapse in={detalhar} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1, paddingX: 10, paddingY: 2 }} className="detalhes-container">
                            <div>
                                <span><b>Descrição: </b><p>{ atendimento.Descricao ? atendimento.Descricao : <i>Não há descrição disponível</i> }</p></span>
                                <span><b>Descrição da Última Ocorrência: </b><p>{ atendimento.DescricaoUltimaOcorrencia ? atendimento.DescricaoUltimaOcorrencia : <i>Não há descrição de última ocorrência disponível</i> }</p></span>
                                
                                { atendimento.datahorasuspensao && <span><b>Data e Hora de Suspensão: </b><p>{ formataData(atendimento.datahorasuspensao) }</p></span> }
                                { atendimento.DescricaoJustSuspensao && <span><b>Descrição de Justificativa de Suspensão: </b><p>{ atendimento.DescricaoJustSuspensao }</p></span> }

                                <span><b>Serviço: </b><p>{ atendimento.Servico ? atendimento.Servico : <i>Não há dados disponíveis sobre o serviço</i> }</p></span>
                                <span><b>Origem do Atendimento: </b><p>{ atendimento.OrigemAtendimento ? atendimento.OrigemAtendimento : <i>Não há origem de atendimento disponível</i> }</p></span>
                                <span><b>Responsável: </b><p>{ atendimento.Responsavel ? atendimento.Responsavel : <i>Não há dados disponíveis sobre o responsável</i> }</p></span>
                                <span><b>Portfólio: </b><p>{ atendimento.Portfolio ? atendimento.Portfolio : <i>Não há portfolio disponível</i> }</p></span>
                                <span><b>Nome Prioridade: </b><p>{ atendimento.nomeprioridade ? atendimento.nomeprioridade : <i>Não há nome prioridade disponível</i> }</p></span>
                            </div>
                            <div>
                                <span><b>Tipo de demanda: </b><p>{ atendimento.tipoDemanda ? atendimento.tipoDemanda : <i>Não há tipo de demanda disponível</i> }</p></span>
                                <span><b>Grupo Atual: </b><p>{ atendimento.GrupoAtual ? atendimento.GrupoAtual : <i>Não há grupo atual disponível</i> }</p></span>
                                <span><b>Grupo Nível 1: </b><p>{ atendimento.gruponivel1 ? atendimento.gruponivel1 : <i>Não há grupo nível 1 disponível</i> }</p></span>
                                <span><b>ICs: </b><p>{ atendimento.ICs ? atendimento.ICs : <i>Não há ICs disponível</i> }</p></span>
                                <span><b>Análise: </b><p>{ atendimento.analise ? atendimento.analise : <i>Não há análise disponível</i> }</p></span>
                                <span><b>Base de Análise: </b><p>{ atendimento.analisebase ? atendimento.analisebase : <i>Não há base de análise disponível</i> }</p></span>
                                <span><b>Unidade: </b><p>{ atendimento.unidade ? atendimento.unidade : <i>Não há dado disponível sobre unidade</i> }</p></span>
                            
                            </div>
                            <div>
                                <span><b>Título SLA: </b><p>{ atendimento.titulosla ? atendimento.titulosla: <i>Não há dados disponíveis sobre o título de SLA</i> }</p></span>
                                <span><b>Situação SLA: </b><p>{ atendimento.situacaosla ? atendimento.situacaosla: <i>Não há dados disponíveis sobre a situação de SLA</i> }</p></span>
                                { atendimento.datahorasuspensaosla && <span><b>Data e Hora de suspensão de SLA: </b><p>{ formataData(atendimento.datahorasuspensaosla) }</p></span> }
                                <span><b>SLA Atrasado? </b><p>{ atendimento.slaAtrasado ? atendimento.slaAtrasado: <i>Não há dados disponíveis sobre o atraso de SLA</i> }</p></span>
                            </div>
                            <div>

                                <span><b>Hora Abertura: </b><p>{ atendimento.horaabertura ? atendimento.horaabertura : <i>Não há hora de abertura disponível</i> }</p></span>
                                <span><b>Data Fim: </b><p>{ atendimento.data_fim ? formataData(atendimento.data_fim) : <i>Não há data fim disponível</i> }</p></span>
                                <span><b>Data e Hora Fim: </b><p>{ atendimento.datahorafim ? formataData(atendimento.datahorafim) : <i>Não há data e hora fim disponíveis</i> }</p></span>
                                <span><b>Data Limite: </b><p>{ atendimento.data_limit ? formataData(atendimento.data_limit) : <i>Não há data limite disponível</i> }</p></span>
                            </div>
                                
                            <div>
                                <span><b>Tempo de atendimento: </b><p>{ `${atendimento.tempoatendimentohh} hora(s) e ${atendimento.tempoatendimentomm} minutos` }</p></span>
                                <span><b>Tempo de atraso: </b><p>{ `${atendimento.tempoatrasohh} hora(s) e ${atendimento.tempoatrasomm} minutos` }</p></span>
                                <span><b>Tempo de prazo: </b><p>{ `${atendimento.prazohh} hora(s) e ${atendimento.prazomm} minutos` }</p></span>
                            
                                <span><b>Tempo médio (minutos): </b><p>{ `${atendimento.tempoMedioMin} minutos` }</p></span>
                            </div>
                            
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

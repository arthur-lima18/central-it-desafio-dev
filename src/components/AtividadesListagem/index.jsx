import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AtividadesListagem({ token }) {
    const [atividades, setAtividades] = useState([]);
    
    useEffect(() => {
        const fetchAtividades = async () => {
            try {
                const res = await axios.post("https://gsm-hmg.centralitcloud.com.br/citsmart/services/data/query", {
                    "sessionID": token,
					"queryName":"DESAFIODEV"
                })

                console.log(res.data.result);
                setAtividades(res.data.result);
            } catch (err) {
                console.error("Erro ao buscar dados da API: ", err)
            }
        }
        if(token) fetchAtividades();
    }, [ token ]);

    return (
        <div className="data-display">
            <h2>Listagem de dados</h2>
            {
                atividades && atividades.length > 0 ?
                (
                    <table>
                        <thead>
                            <tr>
                                <th>Atividade</th>
                                <th>Usuário</th>
                                <th>Contrato</th>
                                <th>Situação</th>
                            </tr>
                        </thead>
                        <tbody> 
                        {
                            atividades.map((atendimento, index) => (

                                <tr key={index}>
                                    <td>{atendimento.Atividade}</td>
                                    <td>{atendimento.Usuario}</td>
                                    <td>{atendimento.Contrato}</td>
                                    <td>{atendimento.situacao}</td>
                                
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                )
                :
                (
                    <p><b>Nenhum dado encontrado! :/</b></p>
                )
            }
        </div>
    )
}
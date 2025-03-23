import React, { useState, useEffect } from "react";
import "./config.css";

function ConfigPage() {
  const [quantidade, setQuantidade] = useState(20);

  useEffect(() => {
    const qtdSalva = localStorage.getItem("mensagensPorPagina");
    if (qtdSalva) {
      setQuantidade(Number(qtdSalva));
    }
  }, []);

  const salvarConfiguracoes = () => {
    localStorage.setItem("mensagensPorPagina", quantidade);
    alert("Configuração salva! ✨");
  };

  return (
    <div className="config-container">
      <h2>Configurações</h2>

      <div className="config-item">
        <label>Mensagens por página:</label>
        <select value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <button onClick={salvarConfiguracoes}>Salvar</button>
    </div>
  );
}

export default ConfigPage;

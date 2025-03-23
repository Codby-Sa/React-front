import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import Edit from "../../assets/Edit.svg";
import Trash from "../../assets/Trash.svg";

function Home() {
  const [posts, setPosts] = useState([]);
  const [editandoPost, setEditandoPost] = useState(null);
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novoConteudo, setNovoConteudo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const savedAmount = localStorage.getItem("mensagensPorPagina");
  const postsPerPage = savedAmount ? Number(savedAmount) : 20;


  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data.slice(0, 100));
      })
      .catch((error) => {
        console.error("Erro ao buscar os posts:", error);
      });
  }, []);

  const handleEditar = (post) => {
    setEditandoPost(post.id);
    setNovoTitulo(post.title);
    setNovoConteudo(post.body);
  };

  const salvarEdicao = (id) => {
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        id,
        title: novoTitulo,
        body: novoConteudo,
        userId: 1,
      })
      .then((response) => {
        console.log("Requisição PUT enviada!");
        console.log("Status:", response.status);
        console.log("Resposta do servidor:", response.data);
        setPosts(posts.map((p) => (p.id === id ? response.data : p)));
        setEditandoPost(null);
      })
      .catch((error) => console.error("❌ Erro ao editar post:", error));
  };

  const handleDeletar = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        console.log("Requisição DELETE enviada!");
        console.log("Status:", response.status);
        console.log("Resposta do servidor:", response.data);
        setPosts(posts.filter((p) => p.id !== id));
      })
      .catch((error) => console.error("Erro ao deletar post:", error));
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="container">
      <h2>Mensagens</h2>
      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Título</th>
            <th>Conteúdo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>
                {editandoPost === post.id ? (
                  <input
                    type="text"
                    value={novoTitulo}
                    onChange={(e) => setNovoTitulo(e.target.value)}
                  />
                ) : (
                  post.title
                )}
              </td>
              <td>
                {editandoPost === post.id ? (
                  <input
                    type="text"
                    value={novoConteudo}
                    onChange={(e) => setNovoConteudo(e.target.value)}
                  />
                ) : (
                  post.body
                )}
              </td>
              <td>
                <div className="actions">
                  {editandoPost === post.id ? (
                    <button className="save-btn" onClick={() => salvarEdicao(post.id)}>
                      ✅
                    </button>
                  ) : (
                    <button className="edit-btn" onClick={() => handleEditar(post)}>
                      <img src={Edit} alt="Editar" />
                    </button>
                  )}
                  <button className="delete-btn" onClick={() => handleDeletar(post.id)}>
                    <img src={Trash} alt="Excluir" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={currentPage === num ? "active" : ""}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;

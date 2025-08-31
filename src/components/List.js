import React, { useState } from "react";
import axios from "axios";
import imgDelete from "../images/delete.png";
const List = () => {
  // Chave seletora entre lista de gatos e lista de usuáios cadastrados
  const [catList, setCatList] = useState(false);
  const [userList, setUserList] = useState(false);

  // Carregar enquanto os dados estão sendo buscados
  const [loading, setLoading] = useState(true);

  // Salvar os dados que chegam do servidor
  const [tag, setTag] = useState([]);
  const [cats, setCats] = useState([]);
  const [users, setUsers] = useState([]);

  // Expandir e retrair as tags de cada card
  const [show, setShow] = useState(null);
  const click = (id) => {
    setShow(show === id ? null : id);
  };

  // pegar os dados do 'tags'
  async function getTags() {
    axios
      .get("https://data-project-8b8q.onrender.com/tags")
      .then((response) => {
        setTag(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // Pegar os dados do 'cats'
  async function getCats() {
    axios
      .get("https://data-project-8b8q.onrender.com/cats")
      .then((response) => {
        setCats(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Pegar os dados do 'posts'
  async function getUsers() {
    axios
      .get("https://data-project-8b8q.onrender.com/posts")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async function deleteUser(id) {
    await axios.delete(`https://data-project-8b8q.onrender.com/posts/${id}`);
    getUsers();
  }

  // Renderizar os dados de acordo com o botão selecionado.
  const cat = () => {
    setCatList(!catList);
    setUserList(false);
    getTags();
    getCats();
  };
  const user = () => {
    setUserList(!userList);
    setCatList(false);
    getUsers();
  };

  return (
    <div>
      <div className="listOption">
        <h1  className="button" onClick={user}>Lista de Users </h1>
        <h1  className="button" onClick={cat}> Lista de Gatos</h1>
      </div>

      
      {catList && (
        <div>
          {loading && (
            <div className="atcenter">
              <div>
                <div className="middle">
                  <div class="loader"></div>
                </div>
              </div>
            </div>
          )}
          <div >
            {tag.map((card) => (
              <div
                className="card"
                key={card.id}
                onClick={() => click(card.id)}
              >
                <div className="card-title">{card.name}</div>
                <div className="card-content">
                  {show === card.id && (
                    <ul>
                      {cats
                        .filter((cat) => cat.tags?.includes(card.name))
                        .map((url) => (
                          <li key={url.id} className="cat-card">
                            <img src={url.url} alt="cat" />
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {userList && (
        <div>
          {loading && (
            <div className="atcenter">
              <div>
                <div className="middle">
                  <div class="loader"></div>
                </div>
              </div>
            </div>
          )}

          <div className="box-card">
            {users.map((person) => (
              <div
                className="card"
                key={person.id}
                onClick={() => click(person.id)}
              >
                <div>
                  <div className="card-title">{person.name}</div>
                </div>
                {show === person.id && (
                  <ul className="person">
                    <li key={person.id}>
                      Nome completo: {person.name} {person.surname}{" "}
                    </li>
                    <li key={person.id}>Email: {person.email}</li>
                    <li key={person.id}>Data de Nascimento: {person.bday}</li>
                    <li key={person.id}>
                      Endereço: {person.address} CEP {person.cep}
                    </li>
                    <div className="delete">
                      <img
                        src={imgDelete}
                        alt="Delete image"
                        onClick={() => deleteUser(person.id)}
                      />{" "}
                    </div>
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
  );
};

export default List;

import React from "react";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import First from "./First";
import Second from "./Second";
import Third from "./Third";

const Form = () => {
  // Manter os alertas após a validação dos campos
  const methods = useForm({ mode: "onSubmit", shouldUnregister: false });

  const { reset } = methods;

  // Chave seletora para alterar entre os componentes First, Second e Third
  const [part, setPart] = useState(1);

  // Mensagem de sucesso ao enviar o formulário
  const [message, setMessage] = useState(false);
  const [failure, setFailure] = useState(false);

  const [validUser, setValidUser] = useState([]);


  //Alterar entre botões
  const btnOneClick = () => {
    setPart(1);
    check();
  }
  const btnTwoClick = () => {
    setPart(2);
    check();
  }
  const btnThreeClick = () => {
    setPart(3);
    check();
  }

  // Botões avançar e voltar 
  const nextStep = () => {
    setPart(part + 1);
    check();
  }
  const prevStep = () => {
    setPart(part - 1);
    check();
  }

// Prossegue o submit verificando se o email já está cadastrado
const onSubmit = (data) => {
  const usuario = data.email.trim().toLowerCase();
  // comparar emails do servidor com o dado inserido no from
  const notValid = validUser.some(
    (emailValido) => emailValido.trim().toLowerCase() === usuario
  );
  if (notValid) {
    setFailure(true);
    setTimeout(() => {
      setFailure(false);
    }, 3500);
    reset({ email: "" });
    setPart(1);
    setBtnOne("btnError");
  } else {
    createUser(data);
  }
};

// Atualiza o estado do botão para aplicar o estilo
const [btnOne, setBtnOne] = useState("button");
const [btnTwo, setBtnTwo] = useState("button");
const [btnThree, setBtnThree] = useState("button");

// Chave para permitir que a função check ative o onSubmit
const [key, setKey] = useState(true);

// Disparar a validade dos itens
const { trigger } = methods;

const submit = async () => {
  const isValidPart1 = await trigger(["email", "password", "confirm"]);
  const isValidPart2 = await trigger(["name", "surname", "bday"]);
  const isValidPart3 = await trigger(["adress", "cep", "city"]);

  // Ajustar botão e ativar validação para onSubmit
  setBtnOne(!isValidPart1 ? "btnError" : "btnSuccess");
  setKey(isValidPart1);

  setBtnTwo(!isValidPart2 ? "btnError" : "btnSuccess");
  setKey(isValidPart2);

  setBtnThree(!isValidPart3 ? "btnError" : "btnSuccess");
  setKey(isValidPart3);

  if (key) {
    methods.handleSubmit(onSubmit)();
  }
};

// Verificar se os dados foram preenchidos e ajustar o style dos botões.
const check = async () => {
  if (part === 1) {
    const isValidPart1 = await trigger(["email", "password", "confirm"]);
    setBtnOne(!isValidPart1 ? "btnError" : "btnSuccess");
  }

  if (part === 2) {
    const isValidPart2 = await trigger(["name", "surname", "bday"]);
    setBtnTwo(!isValidPart2 ? "btnError" : "btnSuccess");
  }

  if (part === 3) {
    const isValidPart3 = await trigger(["adress", "cep", "city"]);
    setBtnThree(!isValidPart3 ? "btnError" : "btnSuccess");
  }
};

// Disparar a função showUser
useEffect(() => {
  showUser();
}, []);

//Pegar os dados de email dos users no servidor
async function showUser() {
  const response = await axios.get(
    "https://data-project-8b8q.onrender.com/posts"
  );
  const users = response.data;
  const emails = users.map((u) => u.email);
  setValidUser(emails);
}

//Fazer o post do cadastro no servidor
async function createUser(data) {
  await axios.post("https://data-project-8b8q.onrender.com/posts", {
    email: data.email,
    password: data.password,
    name: data.name,
    surname: data.surname,
    bday: data.bday,
    address: data.address,
    cep: data.cep,
    city: data.city,
  });
  setMessage(true);
  setTimeout(() => {
    setMessage(false);
  }, 3000);
  setTimeout(() => {
    window.location.reload();
  }, 4500);
}

return (
  <>
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="container">
          <button
            className={btnOne}
            type="button"
            onClick={btnOneClick}
          >
            Etapa 1
          </button>
          <button
            className={btnTwo}
            type="button"
            onClick={btnTwoClick}
          >
            Etapa 2
          </button>
          <button
            className={btnThree}
            type="button"
            onClick={btnThreeClick}
          >
            Etapa 3
          </button>
        </div>

        <div style={{ display: part === 1 ? "block" : "none" }}>
          <First
            nextStep={nextStep}
          />
        </div>
        <div style={{ display: part === 2 ? "block" : "none" }}>
          <Second
            nextStep={nextStep}
            prevStep={prevStep}
          />
        </div>
        <div style={{ display: part === 3 ? "block" : "none" }}>
          <Third
            prevStep={prevStep}
          />
        </div>
        <div className="center">
          <button type="button" className="button" onClick={submit}>
            Enviar
          </button>
        </div>
      </form>
    </FormProvider>
    <div>
      {message && (
        <div class="success-message">
          <div class="success-message-title">
            ✅ Sucesso! Seu cadastro foi realizado
          </div>
        </div>
      )}
      {failure && (
        <div class="failure-message">
          <div class="failure-message-title">E-mail já cadastrado</div>
        </div>
      )}
    </div>
  </>
);
};

export default Form;

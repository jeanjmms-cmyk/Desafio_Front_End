import React from "react";
import { useFormContext } from "react-hook-form";

const First = ({ nextStep }) => {
  //Registrar os valores, identificar os erros e mandar os valores globalmente.
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  // Observar a senha para validar a confirmação
  const confirmSenha = watch("password");

  return (
    <div className="container">
      <div className="form-container">
        <p> Login</p>
        <div>
          <div>
            <label>Email</label>
          </div>
          <input
            {...register("email", {
              required: "E-mail obrigatório",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Formato de email inválido",
              },
            })}
          />
          {errors.email && <p id="error">{errors.email.message}</p>}
        </div>
        <div>
          <div>
            <label>Senha</label>
          </div>
          <input
            type="password"
            {...register("password", {
              required: "Senha obrigatória",
              minLength: {
                value: 5,
                message: "Mínimo 5 caracteres",
              },
              pattern: {
                value: /^(?=.*[!@#$%^&*])/,
                message: "Adicione caractere especial",
              },
            })}
          />
          {errors.password && <p id="error">{errors.password.message}</p>}
        </div>
        <div>
          <div>
            <label>Confirme a senha</label>
          </div>
          <input
            type="password"
            {...register("confirm", {
              required: "Campo obrigatório",
              validate: (value) =>
                value === confirmSenha || "As senhas não coincidem",
            })}
          />
          {errors.confirm && <p id="error">{errors.confirm.message}</p>}
          <div className="center">
            <button type="button" onClick={nextStep} className="button">
              Seguir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default First;

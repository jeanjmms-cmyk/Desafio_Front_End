import React from "react";
import { useFormContext } from "react-hook-form";

const Second = ({ nextStep, prevStep }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const year = new Date().getFullYear();

  return (
    <div className="container">
      <div className="form-container">
        <p>Dados Pessoais</p>
        <div>
          <div>
            <label>Nome</label>
          </div>
          <input {...register("name", { required: "Nome obrigatório" })} />
          {errors.name && <p id="error">{errors.name.message}</p>}
        </div>
        <div>
          <div>
            <label>Sobrenome</label>
          </div>
          <input
            {...register("surname", { required: "Sobrenome obrigatório" })}
          />
          {errors.surname && <p id="error">{errors.surname.message}</p>}
        </div>
        <div>
          <div>
            <label>Data de Nascimento</label>
          </div>
          <input
            type="date"
            {...register("bday", {
              required: "Nascimento obrigatório",
              validate: (value) => {
                const birth = new Date(value).getFullYear();
                return birth < year || "Selecione uma data coerente";
              },
            })}
          />
          {errors.bday && <p id="error">{errors.bday.message}</p>}
          <div className="center">
            <button type="button" onClick={prevStep} className="button">
              Voltar
            </button>
            <button type="button" onClick={nextStep} className="button">
              Seguir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Second;

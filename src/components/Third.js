import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

const Third = ({ prevStep }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="container">
      <div className="form-container">
        <p>Endereço</p>
        <div>
          <div>
            <label>Endereço</label>
          </div>
          <input
            {...register("address", { required: "Endereço é obrigatório" })}
          />
          {errors.address && <p id="error">{errors.address.message}</p>}
        </div>
        <div>
          <div>
            <label>CEP</label>
          </div>
          <input
            type="number"
            {...register("cep", { required: "CEP é obrigatório" })}
          />
          {errors.cep && <p id="error">{errors.cep.message}</p>}
        </div>
        <div>
          <div>
            <label>Cidade</label>
          </div>
          <input {...register("city", { required: "Cidade é obrigatória" })} />
          {errors.city && <p id="error">{errors.city.message}</p>}
          <div className="center">
            <button type="button" onClick={prevStep} className="button">
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Third;

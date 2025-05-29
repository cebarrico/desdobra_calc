import React, { useState, useEffect } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  isNumeric?: boolean; // Nova prop para indicar se é um input numérico
}

export const Input: React.FC<InputProps> = ({
  className,
  onChange,
  onFocus,
  value,
  isNumeric = false,
  ...props
}) => {
  // Para inputs numéricos, mostrar vazio quando valor é 0 para que o placeholder apareça
  const displayValue = isNumeric && value === 0 ? "" : String(value || "");
  const [internalValue, setInternalValue] = useState(displayValue);

  // Sincronizar com o valor externo quando ele mudar
  useEffect(() => {
    const newDisplayValue = isNumeric && value === 0 ? "" : String(value || "");
    setInternalValue(newDisplayValue);
  }, [value, isNumeric]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Se o valor for exatamente 0, limpar o campo ao focar
    if (
      (internalValue === "0" || internalValue === "") &&
      (value === 0 || value === "0")
    ) {
      setInternalValue("");

      // Notificar o componente pai sobre a mudança se for input numérico
      if (isNumeric && onChange) {
        const modifiedEvent = {
          ...e,
          target: {
            ...e.target,
            value: "",
          },
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(modifiedEvent);
      }
    }

    // Chamar onFocus personalizado se existir
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (isNumeric) {
      // Para inputs numéricos, permitir apenas números, vírgula e ponto
      // Remover caracteres inválidos
      newValue = newValue.replace(/[^0-9.,]/g, "");

      // Permitir apenas uma vírgula ou ponto
      const commaCount = (newValue.match(/,/g) || []).length;
      const dotCount = (newValue.match(/\./g) || []).length;

      if (commaCount > 1) {
        newValue = newValue.replace(/,/g, (match, offset, string) => {
          return string.indexOf(",") === offset ? "," : "";
        });
      }

      if (dotCount > 1) {
        newValue = newValue.replace(/\./g, (match, offset, string) => {
          return string.indexOf(".") === offset ? "." : "";
        });
      }

      // Se tem vírgula E ponto, manter apenas o primeiro que apareceu
      if (commaCount > 0 && dotCount > 0) {
        const commaIndex = newValue.indexOf(",");
        const dotIndex = newValue.indexOf(".");
        if (commaIndex < dotIndex) {
          newValue = newValue.replace(/\./g, "");
        } else {
          newValue = newValue.replace(/,/g, "");
        }
      }

      // Converter ponto para vírgula na exibição
      const displayValue = newValue.replace(/\./g, ",");
      setInternalValue(displayValue);

      // Para o onChange, sempre converter vírgula para ponto (padrão JS)
      if (onChange) {
        const numericValue = newValue.replace(/,/g, ".");

        const modifiedEvent = {
          ...e,
          target: {
            ...e.target,
            value: numericValue,
          },
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(modifiedEvent);
      }
    } else {
      // Para inputs não numéricos, manter o valor original
      setInternalValue(newValue);
      if (onChange) {
        onChange(e);
      }
    }
  };

  // Definir props baseado no tipo
  const inputProps = isNumeric
    ? {
        type: "text" as const,
        inputMode: "decimal" as const,
        pattern: "[0-9]*[.,]?[0-9]*",
      }
    : {
        type: props.type || "text",
      };

  return (
    <input
      className={`
        px-4 py-3 border-2 border-purple-500/50 rounded-xl bg-gray-700
        focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400
        disabled:bg-gray-600 disabled:cursor-not-allowed disabled:border-purple-500/30
        placeholder:text-purple-400/70 text-purple-100
        transition-all duration-300 shadow-md hover:shadow-lg
        ${className || ""}
      `}
      {...inputProps}
      value={internalValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onWheel={(e) => (e.target as HTMLInputElement).blur()}
      {...props}
    />
  );
};

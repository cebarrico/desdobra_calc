import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import { useDesdobramento } from "../hooks/useDesdobramento";

const DesdobramentoCalculatorDesktop: React.FC = () => {
  const {
    desdobramentos,
    currentIdx,
    draft,
    error,
    hasDraft,
    hasDesdobramento,
    currentDesdobramento,
    handleDraftChange,
    handleDraftOddChange,
    handleCalculate,
    handlePrev,
    handleNext,
    handleMarkOddWin,
    handleAddNew,
    handleFinish,
    isOddWin,
    isCombinationWin,
    totalGanhos,
  } = useDesdobramento();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      {/* Header com gradiente escuro */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white py-8 shadow-2xl border-b border-purple-700/50">
        <div className="max-w-6xl mx-auto text-center px-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Image
              src="/logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="rounded-xl shadow-lg border-2 border-purple-400/50"
            />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
              Calculadora de Desdobramento
            </h1>
          </div>
          <p className="text-purple-200 text-lg">Calcule suas combinações</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Inputs para novo desdobramento */}
        {hasDraft && (
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"></div>
              <h2 className="text-2xl font-bold text-purple-300">
                Novo Desdobramento
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Valor da aposta */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-purple-300 uppercase tracking-wide">
                  💰 Valor da aposta (R$):
                </label>
                <Input
                  isNumeric
                  min={0.1}
                  step={0.1}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    const numericValue =
                      value === "" ? 0 : parseFloat(value) || 0;
                    handleDraftChange("betValue", numericValue);
                  }}
                  className="w-full text-xl font-bold text-center bg-gray-700 border-purple-500/50 text-purple-100 placeholder:text-purple-400/70"
                  placeholder="R$ 0,10"
                />
              </div>

              {/* Seleção */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-purple-300 uppercase tracking-wide">
                  🎯 Tipo de seleção:
                </label>
                <div className="grid grid-cols-2 gap-3 h-[120px]">
                  <label className="relative h-full">
                    <input
                      type="radio"
                      name="selection"
                      value={8}
                      checked={draft.selection === 8}
                      onChange={() => handleDraftChange("selection", 8)}
                      className="peer sr-only"
                    />
                    <div className="h-full p-4 border-2 border-purple-500/30 bg-gray-700/50 rounded-xl cursor-pointer transition-all duration-300 peer-checked:border-purple-400 peer-checked:bg-purple-900/30 peer-checked:shadow-xl peer-checked:shadow-purple-500/20 hover:border-purple-400/50 text-center flex flex-col justify-center">
                      <span className="text-3xl block mb-2 text-purple-300 drop-shadow-[0_0_6px_#d5bdec]">
                        8
                      </span>
                      <div className="font-semibold text-purple-200">
                        Combinações
                      </div>
                      <div className="text-sm text-purple-400">
                        3 jogos - 2 odds cada
                      </div>
                    </div>
                  </label>
                  <label className="relative h-full">
                    <input
                      type="radio"
                      name="selection"
                      value={16}
                      checked={draft.selection === 16}
                      onChange={() => handleDraftChange("selection", 16)}
                      className="peer sr-only"
                    />
                    <div className="h-full p-4 border-2 border-purple-500/30 bg-gray-700/50 rounded-xl cursor-pointer transition-all duration-300 peer-checked:border-purple-400 peer-checked:bg-purple-900/30 peer-checked:shadow-xl peer-checked:shadow-purple-500/20 hover:border-purple-400/50 text-center flex flex-col justify-center">
                      <span className="text-3xl block mb-2 text-purple-300 drop-shadow-[0_0_6px_#d5bdec]">
                        16
                      </span>
                      <div className="font-semibold text-purple-200">
                        Combinações
                      </div>
                      <div className="text-sm text-purple-400">
                        4 jogos - 2 odds cada
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Botão calcular */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-purple-300 uppercase tracking-wide">
                  ⚡ Ação:
                </label>
                <Button
                  onClick={handleCalculate}
                  variant="gradient"
                  className="w-full h-[120px] text-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 flex items-center justify-center"
                  size="lg"
                >
                  <span className="flex items-center gap-2">
                    <span>🧮</span>
                    <span>Calcular Desdobramento</span>
                  </span>
                </Button>
              </div>
            </div>

            {/* Odds dos jogos */}
            <div className="mt-8 ">
              <label className="text-sm font-semibold text-purple-300 uppercase tracking-wide block mb-4">
                ⚽ Odds dos jogos:
              </label>
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                }}
              >
                {draft.odds.map((arr, jogoIdx) => (
                  <div
                    key={jogoIdx}
                    className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-6 rounded-2xl border-2 border-purple-500/30 shadow-lg"
                  >
                    <div className="text-center font-bold text-lg mb-4 text-purple-200 flex items-center justify-center gap-2">
                      <span className="text-xl">⚽</span>
                      Jogo {jogoIdx + 1}
                    </div>
                    <div className="space-y-3">
                      <Input
                        isNumeric
                        min={1.01}
                        step={0.01}
                        value={arr[0]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleDraftOddChange(jogoIdx, 0, e.target.value)
                        }
                        placeholder="Odd 1"
                        className="w-full text-center font-bold bg-gray-600 border-purple-500/50 text-purple-100 placeholder:text-purple-400/70"
                      />
                      <div className="text-center">
                        <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          E
                        </span>
                      </div>
                      <Input
                        isNumeric
                        min={1.01}
                        step={0.01}
                        value={arr[1]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleDraftOddChange(jogoIdx, 1, e.target.value)
                        }
                        placeholder="Odd 2"
                        className="w-full text-center font-bold bg-gray-600 border-purple-500/50 text-purple-100 placeholder:text-purple-400/70"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-900/50 border-2 border-red-500/50 text-red-300 rounded-xl shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚠️</span>
                  <span className="font-semibold">{error}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Desdobramento calculado */}
        {hasDesdobramento && currentDesdobramento && (
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/30 overflow-hidden">
            {/* Header com navegação */}
            <div className="p-6 bg-gradient-to-r from-purple-900 to-indigo-900 text-white border-b border-purple-700/50">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span>📊</span>
                    Desdobramento {currentIdx + 1} de {desdobramentos.length}
                  </h2>
                  <p className="text-purple-200 mt-1 text-lg">
                    Valor da aposta:{" "}
                    <span className="font-bold text-yellow-400">
                      R$ {currentDesdobramento.betValue}
                    </span>
                  </p>
                  <p className="text-purple-200 mt-1 text-lg">
                    Valor total da aposta:{" "}
                    <span className="font-bold text-yellow-400">
                      R${" "}
                      {(
                        currentDesdobramento.betValue *
                        currentDesdobramento.combinations.length
                      ).toFixed(2)}
                    </span>
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentIdx === 0}
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                  >
                    ← Anterior
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleNext}
                    disabled={currentIdx === desdobramentos.length - 1}
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                  >
                    Próximo →
                  </Button>
                </div>
              </div>
            </div>

            {/* Odds e botões de marcar */}
            <div className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
              <h3 className="text-xl font-bold mb-6 text-purple-300 flex items-center gap-2">
                <span>🎯</span>
                Marcar Odds Ganhadoras:
              </h3>
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                style={{
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                }}
              >
                {currentDesdobramento.odds.map((arr, jogoIdx) => (
                  <div
                    key={jogoIdx}
                    className="bg-gray-700/50 p-6 rounded-2xl border-2 border-purple-500/30 shadow-lg backdrop-blur-sm"
                  >
                    <div className="text-center font-bold text-lg mb-4 text-purple-200 flex items-center justify-center gap-2">
                      <span className="text-xl">⚽</span>
                      Jogo {jogoIdx + 1}
                    </div>
                    <div className="flex gap-3 justify-center ">
                      {arr.map((odd, oddIdx) => (
                        <button
                          key={oddIdx}
                          className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                            isOddWin(currentDesdobramento, jogoIdx, oddIdx)
                              ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-500/30"
                              : "bg-gradient-to-r from-gray-600 to-gray-700 text-purple-200 hover:from-purple-600 hover:to-purple-700 shadow-lg border border-purple-500/30"
                          }`}
                          onClick={() => handleMarkOddWin(jogoIdx, oddIdx)}
                        >
                          {odd}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ações */}
            <div className="p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-t border-purple-700/30">
              <div className="flex gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={handleAddNew}
                  className="flex items-center gap-2 bg-gray-700/50 border-purple-500/50 text-purple-300 hover:bg-purple-900/30"
                >
                  <span>➕</span>
                  Adicionar Novo Desdobramento
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleFinish}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600"
                >
                  <span>🎯</span>
                  Concluir Este Desdobramento
                </Button>
              </div>
            </div>

            {/* Lista de combinações */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-purple-300 flex items-center gap-2">
                  <span>🧮</span>
                  Combinações ({currentDesdobramento.combinations.length})
                </h3>
                <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-4 rounded-2xl shadow-lg border border-purple-700/50">
                  <div className="text-sm text-purple-200">
                    Total apostado:{" "}
                    <span className="font-bold text-yellow-400">
                      R${" "}
                      {(
                        currentDesdobramento.betValue *
                        currentDesdobramento.combinations.length
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-green-400">
                    Total ganhos: R${" "}
                    {totalGanhos(currentDesdobramento).toFixed(2)}
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      totalGanhos(currentDesdobramento) -
                        currentDesdobramento.betValue *
                          currentDesdobramento.combinations.length >=
                      0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    Lucro: R${" "}
                    {(
                      totalGanhos(currentDesdobramento) -
                      currentDesdobramento.betValue *
                        currentDesdobramento.combinations.length
                    ).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto rounded-2xl border-2 border-purple-500/30">
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 bg-gradient-to-br from-gray-800/30 to-gray-900/30"
                  style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  }}
                >
                  {currentDesdobramento.combinations.map((comb, i) => {
                    const win = isCombinationWin(currentDesdobramento, comb);
                    return (
                      <div
                        key={i}
                        className={`rounded-2xl p-4 border-2 transition-all duration-300 transform hover:scale-105 ${
                          win
                            ? "bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-500/50 shadow-lg shadow-green-500/20"
                            : "bg-gray-700/50 border-purple-500/30 hover:border-purple-400/50 shadow-lg backdrop-blur-sm"
                        } `}
                      >
                        <div className="flex flex-wrap gap-2 mb-3 justify-center ">
                          {comb.odds.map((odd, jogoIdx) => {
                            // Usar o índice da combinação diretamente
                            const oddIndex = comb.indices[jogoIdx];
                            const isWinner = isOddWin(
                              currentDesdobramento,
                              jogoIdx,
                              oddIndex
                            );

                            return (
                              <span
                                key={jogoIdx}
                                className={`inline-flex items-center justify-center w-12 h-10 px-2 py-1 rounded-xl font-bold text-sm border-2 ${
                                  isWinner
                                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white border-green-500 shadow-lg"
                                    : "bg-gradient-to-r from-gray-600 to-gray-700 text-purple-200 border-purple-500/50"
                                }`}
                              >
                                {odd}
                              </span>
                            );
                          })}
                        </div>
                        <div className="text-center space-y-2 ">
                          <div className="text-sm font-semibold text-purple-300">
                            Odd:{" "}
                            <span className="text-purple-100">
                              {comb.totalOdd.toFixed(2)}
                            </span>
                          </div>
                          <div className="text-sm font-semibold text-purple-300">
                            Ganho:{" "}
                            <span className="text-green-400 font-bold">
                              R$ {comb.potentialWin.toFixed(2)}
                            </span>
                          </div>
                          {win && (
                            <div className="text-xs font-bold text-green-300 bg-green-900/50 rounded-full px-3 py-1 inline-block border border-green-500/50">
                              ✅ GANHA! 🏆
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botão para novo desdobramento quando não há nada */}
        {!hasDraft && !hasDesdobramento && (
          <div className="text-center py-16">
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-purple-500/30 max-w-md mx-auto">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold mb-6 text-purple-300">
                Nenhum desdobramento encontrado
              </h2>
              <Button
                onClick={handleAddNew}
                variant="gradient"
                size="lg"
                className="text-xl px-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
              >
                ✨ Criar Primeiro Desdobramento
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesdobramentoCalculatorDesktop;

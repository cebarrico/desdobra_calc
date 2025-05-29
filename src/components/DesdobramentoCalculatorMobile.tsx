import React from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import { useDesdobramento } from "../hooks/useDesdobramento";

const DesdobramentoCalculatorMobile: React.FC = () => {
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
      {/* Header Mobile */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white py-6 shadow-2xl sticky top-0 z-10 border-b border-purple-700/50">
        <div className="text-center px-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-lg shadow-lg border-2 border-purple-400/50"
            />
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
              Calculadora Mobile
            </h1>
          </div>
          <p className="text-purple-200 text-sm">Calcule seus desdobramentos</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Inputs para novo desdobramento */}
        {hasDraft && (
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"></div>
              <h2 className="text-xl font-bold text-purple-300">
                Novo Desdobramento
              </h2>
            </div>

            {/* Valor da aposta */}
            <div className="space-y-3 mb-6">
              <label className="text-sm font-semibold text-purple-300 uppercase tracking-wide flex items-center gap-2">
                <span>💰</span>
                Valor da aposta (R$):
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
                className="w-full text-2xl font-bold text-center bg-gray-700 border-purple-500/50 text-purple-100 placeholder:text-purple-400/70 py-4"
                placeholder="R$ 0,10"
              />
            </div>

            {/* Seleção */}
            <div className="space-y-3 mb-6">
              <label className="text-sm font-semibold text-purple-300 uppercase tracking-wide flex items-center gap-2">
                <span>🎯</span>
                Tipo de seleção:
              </label>
              <div className="grid grid-cols-2 gap-3 h-[130px]">
                <label className="relative h-full">
                  <input
                    type="radio"
                    name="selection"
                    value={8}
                    checked={draft.selection === 8}
                    onChange={() => handleDraftChange("selection", 8)}
                    className="peer sr-only"
                  />
                  <div className="h-full p-4 border-2 border-purple-500/30 bg-gray-700/50 rounded-2xl cursor-pointer transition-all duration-300 peer-checked:border-purple-400 peer-checked:bg-purple-900/30 peer-checked:shadow-xl peer-checked:shadow-purple-500/20 hover:border-purple-400/50 text-center flex flex-col justify-center transform peer-checked:scale-105">
                    <span className="text-3xl block mb-2 text-purple-300 drop-shadow-[0_0_6px_#d5bdec]">
                      8
                    </span>
                    <div className="font-bold text-purple-200">Combinações</div>
                    <div className="text-sm text-purple-400">3 jogos</div>
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
                  <div className="h-full p-4 border-2 border-purple-500/30 bg-gray-700/50 rounded-2xl cursor-pointer transition-all duration-300 peer-checked:border-purple-400 peer-checked:bg-purple-900/30 peer-checked:shadow-xl peer-checked:shadow-purple-500/20 hover:border-purple-400/50 text-center flex flex-col justify-center transform peer-checked:scale-105">
                    <span className="text-3xl block mb-2 text-purple-300 drop-shadow-[0_0_6px_#d5bdec]">
                      16
                    </span>
                    <div className="font-bold text-purple-200">Combinações</div>
                    <div className="text-sm text-purple-400">4 jogos</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Odds dos jogos */}
            <div className="space-y-4 mb-6">
              <label className="text-sm font-semibold text-purple-300 uppercase tracking-wide flex items-center gap-2">
                <span>⚽</span>
                Odds dos jogos:
              </label>
              {draft.odds.map((arr, jogoIdx) => (
                <div
                  key={jogoIdx}
                  className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-5 rounded-2xl border-2 border-purple-500/30 shadow-lg"
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
                      <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
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

            {/* Botão calcular */}
            <button
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-5 rounded-2xl font-bold text-xl shadow-2xl hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              <span>Calcular Desdobramento</span>
            </button>

            {error && (
              <div className="mt-6 p-4 bg-red-900/50 border-2 border-red-500/50 text-red-300 rounded-2xl shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚠️</span>
                  <span className="font-semibold">{error}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Desdobramento calculado */}
        {hasDesdobramento && currentDesdobramento && (
          <>
            {/* Header com navegação */}
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-5 border border-purple-500/30">
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">📊</span>
                  <h2 className="text-xl font-bold text-purple-300">
                    Desdobramento {currentIdx + 1}/{desdobramentos.length}
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-4 rounded-2xl shadow-lg border border-purple-700/50">
                  <p className="text-purple-200 text-sm">Aposta:</p>
                  <p className="font-bold text-yellow-400 text-xl">
                    R$ {currentDesdobramento.betValue}
                  </p>
                  <p className="text-purple-200 text-sm">
                    Valor total da aposta:{" "}
                  </p>
                  <p className="font-bold text-yellow-400 text-xl">
                    R${" "}
                    {(
                      currentDesdobramento.betValue *
                      currentDesdobramento.combinations.length
                    ).toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handlePrev}
                    disabled={currentIdx === 0}
                    className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-purple-200 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg border border-purple-500/30"
                  >
                    ← Anterior
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentIdx === desdobramentos.length - 1}
                    className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-purple-200 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg border border-purple-500/30"
                  >
                    Próximo →
                  </button>
                </div>
              </div>
            </div>

            {/* Odds para marcar */}
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-5 border border-purple-500/30 space-y-4">
              <h3 className="font-bold text-lg text-center text-purple-300 flex items-center justify-center gap-2">
                <span>🎯</span>
                Marcar Odds Ganhadoras
              </h3>
              {currentDesdobramento.odds.map((arr, jogoIdx) => (
                <div
                  key={jogoIdx}
                  className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 p-5 rounded-2xl border-2 border-purple-500/30 shadow-lg"
                >
                  <div className="text-center font-bold text-lg mb-4 text-purple-200 flex items-center justify-center gap-2">
                    <span className="text-xl">⚽</span>
                    Jogo {jogoIdx + 1}
                  </div>
                  <div className="flex gap-3 justify-center">
                    {arr.map((odd, oddIdx) => (
                      <button
                        key={oddIdx}
                        className={`px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg ${
                          isOddWin(currentDesdobramento, jogoIdx, oddIdx)
                            ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-green-500/30"
                            : "bg-gradient-to-r from-gray-600 to-gray-700 text-purple-200 hover:from-purple-600 hover:to-purple-700 shadow-purple-500/20 border border-purple-500/30"
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

            {/* Resumo financeiro */}
            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl shadow-2xl p-6 border border-purple-700/50">
              <h3 className="font-bold text-xl text-center mb-4 flex items-center justify-center gap-2">
                <span>💰</span>
                Resumo Apostado
              </h3>
              <div className="space-y-3 text-center">
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <div className="text-purple-200 text-sm">Total apostado:</div>
                  <div className="font-bold text-yellow-400 text-lg">
                    R${" "}
                    {(
                      currentDesdobramento.betValue *
                      currentDesdobramento.combinations.length
                    ).toFixed(2)}
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <div className="text-purple-200 text-sm">Total ganhos:</div>
                  <div className="font-bold text-green-400 text-xl">
                    R$ {totalGanhos(currentDesdobramento).toFixed(2)}
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <div className="text-purple-200 text-sm">Lucro:</div>
                  <div
                    className={`font-bold text-xl ${
                      totalGanhos(currentDesdobramento) -
                        currentDesdobramento.betValue *
                          currentDesdobramento.combinations.length >=
                      0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    R${" "}
                    {(
                      totalGanhos(currentDesdobramento) -
                      currentDesdobramento.betValue *
                        currentDesdobramento.combinations.length
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-5 border border-purple-500/30 space-y-4">
              <button
                onClick={handleAddNew}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-2xl hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                <span>➕</span>
                Adicionar Novo
              </button>
              <button
                onClick={handleFinish}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-2xl font-bold text-lg shadow-2xl hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                <span>🎯</span>
                Concluir Desdobramento
              </button>
            </div>

            {/* Lista de combinações */}
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-5 border border-purple-500/30">
              <h3 className="font-bold text-lg text-center mb-4 text-purple-300 flex items-center justify-center gap-2">
                <span>🧮</span>
                Combinações ({currentDesdobramento.combinations.length})
              </h3>

              <div className="space-y-4 max-h-80 overflow-y-auto">
                {currentDesdobramento.combinations.map((comb, i) => {
                  const win = isCombinationWin(currentDesdobramento, comb);
                  return (
                    <div
                      key={i}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                        win
                          ? "bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-500/50 shadow-lg shadow-green-500/20"
                          : "bg-gradient-to-br from-gray-700/50 to-gray-800/50 border-purple-500/30 shadow-lg"
                      }`}
                    >
                      <div className="flex flex-wrap gap-2 mb-3 justify-center">
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
                      <div className="text-center space-y-2">
                        <div className="text-sm font-semibold text-purple-300">
                          Odd:{" "}
                          <span className="text-purple-100 font-bold">
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
                          <div className="text-xs font-bold text-green-300 bg-green-900/50 rounded-full px-4 py-2 inline-block shadow-lg border border-green-500/50">
                            ✅ GANHA! 🏆
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Botão para novo desdobramento quando não há nada */}
        {!hasDraft && !hasDesdobramento && (
          <div className="text-center py-12">
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-purple-500/30 max-w-sm mx-auto">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-xl font-bold mb-6 text-purple-300">
                Nenhum desdobramento encontrado
              </h2>
              <button
                onClick={handleAddNew}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 w-full"
              >
                <span>✨</span>
                Criar Primeiro Desdobramento
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesdobramentoCalculatorMobile;

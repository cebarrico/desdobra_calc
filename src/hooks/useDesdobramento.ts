import { useState, useEffect } from "react";

// Função para gerar todas as combinações possíveis de odds com índices
export function generateCombinations(
  arrays: number[][]
): { odds: number[]; indices: number[] }[] {
  if (arrays.length === 0) return [];

  // Criar arrays de índices para cada jogo [0, 1]
  const indexArrays = arrays.map(() => [0, 1]);

  // Gerar todas as combinações de índices
  const indexCombinations = indexArrays.reduce(
    (acc, curr) =>
      acc
        .map((a) => curr.map((b) => [...a, b]))
        .reduce((a, b) => a.concat(b), []),
    [[]] as number[][]
  );

  // Para cada combinação de índices, extrair os valores das odds
  return indexCombinations.map((indices) => ({
    odds: indices.map((idx, jogoIdx) => arrays[jogoIdx][idx]),
    indices: indices,
  }));
}

const STORAGE_KEY = "desdobramento_calc_array";

export interface Combination {
  odds: number[];
  indices: number[]; // NOVO: índices das odds selecionadas [0|1, 0|1, ...]
  totalOdd: number;
  potentialWin: number;
}

// Mudança: agora rastreamos a posição específica da odd, não apenas o valor
export interface OddsGanhas {
  [jogoIdx: number]: number[]; // array dos índices das odds ganhadoras (0 ou 1)
}

export interface Desdobramento {
  betValue: number;
  selection: 8 | 16;
  odds: number[][];
  combinations: Combination[];
  oddsGanhas: OddsGanhas;
  calculated: boolean;
}

// Estrutura de um desdobramento
export function createEmptyDesdobramento(): Desdobramento {
  return {
    betValue: 0.1,
    selection: 8,
    odds: [
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    combinations: [],
    oddsGanhas: {},
    calculated: false,
  };
}

export function useDesdobramento() {
  // Array de desdobramentos
  const [desdobramentos, setDesdobramentos] = useState<Desdobramento[]>([]);
  // Índice do desdobramento atual
  const [currentIdx, setCurrentIdx] = useState(0);
  // Estado temporário para novo desdobramento
  const [draft, setDraft] = useState<Desdobramento>(createEmptyDesdobramento());
  const [error, setError] = useState("");

  // Carregar do localStorage ao montar
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const arr = JSON.parse(saved) as Desdobramento[];
        if (Array.isArray(arr) && arr.length > 0) {
          setDesdobramentos(arr);
          setCurrentIdx(0);
        }
      } catch {
        // erro ao carregar, ignora
      }
    }
  }, []);

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(desdobramentos));
  }, [desdobramentos]);

  // Atualiza odds conforme seleção no draft
  useEffect(() => {
    if (draft.selection === 8 && draft.odds.length !== 3) {
      setDraft((d) => ({
        ...d,
        odds: [
          [0, 0],
          [0, 0],
          [0, 0],
        ],
      }));
    } else if (draft.selection === 16 && draft.odds.length !== 4) {
      setDraft((d) => ({
        ...d,
        odds: [
          [0, 0],
          [0, 0],
          [0, 0],
          [0, 0],
        ],
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft.selection]); // Removendo draft.odds.length das dependências intencionalmente para evitar loop

  // Handlers para draft
  const handleDraftChange = (field: keyof Desdobramento, value: unknown) => {
    setDraft((d) => ({ ...d, [field]: value }));
  };

  const handleDraftOddChange = (
    jogoIdx: number,
    oddIdx: number,
    value: string
  ) => {
    setDraft((d) => ({
      ...d,
      odds: d.odds.map((arr, i) =>
        i === jogoIdx
          ? arr.map((o, j) => (j === oddIdx ? Number(value) : o))
          : arr
      ),
    }));
  };

  // Calcular draft
  const handleCalculate = () => {
    setError("");
    if (!draft.betValue || draft.betValue < 0.1) {
      setError("Informe um valor de aposta válido (mínimo R$ 0,10).");
      return;
    }
    for (let i = 0; i < draft.odds.length; i++) {
      for (let j = 0; j < 2; j++) {
        if (!draft.odds[i][j] || draft.odds[i][j] <= 1) {
          setError(`Preencha odds válidas para o Jogo ${i + 1}, Odd ${j + 1}.`);
          return;
        }
      }
    }
    const combs: Combination[] = generateCombinations(draft.odds).map(
      (oddsArr) => {
        const totalOdd = oddsArr.odds.reduce((acc, o) => acc * o, 1);
        return {
          odds: oddsArr.odds,
          indices: oddsArr.indices,
          totalOdd,
          potentialWin: Number((draft.betValue * totalOdd).toFixed(2)),
        };
      }
    );
    const novo: Desdobramento = {
      ...draft,
      combinations: combs,
      calculated: true,
      oddsGanhas: {},
    };
    setDesdobramentos((arr) => [...arr, novo]);
    setCurrentIdx(desdobramentos.length); // vai para o novo
    setDraft(createEmptyDesdobramento());
  };

  // Navegação
  const handlePrev = () => setCurrentIdx((idx) => Math.max(0, idx - 1));
  const handleNext = () =>
    setCurrentIdx((idx) => Math.min(desdobramentos.length - 1, idx + 1));

  // Marcar odd como ganha - NOVA IMPLEMENTAÇÃO
  const handleMarkOddWin = (jogoIdx: number, oddIndex: number) => {
    setDesdobramentos((arr) => {
      const copy = [...arr];
      const d = { ...copy[currentIdx] };

      const current = d.oddsGanhas[jogoIdx] || [];

      if (current.includes(oddIndex)) {
        // Se já está marcada, remove
        d.oddsGanhas = {
          ...d.oddsGanhas,
          [jogoIdx]: current.filter((idx) => idx !== oddIndex),
        };
      } else {
        // Se não está, adiciona
        d.oddsGanhas = { ...d.oddsGanhas, [jogoIdx]: [...current, oddIndex] };
      }

      copy[currentIdx] = d;
      return copy;
    });
  };

  // Verificar se uma odd é ganhadora - NOVA IMPLEMENTAÇÃO
  const isOddWin = (d: Desdobramento, jogoIdx: number, oddIndex: number) => {
    return d.oddsGanhas[jogoIdx]?.includes(oddIndex) || false;
  };

  // Verificar se uma combinação é ganhadora - NOVA IMPLEMENTAÇÃO CORRIGIDA
  const isCombinationWin = (d: Desdobramento, comb: Combination) => {
    return comb.indices.every((oddIndex, jogoIdx) => {
      return d.oddsGanhas[jogoIdx]?.includes(oddIndex) || false;
    });
  };

  const totalGanhos = (d: Desdobramento) =>
    d.combinations
      .filter((c) => isCombinationWin(d, c))
      .reduce((acc, c) => acc + c.potentialWin, 0);

  // Adicionar novo desdobramento
  const handleAddNew = () => {
    setDraft(createEmptyDesdobramento());
    setCurrentIdx(desdobramentos.length);
  };

  // Concluir desdobramento (remove do array)
  const handleFinish = () => {
    setDesdobramentos((arr) => {
      const copy = [...arr];
      copy.splice(currentIdx, 1);
      // Ajusta o índice
      if (copy.length === 0) {
        setCurrentIdx(0);
      } else if (currentIdx >= copy.length) {
        setCurrentIdx(copy.length - 1);
      }
      return copy;
    });
  };

  // Estados derivados
  const hasDraft =
    draft && !draft.calculated && currentIdx === desdobramentos.length;
  const hasDesdobramento =
    desdobramentos.length > 0 && currentIdx < desdobramentos.length;
  const currentDesdobramento = hasDesdobramento
    ? desdobramentos[currentIdx]
    : null;

  return {
    // Estado
    desdobramentos,
    currentIdx,
    draft,
    error,
    hasDraft,
    hasDesdobramento,
    currentDesdobramento,

    // Handlers
    handleDraftChange,
    handleDraftOddChange,
    handleCalculate,
    handlePrev,
    handleNext,
    handleMarkOddWin,
    handleAddNew,
    handleFinish,

    // Utilities
    isOddWin,
    isCombinationWin,
    totalGanhos,
  };
}

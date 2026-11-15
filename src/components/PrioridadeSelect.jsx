import { PRIORIDADES } from '../data/mockProjects';

const CLASSES = {
  Alta: 'prioridade-alta',
  Média: 'prioridade-media',
  Baixa: 'prioridade-baixa',
};

export function PrioridadeBadge({ prioridade }) {
  return (
    <span className={`badge-prioridade ${CLASSES[prioridade] ?? CLASSES.Média}`}>
      {prioridade}
    </span>
  );
}

function PrioridadeSelect({ id, prioridade, onChange, nomeProjeto }) {
  return (
    <select
      id={id}
      name="prioridade"
      className={`select-prioridade ${CLASSES[prioridade] ?? CLASSES.Média}`}
      value={prioridade}
      aria-label={`Prioridade do projeto ${nomeProjeto}`}
      onChange={(e) => onChange(e.target.value)}
    >
      {PRIORIDADES.map((nivel) => (
        <option key={nivel} value={nivel}>
          {nivel}
        </option>
      ))}
    </select>
  );
}

export default PrioridadeSelect;

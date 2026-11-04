function Badge({ status }) {
  let classeCor = 'badge';

  if (status === 'Em andamento') {
    classeCor = 'badge badge-azul';
  } else if (status === 'Entregue') {
    classeCor = 'badge badge-verde';
  }

  return <span className={classeCor}>{status}</span>;
}

export default Badge;

const ModelCompletion = ({ model, completion, match }) => {
  return (
    <div>
      <div>{model}</div>
      {completion}
      <div>Совпадение: {match}%</div>
    </div>
  );
};

export default ModelCompletion;

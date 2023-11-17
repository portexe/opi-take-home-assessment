import styles from "./styles.module.css";

interface Props {
  header: string;
  latest?: string;
  history: string[];
}

export function Readings({ header, latest, history }: Props) {
  const headerMarkup = <h3>{header}</h3>;

  if (!latest)
    return (
      <div>
        {headerMarkup}
        <p>No readings yet</p>
      </div>
    );

  return (
    <div className={styles.main}>
      {headerMarkup}

      <h5>Latest</h5>

      <p>{latest}</p>

      {!!history.length && (
        <div className={styles.history}>
          <h5>History</h5>

          {history.map((val, idx) => (
            <p key={idx}>{val}</p>
          ))}
        </div>
      )}
    </div>
  );
}

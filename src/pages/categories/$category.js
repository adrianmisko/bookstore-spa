import styles from './$category.css';

export default function() {
  return (
    <div className={styles.normal}>
      <h1>Page $category</h1>
    </div>
  );
}

import styles from "./explore.module.css";
import SearchForm from "@/app/(afterLogin)/_components/SearchForm";
import TrendSection from "@/app/(afterLogin)/explore/_components/TrendSection";

export default function Explore() {
  return (
    <main className={styles.main}>
      <div className={styles.formZone}>
        <SearchForm />
      </div>
      <div className={styles.trend}>
        <h3>나를 위한 트렌드</h3>
        <TrendSection />
      </div>
    </main>
  );
}

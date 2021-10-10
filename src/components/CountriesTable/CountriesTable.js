import Link from "next/link";
import Image from 'next/image'
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { useState } from "react";
import styles from "./CountriesTable.module.css";

const orderBy = (countries, value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => {
      return a[value] > b[value] ? 1 : -1;
    });
  }
  if (direction === "desc") {
    return [...countries].sort((a, b) => {
      return a[value] > b[value] ? -1 : 1;
    });
  }
  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDown color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUp color="inherit" />
      </div>
    );
  }
};

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction);

  function switchDirection() {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  }

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
      <div className={styles.heading_flag}></div>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>

          {value === "name" && <SortArrow direction={direction} />}
        </button>
        <button className={styles.heading_population} onClick={() => setValueAndDirection("population")}>
          <div>Population</div>
          {value === "population" && <SortArrow direction={direction} />}
        </button>
        <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection("area")}
        >
          <div>
            Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)
          </div>

          {value === "area" && <SortArrow direction={direction} />}
        </button>
        <button
          className={styles.heading_gini}
          onClick={() => setValueAndDirection("gini")}
        >
          <div>Gini</div>

          {value === "gini" && <SortArrow direction={direction} />}
        </button>
      </div>
      {orderedCountries.map((country, index) => (
        <Link href={`/country/${country.alpha3Code.toLowerCase()}`} key={index}>
          <a>
            <div className={styles.row}>
            <div className={styles.flag}>
              <Image loader={() => country.flag} src={country.flag} alt={country.name} width={58.59} height={38.3} unoptimized/>
            </div>
              <div className={styles.name}>{country.name}</div>
              <div className={styles.population}>{country.population}</div>
              <div className={styles.area}>{country.area || 0}</div>

<div className={styles.gini}>{country.gini || 0} %</div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default CountriesTable;

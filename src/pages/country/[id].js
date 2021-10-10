import { useEffect, useState } from "react";
import Image from 'next/image'
import Layout from "../../components/Layout/Layout";
import styles from "./country.module.css"

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.com/v2/alpha/${id}`);

  const country = await res.json();

  return country;
};

const Country = ({country}) => {
  const [borders, setBorders] = useState([]);

  const getBorders = async () => {
    if (country.borders){
      const country_borders = await Promise.all(
       country.borders.map((border) => getCountry(border))
     );
     setBorders(country_borders);
    }
  };

  useEffect(() => {
    getBorders();
    // eslint-disable-next-line
  }, []);


    return ( <Layout title={country.name}>
     <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.overview_panel}>
            <Image loader={() => country.flag} src={country.flag} alt={country.name} width={294.66} height={192.66} unoptimized/>

            <h1 className={styles.overview_name}>{country.name}</h1>
            <div className={styles.overview_region}>{country.region}</div>

            <div className={styles.overview_numbers}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>
                  {country.population}
                </div>
                <div className={styles.overview_label}>Population</div>
              </div>

              <div className={styles.overview_area}>
                <div className={styles.overview_value}>{country.area}</div>
                <div className={styles.overview_label}>Area</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>
                {country.capital}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Languages</div>
              <div className={styles.details_panel_value}>
                {country.languages.map(({ name }) => name).join(", ")}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Currencies</div>
              <div className={styles.details_panel_value}>
                {country.currencies.map(({ name }) => name).join(", ")}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Native name</div>
              <div className={styles.details_panel_value}>
                {country.nativeName}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Gini</div>
              <div className={styles.details_panel_value}>{country.gini} %</div>
            </div>

            <div className={styles.details_panel_borders}>
              <div className={styles.details_panel_borders_label}>
                Neighbouring Countries
              </div>

              <div className={styles.details_panel_borders_container}>
                {borders && borders.map(({ flag, name }, index) => (
                  <div className={styles.details_panel_borders_country} key={country.alpha3Code+"-"+`${index}`}>
               
                    <Image loader={() => flag} src={flag} alt={name} width={145.33} height={96.88} unoptimized/>

                    <div className={styles.details_panel_borders_name}>
                      {name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>);
}
 
export default Country;

export const getServerSideProps =  async({params})=>{
    const country = await getCountry(params.id);

    return {
        props:{
            country,
        }
    }
}
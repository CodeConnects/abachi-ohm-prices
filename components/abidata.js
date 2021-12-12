import { useQuery, gql } from '@apollo/client'

export default function ABIData() {

    const { loading, error, data } = useQuery(gql`
      query {
        all @rest(path: "v1/all") {
          abachi_treasury_usd,
          abachi_treasury_sohm,
          abachi_circulating_supply
        }
      }
    `)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    return (
      <div className="grid">

        {console.log(data)}
              
        <div className="card">
          <h2>Abachi Treasury USD</h2>
          <p>${data.all.abachi_treasury_usd.toLocaleString()}</p>
        </div>

        <div className="card">
          <h2>Abachi Treasury sOHM</h2>
          <p>{data.all.abachi_treasury_sohm.toLocaleString()}</p>
        </div>

        <div className="card">
          <h2>ABI Circulating Supply</h2>
          <p>{data.all.abachi_circulating_supply.toLocaleString()}</p>
        </div>
      
      </div>
  );
}
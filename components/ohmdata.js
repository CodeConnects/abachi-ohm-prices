import { useQuery, gql } from '@apollo/client'

export default function OHMData() {

    const { loading, error, data } = useQuery(gql`
      query {
        protocolMetrics(first: 1, orderBy: timestamp, orderDirection: desc) {
          ohmPrice
          treasuryMarketValue
          ohmCirculatingSupply
          totalValueLocked
        }
      }
    `)
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
  
    const metrics = data?.protocolMetrics[0];
      
    const treasuryMarketValue =  Math.round(metrics?.treasuryMarketValue);
    const ohmCirculatingSupply =  Math.round(metrics?.ohmCirculatingSupply);
    const backingPerOhm = Math.round(metrics?.treasuryMarketValue / metrics?.ohmCirculatingSupply * 100)/100;
    const ohmPrice = Math.round(metrics?.ohmPrice * 100)/100;
    const totalValueLocked = Math.round(metrics?.totalValueLocked);
    const ohmMarketCap = ohmPrice * ohmCirculatingSupply;
    
    return (
      <div className="grid">
              
        <div className="card">
          <h2>Price per OHM</h2>
          <p>${ohmPrice.toLocaleString()}</p>
        </div>
  
        <div className="card">
          <h2>OHM Treasury Value</h2>
          <p>${treasuryMarketValue.toLocaleString()}</p>
        </div>
  
        <div className="card">
          <h2>Backing per OHM</h2>
          <p>${backingPerOhm.toLocaleString()}</p>
        </div>
  
        <div className="card">
          <h2>OHM Market Cap</h2>
          <p>${ohmMarketCap.toLocaleString()}</p>
        </div>
  
        <div className="card">
          <h2>OHM Total Value Locked</h2>
          <p>${totalValueLocked.toLocaleString()}</p>
        </div>
  
    </div>
  );
}
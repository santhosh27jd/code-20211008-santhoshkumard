import React, {useEffect,useState} from 'react'
import { useQuery, gql } from '@apollo/client'
import { LOAD_PROD } from '../Graphql/Query'

// Catalog row configuring
function CatalogRow(){
  // Loading data from api
    const {error, loading, data} = useQuery(LOAD_PROD)
    const [prod, setProd]  = useState([])
    useEffect(()=>{
        if(data){
            setProd(data.getAllProduct);
        }     
    },[data]);

    return (<div>
        {prod.map((val) => {
          const txt = val.location;
             return (
                <div className="row product" key={val.id}>
                  <div className="col-md-2">
                    <img src={require('../images/'+txt).default} alt="Sample Image" height="150" />
                  </div>
                  <div className="col-md-8 product-detail">
                    <h4>{val.name}</h4>
                    <p>{val.description}</p>
                    <p>{val.location}</p>
                  </div>
                  <div className="col-md-2 product-price">
                     {val.price}
                  </div>
                </div>
            
              );
        })}
    </div>)
}

export default CatalogRow;
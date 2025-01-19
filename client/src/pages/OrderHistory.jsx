import {useState, useEffect, useContext} from 'react';
import Login from './Login'
import styled from 'styled-components';
import OrderCard from '../components/OrderCard';
import {getJSON, snakeToCamel} from '../helper'
import {UserContext} from '../context/userProvider'

const StyledMain = styled.main`
`

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`

const OrderHistory = () => {
  const { user, setUser } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    
    getJSON("orders").then((orders) => {
      const orderTransformed = snakeToCamel(orders);
      setOrders(orderTransformed);      
    });

  }, []);

  const showOrders = orders

  if (!user) return <Login />

  return (
      <StyledMain>
          {/* <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
          <Filters
            filterInput={filterInput}
            setFilterInput={setFilterInput}
          /> */}
        <h1>Order History</h1>
        <CardContainer>
          {showOrders.map(order=>
            <OrderCard
                key={order.id}
                {...order} 
            />
          )}
        </CardContainer>
      </StyledMain>
    );
  };
  
  export default OrderHistory;
  
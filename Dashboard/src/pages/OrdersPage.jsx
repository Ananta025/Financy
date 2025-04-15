import React, {useState} from 'react'
import {Tooltip, Grow} from "@mui/material";
import { watchlist } from '../Data/Data';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import TradeModal from '../components/TradeModel';
import {DoughnoutChart} from '../components/DoughnoutChart';


export default function OrdersPage() {

  const labels = watchlist.map((stock) => stock.name)

  const data = {
    labels,
    datasets:[
      {
        label: "Stock price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      }
    ]
  }

  return (
    <div id="orders-page">
      <div className="order-site">
        <input className=' py-1 px-3' type="text" placeholder='eg: SHL, Zomato, TATA Motor etc' />
        <span>
          {watchlist.length}/50
        </span>
      </div>
        
      <ul className='share-list w-1/2'>
        {
          watchlist.map((stock, index) => {
            return(
            <WatchListIteam stock={stock} key={index} />
            )
          })
        }
      </ul>
      <DoughnoutChart data={data} />
    </div>
  )
}

const WatchListIteam = ({stock}) => {
  const [showWatchListActions, setShowWatchListActions] = useState(false);


  const handleMouseEnter = () => {
    setShowWatchListActions(true);
  };
  const handleMouseLeave = () => {
    setShowWatchListActions(false);
  };


  return(
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
      <div id="item-list" className="item flex justify-between align-center">
        <p className={stock.isDown ? "" : ""}>{stock.name}</p>
        <div className="iteamInfo flex gap-3">
          <span className='percent'>{stock.percent}</span>
          {
            stock.isDown ? (
              <KeyboardArrowDownIcon className='down' />
            ) :(
              <KeyboardArrowUpIcon className='up' />
            )
          }
          <span className='price'>{stock.price}</span>
        </div>
      </div>
      {showWatchListActions && <WatchListActions uid={stock.name} />}
    </li>
  )
};


const WatchListActions = ({uid}) => {
  const [openTradeModal, setOpenTradeModal] = useState(false);
  const [tradeType, setTradeType] = useState('');

  const handleTradeModalOpen = (type) => {
    setTradeType(type);
    setOpenTradeModal(true);
  };
  const handleTradeModalClose = () => {
    setOpenTradeModal(false);
  };
  return(
    <>
    <span className="watchlist-actions">
      <Tooltip title="Buy (B)" placement='top' arrow TransitionComponent={Grow}>
        <button
        onClick={()=>handleTradeModalOpen('Buy')}
        className='action buy-btn'> Buy</button>
      </Tooltip>
      <Tooltip title="Sell (S)" placement='top' arrow TransitionComponent={Grow}>
        <button
        onClick={()=>handleTradeModalOpen('Sell')}
        className='action sell-btn'> Sell</button>
      </Tooltip>
      <Tooltip title="Analytics (A)" placement='top' arrow TransitionComponent={Grow}>
        <button className="action chart-btn">
        <BarChartIcon className='analytics' />
        </button>
      </Tooltip>
      <Tooltip title="More" placement='top' arrow TransitionComponent={Grow}>
        <button className='action more-btn'>
          <MoreHoriz className='more' />
        </button>
      </Tooltip>
    </span>
    <TradeModal 
    open={openTradeModal} 
    handleClose={handleTradeModalClose} 
    tradeType={tradeType} 
    stockName={uid} 
    />
    </>
  )
};
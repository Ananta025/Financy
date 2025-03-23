import React, {useState} from 'react'
import {Tooltip, Grow} from "@mui/material";
import { watchlist } from '../Data/Data';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import MoreHoriz from '@mui/icons-material/MoreHoriz';


export default function OrdersPage() {
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
  return(
    <span className="watchlist-actions">
      <Tooltip title="Buy (B)" placement='top' arrow TransitionComponent={Grow}>
        <button className='action buy-btn'> Buy</button>
      </Tooltip>
      <Tooltip title="Sell (S)" placement='top' arrow TransitionComponent={Grow}>
        <button className='action sell-btn'> Sell</button>
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
  )
};

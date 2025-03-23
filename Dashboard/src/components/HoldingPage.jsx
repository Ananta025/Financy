import React from 'react'
import {holdings} from '../Data/Data'

export default function HoldingPage() {
  return (
    <div id="holding-page">
      <h3 className='text-2xl font-medium pb-8'>Your holdings ({holdings.length})</h3>
      <div className="holding-area">
        <div className="holdings">
          <table className=" border-collapse w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Stock</th>
                <th className="p-2 text-right">Qty</th>
                <th className="p-2 text-right">Avg.</th>
                <th className="p-2 text-right">LTP</th>
                <th className="p-2 text-right">Curr. Val</th>
                <th className="p-2 text-right">P & L</th>
                <th className="p-2 text-right">Net chg.</th>
                <th className="p-2 text-right">Day chg.</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((stock, index) => {
                const currPrice = stock.price * stock.qty;
                const isProfit = currPrice - stock.avg * stock.qty >= 0.0;
                const profitClass = isProfit ? "text-green-600" : "text-red-600";
                const dayClass = stock.day[0] === "+" ? "text-green-600" : "text-red-600";

                return (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="p-2 text-left">{stock.name}</td>
                    <td className="p-2 text-right">{stock.qty}</td>
                    <td className="p-2 text-right">{stock.avg}</td>
                    <td className="p-2 text-right">{stock.price}</td>
                    <td className="p-2 text-right">{currPrice.toFixed(2)}</td>
                    <td className={`p-2 text-right ${profitClass}`}>
                      {(currPrice - stock.avg * stock.qty).toFixed(2)}
                    </td>
                    <td className={`p-2 text-right ${profitClass}`}>{stock.net}</td>
                    <td className={`p-2 text-right ${dayClass}`}>{stock.day}</td>
                  </tr>
                )
                
              })}
            </tbody>
          </table>
        </div>
        <div className="portfolio">
          
        </div>
      </div>
    </div>
  )
}

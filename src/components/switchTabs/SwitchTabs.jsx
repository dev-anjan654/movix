import React, { useState } from 'react';
import './SwitchTabs.css';

const SwitchTabs = ({data, onTabChange}) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);
    const activeTab = (tab, index) => {
        setLeft(index*100);
        setTimeout(()=>{
            setSelectedTab(index)
        },300)
        onTabChange(tab, index)
    }
  return (
    <div className='switch-tab'>
        <div className="tab-items">
            {
                data.map((item, index)=>{
                    return(
                        <span className={`tab-item ${selectedTab === index ? "active" : "" }`}
                        key={index}
                        onClick={()=>activeTab(item, index)}>{item}</span>
                    )
                })
            }
            <span className="moving-bg" style={{left}}></span>
        </div>
    </div>
  )
}

export default SwitchTabs